# Changelog

All notable changes to **off.tools** are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/). off.tools versions the single
distributed file `off.tools.html`; each release is marked by a git tag and a
published SHA-256 checksum.

## [Unreleased]

## [0.75] — 2026-06-15

A round of feature work and interaction polish on top of v0.74 — still a single
self-contained, offline-first HTML file with zero egress by default. Highlights: a
Snippet Vault privilege model, a full Home edit mode, a Customize "Tools in the
menu" editor, a unified click/affordance language across the app, and a polished
home hero.

### Snippet Vault
- Snippets now carry a **privilege level** (standard / admin), shown as a
  per-snippet badge and filterable beside the vendor row; admin entries are
  colour-coded (amber). The level is set from the add/edit form and sanitized on
  import.
- **Click-to-copy** in the Vault: a snippet card copies its body on click.
- A cross-tool **Save as snippet** action reveals the Vault form, prefilled.
- **Layout v2** — category boxes (a per-category tray) with drag-reorder
  preserved, including across categories; the grey divider rule dropped.

### Home edit mode
- A full **Home edit mode**: a dedicated hero **Edit** toggle, edit-gated hero
  pencils, and homepage-tile **reorder / remove / add** with last-tile and
  twelve-tile cap guards.
- The edit toggle is now a discrete icon-pill (icon-only, aria-labelled).
- Refreshed default homepage tile set (nine tiles).

### Tools in the menu
- New **Customize → Tools in the menu** editor: grouped per-tool show/hide toggles
  (Home, Customize and Help are locked), with a live nav + homepage rebuild. Hidden
  tools drop out of the sidebar, ⌘K, the homepage grid and the add-a-tile picker.
  The hidden set is sanitized on import and travels with a saved build.
- Customize layout: the Tools editor is collapsible, and the Lock-Confidential
  "How it works" is an inline expandable disclosure.

### Interaction & affordances
- A shared **affordance language** across the app: external surfaces (Link Board
  cards, homepage rail links, the Search-Builder open button) get a left/top
  edge-bar, brand border, a lift and an ↗ glyph; internal surfaces (homepage cards,
  ⌘K tiles, the nav) get a right/bottom edge-bar and lift; copy surfaces get a copy
  glyph and a "Copied" flash with no bar.
- **Click-to-copy** extended across the result/output surfaces — Subnet, Splitter
  and MAC result cells, IP/CIDR cells, the Script and Search output boxes, and the
  dark CLI/Batch box — via one shared helper; the six redundant inner copy buttons
  were removed in favour of the whole cell/box being the copy target.
- The nav item reworked to a single animated right-edge bar (persistent when
  active, wiping in on hover); homepage-card resting border lightened so the hover
  pops; orphaned CSS swept.

### Mobile navigation
- **⌘K is now the mobile tool-menu**: the swipe strip retired in favour of a
  prominent **Tools** trigger and denser touch tiles; the topbar fits small screens
  (ape-head, dot-badge, reachable controls); ⌘K opens keyboard-down on touch;
  Network is listed before Commands.

### Search Builder
- Renamed **LMFGIFY → Search Builder**, and the open-in engine switched from Google
  to **DuckDuckGo** (a privacy default that fits the no-tracker ethos). The
  operators are unchanged and the built query stays copyable into any engine; an
  honest caveat notes DuckDuckGo ignores Google-style `before:`/`after:` ranges.

### Link Board
- A persisted **density toggle** (Comfortable | Compact) beside the filter pills.
  Compact tightens the grid to roughly three columns showing icon + title + host +
  reach-dot. It is a pure view preference — it survives reload and Save-as-HTML but
  deliberately does **not** mark the build Customized.
- Page-level action buttons (the Board "Check links", Timer presets, homepage
  quick-start timers) brought onto the solid brand fill.

### Network Sketch
- Trimmed the firewall palette to a single **Firewall** stamp (default-selected),
  dropping two redundant stamps. (The sketch remains session-only — nothing is
  persisted.)

### Text, FAQ & provenance
- User-facing copy reconciled against the README. Lock-Confidential de-duplicated
  (the FAQ entry is now canonical; the inline disclosure is a contextual summary).
  New FAQ entries (the Link Board density toggle; hiding tools via Customize) and an
  expanded ⌘K entry. A plain-text, non-hyperlinked footer **provenance** line, and
  an *off.tools on GitHub* default Link Board entry (Reference category; off the
  home rail).

### Home & Hero
- The hero now matches the tool-page header family: the title sits flush-left like
  a tool `<h1>`, with a clear **title → teal subtitle lead → body** hierarchy and
  copy tightened to the README voice. The old "Offline by default" pill was removed
  (its message now lives in the subtitle and body); the cleartext-on-save warning
  is kept. Footer provenance simplified — the repository path sits on its own plain
  line directly under the version.

### Verified
- `node verify.js off.tools.html` — all checks green: app script parses, all six
  JSON islands parse, 272 `$('id')` lookups resolve, exactly one footer version
  string (`v0.75`), PERSISTENCE 1/4–4/4 and OFFLINE BOUNDARY markers present, and
  the `<div` open/close balance unchanged (the documented −1 delta holds).
- Node simulations across the rounds: Vault reorder preserves flat-vs-boxed
  ordering (6 scenarios); the Link Board `linkView` persistence round-trips
  (Save → reload keeps Compact; Discard resets); config sanitizer allowlist holds.
- Maintainer device pass on desktop and iPhone/Safari over each round: Vault levels
  and layout, Home edit mode and tile reorder, Tools-in-the-menu show/hide, the
  click-to-copy and affordance surfaces, the mobile ⌘K tool-menu, Link Board
  density, and the home hero + footer.

## [0.74] — 2026-06-13

First tagged release of the v0.74 line — a round of feature work and polish on
top of v0.73, still a single self-contained offline-first HTML file with zero
egress by default.

### World Clocks
- Add-a-zone autocomplete now surfaces ~100 major cities (a baked city→zone
  alias map) alongside the raw IANA names, and typing a bare city such as
  "Mumbai" resolves to its zone when you press Add.
- Each zone row shows the cities it represents (per-zone "sites"), seeded for
  all 18 default zones.
- A pinned **This device** row shows the browser's own time zone — session-only,
  never saved — and is suppressed when an HQ row already covers that zone.
- Selected rows and the HQ row stay visible while a search filter is active.

### Link Board
- New per-link **Show on the homepage rail** control (checkbox in the link
  editor): hide a link from the homepage rail while it still appears on the
  Board. A missing or true flag means shown, so existing saved files keep their
  rail. Links hidden from the rail get a small muted off-rail marker on their
  Board card.
- Added **Check Point Support** to the vendor-docs examples.
- Grouped the **Intranet Portal** and **Password Vault** examples under a single
  *Intranet* category.

### Home & Hero
- The headline is now two editable, formatted parts — a **tagline** and an
  optional **headline** — replacing the old label-based greeting. Both support
  `**bold**`, are edited from a single inline pencil, and travel with a saved
  build. By default the tagline shows with an empty headline, so a
  customized-but-unedited build matches the public face (the CUSTOMIZED badge
  stays the only signal).
- Rewritten default hero copy with a public-first framing ("…and you're looking
  at all of it right now").
- After an opt-in link check ends, the homepage rail's link text and favicons
  stay full-opacity — only the reachability dots dim.

### Time Calculator
- Two-column desktop layout (time spans and results side by side, with the
  explainer full-width below), stacking to one column on narrow screens.

### App-wide polish
- Reusable clear-X (×) button on the six search fields (Link Board, CLI,
  Phrases, World Clocks, Snippet Vault, FAQ) and on the IP-Checker and
  Subnet-membership inputs.
- `.field-row` forms (Subnet, Split, IP-Checker and others) stack to a single
  column on narrow screens, with the action button full-width.
- A little more bottom padding on inputs and textareas so text isn't cramped.
- Subnet Splitter result cards are more compact, with the broadcast on its own
  line instead of wrapping orphaned after the range.
- Snippet Vault cards: a bigger copy button, and the send-to-Script-Commander
  button is now visible in normal view (no longer edit-mode only).
- The hidden sidebar easter-egg rainbow is a touch bolder.

### Verified
- `node verify.js off.tools.html` — all checks green: app script parses, all six
  JSON islands parse, 268 `$('id')` lookups resolve, exactly one footer version
  string (`v0.74`), PERSISTENCE 1/4–4/4 and OFFLINE BOUNDARY markers present,
  `<div` balance unchanged.
- Backward-compat Node simulation — 15/15 assertions: a config missing the new
  `home.tagline` / `home.headline` / per-link `onHome` fields still applies
  correctly (defaults kept, homepage rail intact); an explicit `onHome:false`
  round-trips through import/export.
- Maintainer device pass on desktop and iPhone/Safari: hero headline editor,
  bake-and-reopen persistence round-trip (hero text + per-link onHome survive a
  saved build), Link Board rail flag + Board marker, Subnet Splitter cards,
  Snippet Vault buttons, input padding, and clocks rendering.

[Unreleased]: https://github.com/inkbink/off.tools/compare/v0.75...HEAD
[0.75]: https://github.com/inkbink/off.tools/releases/tag/v0.75
[0.74]: https://github.com/inkbink/off.tools/releases/tag/v0.74
