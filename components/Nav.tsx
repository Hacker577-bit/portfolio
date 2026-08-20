"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/lib/content";

/**
 * Fixed navigation: an inline link row on desktop, a full-screen drawer on
 * mobile. Highlights whichever section is currently in view.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [solid, setSolid] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Track the section in view so the matching nav link can be marked current.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the viewport among those visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Give the bar a backdrop once the hero is behind it.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the drawer is open: lock page scroll and let Escape close it.
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid ? "border-b border-glass bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <a
            href="#hero"
            className="font-display text-lg font-bold tracking-wide whitespace-nowrap text-white"
            aria-label="Back to top"
          >
            {profile.wordmark}
            <span className="text-accent">.</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`text-[0.82rem] tracking-[0.12em] uppercase transition-colors ${
                        isActive ? "text-accent" : "text-faint hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-[2px] w-6 bg-white transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-white transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-white transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer. Kept mounted so the slide transition can play both ways;
          hidden from assistive tech and from tabbing while closed. */}
      <div
        id="mobile-nav"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-ink/97 backdrop-blur-lg transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex h-full flex-col items-center justify-center gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              className={`font-display text-3xl font-semibold text-white transition-all duration-500 hover:text-accent ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
