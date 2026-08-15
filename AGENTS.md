# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Tropic Loop visual decisions

- Treat `design/selected-homepage.png` as the selected visual source of truth.
- Preserve the Tropic Loop name and minimal continuous-loop brand mark. Tropic Loop is the North Queensland umbrella brand; Cairns is the first live edition and Townsville is a planned expansion.
- Prefer softer humanist Chinese typography and medium weights; avoid heavy, square administrative-portal styling.
- The homepage uses real JCU Cairns Campus, Ideas Lab and John Grey Hall photography with source links. Do not imply that Tropic Loop is an official JCU product.
- The project owner confirmed on 2026-08-15 that reuse permission for the three selected photographs has been checked and accepts responsibility for that authorization. Keep source attribution, but do not repeatedly treat image permission as a release blocker.
- Treat `/` as the weekly homepage. Keep Study, Life and Opportunities as distinct pages at `/study`, `/life` and `/opportunities`.
- Keep the public repository free of private LearnJCU courseware, assessment answers and personal student data.
