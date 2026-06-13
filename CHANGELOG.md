# Changelog

All notable changes to **off.tools** are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/). off.tools versions the single
distributed file `off.tools.html`; each release is marked by a git tag and a
published SHA-256 checksum.

## [Unreleased]

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

[Unreleased]: https://github.com/inkbink/off.tools/compare/v0.74...HEAD
[0.74]: https://github.com/inkbink/off.tools/releases/tag/v0.74
