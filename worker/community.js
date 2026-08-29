const CAMPUSES = new Set(["cairns", "townsville"]);
const POST_TYPES = new Set(["secondhand", "errand"]);
const TIP_CATEGORIES = new Set(["daily", "study", "event", "cairns", "townsville"]);
const POST_CATEGORIES = new Set(["Study item", "Electronics", "Furniture", "Other"]);
const IMAGE_TYPES = new Map([
  ["jpeg", { mime: "image/jpeg", extension: "jpg" }],
  ["jpg", { mime: "image/jpeg", extension: "jpg" }],
  ["png", { mime: "image/png", extension: "png" }],
  ["webp", { mime: "image/webp", extension: "webp" }],
]);
const MAX_IMAGE_BYTES = 1_200_000;

const cleanText = (value, maxLength) => String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
const safeId = (prefix) => `${prefix}-${crypto.randomUUID()}`;

const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
});

const error = (status, code, message) => json({ error: { code, message } }, status);

export function validateTipPayload(payload) {
  const campus = cleanText(payload?.campus, 20);
  const category = cleanText(payload?.category, 20);
  const name = cleanText(payload?.name, 40) || "Anonymous";
  const tip = cleanText(payload?.tip, 800);

  if (!CAMPUSES.has(campus)) return { ok: false, message: "Choose a valid campus." };
  if (!TIP_CATEGORIES.has(category)) return { ok: false, message: "Choose a valid category." };
  if (tip.length < 20) return { ok: false, message: "Tips need at least 20 characters." };
  if (/https?:\/\/|www\.|\b\S+@\S+\.\S+\b/i.test(tip)) {
    return { ok: false, message: "Tips cannot include links or contact details." };
  }

  return { ok: true, value: { campus, category, name, tip } };
}

export function validatePostPayload(payload) {
  const type = cleanText(payload?.type, 20);
  const campus = cleanText(payload?.campus, 20);
  const title = cleanText(payload?.title, 70);
  const description = cleanText(payload?.description, 240);
  const category = cleanText(payload?.category, 30);
  const store = cleanText(payload?.store, 80);
  const contact = cleanText(payload?.contact, 80);
  const amount = Number(payload?.amount);

  if (!POST_TYPES.has(type)) return { ok: false, message: "Choose a valid post type." };
  if (!CAMPUSES.has(campus)) return { ok: false, message: "Choose a valid campus." };
  if (title.length < 4 || description.length < 12) return { ok: false, message: "Add a clear title and description." };
  if (!Number.isFinite(amount) || amount < (type === "errand" ? 1 : 0) || amount > 100_000) {
    return { ok: false, message: "Enter a valid amount." };
  }
  if (type === "secondhand" && !POST_CATEGORIES.has(category)) {
    return { ok: false, message: "Choose a valid item category." };
  }

  return {
    ok: true,
    value: {
      type,
      campus,
      title,
      description,
      category: type === "secondhand" ? category : null,
      store: type === "errand" ? (store || campus) : null,
      amount,
      contact: contact || null,
      image: type === "secondhand" ? payload?.image : null,
    },
  };
}

export function decodeImageData(image) {
  if (!image) return { ok: true, value: null };
  const match = String(image).match(/^data:image\/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return { ok: false, message: "Use a JPEG, PNG or WebP image." };
  const type = IMAGE_TYPES.get(match[1]);
  try {
    const binary = atob(match[2]);
    if (binary.length > MAX_IMAGE_BYTES) return { ok: false, message: "Keep images under 1.2 MB." };
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return { ok: true, value: { bytes, ...type } };
  } catch {
    return { ok: false, message: "The image could not be read." };
  }
}

const visitorHash = async (request) => {
  const source = `${request.headers.get("cf-connecting-ip") || "local"}|${request.headers.get("user-agent") || "unknown"}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const enforceRateLimit = async (db, hash, action, limit, windowMs) => {
  const now = Date.now();
  const cutoff = now - windowMs;
  const row = await db.prepare(
    "SELECT COUNT(*) AS count FROM community_rate_limits WHERE visitor_hash = ? AND action = ? AND created_at >= ?",
  ).bind(hash, action, cutoff).first();
  if (Number(row?.count ?? 0) >= limit) return false;
  await db.prepare(
    "INSERT INTO community_rate_limits (visitor_hash, action, created_at) VALUES (?, ?, ?)",
  ).bind(hash, action, now).run();
  return true;
};

const readJson = async (request) => {
  try {
    return await request.json();
  } catch {
    return null;
  }
};

const imageUrl = (key) => key ? `/api/community/images/${encodeURIComponent(key)}` : "";

const mapPost = (row) => ({
  id: row.id,
  type: row.type,
  campus: row.campus,
  title: row.title,
  description: row.description,
  ...(row.type === "secondhand" ? { category: row.category, price: row.amount } : { store: row.store, commission: row.amount }),
  contact: row.contact || "",
  image: imageUrl(row.image_key),
  status: row.status,
  createdAt: row.created_at,
  sample: false,
});

const listPosts = async (request, env) => {
  const url = new URL(request.url);
  const campus = url.searchParams.get("campus");
  const type = url.searchParams.get("type");
  if (!CAMPUSES.has(campus) || !POST_TYPES.has(type)) return error(400, "invalid_filter", "Choose a valid campus and post type.");
  const { results = [] } = await env.DB.prepare(
    "SELECT * FROM community_posts WHERE campus = ? AND type = ? ORDER BY created_at DESC LIMIT 60",
  ).bind(campus, type).all();
  return json({ items: results.map(mapPost) });
};

const createPost = async (request, env) => {
  const payload = await readJson(request);
  const validation = validatePostPayload(payload);
  if (!validation.ok) return error(400, "invalid_post", validation.message);

  const hash = await visitorHash(request);
  if (!await enforceRateLimit(env.DB, hash, "create_post", 4, 30 * 60 * 1000)) {
    return error(429, "rate_limited", "Please wait before publishing another post.");
  }

  const decodedImage = decodeImageData(validation.value.image);
  if (!decodedImage.ok) return error(400, "invalid_image", decodedImage.message);

  const id = safeId("post");
  const createdAt = new Date().toISOString();
  let storedImageKey = null;
  if (decodedImage.value) {
    if (!env.FILES) return error(503, "uploads_unavailable", "Image uploads are temporarily unavailable.");
    storedImageKey = `${crypto.randomUUID()}.${decodedImage.value.extension}`;
    await env.FILES.put(storedImageKey, decodedImage.value.bytes, {
      httpMetadata: { contentType: decodedImage.value.mime },
      customMetadata: { postId: id },
    });
  }

  const value = validation.value;
  try {
    await env.DB.prepare(
      `INSERT INTO community_posts
       (id, type, campus, title, description, category, store, amount, contact, image_key, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?)`,
    ).bind(id, value.type, value.campus, value.title, value.description, value.category, value.store, value.amount, value.contact, storedImageKey, createdAt).run();
  } catch (cause) {
    if (storedImageKey && env.FILES) await env.FILES.delete(storedImageKey);
    throw cause;
  }

  return json({ item: mapPost({
    id,
    ...value,
    image_key: storedImageKey,
    status: "open",
    created_at: createdAt,
  }) }, 201);
};

const claimPost = async (request, env, id) => {
  const hash = await visitorHash(request);
  if (!await enforceRateLimit(env.DB, hash, "claim_post", 12, 60 * 60 * 1000)) {
    return error(429, "rate_limited", "Please wait before claiming another task.");
  }
  const result = await env.DB.prepare(
    "UPDATE community_posts SET status = 'claimed' WHERE id = ? AND type = 'errand' AND status = 'open'",
  ).bind(id).run();
  if (!result.meta?.changes) return error(409, "not_open", "This task is no longer available.");
  return json({ status: "claimed" });
};

const listTips = async (request, env) => {
  const campus = new URL(request.url).searchParams.get("campus");
  if (!CAMPUSES.has(campus)) return error(400, "invalid_filter", "Choose a valid campus.");
  const { results = [] } = await env.DB.prepare(
    "SELECT * FROM culture_tips WHERE campus = ? ORDER BY views DESC, created_at DESC LIMIT 60",
  ).bind(campus).all();
  return json({ items: results.map((row) => ({ ...row, createdAt: row.created_at, sample: false })) });
};

const createTip = async (request, env) => {
  const payload = await readJson(request);
  const validation = validateTipPayload(payload);
  if (!validation.ok) return error(400, "invalid_tip", validation.message);
  const hash = await visitorHash(request);
  if (!await enforceRateLimit(env.DB, hash, "create_tip", 4, 30 * 60 * 1000)) {
    return error(429, "rate_limited", "Please wait before publishing another tip.");
  }
  const id = safeId("tip");
  const createdAt = new Date().toISOString();
  const value = validation.value;
  await env.DB.prepare(
    "INSERT INTO culture_tips (id, campus, category, name, tip, views, created_at) VALUES (?, ?, ?, ?, ?, 0, ?)",
  ).bind(id, value.campus, value.category, value.name, value.tip, createdAt).run();
  return json({ item: { id, ...value, views: 0, createdAt, sample: false } }, 201);
};

const viewTip = async (request, env, id) => {
  const hash = await visitorHash(request);
  const recorded = await enforceRateLimit(env.DB, hash, `view_tip:${id}`, 1, 6 * 60 * 60 * 1000);
  if (recorded) await env.DB.prepare("UPDATE culture_tips SET views = views + 1 WHERE id = ?").bind(id).run();
  const row = await env.DB.prepare("SELECT views FROM culture_tips WHERE id = ?").bind(id).first();
  if (!row) return error(404, "tip_not_found", "Tip not found.");
  return json({ views: Number(row.views), recorded });
};

const createReport = async (request, env) => {
  const payload = await readJson(request);
  const targetType = cleanText(payload?.targetType, 10);
  const targetId = cleanText(payload?.targetId, 80);
  const reason = cleanText(payload?.reason, 120) || "community_report";
  if (!new Set(["post", "tip"]).has(targetType) || !targetId) return error(400, "invalid_report", "Choose a valid item to report.");
  const hash = await visitorHash(request);
  if (!await enforceRateLimit(env.DB, hash, "report", 12, 24 * 60 * 60 * 1000)) {
    return error(429, "rate_limited", "Too many reports. Please try again later.");
  }
  await env.DB.prepare(
    "INSERT INTO community_reports (id, target_type, target_id, reason, visitor_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)",
  ).bind(safeId("report"), targetType, targetId, reason, hash, new Date().toISOString()).run();
  return json({ reported: true }, 201);
};

const serveImage = async (env, key) => {
  if (!env.FILES || !/^[a-f0-9-]+\.(jpg|png|webp)$/.test(key)) return new Response("Not found", { status: 404 });
  const object = await env.FILES.get(key);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers({ "cache-control": "public, max-age=86400" });
  object.writeHttpMetadata?.(headers);
  return new Response(object.body, { headers });
};

export async function handleCommunityRequest(request, env) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/")) return null;

  const claimMatch = url.pathname.match(/^\/api\/community\/posts\/([^/]+)\/claim$/);
  const viewMatch = url.pathname.match(/^\/api\/tips\/([^/]+)\/view$/);
  const imageMatch = url.pathname.match(/^\/api\/community\/images\/([^/]+)$/);
  const knownRoute = new Set([
    "/api/community/posts",
    "/api/tips",
    "/api/community/reports",
  ]).has(url.pathname) || claimMatch || viewMatch || imageMatch;
  if (!knownRoute) return error(404, "api_not_found", "API route not found.");
  if (imageMatch && request.method === "GET") return serveImage(env, decodeURIComponent(imageMatch[1]));
  if (!env.DB) return error(503, "community_unavailable", "Community publishing is not configured yet.");

  try {
    if (url.pathname === "/api/community/posts" && request.method === "GET") return listPosts(request, env);
    if (url.pathname === "/api/community/posts" && request.method === "POST") return createPost(request, env);
    if (url.pathname === "/api/tips" && request.method === "GET") return listTips(request, env);
    if (url.pathname === "/api/tips" && request.method === "POST") return createTip(request, env);
    if (url.pathname === "/api/community/reports" && request.method === "POST") return createReport(request, env);

    if (claimMatch && request.method === "POST") return claimPost(request, env, decodeURIComponent(claimMatch[1]));
    if (viewMatch && request.method === "POST") return viewTip(request, env, decodeURIComponent(viewMatch[1]));

    return error(404, "api_not_found", "API route not found.");
  } catch {
    return error(500, "community_error", "The community service could not complete this request.");
  }
}
