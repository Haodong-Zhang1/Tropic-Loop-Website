import { communityRules, communitySeedPosts } from "../data/content.js";

const TIP_STORAGE_KEY = "tropic-loop-community-tips-v1";

class CommunityRequestError extends Error {
  constructor(message, { status = 0, code = "", unavailable = false } = {}) {
    super(message);
    this.name = "CommunityRequestError";
    this.status = status;
    this.code = code;
    this.unavailable = unavailable;
  }
}

const readStored = (key, fallback = []) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeStored = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const requestJson = async (url, options) => {
  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers: { "content-type": "application/json", ...options?.headers },
    });
  } catch {
    throw new CommunityRequestError("Community API unavailable", { unavailable: true });
  }
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new CommunityRequestError("Community API unavailable", { status: response.status, unavailable: true });
  }
  const payload = await response.json();
  if (!response.ok) {
    throw new CommunityRequestError(payload.error?.message || "Community request failed", {
      status: response.status,
      code: payload.error?.code || "",
      unavailable: response.status === 404 || response.status >= 500,
    });
  }
  return payload;
};

const canUseDeviceFallback = (error) => error instanceof CommunityRequestError && error.unavailable;

export function communityErrorMessage(error, locale) {
  if (error?.status === 429) {
    return locale === "zh" ? "发布得有点快，请稍后再试。" : "You are posting a little too quickly. Please try again later.";
  }
  return locale === "zh" ? "这次没有发布成功，请检查内容后重试。" : "This could not be published. Check the content and try again.";
}

export async function listCommunityPosts(campus, type) {
  try {
    const payload = await requestJson(`/api/community/posts?${new URLSearchParams({ campus, type })}`);
    return { items: payload.items, mode: "shared" };
  } catch (error) {
    if (!canUseDeviceFallback(error)) throw error;
    const local = readStored(communityRules.storageKey, []);
    return {
      items: [...local, ...communitySeedPosts].filter((post) => post.campus === campus && post.type === type),
      mode: "device",
    };
  }
}

export async function createCommunityPost(post) {
  try {
    const payload = await requestJson("/api/community/posts", { method: "POST", body: JSON.stringify(post) });
    return { item: payload.item, mode: "shared" };
  } catch (apiError) {
    if (!canUseDeviceFallback(apiError)) throw apiError;
    const existing = readStored(communityRules.storageKey, []);
    const item = {
      id: `local-${Date.now()}`,
      ...post,
      ...(post.type === "secondhand" ? { price: Number(post.amount) } : { commission: Number(post.amount) }),
      sample: false,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    writeStored(communityRules.storageKey, [item, ...existing]);
    return { item, mode: "device", apiError };
  }
}

export async function claimCommunityPost(postId) {
  try {
    await requestJson(`/api/community/posts/${encodeURIComponent(postId)}/claim`, { method: "POST", body: "{}" });
    return { mode: "shared" };
  } catch (error) {
    if (!canUseDeviceFallback(error)) throw error;
    const existing = readStored(communityRules.storageKey, []);
    writeStored(communityRules.storageKey, existing.map((post) => post.id === postId ? { ...post, status: "claimed" } : post));
    return { mode: "device" };
  }
}

export async function listCultureTips(campus) {
  try {
    const payload = await requestJson(`/api/tips?${new URLSearchParams({ campus })}`);
    return { items: payload.items, mode: "shared" };
  } catch (error) {
    if (!canUseDeviceFallback(error)) throw error;
    return { items: readStored(TIP_STORAGE_KEY, []).filter((tip) => tip.campus === campus), mode: "device" };
  }
}

export async function createCultureTip(tip) {
  try {
    const payload = await requestJson("/api/tips", { method: "POST", body: JSON.stringify(tip) });
    return { item: payload.item, mode: "shared" };
  } catch (apiError) {
    if (!canUseDeviceFallback(apiError)) throw apiError;
    const existing = readStored(TIP_STORAGE_KEY, []);
    const item = { id: `local-tip-${Date.now()}`, ...tip, views: 0, createdAt: new Date().toISOString(), sample: false };
    writeStored(TIP_STORAGE_KEY, [item, ...existing]);
    return { item, mode: "device", apiError };
  }
}

export async function markCultureTipViewed(tipId) {
  try {
    const payload = await requestJson(`/api/tips/${encodeURIComponent(tipId)}/view`, { method: "POST", body: "{}" });
    return { views: payload.views, mode: "shared" };
  } catch (error) {
    if (!canUseDeviceFallback(error)) throw error;
    const existing = readStored(TIP_STORAGE_KEY, []);
    let views = 0;
    const updated = existing.map((tip) => {
      if (tip.id !== tipId) return tip;
      views = Number(tip.views || 0) + 1;
      return { ...tip, views };
    });
    writeStored(TIP_STORAGE_KEY, updated);
    return { views, mode: "device" };
  }
}

export async function reportCommunityItem(targetType, targetId) {
  try {
    await requestJson("/api/community/reports", {
      method: "POST",
      body: JSON.stringify({ targetType, targetId, reason: "community_report" }),
    });
    return { mode: "shared" };
  } catch (error) {
    if (!canUseDeviceFallback(error)) throw error;
    return { mode: "device" };
  }
}
