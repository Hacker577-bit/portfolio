import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import {
  ClockIcon,
  DownloadIcon,
  ExternalIcon,
  FolderIcon,
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/Icons";
import {
  about,
  academicProjects,
  achievements,
  certificates,
  profile,
  projects,
  services,
  skills,
  timeline,
  type Segment,
} from "@/lib/content";

/* ---------------------------------------------------------------- helpers */

/** Renders a Segment[] with the bold runs lifted to white. */
function Prose({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        seg.bold ? (
          <strong key={i} className="font-semibold text-white">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}

function SectionHead({
  title,
  sub,
  align = "center",
}: {
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={`reveal ${centered ? "text-center" : ""}`}>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub mt-2">{sub}</p>}
      <div className={`section-rule mt-5 ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}

/** Social links, minus any whose URL hasn't been filled in yet. */
const socialLinks = [
  { key: "github", label: "GitHub", href: profile.socials.github, Icon: GitHubIcon },
  { key: "linkedin", label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedInIcon },
  { key: "leetcode", label: "LeetCode", href: profile.socials.leetcode, Icon: LeetCodeIcon },
].filter((s) => s.href.length > 0);

function SocialRow({ size = 18 }: { size?: number }) {
  return (
    <ul className="flex items-center gap-3">
      {socialLinks.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-glass text-mute transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Icon size={size} />
          </a>
        </li>
      ))}
      <li>
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-glass text-mute transition-colors hover:border-accent/50 hover:text-accent"
        >
          <MailIcon size={size} />
        </a>
      </li>
    </ul>
  );
}

/* ------------------------------------------------------------------- page */

export default function Home() {
  return (
    <main id="main">
      {/* ============================== HERO ============================== */}
      <section
        id="hero"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-deep pt-28 pb-16 lg:min-h-[700px]"
      >
        {/* Ambient wash, standing in for the reference site's full-bleed photo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 78% 38%, rgba(34,197,94,0.10), transparent 70%), radial-gradient(45% 45% at 10% 8%, rgba(255,255,255,0.04), transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div className="max-w-[640px]">
              <p
                className="fade-up font-display text-sm tracking-[0.2em] text-accent uppercase"
                style={{ animationDelay: "0.1s" }}
              >
                {profile.tagline}
              </p>

              <p className="fade-up mt-7 text-xs tracking-[0.3em] text-faint" style={{ animationDelay: "0.2s" }}>
                {profile.greeting}
              </p>

              <h1 className="hero-name fade-up mt-2" style={{ animationDelay: "0.35s" }}>
                {profile.nameLead} <span className="name-outline">{profile.nameTail}</span>
              </h1>

              <p
                className="fade-up mt-4 text-[0.8rem] tracking-[0.2em] text-white uppercase sm:text-sm"
                style={{ animationDelay: "0.5s" }}
              >
                {profile.roles.join("  |  ")}
              </p>

              <p
                className="fade-up mt-6 max-w-[560px] text-[0.95rem] leading-relaxed text-mute"
                style={{ animationDelay: "0.65s" }}
              >
                <Prose segments={profile.bio} />
              </p>

              <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.8s" }}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.72rem] font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-accent-dim"
                >
                  <FolderIcon />
                  View Projects
                </a>
                <a
                  href={profile.resume}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-glass px-6 py-3.5 text-[0.72rem] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <DownloadIcon />
                  Download Resume
                </a>
              </div>

              <div className="fade-up mt-10 flex items-center gap-3" style={{ animationDelay: "0.95s" }}>
                <span className="text-[0.68rem] tracking-[0.24em] text-faint uppercase">Connect with me</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="h-px w-16 bg-linear-to-r from-accent to-transparent" />
              </div>

              <div className="fade-up mt-5" style={{ animationDelay: "1.05s" }}>
                <SocialRow />
              </div>

              <a
                href={`mailto:${profile.email}`}
                className="fade-up mt-8 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-[0.68rem] tracking-[0.16em] text-accent uppercase transition-colors hover:bg-accent/20"
                style={{ animationDelay: "1.15s" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {profile.availability}
              </a>
            </div>

            {/* Portrait. Sized close to the source image's native 362x370 so it
                stays sharp — the supplied photo is an avatar-sized circular
                crop, not a full-height studio shot. */}
            <div
              className="fade-up relative mx-auto w-fit shrink-0 lg:mx-0"
              style={{ animationDelay: "0.45s" }}
            >
              <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-accent/10 blur-3xl" />
              <div aria-hidden="true" className="absolute -inset-4 rounded-full border border-accent/15" />
              <div className="relative h-[250px] w-[250px] overflow-hidden rounded-full border border-white/10 ring-1 ring-accent/25 sm:h-[300px] sm:w-[300px] lg:h-[350px] lg:w-[350px]">
                <Image
                  src={profile.photo}
                  alt={`${profile.fullName} — portrait`}
                  fill
                  /* LCP element, so it earns a real <link rel=preload>.
                     Note `priority` is deprecated as of Next 16. */
                  preload
                  sizes="(max-width: 640px) 250px, (max-width: 1024px) 300px, 350px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= ABOUT ============================= */}
      <section id="about" className="section-glow relative border-t border-glass bg-ink py-24 sm:py-28">
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
          <SectionHead title="About Me" />
          <div className="reveal mx-auto mt-12 max-w-[820px] text-center" data-delay="80">
            <p className="text-base leading-[1.9] text-mute sm:text-[1.05rem]">
              <Prose segments={about} />
            </p>
            <div className="mt-10 flex justify-center">
              <SocialRow />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ SKILLS ============================ */}
      <section id="skills" className="border-t border-glass bg-ink-2 py-24 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <SectionHead title="My Expertise" sub="The tools I reach for" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {skills.map((group, i) => (
              <div key={group.title} className="glass reveal p-7" data-delay={i * 100}>
                <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                <div className="section-rule mt-3 !w-10" />
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="tech-tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== SERVICES =========================== */}
      <section id="services" className="section-glow relative border-t border-glass bg-ink py-24 sm:py-28">
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
          <SectionHead title="My Services" sub="What I Can Do" />

          <div className="reveal mt-8 flex justify-center" data-delay="60">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 text-[0.72rem] font-semibold tracking-[0.14em] text-accent uppercase transition-colors hover:bg-accent hover:text-ink"
            >
              Want Service?
            </a>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <div key={service.title} className="glass reveal p-7" data-delay={(i % 3) * 90}>
                <h3 className="text-[0.82rem] font-semibold tracking-[0.12em] text-white uppercase">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{service.blurb}</p>
                <p className="mt-5 text-sm text-faint">
                  <span className="font-semibold text-white">Technologies:</span> {service.tech}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== PROJECTS =========================== */}
      <section id="projects" className="border-t border-glass bg-ink-2 py-24 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <SectionHead title="Selected Projects" sub="Built, deployed, and live" />

          <div className="mt-14 grid gap-7">
            {projects.map((project, i) => (
              <ProjectCard key={project.name} project={project} delay={i === 0 ? 0 : 60} />
            ))}
          </div>

          {/* Academic work — same section, lighter treatment. */}
          <div className="mt-24">
            <SectionHead title="Academic Project Portfolio" sub="Coursework shipped as working software" />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {academicProjects.map((project, i) => (
                <li key={project.name} className="glass reveal p-6" data-delay={(i % 2) * 80}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[0.95rem] font-semibold text-white">{project.name}</h3>
                    <span className="shrink-0 text-[0.68rem] tracking-[0.1em] whitespace-nowrap text-accent uppercase">
                      {project.meta}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-mute">{project.detail}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="tech-tag">{project.tech}</span>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.12em] text-accent uppercase hover:text-white"
                      >
                        <GitHubIcon size={13} />
                        Repo
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========================== EXPERIENCE ========================== */}
      <section id="experience" className="section-glow relative border-t border-glass bg-ink py-24 sm:py-28">
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
          <SectionHead title="Experience & Education" />

          <ol className="relative mt-14 ml-1 border-l border-glass pl-8 sm:ml-4 sm:pl-12">
            {timeline.map((entry, i) => (
              <li key={entry.role + entry.org} className="reveal relative pb-12 last:pb-0" data-delay={i * 70}>
                {/* Node on the spine. */}
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-ink sm:-left-[calc(3rem+5px)]"
                />
                <p className="text-[0.7rem] tracking-[0.16em] text-accent uppercase">{entry.period}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">{entry.role}</h3>
                <p className="mt-1 text-sm text-mute">{entry.org}</p>
                <p className="mt-0.5 text-sm text-faint">{entry.place}</p>
                <p className="mt-4 max-w-[720px] text-[0.94rem] leading-relaxed text-mute">{entry.body}</p>
                <span className="tech-tag mt-4 inline-block">{entry.tag}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ========================= ACHIEVEMENTS ========================= */}
      <section id="achievements" className="border-t border-glass bg-ink-2 py-24 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <SectionHead title="Achievements & Certificates" />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {achievements.map((item, i) => (
              <div key={item.n} className="glass reveal p-7" data-delay={i * 100}>
                <span className="font-display text-4xl font-bold text-accent/40">{item.n}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Certificate Vault */}
          <div className="mt-20">
            <h3 className="reveal font-display text-2xl font-bold text-white">Certificate Vault</h3>
            <div className="section-rule reveal mt-4" />

            <ul className="rail reveal mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4" data-delay="80">
              {certificates.map((cert) => (
                <li
                  key={cert.title}
                  className="glass flex min-h-[190px] w-[290px] shrink-0 snap-start flex-col justify-between p-6"
                >
                  <div>
                    <p className="text-[0.68rem] tracking-[0.16em] text-accent uppercase">{cert.year}</p>
                    <h4 className="mt-3 text-[0.95rem] leading-snug font-semibold text-white">{cert.title}</h4>
                  </div>
                  <p className="mt-4 text-sm text-faint">{cert.issuer}</p>
                </li>
              ))}
            </ul>

            <p className="mt-2 text-xs tracking-[0.1em] text-faint uppercase">
              Scroll horizontally to view more →
            </p>
          </div>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section id="contact" className="section-glow relative border-t border-glass bg-ink py-24 sm:py-28">
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
          <SectionHead title="Contact Me" sub="I'd love to hear from you" />

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Details */}
            <div className="reveal grid content-start gap-5">
              {[
                { Icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
                { Icon: PhoneIcon, label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
                { Icon: PinIcon, label: "Location", value: profile.location },
                { Icon: ClockIcon, label: "Working Hours", value: profile.workingHours },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="glass flex items-start gap-4 p-6">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.68rem] tracking-[0.18em] text-faint uppercase">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block truncate text-[0.95rem] text-white hover:text-accent">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[0.95rem] text-white">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-2">
                <p className="mb-4 text-[0.68rem] tracking-[0.24em] text-faint uppercase">Let&apos;s Connect</p>
                <SocialRow />
              </div>
            </div>

            {/* Form */}
            <div className="reveal" data-delay="90">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ============================= FOOTER ============================= */}
      <footer className="border-t border-glass bg-ink-2 py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="text-xs tracking-[0.1em] text-faint">
            © {new Date().getFullYear()} {profile.fullName}. All Rights Reserved.
          </p>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs tracking-[0.1em] text-faint transition-colors hover:text-accent"
          >
            Built with Next.js &amp; Tailwind CSS
            <ExternalIcon size={12} />
          </a>
        </div>
      </footer>
    </main>
  );
}
