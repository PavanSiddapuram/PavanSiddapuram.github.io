import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Pavan Siddapuram" },
      {
        name: "description",
        content: "A showcase of dynamic systems, code runners, RAG architecture, and agentic platforms.",
      },
    ],
  }),
  component: ProjectsView,
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
