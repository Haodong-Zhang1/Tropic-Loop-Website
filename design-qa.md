# Tropic Loop community, career and author design QA

## Comparison target

- Source visual truth: `design/selected-homepage.png` — the user-selected Tropic Loop desktop visual system.
- Primary implementation screenshot: `qa/community-desktop.png`.
- Supporting implementation screenshots: `qa/career-desktop.png`, `qa/about-desktop.png`, `qa/community-mobile-390.png`, and `qa/career-mobile-390.png`.
- Source pixels: 1536 × 1024.
- Desktop implementation pixels: 1536 × 1024.
- Mobile implementation pixels: 390 × 844.
- Desktop CSS viewport: 1536 × 1024; device scale factor 1.
- Mobile CSS viewport: 390 × 844; device scale factor 1.
- Density normalization: none required; source and desktop implementation use the same pixel and CSS dimensions.
- State: Chinese, Cairns selected. Community is shown on the Second-hand tab; Career and About are shown in their default states.
- Comparison scope: the source is the selected homepage rather than a page-specific mock for the three new routes. The comparison therefore checks faithful extension of the existing navigation, typography, image treatment, spacing rhythm, colors and component language rather than identical page content.
- Full-view evidence: `design/selected-homepage.png` and the final `qa/community-desktop.png` were opened together in one multi-image comparison input after the final density fix.
- Focused evidence: no separate crop was needed because the 1536 × 1024 captures keep the navigation, hero typography, image crop, tabs, notice and listing-card details readable. The form state was separately inspected in the browser DOM.

## Primary interactions tested

- Opened all three new routes from the desktop navigation: Community, Career and About.
- Switched Community between Second-hand and Bring one thing.
- Opened and closed the posting form.
- Filled the errand title and description and confirmed a commission below AUD 1 is rejected by the numeric control.
- Confirmed image upload accepts image files and the UI states the 1.2 MB limit.
- Confirmed the Career page contains JCU CareerHub, Fair Work Ombudsman and the planned no-payment state.
- Confirmed the About page contains only Haodong Zhang as the current author and opens the project GitHub link.
- Opened the mobile menu at 390 px, confirmed all seven product areas are present, and navigated from Community to Career.
- Checked browser logs: no errors or warnings; only Vite development messages and the React DevTools information notice.

## Findings

No actionable P0, P1 or P2 finding remains.

- Fonts and typography: the implementation retains the selected Avenir Next / PingFang SC stack, regular display weight, compact green eyebrow labels and restrained small-copy hierarchy. The About headline was reduced from a 78 px maximum to 68 px so the final Chinese character no longer forms an orphan line.
- Spacing and layout rhythm: the 64 px desktop gutters, split hero, rounded image edge, fine divider rhythm, compact pill controls and 16–18 px card radii match the established system. The Community grid now fills three columns instead of leaving an unbalanced blank region.
- Colors and visual tokens: warm paper, white surfaces, tropical green, pale green information panels, lime active indicators and quiet grey borders remain consistent with the selected source.
- Image quality and assets: Community and Career reuse official JCU photography already present in the product, with the same source link affordance and responsive crop. Standard UI symbols use Phosphor icons; no placeholder image, custom SVG, CSS drawing or emoji asset was introduced.
- Copy and content: example community posts are explicitly labelled as samples; the device-only storage boundary, minimum commission, payment boundary, safety rules and future paid-content state are stated without implying that a public marketplace or payment system already exists.
- Responsiveness and accessibility: the 390 × 844 capture has no horizontal clipping, the mobile menu closes after navigation, tabs use `role=tab` and `aria-selected`, form fields have visible labels, focus styles are retained, and primary controls remain practical tap targets.

## Comparison history

- Pass 1 — P2: the Community desktop state showed only one sample card, creating a large empty region unlike the balanced density of the selected source. Fix: added clearly labelled sample entries so the default desktop grid presents three cards. Post-fix evidence: `qa/community-desktop.png` in the final multi-image comparison.
- Pass 1 — P2: the About desktop headline wrapped its last Chinese character onto a separate line. Fix: reduced the display maximum from 78 px to 68 px. Post-fix evidence: `qa/about-desktop.png`.
- Pass 2: the final source-versus-Community comparison and the revised About capture contain no remaining actionable P0/P1/P2 issue.

## Follow-up polish

- P3: replace sample marketplace cards with real student posts once moderation and shared storage are implemented.
- P3: add an author portrait only if Haodong Zhang supplies one; the current monogram intentionally avoids inventing a photo.

final result: passed
