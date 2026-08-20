import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

// Link-preview card for LinkedIn, WhatsApp, X, Slack, etc.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.fullName} — Full-Stack Engineer`;

/**
 * Rendered at build time. Deliberately uses only the runtime's built-in font —
 * fetching Google font binaries here would put a network call in the build path.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(60% 60% at 12% 0%, rgba(34,197,94,0.16), transparent 70%), radial-gradient(50% 50% at 95% 100%, rgba(34,197,94,0.1), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 34 }}>
          <div style={{ width: 10, height: 10, borderRadius: 99, background: "#22c55e" }} />
          <div style={{ fontSize: 22, letterSpacing: 5, color: "#22c55e" }}>
            {profile.tagline.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            // Sized so the full three-word name fits the 1040px content box.
            fontSize: 74,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: -1,
          }}
        >
          {profile.nameDisplay}
        </div>

        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#e5e5e5", marginTop: 26 }}>
          {profile.roles.join("   |   ")}
        </div>

        <div style={{ display: "flex", width: 110, height: 3, background: "#22c55e", marginTop: 44 }} />

        <div style={{ display: "flex", fontSize: 25, color: "#a3a3a3", marginTop: 44 }}>
          Next.js · React · Flask · FastAPI · PostgreSQL — 7 live deployments
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#8b8b8b", marginTop: 16 }}>
          UET Lahore, Pakistan
        </div>
      </div>
    ),
    size,
  );
}
