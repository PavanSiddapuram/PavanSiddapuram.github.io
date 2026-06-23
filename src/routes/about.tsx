import { createFileRoute } from "@tanstack/react-router";
import { BrandLogo } from "@/components/Brand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Pavan Siddapuram" },
      {
        name: "description",
        content: "Bio, core interests, developer stack, and professional contact links.",
      },
    ],
  }),
  component: AboutView,
});

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

const STACK_GROUPS: { title: string; items: { id: string; name: string; level: "prod" | "learning" }[] }[] = [
  {
    title: "3D Graphics & Systems",
    items: [
      { id: "threedotjs", name: "Three.js", level: "prod" },
      { id: "glsl", name: "GLSL", level: "prod" },
      { id: "webassembly", name: "WebAssembly", level: "prod" },
      { id: "opencv", name: "OpenCV.js", level: "prod" },
      { id: "three-bvh-csg", name: "three-bvh-csg", level: "prod" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { id: "react", name: "React", level: "prod" },
      { id: "typescript", name: "TypeScript", level: "prod" },
      { id: "nextdotjs", name: "Next.js", level: "prod" },
      { id: "tailwindcss", name: "Tailwind CSS", level: "prod" },
    ],
  },
  {
    title: "Backend & Serverless",
    items: [
      { id: "fastapi", name: "FastAPI", level: "prod" },
      { id: "fastify", name: "Fastify", level: "prod" },
      { id: "python", name: "Python", level: "prod" },
      { id: "modal", name: "Modal.com", level: "prod" },
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
      { id: "cloudflare", name: "Cloudflare R2", level: "prod" },
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
