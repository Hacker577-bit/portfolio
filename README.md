# Muhammad Ahmad Adnan — Portfolio

Personal portfolio site. Single page, dark editorial layout, built with Next.js 16, React 19 and Tailwind CSS v4.

Live sections: Hero · About · Skills · Services · Projects · Experience · Achievements · Contact.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Requires Node 20.9+.

## Editing content

**All copy lives in [`lib/content.ts`](lib/content.ts).** Nothing user-facing is hardcoded in components, so you can update every project, skill, date and paragraph from that one file without touching JSX.

| Want to change | Edit |
| --- | --- |
| Name, tagline, bio, email, phone, socials | `profile` |
| About paragraph | `about` |
| Skill groups | `skills` |
| Service cards | `services` |
| Project cards (live + repo links) | `projects` |
| Coursework list | `academicProjects` |
| Work + education timeline | `timeline` |
| Numbered achievements | `achievements` |
| Certificate rail | `certificates` |

Bold words inside the hero and About paragraphs come from `{ text: "...", bold: true }` segments.

## Two files you must supply

Both are referenced by the site but are **not** in the repo:

1. **`public/ahmad.png`** — your portrait for the hero. Currently a generated placeholder that says "REPLACE ME". A portrait-orientation image around 900×1200 or larger works best; the hero crops from the top, so leave headroom.
2. **`public/Muhammad_Ahmad_Adnan_CV.pdf`** — powers the "Download Resume" button.

Filenames are set in `profile.photo` and `profile.resume` if you'd rather rename them.

## Placeholders to fill in

`profile.socials` in `lib/content.ts` has two empty URLs:

```ts
linkedin: "",   // left blank deliberately — see below
leetcode: "",   // empty = icon hidden
```

LinkedIn is blank because the URL couldn't be verified, and an unverified profile link could point at a stranger. Paste your real URLs in and the icons appear automatically — any entry left empty is filtered out of the icon rows rather than rendering a dead link.

Also worth a look:

- `profile.workingHours` is currently `"Mon – Sat : 10:00 AM – 8:00 PM (PKT)"` — a placeholder, not something taken from your CV. Change it to your actual hours.
- The Academic Project Portfolio lists **8** entries, because *Student Management System* was pulled from your `Python-Project` repo on top of the 7 in your CV. Your bio still says "7 academic software systems" — either drop that entry or bump the number so the two agree.
- No repo link is shown for Aitemaad or for the Lifeline Lahore blood-donation build: both repos are private, so the URLs 404 for visitors. Make them public and add the links back.

## Checks

```bash
npm run check:links      # every URL in lib/content.ts must still resolve
```

Run this before deploying and after renaming or redeploying any project. A portfolio's worst silent failure is a dead project link — the page looks perfect and the recruiter hits a 404. It retries once on network errors, and reports anti-bot statuses (LinkedIn answers bots with `999`) as warnings rather than failures.

```bash
npm run shoot 1440 950 d     # screenshot every section, desktop
npm run shoot 390 844 m      # ...and mobile
```

Drives headless Chrome over the DevTools protocol and writes one PNG per section to `E:\shots`. It scrolls with real wall-clock waits, because `--virtual-time-budget` stops `IntersectionObserver` reveals from firing, and it sets a realistic viewport, because a very tall one makes `100svh` stretch the hero and push every other section off-frame. Chrome's path is hardcoded at the top of `tools/shoot.mjs`.

## Structure

```
app/
  layout.tsx            fonts, metadata, nav, skip link
  page.tsx              all nine sections
  globals.css           design tokens (@theme), section/card/reveal styles
  opengraph-image.tsx   build-time link-preview card
components/
  Nav.tsx               desktop nav + mobile drawer, active-section tracking
  ScrollReveal.tsx      IntersectionObserver reveal-on-scroll
  ProjectCard.tsx       project card with <details> disclosure
  ContactForm.tsx       mailto composer
  Icons.tsx             inline SVGs, no icon dependency
lib/
  content.ts            every word on the site
tools/
  check-links.mjs       link-rot check
  shoot.mjs             CDP screenshot harness
```

## Design notes

- Tokens are defined in `app/globals.css` under `@theme` — colours (`--color-ink`, `--color-accent`, …) generate Tailwind utilities like `bg-ink` and `text-accent`. Fonts sit in a separate `@theme inline` block because they reference `next/font` variables.
- Muted text colours are contrast-checked: `--color-mute` is 7.2:1 and `--color-faint` 5.1:1 against the background.
- Scroll reveal is gated on `data-reveal="on"`, which only gets set once JS runs — if scripts fail, the page renders fully visible instead of blank.
- `prefers-reduced-motion: reduce` disables all animation and smooth scrolling.

## Deployment

Deploys to Vercel with no configuration. `metadataBase` reads `VERCEL_PROJECT_PRODUCTION_URL` at build time, so OG images resolve to the real domain automatically.

The `@next/swc-win32-x64-msvc` entry in `optionalDependencies` is a Windows-only native binary pinned because npm skipped it during a network failure. It's marked `os: win32`, so Linux builders ignore it.
