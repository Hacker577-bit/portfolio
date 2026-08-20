/**
 * Minimal CDP screenshot harness — no Playwright, no Puppeteer.
 *
 * Launches headless Chrome with remote debugging, sets a REALISTIC viewport
 * (so 100svh behaves), scrolls to each section with real wall-clock waits so
 * IntersectionObserver reveals actually fire, and captures each one.
 *
 * Usage: node tools/shoot.mjs <width> <height> <outPrefix>
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const [width, height, prefix] = [
  Number(process.argv[2] ?? 1440),
  Number(process.argv[3] ?? 950),
  process.argv[4] ?? "shot",
];

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9333;
const URL_BASE = "http://localhost:3000";
const OUT = "E:\\shots";

const SECTIONS = ["hero", "about", "skills", "services", "projects", "experience", "achievements", "contact"];

mkdirSync(OUT, { recursive: true });

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    `--user-data-dir=${process.env.TEMP}\\cdp-profile-${PORT}`,
    `--window-size=${width},${height}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

/** Poll until DevTools answers, then return the page target's WS URL. */
async function targetUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await fetch(`http://localhost:${PORT}/json/list`).then((r) => r.json());
      const page = list.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(300);
  }
  throw new Error("DevTools never came up");
}

const ws = new WebSocket(await targetUrl());
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let seq = 0;
const pending = new Map();
const events = new Map();

ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else if (msg.method) {
    events.get(msg.method)?.forEach((fn) => fn(msg.params));
  }
};

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

const once = (method) =>
  new Promise((resolve) => {
    const list = events.get(method) ?? [];
    const fn = (p) => {
      events.set(method, (events.get(method) ?? []).filter((f) => f !== fn));
      resolve(p);
    };
    events.set(method, [...list, fn]);
  });

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 700,
});

const loaded = once("Page.loadEventFired");
await send("Page.navigate", { url: URL_BASE });
await loaded;
await sleep(2500); // fonts + next/image decode

const evaluate = (expression) =>
  send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });

const docHeight = (await evaluate("document.documentElement.scrollHeight")).result.value;
console.log(`viewport ${width}x${height} · document height ${docHeight}px`);

for (const id of SECTIONS) {
  // Instant jump so the wait afterwards is entirely reveal-transition time.
  const ok = (
    await evaluate(`(() => {
      const el = document.getElementById(${JSON.stringify(id)});
      if (!el) return false;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 8, behavior: 'instant' });
      return true;
    })()`)
  ).result.value;

  if (!ok) {
    console.log(`  MISSING SECTION: #${id}`);
    continue;
  }

  await sleep(1400); // reveal stagger (max ~300ms) + 700ms transition + slack

  const { data } = await send("Page.captureScreenshot", { format: "png" });
  const file = `${OUT}\\${prefix}-${id}.png`;
  writeFileSync(file, Buffer.from(data, "base64"));
  console.log(`  ${file}`);
}

// Report any console errors the page threw.
const errs = (
  await evaluate("JSON.stringify(window.__errs ?? [])")
).result.value;
if (errs && errs !== "[]") console.log("PAGE ERRORS:", errs);

ws.close();
chrome.kill();
