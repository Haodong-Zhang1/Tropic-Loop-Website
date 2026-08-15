# Cairns Loop design QA

## Comparison target

- Source visual truth: `design/selected-homepage.png`
- Final homepage screenshot: `qa/home-routed-1536-final.jpg`
- Full-view side-by-side comparison: `qa/comparison-home-routed-final.jpg`
- Focused hero comparison: `qa/comparison-home-routed-hero-final.jpg`
- Study route evidence: `qa/study-page-1536.png`
- Life route evidence: `qa/life-page-1536.jpg`
- Opportunities route evidence: `qa/opportunities-page-1536-final.jpg`
- Responsive evidence: `qa/life-page-mobile-390.jpg`

## Normalization and state

- Source pixels: 1536 × 1024.
- Final homepage pixels: 1536 × 1024.
- CSS viewport: 1536 × 1024; `devicePixelRatio: 1` under the explicit QA viewport.
- Density normalization: none required for the final comparison.
- State: Chinese, weekly homepage, search result closed, mobile menu closed.
- The selected source contains the study-path table on the homepage. Its absence in the final homepage is intentional: the user explicitly moved Study, Life and Opportunities into distinct routes while keeping the weekly view at `/`.

## Browser verification

- Routing: `/`, `/study`, `/life` and `/opportunities` each rendered their own page and correct active-navigation state.
- History: browser Back returned from Opportunities to Life; Forward restored Opportunities.
- Direct paths: loading `/opportunities` directly rendered the app route through the Vite/static fallback.
- Search: queried `MA3831`; the bilingual result appeared and opened `/study`.
- Language: switched to English and navigated to Study; the English state persisted across the route change.
- Study paths: selected Internet of Things; three IoT rows appeared and the course panel updated to `IOT 01`.
- Mobile menu: at 390 × 844, the four-page menu opened, Life navigation worked and no horizontal overflow was present (`scrollWidth: 390`).
- Images: the JCU Cairns Campus, Ideas Lab and John Grey Hall photographs rendered with controlled crops.
- Console: no warnings or errors were recorded during the final desktop and mobile checks.

## Findings

No actionable P0, P1 or P2 differences remain.

### Required fidelity surfaces

- Fonts and typography: the soft humanist system stack, regular display weight and medium supporting weights preserve the selected visual direction. Headline wrapping, navigation scale and bilingual hierarchy remain consistent across all four pages.
- Spacing and layout rhythm: the 47.4/52.6 homepage hero, 65 px weekly strip, two-card image grid, 64 px desktop margins and compact footer closely track the source. The new routed pages reuse the same section rhythm, radii and divider treatment.
- Colors and visual tokens: off-white paper, tropical green, charcoal text, warm-gray dividers and restrained pale-lime selected states are reused without gradients or visual-system drift.
- Image quality and asset fidelity: the three selected photographs are used directly with stable object-fit crops. No visible photo, logo or non-standard image asset is replaced with CSS art, a placeholder or a handcrafted SVG.
- Copy and content: the homepage keeps the selected hero, weekly items and campus teaser copy. Study, Life and Opportunities now contain clearly separated first-release content; planned collaborations and unconfirmed placements are explicitly labelled as in preparation.

## Comparison history

### Earlier selected-prototype iterations

- Earlier findings: headline weight was too heavy, lower sections were too tall and course rows had excessive visual weight.
- Fixes: softened headline and row weights, tightened section density and aligned the hero/search rhythm.
- Post-fix evidence: `qa/implementation-desktop-final.png` and the earlier focused comparison files.

### Routed-page iteration

- Earlier findings: the first routed build left the short homepage footer above the viewport bottom; the flex footer border did not span the full page; informational Life cards exposed non-functional action buttons.
- Fixes: made the app shell a full-height column, pinned the footer to the bottom with full width and removed controls that did not yet have a real destination.
- Post-fix evidence: `qa/home-routed-1536-final.jpg`, `qa/comparison-home-routed-final.jpg`, `qa/life-page-1536.jpg` and `qa/opportunities-page-1536-final.jpg`.

## Open questions

- No visual or interaction blocker remains. The Life and Opportunities datasets are intentionally first-release content and should be revised after student testing.
- Photograph reuse is recorded as confirmed by the project owner on 15 August 2026 and is not treated as a release blocker.

## Follow-up polish

- P3: replace hotlinked images with locally optimized approved WebP/AVIF files before a public launch.
- P3: student-test the mobile information density and the wording of the planned-status labels.

final result: passed
