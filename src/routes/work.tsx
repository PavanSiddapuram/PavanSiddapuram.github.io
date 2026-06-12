import { createFileRoute } from "@tanstack/react-router";
import { BrandLogo } from "@/components/Brand";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work & Education — Pavan Siddapuram" },
      {
        name: "description",
        content: "Professional engineering history, startup school participation, and mathematics/computer science background.",
      },
    ],
  }),
  component: WorkView,
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
