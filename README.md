# Cairns Loop

Cairns Loop is a bilingual, Chinese-first student guide for learning, living and finding opportunities in Cairns. This repository contains the first interactive multi-page prototype selected from the project's Product Design exploration.

## What is included

- Chinese and English interface switching
- Search across the first course, location and weekly-highlight dataset
- Real routes for the weekly homepage, Study, Life and Opportunities
- Data Science, IoT and Electronic Engineering study-path tabs
- Responsive desktop, tablet and mobile layouts
- Official-source links for JCU Cairns Campus, Ideas Lab and John Grey Hall imagery
- Static build output compatible with the bundled hosting worker

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local address printed by Vite.

## Verify

```bash
npm test
npm run build
npm run test:sites
```

## Project structure

```text
src/App.jsx            Shared shell, language state and lightweight routing
src/pages/             Weekly, Study, Life and Opportunities pages
src/components/        Reusable page-intro and location-card components
src/router.js           Route normalization and route lookup
src/styles.css         Design tokens and responsive layout
src/data/content.js    Bilingual content and first-release course data
design/                Selected visual reference
qa/                    Browser screenshots used for design comparison
tests/                 Data and hosting-worker checks
```

## Content and image policy

This is an independent student guide and is not an official JCU website. The project owner confirmed on 15 August 2026 that reuse of the three selected JCU photographs has been checked and accepts responsibility for that authorization. The source register remains in the repository for traceability. Do not add private LearnJCU courseware, assessment answers, student records or copyrighted teaching materials to the public repository.

See [IMAGE_SOURCES.md](./IMAGE_SOURCES.md) for the current image-source register.
