import assert from "node:assert/strict";
import test from "node:test";
import { normalizePath, routeIdForPath } from "../src/router.js";

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
