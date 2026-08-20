import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import { profile } from "@/lib/content";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description =
  "Muhammad Ahmad Adnan — full-stack engineer and CS undergraduate at UET Lahore. Next.js, React, Flask, FastAPI and PostgreSQL, with seven live production deployments.";

/**
 * Absolute base for OG/Twitter image URLs. Vercel injects the production domain
 * at build time, so the link preview points at the real site without hardcoding
 * a domain here. Falls back to localhost for `next dev`.
 */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.fullName} | Full-Stack Engineer`,
  description,
  keywords: [
    "Muhammad Ahmad Adnan",
    "full-stack engineer",
    "Next.js developer",
    "UET Lahore",
    "Pakistan web developer",
    "React",
    "Flask",
    "FastAPI",
  ],
  authors: [{ name: profile.fullName, url: profile.socials.github }],
  openGraph: {
    title: `${profile.fullName} | Full-Stack Engineer`,
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} | Full-Stack Engineer`,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        {/* First stop for keyboard and screen-reader users. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-xs focus:font-semibold focus:tracking-widest focus:text-ink focus:uppercase"
        >
          Skip to content
        </a>
        <Nav />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
