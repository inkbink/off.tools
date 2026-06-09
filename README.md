# off.tools

A single, self-contained HTML file — a small toolbox for everyday network and
sysadmin work. Links, command snippets, subnet/IP math, a MAC lookup, a diff
tool, world clocks, a time calculator, reusable text blocks, and more.

No install. No server. No accounts. Nothing is sent anywhere.

It's a **customizable template**, built from plain HTML, CSS and vanilla
JavaScript (with original SVG icons and a Canvas sketch) — no framework, no build
step, no dependencies, no CDN and no storage. That's what lets it run straight
from a disk, offline, indefinitely.

There's a quiet idea behind that restraint. The web you know is layers — servers,
sessions, accounts, trackers — all stacked on top of one plain thing your browser
can read: a file. off.tools is just that file, on purpose. Open it and you're
working inside the first instant, before any of the rest is needed — and it never
reaches past it.

## How to use it

1. **Open** `off.tools.html` in any modern browser — double-click it from a disk,
   a USB stick, or a network share. That's it; it runs entirely on your machine.
2. **Use any tool** from the sidebar. Everything computes locally and keeps
   nothing — whatever you type is gone when you reload the page.
3. **Make it yours** (optional): open the **Customize** page to add your own
   links, snippets, text blocks, clocks, accent color and language. Then click
   **Save as HTML** to bake all of that into your own standalone copy. That saved
   file *is* your version from then on — keep it, carry it, reopen it anywhere,
   still fully offline. It's named after your build label (e.g.
   `voestalpine.off.tools.html`, or `custom.off.tools.html` with no label), so a
   personalized copy is never confused with the canonical `off.tools.html`.

## A few good-to-knows

- **It's offline by default.** A **Check links** button in the header runs a one-off
  reachability check: it briefly contacts your Link Board sites to show which respond
  (and loads their favicons). It runs for about 30 seconds, then returns to offline on
  its own — the last results stay on the tiles, dimmed, until you check again or reload.
  It only reaches out when you press it: no background polling, no permanent connection.
- **A saved copy is cleartext.** Anything you save into a customized file (links,
  notes, snippets) is written into the `.html` as readable text. Treat a customized
  copy as sensitive, and don't share it unless you're sure it contains nothing
  confidential. For a file kept on a shared drive, the **Customize → Lock Confidential
  Link addresses** option keeps confidential link addresses out of the saved file.
- **Keyboard:** `Ctrl-K` / `⌘K` opens a quick-jump palette; `Esc` closes dialogs.
- **The built-in vendor notes and command help** are general, offline guidance —
  handy reminders, not a substitute for vendor documentation. Verify anything that
  matters before you act on it.

## Verify the file is genuine

Anyone can edit an HTML file, so a copy you received sideways (e-mail, USB, a
share) could have been changed. A file can't prove its own integrity — so verify
it against the checksum published on the canonical source (off.tools), not against
anything inside the file itself.

The official build ships with a `off.tools.html.sha256` checksum. Compute the hash
of your copy and compare:

- **Linux:** `sha256sum off.tools.html`
- **macOS:** `shasum -a 256 off.tools.html`
- **Windows:** `certutil -hashfile off.tools.html SHA256`

If the value matches the one published on **off.tools**, the file is the genuine,
unmodified build. If it doesn't match, don't trust it — re-download from off.tools.

Rule of thumb: **only trust copies that come straight from off.tools, and verify
the hash if you got the file any other way.**

## License

off.tools is released under the **MIT License** — free to use, copy, modify and
share. It's provided as-is, with no warranty. The full text is in the
[`LICENSE`](LICENSE) file (and in the source HTML's header comment). Vendor names
(Barracuda, Fortinet, Cisco, Juniper, …) are trademarks of their respective owners;
off.tools is independent and unaffiliated.

There's nothing to build: the whole app is one hand-written `off.tools.html` — open
it, or edit it directly in any text editor. No dependencies, no toolchain.

Made by Thomas Kienbink, in his free time, with the help of Claude AI.
