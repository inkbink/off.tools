#!/usr/bin/env node
/*
 * verify.js — off.tools verification harness
 *
 * Usage:  node verify.js [file.html] [--strict]
 *   - file.html defaults to off.tools.html, else the highest-numbered off_XX.html
 *   - --strict turns the div-delta warning into a hard failure
 *
 * Checks:
 *   1. App <script> (the one containing "use strict") passes `node --check`
 *   2. All six JSON data islands parse
 *   3. Every $('id') / getElementById('id') resolves to an id="..." in the file
 *      (whitelist: cmdkKbd — documented intentional no-op)
 *   4. Exactly one footer version string; filename sync for off_XX.html names
 *   5. PERSISTENCE 1/4..4/4 and OFFLINE BOUNDARY markers present
 *   6. <div open/close delta compared against git HEAD version (warn on change)
 *
 * Exit code: 0 = all green (warnings allowed unless --strict), 1 = failure.
 */
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync, spawnSync } = require("child_process");

const ISLANDS = ["linksData", "phrasesData", "snippetsData", "clocksData", "ouiData", "offConfig"];
const ID_WHITELIST = new Set(["cmdkKbd"]);

let failures = 0;
let warnings = 0;
const ok = (m) => console.log("  \u2713 " + m);
const fail = (m) => { failures++; console.log("  \u2717 FAIL: " + m); };
const warn = (m) => { warnings++; console.log("  ! WARN: " + m); };

// ---------- resolve target file ----------
const args = process.argv.slice(2);
const strict = args.includes("--strict");
let file = args.find((a) => !a.startsWith("--"));
if (!file) {
  if (fs.existsSync("off.tools.html")) file = "off.tools.html";
  else {
    const cands = fs.readdirSync(".").filter((f) => /^off_\d+(?:-dev\d+)?\.html$/.test(f)).sort();
    file = cands[cands.length - 1];
  }
}
if (!file || !fs.existsSync(file)) {
  console.error("No target file found (off.tools.html or off_XX.html). Pass a path explicitly.");
  process.exit(1);
}
console.log("verify.js \u2014 target: " + file + (strict ? " (strict)" : ""));
const html = fs.readFileSync(file, "utf8");

// ---------- 1. app script syntax ----------
console.log("\n[1] App script syntax (node --check)");
const scriptBlocks = [];
const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
while ((m = scriptRe.exec(html)) !== null) scriptBlocks.push({ attrs: m[1], body: m[2] });
const appScripts = scriptBlocks.filter((s) => s.body.includes('"use strict"'));
if (appScripts.length !== 1) {
  fail("expected exactly 1 script containing \"use strict\", found " + appScripts.length);
} else {
  const tmp = path.join(os.tmpdir(), "offtools_app_" + Date.now() + ".js");
  fs.writeFileSync(tmp, appScripts[0].body, "utf8");
  const res = spawnSync(process.execPath, ["--check", tmp], { encoding: "utf8" });
  fs.unlinkSync(tmp);
  if (res.status === 0) ok("app script parses (" + appScripts[0].body.length + " chars)");
  else fail("syntax error:\n" + (res.stderr || res.stdout));
}

// ---------- 2. JSON islands ----------
console.log("\n[2] JSON data islands");
for (const id of ISLANDS) {
  const re = new RegExp('<script type="application/json" id="' + id + '">([\\s\\S]*?)<\\/script>');
  const im = html.match(re);
  if (!im) { fail("island missing: " + id); continue; }
  try {
    const data = JSON.parse(im[1]);
    const size = Array.isArray(data) ? data.length + " items" : Object.keys(data).length + " keys";
    ok(id + " parses (" + size + ")");
  } catch (e) {
    fail(id + " invalid JSON: " + e.message);
  }
}

// ---------- 3. id cross-check ----------
console.log("\n[3] $('id') / getElementById cross-check");
const lookedUp = new Set();
const dollarRe = /\$\(\s*['"]([A-Za-z][\w-]*)['"]\s*\)/g;
const gebiRe = /getElementById\(\s*['"]([A-Za-z][\w-]*)['"]\s*\)/g;
const src = appScripts.length === 1 ? appScripts[0].body : html;
while ((m = dollarRe.exec(src)) !== null) lookedUp.add(m[1]);
while ((m = gebiRe.exec(src)) !== null) lookedUp.add(m[1]);
const definedIds = new Set();
const idRe = /\bid\s*=\s*["']([A-Za-z][\w-]*)["']/g;
while ((m = idRe.exec(html)) !== null) definedIds.add(m[1]);
const missing = [...lookedUp].filter((id) => !definedIds.has(id) && !ID_WHITELIST.has(id));
if (missing.length === 0) ok(lookedUp.size + " looked-up ids all resolve (cmdkKbd whitelisted)");
else fail("unresolved ids: " + missing.join(", "));
for (const w of ID_WHITELIST) {
  if (definedIds.has(w)) warn("whitelisted id '" + w + "' now EXISTS in markup \u2014 update whitelist/docs");
}

// ---------- 4. footer version + filename sync ----------
console.log("\n[4] Footer version / filename sync");
const verRe = /v(\d+\.\d+(?:-dev\d+)?) \u00b7 offline-first toolbox/g;
const versions = [];
while ((m = verRe.exec(html)) !== null) versions.push(m[1]);
if (versions.length !== 1) {
  fail("expected exactly 1 footer version string, found " + versions.length + (versions.length ? " (" + versions.join(", ") + ")" : ""));
} else {
  const ver = versions[0];
  ok("footer version: v" + ver);
  const fm = path.basename(file).match(/^off_(\d+)(?:-dev(\d+))?\.html$/);
  if (fm) {
    const expect = "0." + fm[1] + (fm[2] ? "-dev" + fm[2] : "");
    if (ver === expect) ok("filename sync: off_" + fm[1] + (fm[2] ? "-dev" + fm[2] : "") + ".html \u2194 v" + ver);
    else fail("filename implies v" + expect + " but footer says v" + ver);
  } else {
    ok("canonical filename (" + path.basename(file) + ") \u2014 no number sync to enforce");
  }
}

// ---------- 5. invariant markers ----------
console.log("\n[5] Invariant markers");
for (let i = 1; i <= 4; i++) {
  if (html.includes("PERSISTENCE " + i + "/4")) ok("PERSISTENCE " + i + "/4 present");
  else fail("PERSISTENCE " + i + "/4 marker missing");
}
if (html.includes("OFFLINE BOUNDARY")) ok("OFFLINE BOUNDARY marker present");
else fail("OFFLINE BOUNDARY marker missing");

// ---------- 6. div delta vs git HEAD ----------
console.log("\n[6] <div balance delta vs git HEAD");
const count = (s, needle) => s.split(needle).length - 1;
const curOpen = count(html, "<div");
const curClose = count(html, "</div");
const curDelta = curOpen - curClose;
try {
  const prev = execFileSync("git", ["show", "HEAD:" + file], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const prevDelta = count(prev, "<div") - count(prev, "</div");
  if (curDelta === prevDelta) {
    ok("delta unchanged (open-close = " + curDelta + ", raw " + curOpen + "/" + curClose + ")");
  } else {
    const msg = "div delta changed: HEAD=" + prevDelta + " now=" + curDelta + " \u2014 eyeball the markup (template-string fragments can be legit)";
    if (strict) fail(msg); else warn(msg);
  }
} catch (e) {
  warn("no git HEAD baseline (" + (e.message.split("\n")[0]) + ") \u2014 raw open/close: " + curOpen + "/" + curClose + ", delta " + curDelta);
}

// ---------- summary ----------
console.log("\n" + "\u2500".repeat(50));
if (failures) {
  console.log("RESULT: " + failures + " failure(s), " + warnings + " warning(s) \u2014 DO NOT SHIP");
  process.exit(1);
}
console.log("RESULT: all checks passed" + (warnings ? " with " + warnings + " warning(s)" : "") + ".");
process.exit(0);
