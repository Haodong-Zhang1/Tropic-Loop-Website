import assert from "node:assert/strict";
import test from "node:test";
import { imageSources, navigation, studyPaths, weeklyItems } from "../src/data/content.js";

test("the Data Science path contains the approved first-release courses", () => {
  const dataScience = studyPaths.find((path) => path.id === "data-science");
  assert.ok(dataScience);
  assert.deepEqual(
    dataScience.courses.map((course) => course.code),
    ["MA3831", "MA2405", "MA2830", "CP2414"],
  );
});

test("all visible location images have an official source link", () => {
  for (const image of Object.values(imageSources)) {
    assert.match(image.src, /^https:\/\/www\.jcu\.edu\.au\//);
    assert.match(image.source, /^https:\/\/www\.jcu\.edu\.au\//);
  }
});

test("the primary navigation has one distinct path for each product area", () => {
  assert.deepEqual(
    navigation.map((item) => [item.id, item.path]),
    [
      ["home", "/"],
      ["study", "/study"],
      ["life", "/life"],
      ["opportunities", "/opportunities"],
    ],
  );
});

test("every weekly item links to a known page", () => {
  const paths = new Set(navigation.map((item) => item.path));
  for (const item of weeklyItems) assert.ok(paths.has(item.route));
});
