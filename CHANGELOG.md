# off.tools — Changelog

A single self-contained, offline-first HTML toolbox for network/sysadmin work.
This file lives in the project folder for tracking only; it is **not** part of
the distributed HTML. Newest versions first. The footer reads
`vX.YY · offline-first toolbox` and the filename is `off_XX.html` — keep them in sync.

## [Unreleased]
- **Next — GitHub setup (live walkthrough):** create/recover account → public repo →
  add the prepped `LICENSE` + README → upload `off.tools.html` + `.sha256` → optional
  GitHub Pages for free-HTTPS hosting. The `LICENSE` and repo README ship with v0.72.
- **Off-file (hosting) work:** static one-page site at `off.tools` (no cookies /
  trackers) with a download button → `off.tools/off.tools.html`; later a
  `voestalpine.off.tools` subdomain serving a hard-baked `voestalpine.off.tools.html`
  (build B) with its **own** published hash, distributed over an internal channel.
- **Build B (pre-baked edition build):** deferred until a real config exists. A
  (verified tool + importable config JSON, shipped separately) is the starting model
  and needs no new code.
- **Design-polish pass (pre-1.0, vanilla-only):** typography scale, CSS-only motion,
  per-tool micro-visualizations, refined tokens. Scope before touching.
- **Rejected:** in-file self-integrity check — a file can't verify itself; integrity
  stays in the distribution layer (published SHA-256). Not security.
- **Link Board ideas (parked):** command-palette launch of a link, a post-check
  "N of M responded" summary, optional ⭐ pin-to-top.
- Note: `$('cmdkKbd')` is a single intentional unresolved id (guarded no-op) — the
  keyboard-hint element was removed; the reference is harmless. Not a bug.

## [0.72] — identity & distribution finalize
Tidies the footer credit, adds a provenance cue, and ships the files needed to put
off.tools on GitHub. No behavior changes.
### Changed
- **Footer credit** simplified to `© 2026 Thomas Kienbink · MIT` (from "Made by … ·
  built with Claude AI · MIT-licensed"). The Claude credit moves to the source-header
  comment (and stays in the README + the Help/About FAQ).
- **Provenance line** added under the footer credit: a non-clickable, no-network
  `Canonical source: off.tools` — a cue that the verified original lives at off.tools.
### Added
- **`LICENSE`** file (MIT, `Copyright (c) 2026 Thomas Kienbink`) for the repo — matches
  the in-file header comment. README's License section now points to it and notes there
  is no build step.
### Verified
- `node --check` passes; six islands parse; ids clean (only `cmdkKbd`); footer 0.72, no
  stray 0.71; no unescaped `</script>`.
- This build's hash: `e8f719b0b0ec5d5eb79525122f292537493e564ac0e7cc7359f6f383dc36e130`
- **Not browser-verified:** the footer's two-line credit/source spacing reads cleanly.
- Note: the MIT **header** copyright already read the real name — unchanged.

## [0.71] — fix: stale check results now persist (dimmed) everywhere
Bug fix for v0.70. After a check ends, the last results should stay visible at ~50 %
until the next check or a reload — they did on the Link Board favicons but vanished on
the home sidebar, and all the reachability dots reset to grey.
### Fixed
- **The `stale` JS flag was never set.** `endCheck()` added the `body.stale` CSS class
  but not the `stale` variable, so the render gating `(online||stale)` collapsed to
  `online`. On re-render the **home sidebar favicons disappeared** and **all dots reset
  to grey** (Link Board favicons only survived because `favInner()` doesn't check the
  flag). `endCheck()` now sets `stale=true`; `setOnline(true)` clears it.
- **Cached reach colors persist on re-render.** `favTile()` and `renderHomeLinks()`
  gated the dot color (and the home dot's existence) on `online` alone, so a rebuild
  dropped the green/red/grey state. Both now use `(online||stale)` and read the cached
  `reachState`. With `body.stale` set, favicons + dots render at **50 %** on both the
  Link Board and the home sidebar, as intended.
### Verified
- `node --check` passes; six islands parse; ids clean (only `cmdkKbd`); footer 0.71, no
  stray 0.70; no unescaped `</script>`.
- Render gating simulated for live / stale / fresh-offline / stale-bad: stale now yields
  favicon + colored dot on both Link Board and home (dimmed via CSS); fresh offline
  yields mono/globe and no dot. Correct.
- This build's hash: `4664b70325172433e943633987d751f02f4033401ea862b0d829358cc5d51087`
- **Not browser-verified:** that the 50 % dim reads well on both surfaces — quick look.

## [0.70] — "Check links" reachability rework + badge animations
Reframes the former "online mode" as a one-off **link check** (replacing v0.69's
1/2/3-min calm-down choreography) and animates the header badge's state changes.
Builds on v0.69's filename + transparency work.
### Changed
- **"Online mode" → "Check links" (a one-off check, not a mode).** Clicking the header
  badge runs a check and shows a live state (green dot + **white** logo glow) for
  **~30 s**, then auto-returns to offline; the last results stay on the tiles **dimmed
  to ~50 %** (`body.stale`) to show they're a snapshot, until the next check or a
  reload. A re-click (badge or the in-page buttons) runs a fresh check and resets the
  30 s. Network behavior unchanged: contact only on a check, no background polling.
- **Badge animations.** Hover (offline/stale) **crossfades** `●Offline` → `Check links`
  (overlaid, opacity, fixed width so nothing shifts); going live **pops** the green dot
  in (`@keyframes otDotPop`) while the badge background/border transition to green; the
  switch back transitions green→default and the logo glow fades out. Replaces the
  previous instant `display` swaps.
- **Removed the old online treatment:** the `off.tools`→`on.tools` wordmark swap and
  `document.title` change (incl. the timer module's restore), the green **fill** on the
  word/ape, and the **header green accent** entirely. The bar stays blue; the wordmark
  stays `off.tools`. Kept only the glow, now neutral white.
- **Banner:** shows only the **first** check of a session (gated like the confirm
  modal), reworded, dismiss-on-click.
- **Renames + wording sweep:** "Check reachability" → **Check links** (Link Board +
  home buttons, with tooltips). "Online mode" retired as a feature name across the
  confirm modal, banner, FAQ (section → "Checking your links"), footer column, footer
  privacy line, home hero (static + default), and README. Badge keeps Offline/Online as
  status words; internal identifiers (`online`, `setOnline`, `onlineToggle`, …) unchanged.
### Decisions recorded
- The reachability feature is a **check, not a mode** — no persistent "online" state,
  no off↔on wordplay. The 1/2/3-min calm-down choreography (v0.69) was dropped.
### Verified
- App script `node --check` passes; all six JSON islands parse (links 17, phrases 2
  langs, snippets 45, clocks 18, oui 21, offConfig 1); id cross-check clean — only the
  known `cmdkKbd` is unresolved; `onlineOff` gone; footer at 0.70, no stray 0.69; no
  unescaped `</script>`; no `online mode`/`on.tools` left in user-facing text; the old
  `ob-dim`/`obSchedule`/`onlineBannerTimer` machinery fully removed.
- Logic simulated on a mock clock: first check → live + banner + 1 probe-run; re-check
  at 15 s → still live, banner suppressed, 2nd run, 30 s reset (fires at 45 s, not 30 s);
  at 45 s → offline + `body.stale`; stale persists at 120 s; a check from stale →
  live + stale cleared, banner stays suppressed.
- This build's hash: `a08388afacf3a1c30eb83e999e26bb8b46efb6239f51b3304e3c9c5e639b6155`
- **Not browser-verified (reasoned from code):** the hover **crossfade** + dot **pop**
  timing; the badge fixed-width fit of "Check links"; the 30 s white glow; the ~50 %
  stale dimming of dots/favicons; the dismiss-on-click banner. **Visual pass recommended.**

## [0.69] — file identity + online-mode calm-down + transparency
Settles the distributed file identity, makes online mode quieter over time, and states
the tech stack + "it's a template" where it was missing. *(The calm-down choreography
below was superseded by the "Check links" model in v0.70.)*
### Changed
- **Saved-file naming → `<label>.off.tools.html`.** `offFileName()` produces a
  dot-separated name (`voestalpine.off.tools.html`; `custom.off.tools.html` with no
  label) so a personalized save is always distinguished from the canonical
  `off.tools.html`. Echoes a future `voestalpine.off.tools` subdomain; no version in
  the name (it lives in the footer + this changelog).
- **Online mode calm-down (superseded in v0.70):** reminder line hid after 1 min; the
  header green accent faded after 2 min; the mode auto-returned to offline after 3 min;
  a manual check restarted the clock.
- **Transparency:** home hero + a new FAQ entry name the stack (vanilla HTML/CSS/JS,
  SVG, Canvas, embedded JSON islands; no framework/build/deps/CDN/storage) and explain
  the file is a customizable template; same note in the source-header comment + README.
### Decisions recorded
- File identity is **off.tools.html** (brand `off.tools` stays in logo/footer);
  canonical lives at `off.tools/off.tools.html`. The on/bnk rebrand stays closed.
- "Corporate" generalized to any **build label**; single `cfgLabel` field, no new field.
### Verified
- `node --check` passed; six islands parsed; only `cmdkKbd` unresolved; footer 0.69.
- This build's hash: `1dd4775b4ec5dcff4cbfdacd3c246ee5f493c30486bde8a1ef51db872af71997`

## [0.68] — security hardening + FAQ polish
Hardening pass following a threat-model discussion (manipulated config files;
manipulated copies of the file itself), plus a small visual consistency fix.
### Added
- **Import count-caps (anti-DoS):** `applyConfig` now caps the number of imported
  entries (links/snippets 2000, phrases 2000 per language, clocks 1000, vendors 200)
  via a new `IMPORT_CAP` constant. Generous bounds never hit in real use, but a
  maliciously huge config can no longer freeze the tab. Per-field length limits
  (tags, region, etc.) were already in place.
- **Tamper-verification workflow:** each release now ships a SHA-256 checksum
  (`off.tools.html.sha256`) and the README gained a **"Verify the file is genuine"**
  section (`sha256sum` / `shasum` / `certutil`, compare to the hash published on
  off.tools). This is the only effective answer to *manipulated copies* — a file
  cannot guarantee its own integrity, so integrity is established by the distribution
  channel, not from inside the HTML.
  - This build's hash: `838bf55b3e86060853cab79ad25a6df4ac4f294766f5b392fdbc01ce96fa0378`
### Changed
- **FAQ boxes** now use the same light-blue "explainer" look as the *How it works* /
  *How it adds up* info boxes (tinted gradient, left brand accent, brand-deep titles,
  brand chevron, white inline-code chips) — visually consistent, since both explain
  and inform.
### Security audit (no code change needed)
- **Manipulated config files — well defended.** Config is treated as untrusted data
  and sanitized field-by-field on import: strings → `esc()` before any DOM insertion;
  URLs → `safeUrl()` (rejects `javascript:`/`data:`); colors → `validHex()` (no CSS
  injection); booleans `typeof`-checked; objects rebuilt with explicit fields (no
  prototype pollution); no `eval`/`Function`, no raw-config `innerHTML`.
- **Formal XSS pass — clean.** Reviewed every `innerHTML` sink (76 total, 61 with
  interpolation). All config-borne sinks escape: `snHl` (snippet body, per line),
  the phrase-block builder (`p.title`/`p.body`), `wcRowHtml` (region/tz/sites),
  `renderDash`/`renderHomeLinks`, vendor UI, and the home sub. User-pasted diff text
  is escaped via `esc()`/`inlineDiff`. No unescaped data-controlled sink found.
- **Manipulated copies of the file — unsolvable from inside (documented).** A file
  cannot defend its own integrity; the "Customized" badge is an honesty marker, not a
  control; MIT permits forks by design. Addressed via the checksum workflow above.
### Verified
- `node --check` passes; six islands parse; only the known `cmdkKbd` id is unresolved;
  footer bumped to 0.68 (no stray 0.67).
- Logic simulated: 1,000,000-entry link import capped to 2000; a 42-entry import passes
  through unchanged; phrases capped per language (en→2000, de(2) kept); clocks→1000,
  vendors→200.
- FAQ restyle and the tinted look were reasoned from CSS, not rendered — quick visual
  pass recommended.

## [0.67] — consolidation / sharing-ready pass
A polish + correctness pass to prepare a build worth handing out. Includes a full
audit (verification harness, dead-code sweep, persistence-invariant re-check,
seed-data review, network-boundary confirmation).
### Added
- **Keyboard reordering** for all three drag-sortable lists (Link Board, Snippet
  Vault, Phrasendrescher). The grips are now focusable (`Tab` to one, then ↑/↓ — or
  ←/→ — to move the item within its category); focus follows the moved item, and a
  visible focus ring was added. Drag still works as before. (Closes the long-parked
  accessibility item.)
- A plain-language **README / share note** (`off.tools-README.md`) to hand out
  alongside the file.
- **`off-clocks-corporate.json`** — the full original 54-zone clock set, exported as
  an importable config (`Customize → Import configuration → Apply`) for the corporate
  build, since the shipped default is now trimmed.
### Changed
- **Default clocks trimmed** from 54 company-site zones to **18 general world zones**
  (Honolulu → Auckland, Vienna as home), with the long site lists removed — a cleaner
  starting point; any other zone is still addable via the clock search.
- **Default links**: removed two personal entries (NetworkChuck, DER STANDARD); kept a
  light personal touch (Everton, IMDb) and the Austrian/vendor references. 17 links.
- **Accent-reset button** relabeled from the company-specific "voestalpine blue" to a
  neutral **"Reset color."**
### Fixed
- **L1 — link-editor "Apply preview"** now sanitizes every URL through `safeUrl`
  (and clears the unlock cache), matching the config importer — a stray `javascript:`
  URL in the JSON can no longer be applied. Invalid URLs are skipped with a count.
- **L2 — MAC lookup** now lets a known OUI win over the generic "locally administered"
  label, so e.g. QEMU/KVM `52:54:00` names its vendor instead of going unresolved.
- Removed three **dead CSS rules** (`.cli-quick-group`, `.cli-quick-vendor`,
  `.cli-quick-card …`) left over from an earlier quick-commands layout.
### Audit result (no change needed)
- `node --check` passes; six islands parse; only the known `cmdkKbd` id is unresolved.
  Offline boundary intact (exactly two opt-in network calls: `probeHost` + favicon
  `Image()`); no `console.*`, no `localStorage`, no inline `on*` handlers; persistence
  invariant holds across all four points + BASELINE + reset. Seed data carries no real
  IPs/secrets (placeholders only).
### Verified
- Footer bumped to 0.67 (no stray 0.66). New general clock set: 18 valid IANA zones,
  Vienna flagged home, site fields cleared. Links: 17, the two removed and Everton/IMDb/
  ORF kept. CLI quick-copy box, vendor editor, lock feature unaffected.
- Logic simulated (13 assertions): keyboard reorder (both directions, category-boundary
  stop, list-end stop, focus-index), L1 URL sanitize (drops `javascript:`, prepends
  https to bare hosts, keeps valid/relative/locked), and L2 (`52:54:00` → "QEMU / KVM").
- Browser-only behavior (grip focus/keyboard feel, the trimmed clock render, the relabel)
  was reasoned from code, not executed — quick visual pass recommended.

## [0.66]
### Added
- **Home sidebar reachability.** A discreet **Check reachability** button at the bottom
  of the right-hand link list (shown only in online mode) re-runs the same one-off probe
  as the Link Board. When a check runs, each sidebar link gives brief feedback then
  settles: **unreachable** links flash red (text + icon) and fade to a muted grey,
  staying greyed until the next check; **reachable** links briefly darken, then ease back
  to normal (no green). Confidential-locked links stay muted and never flash red (there's
  no host to probe).
- **CLI Commander quick-copy** moved into its own box, with the "Quick copy:" label
  removed (clicking a chip to copy is self-explanatory). The box hides itself for vendors
  with no quick commands. Added ~13 more read-only quick commands across Linux, Cisco,
  Windows and Barracuda (e.g. `show version`, `show ip route`, `route print`, `arp -a`,
  `ping -c4 <host>`, `df -h`).
### Changed
- **Help & FAQ search** now uses the same search-bar styling as the other tools
  (`.dash-search`) instead of its own look; the intro paragraph in that box was dropped.
  The filtering behavior is unchanged.
- **Home greeting** reads **"On Your Way, Lord Commander!"** — with the vocative comma.
### Removed
- The **"And online."** tagline fragment on the home hero (it wrapped to a second line at
  the larger header size). The header tagline is back to a single clean line in both modes.
### Verified
- `node --check` passes; all six JSON islands parse; every `$('id')` resolves except the
  known `cmdkKbd`. Footer bumped to 0.66 (no stray 0.65). New IDs (`cliQuickCard`,
  `homeReach`) are unique; `CLI_QUICK` holds 34 valid entries; a single `.hl-link.hl-locked`
  rule; the obsolete `.faq-search` / `home-tagline-on` styles are gone.
- The reachability effect is driven from `updateReach` (per-host `.hl-link` flash classes
  + resting `hl-unreach`, with an `animationend` cleanup) and CSS keyframes; the resting
  grey is re-applied on `renderHomeLinks` so it survives re-renders.
- Browser-only behavior (the flash→fade timing, the online-only button visibility, the
  FAQ search look, the CLI box hide-when-empty) was reasoned from code, not executed —
  worth a quick visual pass, especially toggling online mode on the home page.

## [0.65]
### Added
- **Editable Snippet Vault vendors.** The vendor list is no longer fixed. On the
  Snippet Vault page, switch to **Edit** (page header) to reveal a new **Manage
  vendors** card where you can:
  - **rename** any vendor (the label is cosmetic; existing snippets stay put),
  - **delete** a vendor (its snippets move to **Other**, with a count in the toast), and
  - **add** a vendor (typed name → slugged id, kept unique; inserted before Other).
  **Other** is permanent — it's the fallback any unknown vendor resolves to — so it
  can't be deleted. The add-snippet vendor dropdown and the filter pills update live.
### Persistence
- New savable global `SNIP_VENDORS` (was a fixed `const`), seeded from
  `SNIP_VENDORS_DEFAULT` and mirrored across all four persistence points plus
  `cfgResetToBaseline` and the BASELINE snapshot. A `sanitizeVendors()` guard cleans
  imported lists (valid `{id,label}`, de-duped, blank-dropped, **Other** guaranteed and
  kept last). In `applyConfig`, vendors are imported **before** snippets, so each
  snippet's vendor validates against the freshly-imported list rather than the old one.
### Verified
- `node --check` passes; all six JSON islands parse; every `$('id')` resolves except the
  known `cmdkKbd`. Footer bumped to 0.65 (no stray 0.64). New IDs (`snVendorCard`,
  `snVendorMgr`, `snVendorNew`, `snVendorAdd`) are unique.
- Persistence confirmed across `buildConfig` / `applyConfig` (vendors-before-snippets) /
  `bakeState` / `initConfig` read + BASELINE / `cfgResetToBaseline`.
- Vendor logic simulated (21 assertions): slug rules; sanitizer ordering / Other-last /
  dedupe / blank-drop / non-array→default / first-label-wins; add-before-Other; delete
  reassigns snippets to Other and blocks deleting Other; the save→reopen and
  export→import round-trips; and that all shipped snippet vendor ids still resolve.
- The Manage vendors card is edit-mode-only (it carries `.sn-add`, hidden by the
  existing `body:not(.editing) .sn-add` rule), like the add-snippet card.
- Browser-only behavior (the live rename/delete/add re-rendering, the dropdown refresh,
  focus on rebuild) was reasoned from code, not executed — give it a quick visual pass.

## [0.64]
A polish + content batch (the low-risk items from the v0.64 plan; editable vendors and
the sidebar reachability effects are split into 0.65 / 0.66).
### Added
- **Credit.** A discreet footer line — *Made by Thomas Kienbink · built with Claude AI ·
  MIT-licensed* — and a new FAQ entry "Who made this, and why?" telling the origin
  (free-time first vibe-coding project, built with Claude, shared with colleagues).
  The name was already in the MIT header comment; now it's visible in the UI too.
- **FAQ search + boxes.** A search box at the top filters all entries live (matches
  auto-expand; a "no matches" note shows when nothing hits), and each category is now
  its own card for clearer structure. Two new entries: the timer count-up question and
  the about/origin one. No existing entries removed (19 → 21).
- **"How it works" boxes** (collapsed, bottom of page) for **Network Sketch**,
  **Phrasendrescher** and **Snippet Vault** — the last two also carry a cleartext
  caution (saved snippets/blocks are readable in the file; use placeholders).
- A permanent **copy** button on every Snippet Vault entry (previously copy was bundled
  with the edit-only actions and hidden in view mode).
### Changed
- **Lock Confidential Link addresses now defaults ON.** The two shipped confidential
  links are `example.net` placeholders, so nothing real is affected; they now show the
  lock/click-to-open behavior out of the box. A discreet ⓘ tooltip + "How it works"
  link sits next to the toggle (full detail lives in the FAQ).
- **Unified headers.** The home tagline and every page `<h1>` now share font, size
  (matched to the `off.tools` wordmark, ~1.62rem) and color (brand teal). Page headers
  are bold; the tagline keeps its normal/bold split, just larger.
- **Snippet Vault layout.** Tags moved up onto the title row, right-aligned, so each
  entry is more compact (one row shorter).
- **Timers count up after finishing.** A finished timer now counts up as `+m:ss` on the
  Timers page (the header chip still shows "Done") until dismissed. The tick keeps
  running while any finished timer is on screen.
- **Online banner** auto-hides after 5 minutes (online mode itself stays on — the banner
  is just a reminder) and is reworded to stress there's no background polling and no
  permanent connection; checks happen only when you trigger one.
### Verified
- `node --check` passes; all six JSON islands parse; every `$('id')` resolves except the
  known `cmdkKbd`. Footer bumped to 0.64 (no stray 0.63). New IDs (`cfgLockLearn`,
  `faqSearchInput`, `faqNone`) are unique; FAQ has 6 category boxes and 21 items; the
  header timer chip still renders "Done"; snippet head order is title → tags → copy →
  edit-actions; tagline online-fragment rules intact.
- Browser-only behavior (header sizing, FAQ filter interaction, the 5-minute banner
  timeout, the live count-up, snippet row reflow) was reasoned from code, not executed —
  worth a quick visual pass when you open it.

## [0.63]
UI polish on the v0.62 work — no behavior change to the lock mechanism itself.
### Changed
- **"How off.tools is meant to be used"** moved from the top of the Customize page
  to its own collapsible box at the **bottom** of the page (a standalone `.explainer`
  after the card, matching the Time Calculator's explainer placement). The hidden
  accent easter egg moved with it — still exactly one of it.
- **Lock toggle redesigned.** Pulled out of the cramped accent-color row into its
  **own full-width box above Configuration**, with a simpler label —
  *Lock Confidential Link addresses* — and a checkbox. The label is light grey while
  unchecked and darkens when on; default off. The inline explanation was removed in
  favor of a dedicated FAQ entry.
- **Home hero text** expanded by a few words per block (consistent, accurate style):
  open it "straight from" a disk/USB/share with "nothing to set up"; tools run "right
  in your browser tab"; Customize now names what you can change (links, snippets,
  clocks, text blocks, language, accent color) and Save bakes a copy you can "keep,
  carry and reopen anywhere, still fully offline." The JS default and the static
  fallback were updated together so they stay in sync.
### Added
- FAQ → Privacy & safety: **"What does 'Lock Confidential Link addresses' do?"** —
  explains the toggle, the click-time prompt, the session-only in-memory cache, and
  the boundaries (protects the address only; not a password; read-only is a share
  permission off.tools can't enforce).
- The home tagline gains **"And online."** after "Works offline." — shown only when
  online mode is active (a small online-only fragment toggled by `body.online`,
  inheriting the tagline's style; no JS).
### Verified
- `node --check` passes; all six JSON islands parse; every `$('id')` resolves except
  the known `cmdkKbd`. Footer + filename bumped together to 0.63 (no stray `0.62`).
- Customize section tags balanced after the explainer move (27/27 `div`, 1/1
  `details`); `cfgSpectrumEgg` and `cfgLockConf` each appear exactly once; the lock
  box sits after "Your content" and before "Configuration"; the home text change is
  present in both the default and the static fallback; the FAQ entry and tagline
  fragment are in place. (Apparent "duplicate" island IDs in a naive scan are matches
  inside code comments / JS template strings, not real elements — confirmed one real
  element each.)
- Rendering, the collapsible box, the grey-when-off label and the online-mode tagline
  swap were reasoned from code, not executed — no browser here, so give them a quick
  visual check.

## [0.62]
### Added
- **Lock confidential links** — a Customize toggle (Make it yours box, beside the
  accent color; default off, and a persisted setting). Intended for a build that
  lives on a read-only network share: when on, a link classed *Confidential* never
  has its address written into the file. Saving (HTML and exported config) and the
  JSON preview all drop confidential entries to the bare `https://` scheme, so the
  destination is never in the file at rest and never crosses SMB when a client opens
  it. The live in-session data is left untouched, so the toggle is non-destructive
  and reversible.
  - In the link form, a confidential link's URL field is disabled while locking is
    on (its address isn't stored — it's entered at click time).
  - Clicking a locked link opens a small modal (the v0.61 dialog/focus plumbing)
    asking for the address; it's validated with `safeUrl` and opened in a new tab.
    The address is then cached **in memory for the session only** — further clicks
    open it directly, and it's gone on reload. Nothing is written to disk
    (consistent with the file's no-localStorage / no-trace model).
  - Locked links render with a lock glyph and no host on both the Link Board and the
    home sidebar, and are keyboard-activatable.
- Customize → "Your content": added the missing **Home** tile.
### Persistence
- New savable global `lockConfidential` mirrored across all four points plus
  `cfgResetToBaseline` (buildConfig / applyConfig / bakeState / BASELINE). A new
  `linksForSave()` helper does the confidential-address stripping for every persisted
  output; the session unlock cache is never part of any of them and is cleared on
  import / discard.
### Security boundary (by design, worth knowing)
- This protects the confidential **address** only. Title, description, tags and
  category still travel in the file as cleartext — don't put the secret in those.
- The popup is not authentication: it collects an address the user already knows and
  opens it. "Knowing the URL" is the access model.
- Making the shared file read-only is an SMB/NTFS permission the admin sets on the
  share; the HTML can't enforce that itself. Its job is only to keep the address out
  of the file, which it does.
### Verified
- `node --check` passes; all six JSON islands parse; every `$('id')` resolves except
  the known `cmdkKbd`; footer + filename bumped together to 0.62 (no stray `0.61`).
- Lock logic simulated (21 assertions): locked-state derivation (toggle / addressless
  / per-class), non-destructive `linksForSave` stripping, the session unlock cache,
  the storage rule, the saved-file reopen round-trip, and `javascript:` rejection at
  unlock — all pass.
- Browser-only behavior (the modal rendering, new-tab open, focus, the disabled
  field) was reasoned from code, not executed — no browser here.

## [0.61]
### Accessibility
- Modals now follow the ARIA modal-dialog pattern. The Link Board and online-mode
  modals gained `role="dialog"` / `aria-modal="true"` / `aria-labelledby` (the
  command palette already had them). Opening a modal or the palette moves focus into
  it; closing it (button, ✕, click-outside or Escape) restores focus to whatever
  opened it; and Tab / Shift+Tab are trapped within the open overlay. Implemented as
  shared `overlayOpen` / `overlayClose` helpers plus one Tab handler in the global
  keydown listener. `overlayClose` is idempotent (ignores an overlay that isn't open)
  so the overlays don't interfere via the shared Escape path.
- `--text-faint` darkened `#8A99A6` → `#667581` to clear WCAG AA on the card
  surfaces (4.74:1 on white, 4.50:1 on surface-2) while staying lighter than
  `--text-muted`. It's a single CSS variable, so all ~70 uses update at once.
- Toast notifications gained `role="status"` / `aria-live="polite"`, so copy / save
  / "applied" feedback is announced to screen-reader users.
### Verified
- `node --check` on the extracted app JS passes; all six JSON islands parse; every
  `$('id')` resolves except the known-harmless `cmdkKbd`; footer + filename bumped
  together to 0.61 (no stray `0.60`).
- Focus management simulated against a DOM mock: focus-on-open, restore-on-close,
  Tab / Shift+Tab wrap (single- and multi-control dialogs), stray-focus pull-back,
  and the Escape cross-talk between overlays sharing the keydown path — all pass.
- Browser-only behavior (real screen-reader announcements, the visible focus ring,
  rendered contrast) was reasoned from code, not executed — no browser here.
### Deferred
- Keyboard reordering for the drag-sortable lists (see Unreleased) — intentionally
  not in this release.

## [0.60]
### Changed
- World Clocks: the per-second re-render is reworked into a tick/structural split
  (the same pattern the Timers module already uses), retiring the parked flicker.
  Each second now only advances the UTC readout; the per-zone rows are rebuilt only
  on a structural change (search, 12/24h, selection or zone data — detected via a
  cheap key that uses no Intl) or when the displayed minute rolls over. A plain
  minute tick updates each row's time / offset / day-night text in place. This also
  ends the ~per-zone-per-second `Intl.DateTimeFormat` churn and lets the entrance
  stagger actually finish (rows are no longer torn down a second after they appear).
  No `wcRender()` call site changed — discrete events feed the structural key, so
  they still force a rebuild. (New `wcRowHtml` / `wcRowUpdate` helpers; new
  `wcKey` / `wcLastMin` / `wcOrder` bookkeeping.)
- Time Calculator: the "How it adds up" explainer now starts **collapsed**, using
  the shared collapsible `explainer-d` `<details>` pattern (as the IPv6 explainer
  does) instead of an always-open box.
- Snippet Vault: the search + vendor menu and the snippet list now sit in **two
  separate boxes**, matching CLI Commander and the other split tool pages, instead
  of a single card.
### Verified
- `node --check` on the extracted app JS passes; all six JSON islands parse; every
  `$('id')` resolves except the known-harmless `cmdkKbd`; footer + filename bumped
  together to 0.60 (no stray `0.58`/`0.59`).
- `wcRender` gating simulated across a tick/event sequence: idle ticks SKIP, minute
  rolls update IN PLACE, and search / format / selection / zone-edit force a REBUILD.
- Browser-only behavior (the actual repaint, the collapsed explainer, the two-box
  layout) was reasoned from code, not executed — no browser available here.

## [0.59]
### Fixed
- Save no longer silently reverts link edits (data-integrity bug in the core save
  flow). `bakeState()` re-read the link-editor modal's `<textarea>` on every save,
  but that textarea is populated *only* when the modal opens. So after the modal had
  been opened once, editing links via the dashboard form / drag-reorder / delete, or
  importing a config — without reopening the modal — left the textarea stale, and the
  next "Save as HTML" overwrote the live links with the old JSON, with no error. It
  now re-reads the editor **only while the modal is open** (the direct "Save as HTML"
  path from inside the editor, where un-applied JSON edits should still be captured).
  `offDocString()` calls `bakeState()` before it clears the overlay, so the open-state
  check is accurate.
### Added
- Text Compare: input-size guard. The diff builds an O(n·m) LCS grid, so two large
  pastes (e.g. 5000×5000 lines ≈ 25M cells) could freeze or OOM the tab. When the
  product of the two line counts exceeds ~4M cells, the tool now shows a "too large
  to compare inline — compare smaller sections" notice instead of running the diff.
  (New `DIFF_MAX_CELLS` constant; reuses the existing `.diff-empty` row — no new
  HTML/CSS.)
### Verified
- `node --check` on the extracted app JS passes; all six JSON islands parse; every
  `$('id')` resolves except the known-harmless `cmdkKbd`; footer + filename bumped
  together to 0.59 (no stray `0.58` left).
- Persistence invariant still intact: links, phrases, snippets, clocks, home, lang,
  theme, label, custom and spectrum remain mirrored across `buildConfig` /
  `applyConfig` / `bakeState` / `BASELINE` / `cfgResetToBaseline`.
- Browser-only behavior (rendering, the diff message, DnD, clipboard, save picker)
  was reasoned from code, not executed — no browser available in this environment.

## [0.58]
### Changed
- Text correctness/consistency review across tool descriptions and the FAQ.
  - MAC Converter subtitle now notes the OUI vendor lookup the tool performs.
  - FAQ keyboard-shortcuts entry corrected: the ⌘K palette only jumps to tools /
    opens Customize (it no longer "saves, exports, toggles online mode, or
    starts/stops timers" — those were removed when the palette was slimmed).
### Added
- FAQ: "How do I add my own links, snippets or text blocks?" (edit mode / Edit pill).
- FAQ: "Can off.tools help me write text blocks with AI?" (the Generate-blocks card).
### Verified (accurate, no change)
- All other tool subtitles; the MAC vendor-list FAQ (21 built-in OUIs; the IEEE
  "30,000+" figure is correct); and the Snippet Vault ↔ Script Commander
  integration claims (Send to Script Commander / Save as snippet both exist).

## [0.57]
### Changed
- Wording/voice pass — standardized on American English. Fixed British spellings
  in user-facing text and a couple of inert comments: colour→color,
  recolours→recolors, Analyse/Anonymise→Analyze/Anonymize, anonymised→anonymized,
  behaviour→behavior, signalling→signaling, e-mail→email.
- Left as-is by design: German text (e.g. "E-Mails" in the DE AI prompt) and the
  `--grey` CSS variable (a code identifier). Terminology (lowercase off.tools,
  "online mode" casing, "cleartext", button labels) was already consistent.
- (Copyright line still reads `<YOUR NAME>` — fill in to finalize the MIT notice.)

## [0.56]
### Changed
- Barracuda snippet consolidation (Snippet Vault: 51 → 45 entries).
  - Merged 5 log/stat deletion variants into one parameterized
    `find <DIR> -mtime +<DAYS> -exec rm -f {} \;` (kept "delete today's
    firewall activity logs").
  - Merged 3 fixed-speed duplex variants into one parameterized
    `ethtool -s p3 autoneg off speed <SPEED> duplex full` (kept "Enable
    autonegotiation").
- Everything else in the Barracuda set left intact; CLI Commander catalog untouched.

## [0.55]
### Added
- Link Board: real public links — Wikipedia, Heise (EN), ORF, DER STANDARD
  (Reference); Everton/SofaScore, IMDb, NetworkChuck (Break room); Barracuda
  Campus (Vendor docs). Two confidential samples (Password Vault, Crisis Bridge).
- AI-prompt helper on the Phrasendrescher (edit mode): bilingual copyable prompt
  for an external assistant, plus an append-import for the returned JSON.
- MIT license: full text as an HTML comment in the head, a License/credits FAQ
  entry, and a footer "License & credits" link. (Copyright holder = `<YOUR NAME>`.)
### Changed
- Link Board: trimmed/merged corporate placeholders (cut Directory, HR, Secret
  Sharing, SD-WAN, Web Proxy; merged Wiki and IDM+PAM).
- Phrasendrescher: rewrote blocks (6 → 7, added an Escalation block), tighter
  wording, full EN/DE parity.

## [0.54]
### Changed
- Pride/Spectrum accent: per-item rainbow (each nav item its own hue) instead of
  one merged gradient.
- Hidden easter-egg toggle moved into the collapsed "How off.tools is meant to be
  used" box (bottom-right); toast reduced to "on"/"off".
- CLI Commander: split into two boxes (search + vendor pills + quick-copy, then
  the command builder).
- Snippet Vault: search bar moved above the vendor menu; vendor menu restyled to
  the CLI Commander pill style (per-vendor count kept as a faint number).
### Removed
- Footer `on.tools` glow (kept the brand color).
### Fixed
- Footer version drift (the file labelled 0.53 still read 0.52).

## [0.53]
### Note
- Re-save of 0.52 (content-identical); footer still read 0.52 — drift later fixed
  in 0.54.

## [0.52]
### Added
- "Is yours." restored as a second line under a now-fixed headline.
- In-app inline editor for the home sub-paragraph (discreet, always-visible pencil
  beside the badge).
- Cleartext badge shown in custom mode in place of the offline badge.
- Spectrum/pride accent as a persisted, hidden opt-in (mirrored across all four
  PERSISTENCE points).
### Changed
- Headline fixed to "One file. No server. No account. Works offline." and made
  non-editable; `HOME.tag` dropped from savable state.
- Online mode reverses the header logo glow (glows by default, sharpens on hover).
- Footer redo: `on.tools` brand-colored; in custom mode the Explore column gives
  way to the cleartext warning; short description tightened.

## [0.51]
### Added
- Edit toggle (a discreet "Edit" pill; default is clean view mode).
### Changed
- Removed the earlier "Is yours." (clashed with a customized tagline); shrank the
  home tagline to 1.3rem; shortened the home sub with subtle bold; header ape-head
  to 48px; replaced the logo hover movement with a soft glow.

## [0.50] · [0.49]
### Changed
- Home hero reworked to sit beside the ape-head; sub text made accurate and
  structured; content tiles 2-per-row; favicons in the home sidebar when online;
  reverted the online accent to the lighter mint; renamed "Search Builder" →
  "LMFGIFY". (An "Is yours." tagline was trialled here.)

## [0.48]
### Changed
- Boxed the Customize sections, capped reading widths, made the explainer
  collapsible, added the amber cleartext warning callout, replaced a link-editor
  text block with content tiles, narrowed the FAQ.

## [0.47] · [0.46]
### Changed
- Built a header one-click Save button (File System Access API), then removed it —
  the Customize page now owns the whole save story.
- Stripped the command palette to a single "Open Customize" action with tools as
  tiles; re-pointed the badge to Customize; deleted the old explanation modal;
  rebuilt Customize around a clearer concept.

## [0.45]
### Added
- New Time group and a Time Calculator (`timecalc`).
### Changed
- Reordered/regrouped the sidebar navigation.

---

## Conventions (carried across versions)
- One self-contained HTML file. Data lives in embedded JSON islands
  (`linksData`, `phrasesData`, `snippetsData`, `clocksData`, `ouiData`, `offConfig`).
- Match the existing design tokens (brand teal `#0082B4`, IBM Plex Mono, mint
  online accent `#9ff2cf`); don't introduce a new aesthetic.
- American English in user-facing prose. (`--grey` is a code identifier, left as-is.)
- PERSISTENCE invariant: any new savable global must be mirrored in `buildConfig()`,
  `applyConfig()`, `bakeState()` and the `BASELINE` snapshot (commented 1/4–4/4).
- `$('cmdkKbd')` has no matching element by design — a known, harmless flag.
- Verify each build: `node --check` the extracted JS, `JSON.parse` each island,
  cross-check `$('id')` references. Browser rendering can't be verified here.
