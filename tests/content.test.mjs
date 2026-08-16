import assert from "node:assert/strict";
import test from "node:test";
import {
  appRoutes,
  bankAccounts,
  buildingDirectory,
  campuses,
  careerResources,
  communityRules,
  culturalEvents,
  cultureLayers,
  authorProfile,
  imageSources,
  jointPathwayModes,
  jointPathways,
  essentialCategories,
  essentialPlaces,
  lifeServices,
  mobilePlans,
  mobilePrimaryNavigationIds,
  navigation,
  copy,
  openLearningTopics,
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

test("all visible location images have a secure source link", () => {
  for (const image of Object.values(imageSources)) {
    assert.match(image.src, /^https:\/\//);
    assert.match(image.source, /^https:\/\//);
  }
});

test("campus, study and culture use distinct contextual hero images", () => {
  for (const campus of Object.values(campuses)) {
    const pageImages = [campus.campusImage, campus.studyImage, campus.cultureImage];
    assert.equal(new Set(pageImages.map((image) => image.src)).size, 3);
    for (const image of pageImages) {
      assert.ok(Object.values(imageSources).includes(image));
    }
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
      ["culture", "/culture"],
      ["market", "/market"],
      ["career", "/career"],
      ["about", "/about"],
    ],
  );
});

test("mobile navigation keeps the four highest-frequency destinations one tap away", () => {
  assert.deepEqual(mobilePrimaryNavigationIds, ["home", "study", "life", "market"]);
  for (const id of mobilePrimaryNavigationIds) {
    assert.ok(navigation.some((item) => item.id === id));
  }
});

test("Chinese page labels are concise Chinese-first navigation cues", () => {
  for (const pageId of ["home", "campus", "study", "life", "culture", "market", "career"]) {
    assert.match(copy.zh[pageId].eyebrow, /[\u3400-\u9fff]/);
  }
  assert.equal(copy.zh.more, "更多");
});

test("the open learning library covers core quantitative and computing foundations", () => {
  assert.deepEqual(
    openLearningTopics.slice(0, 3).map((topic) => topic.id),
    ["machine-learning", "linear-algebra", "probability-statistics"],
  );
  assert.ok(openLearningTopics.length >= 6);
  assert.ok(openLearningTopics.some((topic) => topic.resources.some((resource) => resource.platform === "YouTube")));
  assert.ok(openLearningTopics.some((topic) => topic.resources.some((resource) => resource.platform === "Bilibili")));
  for (const topic of openLearningTopics) {
    assert.ok(topic.resources.length >= 2);
    for (const resource of topic.resources) assert.match(resource.url, /^https:\/\//);
  }
});

test("the culture section has official layers and campus-specific event entry points", () => {
  assert.deepEqual(cultureLayers.map((layer) => layer.id), ["australia", "jcu", "north-queensland"]);
  for (const layer of cultureLayers) {
    assert.ok(layer.links.length >= 2);
    for (const link of layer.links) assert.match(link.url, /^https:\/\//);
  }
  for (const campus of ["cairns", "townsville"]) {
    assert.ok(culturalEvents.filter((event) => event.campus === campus).length >= 2);
  }
  for (const event of culturalEvents) assert.match(event.url, /^https:\/\//);
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
