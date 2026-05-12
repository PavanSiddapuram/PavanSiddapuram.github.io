import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BrandLogo, CustomCursor } from "@/components/Brand";
import { POSTS, type BlogPost } from "@/lib/posts";

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

type View = "home" | "work" | "projects" | "writing" | "about";

const NAV: { id: View; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "about", label: "About" },
];

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

// ---------- Home ----------
function HomeView({ go }: { go: (v: View, slug?: string) => void }) {
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
            <button
              onClick={() => go("work")}
              data-hover
              style={{
                marginTop: 14,
                background: "none",
                border: "none",
                padding: 0,
                textAlign: "left",
                color: "inherit",
                font: "inherit",
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
            </button>
          </div>,
          <div key="posts" style={{ marginTop: 56 }}>
            <SectionLabel>Recent writing</SectionLabel>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 14 }}>
              {recent.map((p) => (
                <li key={p.slug} style={{ padding: "10px 0" }}>
                  <button
                    onClick={() => go("writing", p.slug)}
                    data-hover
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      textAlign: "left",
                      color: "inherit",
                      font: "inherit",
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
                  </button>
                </li>
              ))}
            </ul>
          </div>,
        ]}
      </Stagger>
    </div>
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

// ---------- Work ----------
type Job = {
  org: string;
  logo: string;
  role: string;
  date: string;
  body: string;
  tags: string[];
};

const JOBS: Job[] = [
  {
    org: "Fracktal Works",
    logo: "fracktal",
    role: "Software Engineer I",
    date: "AUG 2025 — PRESENT",
    body: "Building a GPU-accelerated 3D CAD platform for the browser. Designed and shipped a CSG boolean engine with BVH acceleration, a three-stage mesh decimation pipeline (2M → 50K triangles), and zero-copy Web Worker transfers that hold 60fps under load.",
    tags: ["TypeScript", "React 18", "Three.js", "GLSL", "WebAssembly", "FastAPI", "Docker", "AWS"],
  },
  {
    org: "Manipal Academy of Higher Education",
    logo: "manipal",
    role: "Full Stack Developer",
    date: "APR 2024 — JUL 2025",
    body: "Built React + Django REST Framework applications used across the institute. Designed authentication systems, role-based access, and CI workflows that shortened deploy cycles from days to minutes.",
    tags: ["React", "Django", "PostgreSQL", "CI/CD"],
  },
  {
    org: "MITRAz Skills",
    logo: "mitraz",
    role: "Data Analyst Intern",
    date: "OCT 2023 — MAR 2024",
    body: "Built Python and SQL data pipelines, plus Power BI dashboards used by the operations team to track learner progression and program economics.",
    tags: ["Python", "SQL", "Power BI"],
  },
];

type EduItem = {
  title: string;
  org: string;
  logo: string;
  date: string;
  body: string;
  tags?: string[];
};

const EDU: EduItem[] = [
  {
    title: "Y Combinator Startup School",
    org: "Y Combinator",
    logo: "ycombinator",
    date: "FEB — DEC 2026",
    body: "Active participant. Idea evaluation, customer discovery, MVP planning, weekly founder updates. Execution-first — not theoretical coursework.",
    tags: ["Startup Validation", "Customer Discovery", "MVP Planning"],
  },
  {
    title: "M.S. Applied Mathematics",
    org: "Lovely Professional University",
    logo: "lpu",
    date: "AUG 2025 — EARLY 2026",
    body: "Left early to focus on building products and skills in software engineering, AI, and entrepreneurship.",
  },
  {
    title: "B.Sc. Mathematics, Physics & Computer Science",
    org: "Sri Krishnadevaraya University",
    logo: "sku",
    date: "2020 — 2023",
    body: "",
  },
  {
    title: "Prompt Engineering & Programming with OpenAI",
    org: "Columbia University",
    logo: "columbia",
    date: "2025",
    body: "",
  },
  {
    title: "Google Advanced Data Analytics",
    org: "Google (Coursera)",
    logo: "google",
    date: "2024",
    body: "",
  },
];

function TimelineEntry({
  date,
  children,
}: {
  date: string;
  children: React.ReactNode;
}) {
  return (
    <div className="tl-row" style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 32, padding: "28px 0", borderTop: "1px solid var(--color-border)" }}>
      <div className="mono" style={{ fontSize: 11, color: "var(--color-muted-foreground)", letterSpacing: "0.05em", paddingTop: 4 }}>
        {date}
      </div>
      <div>{children}</div>
    </div>
  );
}

function WorkView() {
  return (
    <div style={{ maxWidth: 860 }}>
      <PageHeader eyebrow="01" title="Work" />
      <div className="fade-up">
        {JOBS.map((j) => (
          <TimelineEntry key={j.org} date={j.date}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <BrandLogo id={j.logo} size={22} />
              <h3 style={{ margin: 0, fontSize: 22, letterSpacing: "-0.01em", fontWeight: 500 }}>
                {j.role}
              </h3>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--color-muted-foreground)", marginTop: 4, marginLeft: 34 }}>
              {j.org.toUpperCase()}
            </div>
            <p style={{ fontSize: 16.5, lineHeight: 1.65, marginTop: 14, marginLeft: 34 }}>{j.body}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14, marginLeft: 34 }}>
              {j.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </TimelineEntry>
        ))}
      </div>

      <div style={{ marginTop: 80 }}>
        <PageHeader eyebrow="02" title="Education & Programs" />
        {EDU.map((e) => (
          <TimelineEntry key={e.title} date={e.date}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <BrandLogo id={e.logo} size={20} />
              <h3 style={{ margin: 0, fontSize: 20, letterSpacing: "-0.01em", fontWeight: 500 }}>
                {e.title}
              </h3>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--color-muted-foreground)", marginTop: 4, marginLeft: 32 }}>
              {e.org.toUpperCase()}
            </div>
            {e.body && <p style={{ fontSize: 16, lineHeight: 1.65, marginTop: 12, marginLeft: 32, color: "var(--color-foreground)" }}>{e.body}</p>}
            {e.tags && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12, marginLeft: 32 }}>
                {e.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            )}
          </TimelineEntry>
        ))}
      </div>
    </div>
  );
}

// ---------- Projects ----------
type Project = {
  title: string;
  year: string;
  body: string;
  stack: string;
  github?: string;
};

const PROJECTS: Project[] = [
  {
    title: "HonestRAG",
    year: "2026",
    body: "A retrieval-first RAG system that refuses to answer rather than hallucinate. Cosine-similarity threshold gating happens before any generation call, and the model never sees a prompt it cannot back up. Evaluated against a small set of golden test cases — calibrated to err on the side of silence.",
    stack: "ChromaDB · Python · sentence-transformers",
  },
  {
    title: "AlgoDojo",
    year: "2025",
    body: "Docker-sandboxed multi-language code execution platform. Submissions enter a Redis-backed BullMQ queue, are executed in isolated containers with strict resource limits, and stream results back to the user. Designed to be both safe and fast.",
    stack: "Fastify · FastAPI · Docker · Redis · BullMQ",
  },
  {
    title: "RepriceAI",
    year: "2025",
    body: "An LLM-assisted dynamic pricing engine for small e-commerce operators. Combines competitor signals, demand curves, and a constrained generation step to produce price recommendations with reasoning. Selected as a Top 10 entry of 300+ in the Google Cloud Build & Blog Marathon.",
    stack: "FastAPI · React · Google Cloud Run",
  },
  {
    title: "CheckoutMind",
    year: "2026",
    body: "A dual-agent payment platform built for the Pine Labs AI Hackathon. The Consumer Intelligence Agent reasons about the buyer; PaySentinel handles offer-aware retries and a circuit breaker that prevents cascading failures across acquirers. Two agents, one outcome.",
    stack: "AWS Bedrock · Claude 3 Sonnet · TypeScript",
  },
];

function ProjectsView() {
  return (
    <div style={{ maxWidth: 760 }}>
      <PageHeader eyebrow="03" title="Projects" />
      <div className="fade-up">
        {PROJECTS.map((p, i) => (
          <article
            key={p.title}
            style={{
              padding: "36px 0",
              borderTop: i === 0 ? "1px solid var(--color-border)" : "1px solid var(--color-border)",
            }}
          >
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
              <h3 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.015em", fontWeight: 500 }}>
                {p.title}
              </h3>
              <span className="mono" style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>
                {p.year}
              </span>
            </header>
            <p style={{ fontSize: 17, lineHeight: 1.65, marginTop: 16, color: "var(--color-foreground)" }}>
              {p.body}
            </p>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--color-muted-foreground)", marginTop: 14, letterSpacing: "0.02em" }}>
              {p.stack}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ---------- Writing ----------
function WritingView({ openSlug, onOpen, onClose }: {
  openSlug: string | null;
  onOpen: (slug: string) => void;
  onClose: () => void;
}) {
  const post = useMemo(() => POSTS.find((p) => p.slug === openSlug) ?? null, [openSlug]);

  return (
    <div style={{ maxWidth: 760 }}>
      <PageHeader eyebrow="04" title="Writing" />
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="fade-up">
        {POSTS.map((p) => (
          <li
            key={p.slug}
            style={{ borderTop: "1px solid var(--color-border)", padding: "22px 0" }}
          >
            <button
              onClick={() => onOpen(p.slug)}
              data-hover
              style={{
                background: "none", border: "none", padding: 0, textAlign: "left",
                color: "inherit", font: "inherit", width: "100%",
                display: "grid", gridTemplateColumns: "100px 1fr", gap: 24, alignItems: "baseline",
              }}
              className="post-row"
            >
              <span className="mono" style={{ fontSize: 11, color: "var(--color-muted-foreground)", letterSpacing: "0.04em" }}>
                {p.dateLabel.toUpperCase()}
              </span>
              <span>
                <div style={{ fontSize: 21, letterSpacing: "-0.01em" }}>{p.title}</div>
                <div style={{ fontSize: 15, color: "var(--color-muted-foreground)", fontStyle: "italic", marginTop: 4 }}>
                  {p.description}
                </div>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {post && <PostModal post={post} onClose={onClose} />}
    </div>
  );
}

function PostModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="modal-fade"
      style={{
        position: "fixed", inset: 0, background: "var(--color-background)",
        zIndex: 100, overflowY: "auto",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 28px 120px" }}>
        <button
          onClick={onClose}
          data-hover
          className="mono"
          style={{
            background: "none", border: "none", color: "var(--color-muted-foreground)",
            font: "inherit", fontSize: 12, padding: 0, cursor: "none",
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 56,
          }}
        >
          ← back
        </button>
        <div className="mono" style={{ fontSize: 11, color: "var(--color-muted-foreground)", letterSpacing: "0.06em" }}>
          {post.dateLabel.toUpperCase()}
        </div>
        <h1 style={{ fontSize: 40, lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 500, marginTop: 12 }}>
          {post.title}
        </h1>
        <div
          className="post-body"
          style={{ marginTop: 32, fontSize: 19, lineHeight: 1.65 }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </div>
      <style>{`
        .post-body p { margin: 1.1em 0; }
        .post-body h2 { font-size: 24px; letter-spacing: -0.01em; margin-top: 2em; margin-bottom: 0.4em; font-weight: 500; }
        .post-body h3 { font-size: 19px; margin-top: 1.6em; margin-bottom: 0.3em; font-weight: 600; }
        .post-body em { font-style: italic; }
        .post-body strong { font-weight: 600; }
        .post-body a { color: var(--color-accent); text-decoration: underline; text-underline-offset: 3px; }
        .post-body code { font-family: var(--font-mono); font-size: 0.85em; background: var(--color-muted); padding: 1px 5px; border-radius: 2px; }
        .post-body pre { background: #0a0a0a; color: #ecebe6; padding: 18px 20px; border-radius: 4px; overflow-x: auto; margin: 1.6em 0; font-size: 13px; line-height: 1.55; }
        .post-body pre code { background: transparent; padding: 0; color: inherit; font-size: inherit; }
        .post-body blockquote { border-left: 2px solid var(--color-foreground); padding-left: 20px; margin: 1.6em 0; font-style: italic; color: var(--color-muted-foreground); }
      `}</style>
    </div>
  );
}

// ---------- About ----------
const STACK_GROUPS: { title: string; items: { id: string; name: string; level: "prod" | "learning" }[] }[] = [
  {
    title: "3D Graphics & Systems",
    items: [
      { id: "threedotjs", name: "Three.js", level: "prod" },
      { id: "glsl", name: "GLSL", level: "prod" },
      { id: "webassembly", name: "WebAssembly", level: "prod" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { id: "react", name: "React", level: "prod" },
      { id: "typescript", name: "TypeScript", level: "prod" },
    ],
  },
  {
    title: "Backend",
    items: [
      { id: "fastapi", name: "FastAPI", level: "prod" },
      { id: "fastify", name: "Fastify", level: "prod" },
      { id: "python", name: "Python", level: "prod" },
    ],
  },
  {
    title: "AI & Retrieval",
    items: [
      { id: "chromadb", name: "ChromaDB", level: "prod" },
      { id: "amazonaws", name: "AWS Bedrock", level: "learning" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { id: "docker", name: "Docker", level: "prod" },
      { id: "amazonaws", name: "AWS", level: "prod" },
      { id: "googlecloud", name: "Google Cloud", level: "prod" },
    ],
  },
  {
    title: "Databases",
    items: [
      { id: "postgresql", name: "PostgreSQL", level: "prod" },
      { id: "redis", name: "Redis", level: "prod" },
    ],
  },
];

const CONTACT = [
  { id: "gmail", label: "Email", value: "siddapurampavan9381@gmail.com", href: "mailto:siddapurampavan9381@gmail.com" },
  { id: "github", label: "GitHub", value: "github.com/PavanSiddapuram", href: "https://github.com/PavanSiddapuram" },
  { id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/pavan-siddapuram-51bb141bb", href: "https://linkedin.com/in/pavan-siddapuram-51bb141bb" },
];

function AboutView() {
  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader eyebrow="05" title="About" />
      <div className="fade-up" style={{ fontSize: 18, lineHeight: 1.7 }}>
        <p>
          I'm Pavan, a software engineer based in Bengaluru. I work on the parts of software that
          most people never see — the geometry kernel, the worker thread, the threshold below
          which a model should refuse to speak. I'm drawn to systems where the constraints are
          real and the feedback is honest.
        </p>
        <p style={{ marginTop: "1.2em" }}>
          At <strong>Fracktal Works</strong>, I help build a 3D CAD platform that runs in the
          browser. My day-to-day is GPU-accelerated rendering, CSG booleans on real-world meshes,
          decimation pipelines that turn millions of triangles into something a laptop can hold,
          and the Web Worker plumbing that keeps it all interactive. The work sits at the line
          between <em>fast enough</em> and <em>impossible</em>, which is where I like to be.
        </p>
        <p style={{ marginTop: "1.2em" }}>
          What I care about, technically: ownership over sharing, calibrated confidence over
          fluency, and tools that make the underlying difficulty of a problem visible rather than
          hidden. I write code as if a stranger will read it — because, eventually, I will be that
          stranger.
        </p>
        <p style={{ marginTop: "1.2em" }}>
          I'm also a participant in <strong>Y Combinator's Startup School</strong> (2026 cohort),
          where I'm working through customer discovery and MVP planning for ideas at the
          intersection of AI tooling and developer infrastructure. Execution-first, not
          theoretical.
        </p>
      </div>

      <div style={{ marginTop: 80 }}>
        <SectionLabel>Stack</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 36, marginTop: 28 }}>
          {STACK_GROUPS.map((g) => (
            <div key={g.title}>
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted-foreground)", marginBottom: 14 }}>
                {g.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {g.items.map((it) => (
                  <li key={it.id + it.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <BrandLogo id={it.id} size={15} />
                    <span style={{ fontSize: 16 }}>{it.name}</span>
                    <span
                      className="mono"
                      style={{
                        marginLeft: "auto",
                        fontSize: 9.5,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: it.level === "prod" ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                        opacity: it.level === "prod" ? 0.7 : 0.6,
                      }}
                    >
                      {it.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 80 }}>
        <SectionLabel>Contact</SectionLabel>
        <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0" }}>
          {CONTACT.map((c) => (
            <li key={c.id} style={{ borderTop: "1px solid var(--color-border)" }}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-hover
                style={{
                  display: "grid",
                  gridTemplateColumns: "28px 90px 1fr 24px",
                  gap: 16,
                  alignItems: "center",
                  padding: "18px 0",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <BrandLogo id={c.id} size={18} />
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-muted-foreground)" }}>
                  {c.label}
                </span>
                <span style={{ fontSize: 16 }}>{c.value}</span>
                <span style={{ textAlign: "right", color: "var(--color-muted-foreground)" }}>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---------- Page header ----------
function PageHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="fade-up" style={{ marginBottom: 40 }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--color-muted-foreground)" }}>
        / {eyebrow}
      </div>
      <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.02em", fontWeight: 500, margin: "8px 0 0" }}>
        {title}
      </h2>
    </div>
  );
}

// ---------- Theme toggle ----------
function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const init = saved === "dark";
    setDark(init);
    document.documentElement.setAttribute("data-theme", init ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      data-hover
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: "1px solid var(--color-border)",
        borderRadius: "50%",
        width: 32,
        height: 32,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "inherit",
        padding: 0,
      }}
    >
      {dark ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

// ---------- Clock ----------
function ISTClock() {
  const [time, setTime] = useState(() => formatIST(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(formatIST(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span>{time} IST</span>;
}
function formatIST(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// ---------- Root ----------
function Index() {
  const [view, setView] = useState<View>("home");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const go = (v: View, slug?: string) => {
    setView(v);
    if (v === "writing" && slug) setOpenSlug(slug);
    else setOpenSlug(null);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <>
      <CustomCursor />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Nav */}
        <header
          style={{
            padding: "28px clamp(20px, 5vw, 56px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <button
            onClick={() => go("home")}
            data-hover
            style={{
              background: "none", border: "none", padding: 0,
              font: "inherit", color: "inherit", textAlign: "left",
              fontSize: 17, letterSpacing: "-0.01em",
            }}
          >
            Pavan Siddapuram
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.08em", color: "var(--color-muted-foreground)", marginLeft: 10 }}>
              / SE
            </span>
          </button>
          <nav style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                data-hover
                className="mono"
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px 10px",
                  font: "inherit",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  textTransform: "lowercase",
                  color: view === n.id ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                  borderBottom: view === n.id ? "1px solid var(--color-foreground)" : "1px solid transparent",
                  borderRadius: 0,
                }}
              >
                {n.label.toLowerCase()}
              </button>
            ))}
            <span style={{ width: 12 }} />
            <ThemeToggle />
          </nav>
        </header>

        {/* Main */}
        <main
          key={view}
          style={{
            flex: 1,
            padding: "clamp(48px, 8vw, 96px) clamp(20px, 5vw, 56px)",
            maxWidth: 1100,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {view === "home" && <HomeView go={go} />}
          {view === "work" && <WorkView />}
          {view === "projects" && <ProjectsView />}
          {view === "writing" && (
            <WritingView
              openSlug={openSlug}
              onOpen={(s) => setOpenSlug(s)}
              onClose={() => setOpenSlug(null)}
            />
          )}
          {view === "about" && <AboutView />}
        </main>

        {/* Footer */}
        <footer
          className="mono"
          style={{
            padding: "28px clamp(20px, 5vw, 56px)",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
            color: "var(--color-muted-foreground)",
            letterSpacing: "0.04em",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>© {new Date().getFullYear()} Pavan Siddapuram</span>
          <span><ISTClock /> · Bengaluru</span>
        </footer>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .tl-row { grid-template-columns: 1fr !important; gap: 8px !important; }
          .post-row { grid-template-columns: 1fr !important; gap: 4px !important; }
        }
      `}</style>
    </>
  );
}
