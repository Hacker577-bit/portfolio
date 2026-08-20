/**
 * Link check: every external URL in lib/content.ts must still resolve.
 *
 * A portfolio's worst silent failure is a dead project link — the page looks
 * fine and the recruiter hits a 404. Run this before deploying, and any time a
 * project is renamed or redeployed.
 *
 *   node tools/check-links.mjs
 *
 * Exits non-zero if anything fails, so it works as a CI/pre-deploy gate.
 * Deliberately regex-based rather than importing the module: it catches every
 * URL in the file regardless of which export it lives under.
 */
import { readFile } from "node:fs/promises";

const SOURCE = new URL("../lib/content.ts", import.meta.url);
const TIMEOUT_MS = 20_000;

const text = await readFile(SOURCE, "utf8");
const urls = [...new Set(text.match(/https?:\/\/[^\s"'`]+/g) ?? [])].sort();

if (urls.length === 0) {
  console.error("FAIL: no URLs found in lib/content.ts — did the file move?");
  process.exit(1);
}

console.log(`Checking ${urls.length} URLs from lib/content.ts\n`);

async function attempt(url) {
  const signal = AbortSignal.timeout(TIMEOUT_MS);
  try {
    // Some hosts (GitHub included) reject or mishandle HEAD; GET is the honest test.
    const res = await fetch(url, { redirect: "follow", signal });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: err.name === "TimeoutError" ? "timeout" : "fetch failed" };
  }
}

/**
 * Some sites answer bots with a challenge status rather than serving the page.
 * That is not a dead link, so it's reported as a warning instead of a failure.
 */
const ANTI_BOT = new Set([401, 403, 405, 429, 999]);

async function check(url) {
  let result = await attempt(url);

  // Retry once on a transport-level failure — a single flaky DNS or TLS hiccup
  // shouldn't report a healthy link as dead.
  if (!result.ok && typeof result.status === "string") {
    await new Promise((r) => setTimeout(r, 1500));
    result = await attempt(url);
  }

  const warn = !result.ok && ANTI_BOT.has(result.status);
  return { url, ...result, warn };
}

const results = await Promise.all(urls.map(check));

for (const { url, ok, status, warn } of results) {
  const tag = ok ? "  ok  " : warn ? " warn " : " FAIL ";
  console.log(`${tag} ${String(status).padEnd(12)} ${url}`);
}

const failed = results.filter((r) => !r.ok && !r.warn);
const warned = results.filter((r) => r.warn);

console.log(`\n${results.filter((r) => r.ok).length}/${results.length} reachable`);
if (warned.length > 0) {
  console.log(`${warned.length} blocked the checker (likely anti-bot) — verify by hand.`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} dead link(s) — fix lib/content.ts before deploying.`);
  process.exit(1);
}

console.log("All links good.");
