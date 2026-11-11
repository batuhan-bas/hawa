---
version: 1
slug: "popup-html"
primary_target: "popup.html"
related_targets: []
---

# Popup surface brief

Scope: the toolbar popup (popup.html: loading, permission, error, main, settings). Mode: Operate.
Audience and task: a desk worker glancing for two seconds: temperature now, whether rain is coming, the rest of today. The week sits below the first 600px.
Constraints: 360px wide, Chrome caps height at 600px; Meteocons stay; every current feature stays; CSP script-src 'self'; fonts bundled locally.
Memorable moment: the yellow lead row that names the next change, and characters flipping when fresh data lands.

## Direction contract

THESIS: The day's weather read like a station departure board: what changes next, and when. Refuses the weather-app default of big icon, big number and a grid of rounded cards.

OWN-WORLD: The board under a real sky (user brief, 2026-11-12: classic sky blue, warm and sweet colours). Day: sky gradient #2675bb → #1f6fb4 → #1a63a6, brighter behind the temperature; night (location's is_day = 0): navy #24467e → #17325c → #0f2344. White ink; flap cells translucent white (16%) with a navy split; controls sit in a darker navy well. Warmth only on plates: sun #ffd166 for the brand chip and the lead row (lead flaps #f4c04f), peach #ffc9a3 for the NOW chip and the week rule, brown ink #3b2a0a on both. Rain ≥30% as a white chip with navy text. Condensed grotesk in caps with tabular figures; hairline seams; no cards, no shadows. Meteocons sit in the SKY column at row size.

STORY: The visitor reads the temperature, sees in one yellow line whether and when rain arrives, scans the next hours like departures, scrolls for the week, and closes the popup.

FIRST VIEWPORT: Header row: HAWA in yellow left, city centre, local time right. Temperature in large flap cells beside condition, feels-like and high/low. Full-width yellow lead row: next change and its time. Column heads TIME / SKY / TEMP / RAIN, then hour rows. A thin stats strip (humidity, wind, air quality) closes the 600px.

FORM: Split-flap departure board, position 7 of my ordered list, assigned by the roll. seed:9f13d0def3f277f5. Raises: one answer owns the top (vertical feed); hairline seams and tabular figures (dark console); strict cell grid (Crouwel); rank by weight, case and reversal (timetable rack); colour only as state (Ikeda). Signature interaction: characters flip in when data changes, staggered left to right; off under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
