"use client";

import { useEffect } from "react";

/**
 * Reveals every `.reveal` element on the page as it scrolls into view.
 *
 * Mount once, near the root. It flags the document with data-reveal="on" so the
 * CSS only hides elements when this component is actually running — without
 * that gate, a JS failure would leave the whole page invisible.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) return; // CSS already shows everything; nothing to animate.

    root.dataset.reveal = "on";

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // Stagger siblings so a grid cascades instead of popping at once.
          const delay = Number(entry.target.getAttribute("data-delay") ?? 0);
          window.setTimeout(() => entry.target.classList.add("in"), delay);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      delete root.dataset.reveal;
    };
  }, []);

  return null;
}
