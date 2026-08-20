/**
 * Single source of truth for every piece of copy on the site.
 * Edit here, not in the components.
 *
 * Facts are drawn from: Muhammad_Ahmad_Adnan_CV.pdf, the GitHub repo READMEs
 * (github.com/Hacker577-bit), and the live Vercel deployments. Every `live`
 * URL below was verified to return HTTP 200.
 */

/** A run of prose; `bold` segments render in white against muted body text. */
export type Segment = { text: string; bold?: boolean };

export const profile = {
  // Hero renders `nameLead` solid and `nameTail` as an outlined word.
  fullName: "Muhammad Ahmad Adnan",
  nameLead: "AHMAD",
  nameTail: "ADNAN",
  greeting: "HI, I'M",
  tagline: "Shipping Real Software, Not Just Submissions",
  roles: ["FULL-STACK ENGINEER", "CS UNDERGRADUATE"],
  bio: [
    { text: "A CS undergraduate at UET Lahore and freelance engineer building production systems that blend " },
    { text: "Full-Stack Web Development", bold: true },
    { text: ", " },
    { text: "AI-Powered Applications", bold: true },
    { text: ", and " },
    { text: "Real Client Delivery.", bold: true },
    { text: " In three semesters I've delivered 7 academic software systems and 7 live deployments for real clients and organizations. I don't wait to graduate to start building." },
  ] as Segment[],
  availability: "AVAILABLE FOR INTERNSHIPS & FREELANCE WORK",
  email: "m.ahmadadnan9999@gmail.com",
  phone: "+92 325 8253979",
  phoneHref: "+923258253979",
  location: "Lahore, Punjab, Pakistan",
  workingHours: "Mon – Sat : 10:00 AM – 8:00 PM (PKT)",
  resume: "/Muhammad_Ahmad_Adnan_CV.pdf",
  photo: "/ahmad.png",
  socials: {
    github: "https://github.com/Hacker577-bit",
    linkedin: "https://www.linkedin.com/in/muhammad-ahmad-adnan-108a04328",
    // Empty values are filtered out, so no icon renders for these.
    leetcode: "",
  },
};

export const about: Segment[] = [
  { text: "I'm a Computer Science undergraduate at " },
  { text: "UET Lahore", bold: true },
  { text: " who learns by shipping. Alongside my degree I work as a freelance full-stack engineer, delivering deployed web applications for startups, university societies and hackathons — not prototypes that stop at a submission folder." },
  { text: " My work sits where " },
  { text: "Full-Stack Engineering", bold: true },
  { text: " meets " },
  { text: "Applied AI", bold: true },
  { text: " — Next.js and React on the front, Flask, FastAPI and Postgres behind it, and LLM-backed features layered in where they earn their place. I care about software that real people actually use: fast, accessible, and honest about its limits." },
];

export const skills = [
  {
    title: "Languages",
    items: ["Python", "C++", "C#", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frameworks & Tools",
    items: ["Next.js", "React", "Flask", "FastAPI", "Tailwind CSS", "Prisma", "Git", "Vercel"],
  },
  {
    title: "Core Knowledge",
    items: [
      "Data Structures & Algorithms",
      "REST API Development",
      "OOP & System Design",
      "Database Design",
      "Windows Forms",
      "Prompt Engineering",
    ],
  },
];

export const services = [
  {
    title: "Full-Stack Web Development",
    blurb: "End-to-end web applications, from first wireframe to a live production URL.",
    tech: "Next.js, React, TypeScript, Tailwind CSS",
  },
  {
    title: "Backend & REST APIs",
    blurb: "Clean, documented APIs with real validation and error handling behind them.",
    tech: "Flask, FastAPI, Python, Node.js",
  },
  {
    title: "Database Design",
    blurb: "Normalized schemas, migrations and query design that survive real traffic.",
    tech: "PostgreSQL, MySQL, Prisma, Neon",
  },
  {
    title: "E-Commerce Builds",
    blurb: "Storefronts with cart, checkout, order management and an admin dashboard.",
    tech: "Next.js, Postgres, payment & WhatsApp handoff",
  },
  {
    title: "AI-Powered Features",
    blurb: "LLM and NLP features integrated into products, with offline fallbacks.",
    tech: "LLM APIs, spaCy, scikit-learn, prompt engineering",
  },
  {
    title: "Desktop Applications",
    blurb: "Windows desktop tools for billing, inventory and record management.",
    tech: "C#, Windows Forms, .NET, GDI+",
  },
];

export type ProjectLink = { label: string; href: string; primary?: boolean };

export type Project = {
  period: string;
  name: string;
  tagline?: string;
  associated?: string;
  body: string[];
  tech: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    period: "2026",
    name: "Aitemaad · اعتماد",
    tagline: "AI-assisted SME loan intelligence for Pakistan's commercial banks",
    associated: "UBL National Innovation Hackathon 2026",
    body: [
      "Turns a 40–60 page SME loan file into a single explainable one-page memo, so a loan officer can make an auditable decision in minutes instead of weeks.",
      "Applicant side: a business owner checks their own Trust Score from real earnings through a guided web flow or a WhatsApp-first conversation, then submits to the bank.",
      "Officer side: a password-gated workspace where submissions arrive as ranked, scored dossiers with diverging SHAP-style factor bars, verification checks, parsed cashflow and an AI-drafted credit memo — the human still makes the final call.",
      "Bilingual and Urdu-first, with A/B/C/D tiering, affordability-driven facility amounts, and light + dark themes on a deep-navy and gold design system.",
    ],
    tech: ["Vite", "React 19", "React Router", "Tailwind CSS v4", "Explainable AI"],
    links: [{ label: "View Live Site", href: "https://aitemaad.vercel.app", primary: true }],
  },
  {
    period: "2026",
    name: "Chess — Play, Learn & Practice",
    tagline: "An offline-first PWA that teaches openings, middlegame and endgame theory",
    body: [
      "Built to close the gap for beginners who know how the pieces move but have never been taught opening, middlegame or endgame theory.",
      "Play against a built-in minimax bot or a friend locally. Every move is analysed in the background and classified best / good / inaccuracy / mistake / blunder, and blunders can be replayed in slow motion with an arrow showing the better move.",
      "Guided lessons step through positions move by move, with themed openings and endgame drills. A local Elo-style rating with a confidence band and per-category mastery rings track opening, tactics, endgame, king safety and blunders.",
      "A service worker precaches the whole app, so it plays with no network after first load. Built using GitHub Copilot's cloud agent workflow with the BMAD Method for spec-driven development.",
    ],
    tech: ["React", "TypeScript", "Vite", "PWA", "Minimax", "DSA"],
    links: [
      { label: "View Live Site", href: "https://chess-ahmad-works.vercel.app", primary: true },
      { label: "View on GitHub", href: "https://github.com/Hacker577-bit/chess" },
    ],
  },
  {
    period: "2026",
    name: "AI Interview Copilot",
    tagline: "Realistic, interactive mock interview practice for job seekers",
    body: [
      "An AI-powered web app that helps job seekers rehearse under realistic interview conditions instead of reading question lists.",
      "Interactive mock-interview flow with session history, built on a Postgres schema via Prisma and an accessible Radix UI component layer.",
      "Deliberately distraction-free UX so candidates stay focused on answering, plus a companion Flask service for the AI interview logic.",
      "Built and deployed end-to-end, from UI through backend logic, live on Vercel.",
    ],
    tech: ["Next.js", "TypeScript", "Prisma", "Postgres", "Radix UI", "Flask"],
    links: [
      { label: "View Live Site", href: "https://ai-interview-helper-three.vercel.app", primary: true },
      { label: "View on GitHub", href: "https://github.com/Hacker577-bit/AI-Interview-Helper" },
    ],
  },
  {
    period: "2026",
    name: "AI Resume Screener",
    tagline: "Tiered resume screening that runs fully offline or upgrades to an LLM",
    body: [
      "Upload resumes as PDF, DOCX or TXT, paste a job description, and get extracted skills, transparent match scores and a ranked candidate list with CSV and PDF export.",
      "The engine detects its own capabilities at runtime and degrades gracefully, so one codebase runs fully locally and still deploys slim to serverless: a hand-rolled TF-IDF baseline, a richer spaCy and scikit-learn tier, then optional LLM semantic scoring with a written rationale.",
      "Text extraction handles digital PDFs via pdfplumber and DOCX tables and paragraphs, with an OCR fallback for scanned files. Skill identification runs against a curated 150+ skill taxonomy with alias and fuzzy matching.",
      "Scores are a transparent composite of skill coverage, TF-IDF similarity and keyword salience — every number can be traced back to a signal.",
    ],
    tech: ["Python", "FastAPI", "spaCy", "scikit-learn", "pdfplumber", "OCR"],
    links: [
      { label: "View Live Site", href: "https://ai-resume-screener-taupe.vercel.app", primary: true },
      { label: "View on GitHub", href: "https://github.com/Hacker577-bit/ai-resume-screener" },
    ],
  },
  {
    period: "2026",
    name: "Blood Donation Society",
    tagline: "Area-based donor matching for UET's Blood Donation Society",
    associated: "Blood Donation Society, UET Lahore",
    body: [
      "A donor availability platform connecting blood recipients and hospitals with eligible donors across Lahore localities in real time.",
      "Shipped in two builds. The current one runs entirely inside a single Next.js app on Vercel, with Supabase Postgres behind row-level security and Meta's official WhatsApp Cloud API sending interactive donor alerts — donors accept or decline straight from a WhatsApp button, handled by a webhook.",
      "The earlier build, Lifeline Lahore, takes a different route: one-tap Google sign-in via NextAuth so there are no OTP or SMS costs, Prisma and PostgreSQL for storage, Upstash Redis for rate limiting, and a dual Twilio SMS plus SendGrid email notification path — covered by 180 tests.",
      "Both are mobile-first, because the people using this are on a phone in a hurry.",
    ],
    tech: ["Next.js 16", "TypeScript", "Prisma", "Supabase", "WhatsApp Cloud API", "Twilio", "SendGrid"],
    links: [
      { label: "Live · WhatsApp Build", href: "https://blood-donation-app-4ael.vercel.app", primary: true },
      { label: "Live · Lifeline Lahore", href: "https://blood-donation-society-self.vercel.app", primary: true },
      { label: "GitHub · WhatsApp Build", href: "https://github.com/Hacker577-bit/Blood-Donation-App" },
      // No repo link for the Lifeline Lahore build: Hacker577-bit/Blood-Donation-Society
      // is a private repo, so the URL 404s for visitors. Make it public to add it back.
    ],
  },
  {
    period: "2026",
    name: "Zenv Decor",
    tagline: "A deployed e-commerce storefront for a decor startup client",
    associated: "Zenv Decor (client work)",
    body: [
      "A full storefront for artificial plants, trees and botanical decor, built and delivered end-to-end for a startup client — product catalog through checkout and order management.",
      "Cart state lives in Zustand and persists to localStorage. Checkout supports cash on delivery and JazzCash / EasyPaisa, then hands a formatted order off to WhatsApp or email.",
      "Orders are stored in Neon Postgres behind a password-protected /admin dashboard, so the client manages their own fulfilment without touching code.",
      "Scroll-reveal and hover motion via Framer Motion, on a custom warm forest and terracotta palette.",
    ],
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Zustand", "Neon Postgres"],
    links: [
      { label: "View Live Site", href: "https://zenvdecor.vercel.app", primary: true },
      { label: "View on GitHub", href: "https://github.com/Hacker577-bit/zenvdecor" },
    ],
  },
];

export type AcademicProject = {
  name: string;
  detail: string;
  meta: string;
  tech: string;
  href?: string;
};

export const academicProjects: AcademicProject[] = [
  {
    name: "AeroLink — DSA-Powered Airline Platform",
    detail: "Graph-based route search, min-heap seat priority and BST flight scheduling in a Flask web app.",
    meta: "Sem 3 · 2025",
    tech: "Python, Flask",
  },
  {
    name: "Faculty Workload & Resource Allocation System",
    detail: "Constraint-based faculty scheduling over a 6-table normalized MySQL schema.",
    meta: "Sem 2 · 2024",
    tech: "C#, MySQL",
  },
  {
    name: "Supermarket Management System",
    detail: "Real-time billing and inventory management with full CRUD and soft-delete.",
    meta: "Sem 2 · 2024",
    tech: "C#, MySQL",
  },
  {
    name: "Fast Track — Airline Management System",
    detail: "Re-architected from procedural C++ to OOP C#, cutting code duplication by roughly 60%.",
    meta: "Sem 1–2 · 2023–24",
    tech: "C++, C#",
  },
  {
    name: "Tank War — 2D Game Engine",
    detail: "Real-time physics engine written from scratch with no game library.",
    meta: "Sem 1 · 2023",
    tech: "C++",
  },
  {
    name: "Ping Pong — Multiplayer Desktop Game",
    detail: "60 FPS WinForms game with angle-based ball physics.",
    meta: "Sem 2 · 2024",
    tech: "C#, GDI+",
  },
  {
    name: "Enterprise Network Design",
    detail: "3-tier network topology with inter-VLAN routing and OSPF across 4 routers and 8 switches.",
    meta: "Sem 3 · 2025",
    tech: "Cisco Packet Tracer",
  },
  {
    name: "Student Management System",
    detail: "Record management system with full CRUD over a persistent store.",
    meta: "Python",
    tech: "Python",
    href: "https://github.com/Hacker577-bit/Python-Project",
  },
];

export const timeline = [
  {
    period: "2025 — Present",
    role: "Freelance Full-Stack Engineer",
    org: "Self-employed · Remote",
    place: "Lahore, Pakistan",
    body: "Design, build and deploy full-stack web applications for startup clients, university societies and hackathons. Seven live deployments to date across Next.js, React, Flask and FastAPI, with PostgreSQL and MySQL behind them.",
    tag: "Full-Stack Delivery",
  },
  {
    period: "6 Months",
    role: "Data Entry Operator",
    org: "Unique Group of Institutes · Part-time",
    place: "Lahore, Pakistan",
    body: "Maintained accurate student enrollment records across multiple classes and campuses — compiling contact, section and admission data, preparing administrative reporting lists, and cross-checking records against source documents to correct discrepancies. Handled sensitive student information in line with institute confidentiality policy.",
    tag: "Data Management",
  },
  {
    period: "2024 — Present",
    role: "B.Sc. Computer Science",
    org: "University of Engineering & Technology (UET), Lahore",
    place: "Roll No: 2024-CS-105",
    body: "Core coursework in data structures and algorithms, object-oriented programming, database systems and computer networks — each semester's project shipped as working software rather than a report.",
    tag: "Computer Science",
  },
  {
    period: "Intermediate",
    role: "Pre-Engineering",
    org: "Government College University, Lahore",
    place: "Score: 1058 / 1200",
    body: "Completed intermediate studies with a focus on mathematics and physics.",
    tag: "Pre-Engineering",
  },
  {
    period: "Matriculation",
    role: "Science",
    org: "The Educators, Sahar Campus",
    place: "Score: 1038 / 1100",
    body: "Completed matriculation in the science stream.",
    tag: "Science",
  },
];

export const achievements = [
  {
    n: "01",
    title: "Hackathon & Competition Track Record",
    body: "Competed in the UBL National Innovation Hackathon 2026 (building Aitemaad), the UTS 6.0 Coding Competition at the ACM UET Technical Summit, Speed Programming at XR Hackathon 3.0 hosted by Forman Christian College, and the ITEC 25 AI Web Hackathon run by UET Lahore's Department of Computer Science with the IEEE Lahore Section.",
  },
  {
    n: "02",
    title: "Google AI Essentials Specialization",
    body: "Completed all five courses of Google's AI Essentials specialization on Coursera in September 2025, covering practical AI workflows, prompt design and responsible AI use.",
  },
  {
    n: "03",
    title: "One Million Prompters",
    body: "Certified by the Dubai Future Foundation's One Million Prompters programme in AI prompt engineering — applied directly in the tiered LLM engine behind AI Resume Screener and the AI-drafted credit memos in Aitemaad.",
  },
];

export const certificates = [
  { title: "Google AI Essentials Specialization", issuer: "Coursera · 5 courses", year: "Sep 2025" },
  { title: "One Million Prompters — AI Prompt Engineering", issuer: "Dubai Future Foundation", year: "2025" },
  { title: "Coding Competition — UTS 6.0", issuer: "ACM UET Student Chapter", year: "2025" },
  { title: "Speed Programming — XR Hackathon 3.0", issuer: "FCC Computer Science Club", year: "2025" },
  { title: "AI Web Hackathon — ITEC 25", issuer: "Dept. of CS, UET Lahore & IEEE Lahore Section", year: "Feb 2025" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
