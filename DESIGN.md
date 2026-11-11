---
name: Hawa
description: The day's weather read like a departure board set against a clear sky.
colors:
  sky-top: "#2675bb"
  sky: "#1f6fb4"
  sky-bottom: "#1a63a6"
  night-sky-top: "#24467e"
  night-sky: "#17325c"
  night-sky-bottom: "#0f2344"
  cell: "rgba(255, 255, 255, 0.16)"
  cell-split: "rgba(6, 40, 82, 0.35)"
  well: "rgba(4, 30, 64, 0.34)"
  seam: "rgba(255, 255, 255, 0.2)"
  ink: "#ffffff"
  ink-2: "#eaf4fc"
  ink-3: "#e4f1fb"
  ink-on-warm: "#3b2a0a"
  solari: "#ffd166"
  solari-cell: "#f4c04f"
  solari-hover: "#ffdb85"
  peach: "#ffc9a3"
  rain-chip: "rgba(255, 255, 255, 0.92)"
  rain-chip-ink: "#17518f"
  rain-chip-ink-night: "#17325c"
  alert: "#ffd2c4"
  aqi-1: "#50f0e6"
  aqi-2: "#50ccaa"
  aqi-3: "#f0e641"
  aqi-4: "#ff5050"
  aqi-5: "#c2185b"
  aqi-6: "#9c27b0"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "66px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0"
    fontFeature: "tnum"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    letterSpacing: "0.08em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.06em"
  lead:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.1em"
  row:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    letterSpacing: "0.06em"
    fontFeature: "tnum"
  body:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.04em"
  head:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    letterSpacing: "0.12em"
  sub:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    letterSpacing: "0.08em"
  hint:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    letterSpacing: "0.03em"
  detail:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "13px"
    fontWeight: 500
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.16em"
  label-strip:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.16em"
rounded:
  mark: "1px"
  cell: "2px"
  scrollbar: "3px"
spacing:
  hairline: "1px"
  flap-gap: "2px"
  pad: "14px"
  section: "18px"
  notice: "28px"
  row: "34px"
components:
  flap-cell:
    backgroundColor: "{colors.cell}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cell}"
  flap-cell-big:
    backgroundColor: "{colors.cell}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.cell}"
    padding: "2px 2px 0"
    width: "46px"
  lead-plate:
    backgroundColor: "{colors.solari}"
    textColor: "{colors.ink-on-warm}"
    typography: "{typography.lead}"
    rounded: "{rounded.cell}"
    padding: "0 10px"
    height: "38px"
  lead-cell:
    backgroundColor: "{colors.solari-cell}"
    textColor: "{colors.ink-on-warm}"
    rounded: "{rounded.cell}"
    padding: "0 1px"
  brand-chip:
    backgroundColor: "{colors.solari}"
    textColor: "{colors.ink-on-warm}"
    typography: "{typography.head}"
    rounded: "{rounded.cell}"
    padding: "1px 6px"
  now-chip:
    backgroundColor: "{colors.peach}"
    textColor: "{colors.ink-on-warm}"
    typography: "{typography.row}"
    rounded: "{rounded.cell}"
    padding: "0 6px"
  rain-chip:
    backgroundColor: "{colors.rain-chip}"
    textColor: "{colors.rain-chip-ink}"
    typography: "{typography.row}"
    rounded: "{rounded.cell}"
    padding: "0 5px"
  rain-chip-night:
    textColor: "{colors.rain-chip-ink-night}"
  board-row:
    textColor: "{colors.ink}"
    typography: "{typography.row}"
    height: "{spacing.row}"
  button-primary:
    backgroundColor: "{colors.solari}"
    textColor: "{colors.ink-on-warm}"
    rounded: "{rounded.cell}"
    padding: "0 16px"
    height: "38px"
  button-primary-hover:
    backgroundColor: "{colors.solari-hover}"
  button-quiet:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cell}"
    padding: "0 12px"
    height: "30px"
  button-quiet-hover:
    backgroundColor: "{colors.seam}"
  segment:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.cell}"
    height: "36px"
  segment-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sky-bottom}"
  input-city:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.cell}"
    padding: "0 10px"
    height: "38px"
  stats-strip:
    backgroundColor: "{colors.sky-bottom}"
    textColor: "{colors.ink}"
    padding: "8px 0 9px"
  toolbar-badge:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.ink}"
---

# Design System: Hawa

## Overview

**Creative North Star: "The Departure Board"**

Hawa reads the day's weather the way a station board reads departures: what changes next, and when. The board is set against the sky of the place it reports on. By day the ground is a classic sky blue, brighter at the top where the big temperature sits and deeper under the rows. By night (when the location's `is_day` is 0) it turns deep navy. On that ground sit translucent split-flap cells, hairline-seamed rows, and white condensed caps with tabular figures. Rank comes from size, weight, case and a few small warm plates, never from cards.

Density is high and calm. Everything sits on one 14px gutter inside a 360px column, and rows are uniform 34px timetable lines. The text itself is all near-white, so hierarchy comes from weight and size rather than from dimming. Warmth (sun yellow and peach) appears only as plates with dark warm ink: the brand chip, the lead row, the NOW chip, and the primary button. Meteocons, the product's bundled icon set, sit in the SKY column at row size.

Motion belongs to the flaps. When fresh data lands, only the characters that changed flip in, one after another from left to right. When nothing changed, the board stays still.

**Key Characteristics:**
- A sky-blue ground by day and a navy ground by night, following the location's own daylight
- Translucent white flap cells split by a navy hairline; white caps with tabular figures
- Warm colour only as plates with dark warm ink; never as text on the sky
- Hairline seams between rows; no cards, no shadows; the ground is the only gradient
- Rain at 30% or more is a white chip with blue ink
- Only changed characters flip, staggered left to right; still under reduced motion

## Colors

Sky blues for the ground, near-white for all text, and sweet warm plates for the few things that matter.

### Primary
- **Sun Yellow** (solari): The warm plate. It fills the brand chip (HAWA, or SETTINGS on the settings screen), the lead row, the primary button and text selection. Text on it is always warm ink.
- **Sun Cell** (solari-cell): One shade under the plate. It is used only for the character cells inside the lead row, so the flaps read on the yellow without a seam.
- **Lit Sun** (solari-hover): Hover state of the primary button only.

### Secondary
- **Peach** (peach): The second warm plate. It fills the NOW chip in the first hour row and draws the 1px underline under the WEEK title.

### Tertiary
- **Rain Chip** (rain-chip, with rain-chip-ink by day and rain-chip-ink-night by night): State only. A rain chance of 30% or more becomes a near-opaque white chip with blue ink. Below 30%, the figure stays plain tertiary ink.
- **Alert Blush** (alert): State only. It is the text colour of the error notice line ("DELAYED").

### Neutral
- **Sky Top / Sky / Sky Bottom** (sky-top, sky, sky-bottom): The day ground, a vertical gradient fixed to the viewport that reaches the mid sky at 180px. Sky Bottom also fills the sticky strip and the city results dropdown, and is the text colour of the active segment. The toolbar badge uses Sky with white text.
- **Night Sky Top / Night Sky / Night Sky Bottom** (night-sky-top, night-sky, night-sky-bottom): The same three stops at night.
- **Flap Cell** (cell): Translucent white for character cells, idle cells, icon-button hover and result-row hover.
- **Split Hairline** (cell-split): The 1px navy line across the middle of each flap cell.
- **Well** (well): A translucent navy sink for controls the user writes to or switches: inputs, quiet buttons and segments. It keeps their white text readable on the bright sky.
- **Seam** (seam): 1px translucent white rules between rows, under the header, around inputs and results, and between strip columns. Also the quiet-button hover fill and the scrollbar thumb.
- **White Ink** (ink): Primary characters, the active segment fill, focus outlines, the caret and the input focus border.
- **Ink 2 / Ink 3** (ink-2, ink-3): Near-white tints for secondary text in the rows (sky words, lows); text at the top of the sky (clock, feels-like line, notice text) is pure white. Ink 3 carries tertiary text (labels, column heads, dry rain figures, hints, credits). They differ from white only slightly; the role difference is carried by weight and size.
- **Warm Ink** (ink-on-warm): Text on the sun and peach plates.

**AQI data scale (aqi-1 to aqi-6).** The European AQI band colours appear only on the 8px air-quality square beside the AIR value. They are data colours, not part of the palette, and are never used anywhere else.

### Named Rules
**The Warm Plate Rule.** Warm colours appear only as plate fills carrying warm ink: brand chip, lead row, NOW chip, primary button. The single exception is the WEEK underline in peach. Never set warm-coloured text on the sky.

**The State-Only Rule.** The rain chip appears only at a 30% chance or more, and alert blush appears only on an app error. A dry hour and a working app show neither.

**The Readable Sky Rule.** Text must reach 4.5:1 against the sky at its own position (3:1 for text at 24px, or 18.66px bold, and up), measured on the brightest stop it can sit on. The top of the day gradient is the bright end. Darken the ground or use a well there; never accept a lower ratio.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow, sans-serif), self-hosted at 500, 600 and 700, latin and latin-ext
**Body Font:** the same family; one face carries the whole board

**Character:** A condensed grotesk in caps, tracked open like painted station lettering, with tabular figures throughout so columns of times and temperatures line up.

### Hierarchy
- **Display** (700, 66px, line-height 1, no tracking): The current temperature, one character per big flap cell (46px wide, degree cell 30px).
- **Headline** (700, 30px, 0.08em, caps): The single line on a notice screen.
- **Title** (700, 20px, 0.06em, caps): The current condition beside the temperature. The settings location name uses the same size at 600.
- **Lead** (700, 19px, 0.1em, caps): The lead plate's flap characters.
- **Row** (600, 18px, 0.06em, caps): Hour and day rows. The sky word in a row drops to 500, 16px, ink-2.
- **Body** (500, 17px, 1.3, 0.04em, sentence case): Notice explanations, input text, city result names (in caps), and strip values.
- **Head** (600, 16px, 0.12em, caps): The header row, with the brand chip at 700. Buttons (700) and segments use the same 16px; the quiet button drops to 14px.
- **Sub** (500, 15px, 0.08em, caps): The feels-like and high/low line; its values are white at 600.
- **Hint** (500, 14px, 0.03em, sentence case): Setting hints. The "searching" status uses 14px caps at 0.1em.
- **Detail** (500, 13px): The country and region line under a city result.
- **Label** (600, 12px, 0.16em, caps): Column heads, setting labels and field labels. Credits are also 12px, at 500 in sentence case.
- **Strip Label** (600, 11px, 0.16em, caps): Stats-strip labels.

### Named Rules
**The Caps Board Rule.** Everything on the board is set in caps: labels, values, rows and buttons. Only full sentences (notice text, hints, credits, city detail lines) stay in sentence case.

**The Weight-Not-Dimming Rule.** Every ink is near-white, so a secondary role steps down in weight (700 to 600 to 500) and size, never into a grey.

**The Tabular Rule.** Figures are tabular everywhere (`font-variant-numeric: tabular-nums` on the body). Numeric columns are right-aligned.

**The Local Casing Rule.** Place names take `lang="tr"` or `lang="az"` only when the name contains a Turkish- or Azeri-specific letter. That way CSS uppercasing maps i to İ correctly, and English exonyms such as "Izmir" stay IZMIR.

## Layout

The popup is a single 360px column; Chrome caps it at 600px tall, and the content scrolls under that cap. Every block hangs off one 14px gutter. The main screen runs in this order:
- a 44px header row (brand chip, centred city, local time, settings icon)
- the now block (big flap temperature beside the condition, feels-like and high/low)
- the full-width lead plate
- the 24-hour board
- a WEEK board
- credits

Boards are strict column grids. Hour rows use TIME / SKY / TEMP / RAIN (64px, flexible, 48px, 44px). Day rows use DAY / SKY / RAIN / LOW / HIGH (52px, flexible, 44px, 40px, 40px). Every row is 34px with a 1px seam on top. The stats strip is a four-column grid split by vertical seams. It sticks to the bottom of the viewport on sky-bottom, so it closes the first 600px and the rows scroll beneath it.

Notice screens (loading, permission, error) are a vertical stack with 12px gaps and 28px top padding. Settings is a stack of sections, each with 14px above and below and a seam between them.

## Elevation & Depth

There are no shadows. Depth comes from translucency against the sky: cells lift (white at 16%), wells sink (navy at 34%), and seams are white at 20%. The ground is the only gradient; it is fixed to the viewport, so it stays put while the content scrolls. The sticky strip and the results dropdown are filled with sky-bottom, so content passes under them cleanly.

### Named Rules
**The Sky Ground Rule.** The only gradient is the page ground: a vertical sky, by day or by night. Components are flat translucent fills or opaque plates, with no shadows, glows or gradients of their own.

## Shapes

Shapes are rectangles with barely softened corners: 2px on flap cells, plates, chips, buttons, segments, inputs and icon buttons. Lines are 1px hairlines: seams, the split across each flap, input outlines and the WEEK underline. Flap cells sit 2px apart (1px inside the lead row). The exceptions are the AQI square (8px, 1px radius) and the 6px scrollbar thumb (3px radius).

## Components

### Flap Cells (signature)
A word or number set one character per cell. Each cell is translucent white with a 2px radius, a minimum width of 0.62em, and a 1px navy split line across the middle. Spaces are transparent cells with no split. The big temperature cells are 46px wide, 30px for the degree sign.
- **Flip motion:** When a re-render changes a cell's character, the cell flips in: `rotateX(90deg)` to `-8deg` to `0`, brightened 1.6× at the start. The flip takes 360ms on `cubic-bezier(0.22, 1, 0.36, 1)`, delayed `index × 45ms`. Unchanged cells don't move, and nothing flips on first paint.
- **Idle state:** While loading, six blank 30×46px cells pulse in brightness in turn (1.4s cycle, 0.1s stagger).
- **Reduced motion:** Both the flips and the idle pulse are off under `prefers-reduced-motion: reduce`.

### Lead Plate (signature)
The full-width sun plate, 38px tall with a 2px radius and 10px of padding. It names the next change on the left and when it comes on the right. Its characters are 19px warm-ink caps on sun-cell flaps set 1px apart, with **no split hairline**: at this size a line through the letters reads as a strikethrough. Spaces are 0.35em gaps.

### Board Rows
34px timetable lines in caps, each with a 1px seam on top. In the first hour row, NOW sits on a peach chip and shows the current reading. The SKY column holds a 26px Meteocon and a short ink-2 word that truncates with an ellipsis. Temperatures and rain figures are right-aligned and tabular. A rain chance of 30% or more becomes the white rain chip; lows are in ink-2.

### Buttons
- **Shape:** 2px radius, no border, caps, weight 700, 0.12em tracking.
- **Primary:** A sun fill with warm ink, 38px tall with 16px side padding, aligned to the start of its row. Hover uses the lit sun. Use at most one per screen.
- **Quiet:** A well fill with white text, 30px tall with 12px side padding, at 14px. Hover fills with seam.
- **Icon button:** A 32px square with no fill, holding an ink-2 16px stroked SVG (2px stroke, round caps). Hover fills with the cell colour and turns the icon white.
- **Focus:** A 2px white outline at a 2px offset on every focusable element.

### Segmented Control
A two-column grid of 36px well segments, 2px apart, with 16px ink-2 caps at 0.1em. The active segment reverses to a white fill with sky-bottom text at weight 700. Hovering an inactive segment turns its text white.

### Inputs / Fields
- **Style:** A 38px well field with a 1px seam border, 2px radius, 17px weight-500 text, a white caret, and ink-3 placeholder text.
- **Focus:** The border turns white.
- **Results:** A sky-bottom dropdown that shares the field's border, with no top edge. Rows are split by seams and take the cell fill on hover or focus. The name is in 17px caps; the detail line is 13px ink-3.

### Stats Strip
A sticky bottom status line on sky-bottom, with a seam on top and four columns split by vertical seams. Each column has an 11px ink-3 label over a 17px caps value. The AIR value carries the AQI band square.

### Header Row
A 44px row with a seam underneath, set in 16px caps at 0.12em. It holds the brand chip, the city (centred, truncated with an ellipsis), the local time in ink-2, and a closing icon button.

### Toolbar Badge
The temperature on the extension icon: white text on the day sky blue.

## Do's and Don'ts

### Do:
- **Do** set the ground from the location's own daylight: the day sky while the sun is up there, the night navy after.
- **Do** set changing values (temperature, lead text) as flap cells, and flip only the characters that changed, staggered 45ms from left to right.
- **Do** turn every flip and idle pulse off under `prefers-reduced-motion: reduce`.
- **Do** put inputs, quiet buttons and segments in a well so their text holds contrast on the bright sky.
- **Do** separate rows and regions with 1px seams, and keep rows at 34px on the 14px gutter.
- **Do** step secondary text down by weight and size, since all inks are near-white.
- **Do** use tabular figures and right-align numeric columns.

### Don't:
- **Don't** set yellow or peach as text on the sky; warm colour is a plate with warm ink.
- **Don't** group content in cards, panels or rounded containers; cells hold characters and controls, never sections.
- **Don't** add box shadows or glows, or give a component its own gradient.
- **Don't** show the rain chip below a 30% chance, or alert blush outside an app error.
- **Don't** draw the split hairline across characters at lead-row size on a plate; at that size it reads as a strikethrough.
- **Don't** replace the Meteocons with another icon set or with glyph characters.
- **Don't** flip characters that did not change, and don't animate on first paint.
