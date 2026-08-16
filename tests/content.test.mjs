import assert from "node:assert/strict";
import test from "node:test";
import {
  appRoutes,
  bankAccounts,
  buildingDirectory,
  campuses,
  careerResources,
  communityRules,
  authorProfile,
  imageSources,
  jointPathwayModes,
  jointPathways,
  essentialCategories,
  essentialPlaces,
  lifeServices,
  mobilePlans,
  navigation,
  staffDirectory,
  studyPaths,
  weeklyItems,
} from "../src/data/content.js";

test("the Data Science path contains the approved first-release courses", () => {
  const dataScience = studyPaths.find((path) => path.id === "data-science");
  assert.ok(dataScience);
  assert.deepEqual(
    dataScience.courses.map((course) => course.code),
    ["MA3831", "MA2405", "MA2830", "CP2414"],
  );
});

test("the joint navigator separates 2+2 bachelor and 3+2 master pathways", () => {
  assert.deepEqual(jointPathwayModes.map((mode) => mode.id), ["2plus2", "3plus2"]);
  assert.deepEqual(
    jointPathways.filter((pathway) => pathway.mode === "2plus2").map((pathway) => pathway.id),
    ["xut-data-science", "xut-electronic"],
  );
  assert.deepEqual(
    jointPathways.filter((pathway) => pathway.mode === "3plus2").map((pathway) => pathway.id),
    ["xut-iot-master"],
  );
});

test("joint pathway facts keep verified credit separate from confirmation-only claims", () => {
  const dataScience = jointPathways.find((pathway) => pathway.id === "xut-data-science");
  const electronic = jointPathways.find((pathway) => pathway.id === "xut-electronic");
  const iotMaster = jointPathways.find((pathway) => pathway.id === "xut-iot-master");

  assert.ok(dataScience.facts.some((fact) => fact.value.zh.includes("48 JCU 学分")));
  assert.ok(electronic.curriculum.items.zh.some((item) => item.includes("不等于自动抵免")));
  assert.match(iotMaster.title.en, /Master of Engineering/);
  assert.equal(iotMaster.termPlan.length, 6);
});

test("all study resources and joint pathway sources use public HTTPS links", () => {
  for (const path of studyPaths) {
    for (const course of path.courses) {
      assert.match(course.url, /^https:\/\//);
      assert.ok(course.resources.length >= 2);
      for (const resource of course.resources) assert.match(resource.url, /^https:\/\//);
    }
  }
  for (const pathway of jointPathways) {
    assert.ok(pathway.links.length >= 3);
    for (const link of pathway.links) assert.match(link.url, /^https:\/\//);
  }
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
      ["campus", "/campus"],
      ["study", "/study"],
      ["life", "/life"],
      ["market", "/market"],
      ["career", "/career"],
      ["about", "/about"],
    ],
  );
});

test("community posting enforces the requested minimum errand commission", () => {
  assert.equal(communityRules.minCommissionAud, 1);
  assert.ok(communityRules.maxImageBytes > 0);
});

test("career resources use public HTTPS sources", () => {
  assert.ok(careerResources.length >= 6);
  for (const resource of careerResources) assert.match(resource.url, /^https:\/\//);
});

test("the author profile identifies the sole current author without inventing a team", () => {
  assert.equal(authorProfile.name, "Haodong Zhang");
  assert.match(authorProfile.role.en, /sole current maintainer/);
  assert.match(authorProfile.github, /^https:\/\/github\.com\//);
});

test("both campuses have official map, PDF and Google Maps entry points", () => {
  for (const campus of Object.values(campuses)) {
    assert.match(campus.maps.interactive, /^https:\/\//);
    assert.match(campus.maps.printable, /^https:\/\/www\.jcu\.edu\.au\//);
    assert.match(campus.maps.google, /^https:\/\/www\.google\.com\/maps\//);
  }
});

test("the building directory covers the complete official map lists", () => {
  assert.equal(buildingDirectory.filter((item) => item.campus === "cairns").length, 25);
  assert.ok(buildingDirectory.filter((item) => item.campus === "townsville").length > 150);
});

test("every staff entry opens an official JCU page", () => {
  for (const person of staffDirectory) assert.match(person.url, /^https:\/\/(apps|portfolio)\.jcu\.edu\.au\//);
});

test("every weekly item links to a known page", () => {
  const paths = new Set(appRoutes.map((item) => item.path));
  for (const item of weeklyItems) assert.ok(paths.has(item.route));
});

test("every life service opens a real route or campus-specific public link", () => {
  const paths = new Set(appRoutes.map((item) => item.path));
  for (const service of lifeServices) {
    if (service.route) assert.ok(paths.has(service.route));
    if (service.externalByCampus) {
      assert.match(service.externalByCampus.cairns, /^https:\/\//);
      assert.match(service.externalByCampus.townsville, /^https:\/\//);
    }
  }
});

test("setup comparison entries use official provider pages", () => {
  assert.equal(mobilePlans.length, 4);
  assert.equal(bankAccounts.length, 4);
  for (const item of [...mobilePlans, ...bankAccounts]) assert.match(item.url, /^https:\/\//);
});

test("each campus has public entries in every essentials category", () => {
  for (const campus of ["cairns", "townsville"]) {
    for (const category of essentialCategories) {
      assert.ok(essentialPlaces.some((place) => place.campus === campus && place.category === category.id));
    }
  }
});
