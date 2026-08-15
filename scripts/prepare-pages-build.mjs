#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { navigation } from "../src/data/content.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const client = path.join(root, "dist", "client");
const index = path.join(client, "index.html");

if (!existsSync(index)) throw new Error(`Missing GitHub Pages build input: ${index}`);

copyFileSync(index, path.join(client, "404.html"));

for (const item of navigation) {
  if (item.path === "/") continue;
  const routeDirectory = path.join(client, item.path.slice(1));
  mkdirSync(routeDirectory, { recursive: true });
  copyFileSync(index, path.join(routeDirectory, "index.html"));
}

console.log("Prepared GitHub Pages fallback and static route entry points.");
