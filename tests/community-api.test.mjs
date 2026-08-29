import assert from "node:assert/strict";
import test from "node:test";
import { decodeImageData, validatePostPayload, validateTipPayload } from "../worker/community.js";

test("accepts a clear student tip without requiring manual review metadata", () => {
  const result = validateTipPayload({
    campus: "cairns",
    category: "daily",
    name: "Anonymous",
    tip: "Bring a light rain jacket because tropical showers can arrive quickly after class.",
  });
  assert.equal(result.ok, true);
  assert.equal(result.value.campus, "cairns");
});

test("accepts short tips but still rejects empty submissions", () => {
  assert.equal(validateTipPayload({ campus: "cairns", category: "daily", tip: "带伞" }).ok, true);
  assert.equal(validateTipPayload({ campus: "cairns", category: "daily", tip: "   " }).ok, false);
});

test("rejects links and contact details inside tips", () => {
  for (const tip of [
    "Read my complete guide at https://example.com before you arrive on campus.",
    "Email student@example.com for a private deal and more information.",
  ]) {
    assert.equal(validateTipPayload({ campus: "cairns", category: "daily", tip }).ok, false);
  }
});

test("enforces the AUD 1 minimum errand commission", () => {
  const base = {
    type: "errand",
    campus: "townsville",
    title: "Bring printer paper",
    description: "One pack of A4 paper from Stockland with receipt.",
    store: "Stockland",
  };
  assert.equal(validatePostPayload({ ...base, amount: 0.5 }).ok, false);
  assert.equal(validatePostPayload({ ...base, amount: 1 }).ok, true);
});

test("accepts small JPEG data and rejects unsupported image types", () => {
  const accepted = decodeImageData("data:image/jpeg;base64,AQIDBA==");
  assert.equal(accepted.ok, true);
  assert.equal(accepted.value.bytes.byteLength, 4);
  assert.equal(accepted.value.extension, "jpg");
  assert.equal(decodeImageData("data:image/gif;base64,AQIDBA==").ok, false);
});
