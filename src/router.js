import { navigation } from "./data/content.js";

const knownPaths = new Set(navigation.map((item) => item.path));

export function normalizePath(pathname = "/") {
  const cleanPath = `/${pathname}`.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  return knownPaths.has(cleanPath) ? cleanPath : "/";
}

export function routeIdForPath(pathname) {
  const path = normalizePath(pathname);
  return navigation.find((item) => item.path === path)?.id ?? "home";
}
