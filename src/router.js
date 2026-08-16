import { appRoutes } from "./data/content.js";

const knownPaths = new Set(appRoutes.map((item) => item.path));

export function normalizePath(pathname = "/") {
  const cleanPath = `/${pathname}`.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  return knownPaths.has(cleanPath) ? cleanPath : "/";
}

export function routeIdForPath(pathname) {
  const path = normalizePath(pathname);
  return appRoutes.find((item) => item.path === path)?.id ?? "home";
}

function normalizeBasePath(basePath = "/") {
  const cleanBase = `/${basePath}`.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  return cleanBase === "/" ? "/" : `${cleanBase}/`;
}

export function routePathFromBrowserPath(pathname, basePath = "/") {
  const base = normalizeBasePath(basePath);
  const cleanPath = `/${pathname}`.replace(/\/{2,}/g, "/");

  if (base === "/") return normalizePath(cleanPath);

  const baseWithoutSlash = base.slice(0, -1);
  if (cleanPath === baseWithoutSlash || cleanPath === base) return "/";
  if (cleanPath.startsWith(`${baseWithoutSlash}/`)) {
    return normalizePath(cleanPath.slice(baseWithoutSlash.length));
  }

  return "/";
}

export function browserPathForRoute(routePath, basePath = "/") {
  const route = normalizePath(routePath);
  const base = normalizeBasePath(basePath);

  if (base === "/") return route;
  if (route === "/") return base;
  return `${base.slice(0, -1)}${route}`;
}
