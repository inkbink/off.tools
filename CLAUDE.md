# CLAUDE.md — off.tools

off.tools is a **single, self-contained, offline-first HTML file** — a toolbox for
network/sysadmin work. No server, no accounts, no telemetry, no localStorage.
HTML, CSS, JS and JSON data all live in one file. State is either baked into the
file on save or held in memory for the session only.

Owner/dev: Thomas Kienbink (Vienna). Brand: **off.tools**. Distributed file:
`off.tools.html` (target canonical: `https://off.tools/off.tools.html`; until the
off.tools domain is live, the public copy is served from
`binkebonke.com/off.tools.html`). Working/dev builds may be named `off_XX.html`.

Roadmap and feature decisions live in `off-tools-ROADMAP.md` (if present) and in
the claude.ai project where scoping happens. **This file covers HOW to work, not
WHAT to build.** Wait for an explicit brief before building.

## Hard invariants (never violate)

1. **One HTML file.** No second file, no external assets. Data lives in six
   embedded JSON islands: `linksData`, `phrasesData`, `snippetsData`,
   `clocksData`, `ouiData`, `offConfig` — each a
   `<script type="application/json" id="...">` block.
2. **No dependencies, no build step, no CDN.** No React/Vue/Tailwind/external
   libraries — they break the offline/single-file premise. Everything is vanilla
   HTML/CSS/SVG/Canvas/JS.
3. **Zero-egress.** The app issues **zero automatic network requests** on load or
   idle. Only permitted egress: the two opt-in Check-link probes (hardcoded
   HTTPS) and plain user navigation. Never add fonts, analytics, fetches,
   prefetches, favicons from the network, or anything that phones home.
4. **Design tokens are fixed:** brand teal `#0082B4` (`--brand-dark #006A93`,
   `--brand-deep #004E6E`, tints `--brand-tint`/`--brand-tint-2`), IBM Plex Mono,
   mint online accent. The "explainer" light-blue box (tinted gradient + left
   brand accent) is the house style for informational/expandable boxes. Match the
   existing aesthetic; do not introduce a new one.
5. **Version sync:** the footer `vX.YY · offline-first toolbox` and the filename
   (when versioned, `off_XX.html`) bump **together**. Exactly one footer version
   string in the file. Published version numbers are reserved for meaningful
   releases; dev builds use `vX.YY-devN` footers with matching filenames.
6. **PERSISTENCE invariant:** any new savable global must be mirrored in all four
   places commented `PERSISTENCE 1/4`–`4/4` (`buildConfig`, `applyConfig`,
   `bakeState`, and the `BASELINE` snapshot in `initConfig`), plus
   `cfgResetToBaseline`. Savable globals currently: links, phrases, snippets,
   snipVendors, clocks, home, theme, spectrum, lockConfidential, lang, label.
7. **Security model:** config is untrusted data, sanitized field-by-field in
   `applyConfig` — strings via `esc()` before any DOM insertion, URLs via
   `safeUrl()` (rejects `javascript:`/`data:`), colors via `validHex()`, booleans
   `typeof`-checked, objects rebuilt with explicit fields. Array sizes capped on
   import via `IMPORT_CAP`. No `eval`/`Function`, no raw-config `innerHTML`.
   Every config-borne `innerHTML` sink must escape. Integrity belongs to the
   distribution layer (canonical HTTPS source + published SHA-256) — **never**
   add in-file self-integrity checks.
8. `$('cmdkKbd')` resolves to no element **by design** — a documented, harmless
   flag. Do not "fix" it; it is whitelisted in `verify.js`.

## Closed decisions — do not re-propose

- **on.tools / bnk.tools rebrand** — closed (domain unregistrable).
- **Header Save button** — built, then deliberately removed; Customize is the
  single save hub.
- **Auto-load sibling config file** — permanently closed (breaks under `file://`
  and violates zero-egress over HTTPS); the bake-and-save model covers the need.
- **In-file self-integrity check** — rejected; a file cannot verify itself.
- **Hiding tools on mobile** — closed; fix layouts instead.

## Workflow

- **Propose before building** anything cross-cutting or security-related. Small,
  reviewable changes. Explain tradeoffs, flag judgment calls.
- **Never silently delete features or list items** — point out omissions instead.
- Honest scoping: defer to a next round rather than cram. Critical feedback over
  validation.
- Direction-setting and scoping happen in the claude.ai project; this repo is the
  build environment. If a brief is ambiguous, ask before coding.
- Commit per logical change with clear messages. Never commit a build that fails
  `verify.js`.

## Verification — run after EVERY edit

```
node verify.js <file.html>
```

It checks: app-script syntax (`node --check`), all six JSON islands parse,
every `$('id')`/`getElementById('id')` resolves (whitelist `cmdkKbd`), exactly
one footer version string + filename sync, PERSISTENCE/OFFLINE BOUNDARY markers
present, and the `<div` open/close delta vs. `git HEAD`.

The harness cannot verify **browser behavior**: rendering, drag/drop, clipboard,
focus, animations, the save picker. Reason those from code, say explicitly what
remains unverified, and where logic is non-trivial (reorder math, sanitizers,
caps) write a small Node simulation and report the assertions. Thomas verifies
mobile on iPhone/Safari and desktop manually.

## Gotchas (learned the hard way)

- A literal `</script>` inside a script block ends the element — **even inside
  comments and strings**. Always escape it (`<\/script>`).
- Replacing multi-line JSON islands: use a Node script (`JSON.parse` →
  re-serialize, one object per line), not blind string replace; use surgical
  line edits when blank-line group separators must be preserved.
- Raw `<div` grep counts are unreliable (fragments live in JS template strings) —
  compare the **delta** against the previous version, never trust the raw count.
- http-only internal hosts always report unreachable in Check links (probe
  forces HTTPS) — known, logged gap, not a regression.

## Release deliverables

Per release: the finished HTML (footer + filename bumped together), updated
`CHANGELOG.md` (newest-first, `[Unreleased]` at top, each entry with a
**Verified** subsection), regenerated SHA-256 checksum file, git tag. When
relevant: updated README (share note + verify section) and
`off-clocks-corporate.json`. The corporate clock config and the roadmap are
**excluded from the public repo**.

License: MIT, © 2026 Thomas Kienbink.
