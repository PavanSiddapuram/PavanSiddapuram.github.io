import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/Brand";
import { POSTS } from "@/lib/posts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pavan Siddapuram — Software engineer, systems thinker" },
      {
        name: "description",
        content:
          "Software engineer in Bengaluru working on 3D CAD platforms, WebAssembly, and AI systems.",
      },
    ],
  }),
  component: Index,
});

// ---------- Tag ----------
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mono"
      style={{
        fontSize: 10.5,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        padding: "2px 7px",
        border: "1px solid var(--color-border)",
        color: "var(--color-muted-foreground)",
        borderRadius: 2,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

// ---------- Stagger wrapper ----------
function Stagger({ children }: { children: React.ReactNode[] }) {
  return (
    <>
      {children.map((c, i) => (
        <div key={i} className="fade-up" style={{ animationDelay: `${i * 50}ms` }}>
          {c}
        </div>
      ))}
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mono"
      style={{
        fontSize: 10.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-muted-foreground)",
        borderTop: "1px solid var(--color-border)",
        paddingTop: 12,
      }}
    >
      {children}
    </div>
  );
}

function Index() {
  const recent = POSTS.slice(0, 2);
  return (
    <div style={{ maxWidth: 720 }}>
      <Stagger>
        {[
          <h1
            key="h"
            style={{
              fontSize: "clamp(40px, 7vw, 76px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Software engineer,
            <br />
            <em style={{ color: "var(--color-muted-foreground)", fontWeight: 400 }}>
              systems thinker.
            </em>
          </h1>,
          <p
            key="bio"
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              maxWidth: 560,
              marginTop: 32,
              color: "var(--color-foreground)",
            }}
          >
            I build software at the intersection of geometry, performance, and intelligence —
            currently a GPU-accelerated 3D CAD platform that runs in the browser. I care about
            tools that respect the people who use them and the machines that run them.
          </p>,
          <div
            key="avail"
            className="mono"
            style={{
              marginTop: 28,
              fontSize: 12,
              color: "var(--color-muted-foreground)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#16a34a",
                display: "inline-block",
              }}
            />
            available for conversations — bengaluru / remote
          </div>,
          <div key="work" style={{ marginTop: 64 }}>
            <SectionLabel>Most recent</SectionLabel>
            <Link
              to="/work"
              data-hover
              style={{
                marginTop: 14,
                display: "block",
                textAlign: "left",
                color: "inherit",
                textDecoration: "none",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <BrandLogo id="fracktal" size={20} />
                <span style={{ fontSize: 22, letterSpacing: "-0.01em" }}>
                  Software Engineer I, Fracktal Works
                </span>
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--color-muted-foreground)",
                  marginTop: 6,
                  marginLeft: 32,
                }}
              >
                AUG 2025 — PRESENT · BENGALURU
              </div>
            </Link>
          </div>,
          <div key="posts" style={{ marginTop: 56 }}>
            <SectionLabel>Recent blog posts</SectionLabel>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 14 }}>
              {recent.map((p) => (
                <li key={p.slug} style={{ padding: "10px 0" }}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    data-hover
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      width: "100%",
                      display: "flex",
                      gap: 24,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: "var(--color-muted-foreground)",
                        minWidth: 80,
                      }}
                    >
                      {p.dateLabel.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 17 }}>{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>,
        ]}
      </Stagger>
    </div>
  );
}
