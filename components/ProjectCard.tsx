import type { Project } from "@/lib/content";
import { ExternalIcon, GitHubIcon } from "./Icons";

/**
 * One project card: period, name, tagline, association, write-up, tech tags and
 * links. The write-up past the first paragraph sits behind a native <details>
 * disclosure — keyboard accessible and zero JS.
 */
export default function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const [lead, ...rest] = project.body;

  return (
    <article className="glass reveal p-7 sm:p-9" data-delay={delay}>
      <header>
        <p className="text-xs tracking-[0.18em] text-accent uppercase">{project.period}</p>

        <h3 className="mt-2 font-display text-2xl leading-tight font-bold text-white sm:text-[1.75rem]">
          {project.name}
        </h3>

        {project.tagline && (
          <p className="mt-1.5 font-display text-base text-faint italic">{project.tagline}</p>
        )}

        {project.associated && (
          <p className="mt-3 text-sm text-mute">
            <span className="text-faint">Associated with</span> {project.associated}
          </p>
        )}
      </header>

      <p className="mt-5 text-[0.94rem] leading-relaxed text-mute">{lead}</p>

      {rest.length > 0 && (
        <details className="group mt-3">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-accent uppercase transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Read more</span>
            <span className="hidden group-open:inline">Show less</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="transition-transform duration-300 group-open:rotate-180"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </summary>

          <div className="mt-3 grid gap-3">
            {rest.map((para) => (
              <p key={para} className="text-[0.94rem] leading-relaxed text-mute">
                {para}
              </p>
            ))}
          </div>
        </details>
      )}

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li key={t} className="tech-tag">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap gap-3">
        {project.links.map((link) => {
          const isRepo = link.href.includes("github.com");
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                link.primary
                  ? "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[0.7rem] font-semibold tracking-[0.12em] text-ink uppercase transition-colors hover:bg-accent-dim"
                  : "inline-flex items-center gap-2 rounded-full border border-glass px-5 py-2.5 text-[0.7rem] font-semibold tracking-[0.12em] text-mute uppercase transition-colors hover:border-accent/50 hover:text-white"
              }
            >
              {isRepo ? <GitHubIcon size={14} /> : <ExternalIcon size={13} />}
              {link.label}
            </a>
          );
        })}
      </div>
    </article>
  );
}
