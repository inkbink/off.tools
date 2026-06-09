# off.tools — Roadmap

Living plan for what's decided, what's next, and what's parked. Sits in the
project folder for continuity (like the handover note and CHANGELOG). Newest
thinking up top. **This is a plan, not shipped state** — the HTML is authoritative.

---

## Delivery model — off.tools *serves the app itself* (new direction, Jun 2026)

The earlier plan was a landing page with a big **Download** button (`off.tools` → page →
`off.tools.html`). New, stronger direction: **`off.tools` *is* the app.** Browsing to the
bare domain loads `off.tools.html` directly — the visitor has already loaded the tool into
their browser; everything after (bar Check links) is local. There is no "website version"
vs "file version": the single-file invariant means the served page and the saved file are
the *same artifact*, delivered two ways.

- **Bare `off.tools` = rolling latest**, instantly usable, fully offline once loaded.
- **Pin checksums to immutable *versioned* URLs, never the rolling one.** Keep
  `off.tools/off_XX.html` (or `/vX.YY/`) as frozen artifacts; the published SHA-256 is for
  *those*. The bare URL changes hash every release — verifying it would be meaningless.
- **Cache:** short/no-cache headers on the bare HTML, or "latest" silently serves stale.
- **Server lockdown (nice-to-have):** the origin only ever answers GET for one static file
  and accepts no input — drop POST/everything else, shrink server attack surface to almost
  nothing (a WAF could go further). *Caveat:* this protects the **server**, not the user
  importing a hostile config — that risk stays entirely on `applyConfig`'s field-by-field
  sanitizing. The lockdown is **not** a substitute for the in-app security model; they
  guard different things.
- **`file://` vs `https://` context** — tools behave identically; only the network bits
  differ. From `https://off.tools`, **Check links** runs in a secure web origin: CORS
  applies and **mixed-content blocking** forbids probing `http://` internal hosts. From a
  saved `file://` copy there's no mixed-content rule, so http internal probes work *better*
  from the downloaded file. → worth a doc line on which form to use for what.
- **Decided (Jun 2026):** the bare domain serves the **latest `off.tools.html` as the main
  page** — set it as the directory index (e.g. `DirectoryIndex off.tools.html` via
  `.htaccess`) so browsing to off.tools loads the app directly, with the versioned/immutable
  copies + `.sha256` sitting alongside. The old landing-page `index.html` is **retired** in
  favour of this. (Canonical filename stays `off.tools.html` — don't rename it to
  `index.html`, or the checksum/canonical-name story muddies.)

## Implied product work (from the above)

- **Neutral public default config** — a cold visitor with no customization must still get a
  genuinely useful toolbox. Decide the *public seed* for the six islands (generic sysadmin
  links/snippets/clocks), kept separate from your personal and the voestalpine sets.
- **Standalone, self-explanatory onboarding** — hero + FAQ + "it's a template" copy already
  exist; the gap is first-run clarity: offline-ness obvious, "save it to keep your changes"
  obvious, customization discoverable without nagging.
- **Verify zero outbound requests** before leaning on "nothing leaves the browser" — no
  `@font-face url(...)`, no remote image, nothing; Plex Mono must be a local/system fallback.
  *(Audit offered; deferred for now.)*

## Ethos / positioning (keep this voice)

The point isn't the features — it's the *posture*: no cookies, no server, no account, no
tracking, nothing phoning home. Just HTML/CSS/JS doing something radical by being completely
ordinary. Load one file and you're standing in the frozen instant the rest of the web is
built on top of — you work *inside* that moment instead of rushing past it. This thing
simply doesn't reach outward. That restraint is the product.

*Folded (polished) into the **README intro** (Jun 2026). A distilled one-liner could also go
into the HTML source-header comment on the next build — that's an HTML change (version bump),
so it rides along with the next release rather than on its own.*

---

## Versioning note (read first)

- **v0.69 (shipped earlier):** filename rename → `<label>.off.tools.html`, transparency
  (tech stack + "it's a template"), and an online-mode 1/2/3-min calm-down choreography.
- **v0.70 (shipped):** reworked the online portion into the one-off
  **"Check links"** model (the calm-down choreography was dropped), plus **badge
  animations** (hover crossfade, dot pop, smooth color/glow transitions). Builds on
  v0.69. `[0.69]` is kept as history.
- **v0.71 (shipped):** fix — the `stale` JS flag was never set, so after a
  check the home-sidebar favicons vanished and the reachability dots reset to grey.
  Now stale results (favicons + colored dots) persist at ~50 % on both the Link Board
  and the home sidebar, as intended.
- **v0.72 (shipped, this build):** identity & distribution finalize — footer credit →
  `© 2026 Thomas Kienbink · MIT` (Claude credit moved to the source-header comment), a
  non-clickable `Canonical source: off.tools` line, and a `LICENSE` file + repo README
  touches for GitHub. No behavior changes.

---

## v0.70 (shipped)

### Carried over from v0.69 (still in the file)
- **Saved-file naming → `<label>.off.tools.html`** (`custom.off.tools.html` with no
  label). Canonical `off.tools.html` reserved for the verified build. No version in
  the name.
- **Transparency:** home hero + FAQ + source-header + README now name the stack
  (vanilla HTML/CSS/JS, SVG, Canvas, embedded JSON islands; no framework/build/
  deps/CDN/storage) and that it's a customizable template.
- Footer bump; `.sha256` regen workflow.

### Rework — replace the online choreography entirely with "Check links"
The 1/2/3-min staged choreography is **dropped**. New model:

**Badge (header) — fixed width** (sized to the widest label so hover never resizes it):
- Idle: `●(grey) Offline`.
- Hover while idle: animate to `Check links` (no dot) — a call to action.
- Click: (first time in session) one-time **confirm modal** → run the check → badge
  animates to `●(green) Online` and stays **~30 s**.
- During the 30 s: the **ape-head + the "off" wordmark glow** (the existing online-mode
  glow, mint drop-shadow — kept exactly as it looks now); reachability dots + favicons
  at full opacity. **No header color change**, **no off→on text swap**, **no green fill**
  on the text/ape (all removed — see Decided).
- After 30 s: badge reverts to `●(grey) Offline`; the wordmark/ape glow fades out
  quickly; the fetched reachability dots and favicons stay visible but dimmed to
  **~50 %** (signals "last check, not realtime").
- Re-hover → `Check links` again; re-click re-runs and resets the 30 s.

**Removed from the old online treatment (per latest):**
- The `off.tools`→`on.tools` wordmark text swap and the `document.title` change — the
  wordmark stays `off.tools` always.
- The green **fill color** on the state word (`#wordState`) and the ape-head.
- The **header green accent** entirely — the topbar `::before` overlay, the `::after`
  ok-bar, and the online gradient all go. The bar stays its normal blue at all times.
- **Kept:** only the **glow** (mint drop-shadow) on the ape-head + "off" wordmark, as
  it appears in online mode now, scoped to the 30 s window. *(Glow is currently green-
  tinted; confirm on visual review whether you want it neutral white instead.)*

**Expanding green info line (banner):**
- Appears **only the first time** the badge is clicked in a session (mirrors the
  one-time confirm modal). Shows ~30 s, animated in/out, dismissible by click. Never
  again that session.

**Renames / labels:**
- "Check reachability" → **"Check links"** on every control (header badge action,
  Link Board button, home button), each with a tooltip:
  *"Checks whether every link on the Link Board currently responds."*

**Wording sweep — retire "online mode" as a feature name** (keep Offline/Online as
status words). Update all of:
- FAQ section title "Online mode" → "Checking your links"; rewrite "What is online
  mode?" → "What does Check links do?"; keep the red-dot entry, reworded.
- Footer "Online mode" column → "Checking links"; reword its paragraph.
- Footer "Privacy & data" paragraph ("online mode is opt-in").
- Confirm-modal body text (currently "Online mode lets off make outbound HTTPS…").
- Home hero `sub` mention of "online mode".
- "Does off.tools send my data anywhere?" FAQ ("…online mode (below)").
- README "online mode" mentions.
- Internal identifiers (`online`, `setOnline`, `onlineToggle`, `onlineBanner`,
  `onlineConfirmed`, `dashCheckReach`, etc.) **stay as-is** — change only user-facing
  strings, to avoid churn/risk. *(Confirm OK.)*

### Decided & shipped in v0.70
- Reframed as a **check, not a mode**: removed the `off`→`on` wordmark swap, the
  `document.title` change (incl. timer restore), the green fill on word/ape, and the
  **header color entirely**. Kept only a **neutral white glow** on the ape/"off" for
  the 30 s live window. Stale-dim (~50 %) on dots + favicons once back to offline.
- **Badge animations:** hover crossfade `●Offline` → `Check links`, dot pop on going
  live, smooth color/glow transitions on the switch back.
- Feature name: **Check links** (action) + **Checking your links** (FAQ section).
- 30 s window anchored to the click; a new click (badge or in-page button) resets it.
- Internal identifiers (`online`, `setOnline`, `onlineToggle`, …) unchanged; only
  user-facing strings changed.

---

## v0.72 — identity & distribution finalize (shipped)
Done: footer credit `© 2026 Thomas Kienbink · MIT`; Claude credit in the source-header
comment + README + FAQ; non-clickable `Canonical source: off.tools` footer line; a
`LICENSE` file (MIT) and README License-section pointer + "no build step" note.

**Next: GitHub setup (live walkthrough).** Use the prepped `LICENSE` + README:
- Footer credit cleanup: `© 2026 Thomas Kienbink · MIT`; move the Claude credit to
  the source-header comment + README.
- Non-clickable "canonical source: off.tools" provenance line (footer or Help/About).
- Prep a `LICENSE` file (MIT) + a repo-flavored README for the GitHub step.
- (MIT *header* copyright already reads the real name — nothing to fix.)

## Off-file / hosting (not HTML changes)
- ~~Static one-page site at **off.tools** with a big download button →
  `off.tools/off.tools.html`.~~ **Superseded** — see *Delivery model* up top: the bare
  domain serves the app itself. (No cookies / trackers / ideally no extra JS regardless.)
- Later: **voestalpine.off.tools** subdomain serving a hard-baked
  `voestalpine.off.tools.html` (build B) with its **own** published hash, over an
  internal channel. Caveat: a public subdomain exposes whatever's baked in — keep a
  real internal build access-controlled or bake only share-safe data.
- GitHub: account → public repo → LICENSE + README → upload `off.tools.html` +
  `.sha256` → optional GitHub Pages.

## Distribution model
- **Start with A:** verified tool + an importable config JSON, shipped separately
  (needs no new code — export/import already does it).
- **B (pre-baked edition build)** comes later, additively, once a real config exists.

## Parked / future
- Design-polish pass (pre-1.0, vanilla-only): typography scale, CSS-only motion,
  per-tool micro-visualizations, refined tokens. Scope before touching.
- Link Board ideas: command-palette launch of a link; post-check "N of M responded"
  summary; optional ⭐ pin-to-top.
- World Clocks per-second re-render flicker: consciously left alone.
- Prototyping a tool in a separate scratch file is fine (integration tax on port-back);
  never split the *product* into multiple files.

## Rejected (don't re-propose)
- In-file self-integrity check — a file can't verify itself; integrity lives in the
  distribution layer (published SHA-256). Not security.
- on.tools / bnk.tools rebrand — closed; identity is off.tools.

## Invariants (full detail in Project Instructions)
One HTML file; six JSON islands; fixed teal tokens + IBM Plex Mono; no deps/build/CDN;
footer version ↔ filename in sync; PERSISTENCE 1/4–4/4 for any savable global;
config sanitized field-by-field on import; `cmdkKbd` is an intentional no-op.
