"use client";

import { useState } from "react";
import { profile } from "@/lib/content";
import { SendIcon } from "./Icons";

/**
 * Contact form that composes a prefilled email in the visitor's own mail client.
 *
 * ponytail: deliberately backend-free — no serverless function, no third-party
 * form service, no spam filtering to maintain. Ceiling: the visitor must have a
 * mail client configured, and nothing is logged on our side. Upgrade path is to
 * POST to Formspree (or a route handler) and keep this as the fallback.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Portfolio enquiry from ${name || "a visitor"}`;
    const body = `${message}\n\n—\nName: ${name}\nEmail: ${email}`;

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  const field =
    "w-full rounded-lg border border-glass bg-ink-3/60 px-4 py-3 text-sm text-white placeholder:text-faint transition-colors focus:border-accent/60 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="glass p-7 sm:p-8">
      <h3 className="font-display text-2xl font-semibold text-white">Send a Message</h3>
      <p className="mt-1 mb-6 text-sm text-faint">
        This opens your email app with the message ready to send.
      </p>

      <div className="grid gap-4">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-xs tracking-[0.12em] text-mute uppercase">
            Name
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
        </div>

        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-xs tracking-[0.12em] text-mute uppercase">
            Email
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
        </div>

        <div>
          <label htmlFor="cf-message" className="mb-1.5 block text-xs tracking-[0.12em] text-mute uppercase">
            Message
          </label>
          <textarea id="cf-message" name="message" required rows={5} className={`${field} resize-y`} placeholder="What would you like to build?" />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-accent-dim"
      >
        <SendIcon />
        Send Message
      </button>

      {/* Announced to screen readers when the handoff happens. */}
      <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm text-accent">
        {sent ? "Your email app should be open — press send there to reach me." : ""}
      </p>
    </form>
  );
}
