import { createFileRoute, Link } from "@tanstack/react-router";
import { POSTS } from "@/lib/posts";

export const Route = createFileRoute("/writing/")({
  head: () => ({
    meta: [
      { title: "Writing — Pavan Siddapuram" },
      {
        name: "description",
        content: "Technical field reports, thoughts on systems architecture, and engineering reflections.",
      },
    ],
  }),
  component: WritingView,
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

function WritingView() {
  return (
    <div style={{ maxWidth: 760 }}>
      <PageHeader eyebrow="04" title="Writing" />
      <p style={{ fontSize: 18, color: "var(--color-muted-foreground)", marginTop: -24, marginBottom: 40 }}>
        Technical field reports, thoughts on systems architecture, and engineering reflections.
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="fade-up">
        {POSTS.map((p) => {
          const words = p.body.replace(/<[^>]*>/g, '').split(/\s+/).length;
          const readTime = Math.ceil(words / 200);
          return (
            <li
              key={p.slug}
              style={{ borderTop: "1px solid var(--color-border)", padding: "24px 0" }}
            >
              <Link
                to="/writing/$slug"
                params={{ slug: p.slug }}
                data-hover
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 24,
                  alignItems: "baseline",
                }}
                className="post-row"
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span className="mono" style={{ fontSize: 11, color: "var(--color-muted-foreground)", letterSpacing: "0.04em" }}>
                    {p.dateLabel.toUpperCase()}
                  </span>
                  <span className="mono" style={{ fontSize: 9.5, color: "var(--color-muted-foreground)", opacity: 0.8 }}>
                    {readTime} MIN READ
                  </span>
                </div>
                <span>
                  <div style={{ fontSize: 22, letterSpacing: "-0.01em", fontWeight: 500 }}>{p.title}</div>
                  <div style={{ fontSize: 15.5, color: "var(--color-muted-foreground)", fontStyle: "italic", marginTop: 4 }}>
                    {p.description}
                  </div>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
