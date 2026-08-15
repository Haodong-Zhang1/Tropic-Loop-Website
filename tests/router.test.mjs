import assert from "node:assert/strict";
import test from "node:test";
import {
  browserPathForRoute,
  normalizePath,
  routeIdForPath,
  routePathFromBrowserPath,
} from "../src/router.js";

test("normalizes supported routes and trailing slashes", () => {
  assert.equal(normalizePath("/"), "/");
  assert.equal(normalizePath("/study/"), "/study");
  assert.equal(normalizePath("//life//"), "/life");
});

test("unknown paths safely fall back to the weekly homepage", () => {
  assert.equal(normalizePath("/missing"), "/");
  assert.equal(routeIdForPath("/missing"), "home");
});

test("maps each product path to its route id", () => {
  assert.equal(routeIdForPath("/study"), "study");
  assert.equal(routeIdForPath("/life"), "life");
  assert.equal(routeIdForPath("/opportunities"), "opportunities");
});

test("keeps client-side routes working under a GitHub Pages repository path", () => {
  const base = "/Tropic-Loop-Website/";
  assert.equal(browserPathForRoute("/", base), base);
  assert.equal(browserPathForRoute("/study", base), "/Tropic-Loop-Website/study");
  assert.equal(routePathFromBrowserPath("/Tropic-Loop-Website/life", base), "/life");
  assert.equal(routePathFromBrowserPath("/Tropic-Loop-Website/", base), "/");
});
