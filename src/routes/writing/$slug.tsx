import { createFileRoute, Link } from "@tanstack/react-router";
import { POSTS } from "@/lib/posts";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    return { post };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.post
      ? `${loaderData.post.title} — Pavan Siddapuram`
      : "Post Not Found — Pavan Siddapuram";
    const description = loaderData?.post?.description ?? "Writing post details";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://pavansiddapuram.github.io/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "https://pavansiddapuram.github.io/og-image.png" },
      ],
    };
  },
  component: BlogPostView,
});

function BlogPostView() {
  const { post } = Route.useLoaderData();

  if (!post) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 28px 120px", textAlign: "center" }}>
        <h1 style={{ fontSize: 32, fontWeight: 500 }}>Post Not Found</h1>
        <p style={{ color: "var(--color-muted-foreground)", marginTop: 12 }}>
          The article you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/writing"
          data-hover
          className="mono"
          style={{
            display: "inline-block",
            color: "var(--color-accent)",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            marginTop: 24,
          }}
        >
          ← back to writing
        </Link>
      </div>
    );
  }

  const words = post.body.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readTime = Math.ceil(words / 200);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 8px 120px" }}>
      <Link
        to="/writing"
        data-hover
        className="mono"
        style={{
          background: "none",
          border: "none",
          color: "var(--color-muted-foreground)",
          font: "inherit",
          fontSize: 12,
          padding: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 56,
          textDecoration: "none",
        }}
      >
        ← back to writing
      </Link>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }} className="mono">
        <span style={{ fontSize: 11, color: "var(--color-muted-foreground)", letterSpacing: "0.06em" }}>
          {post.dateLabel.toUpperCase()}
        </span>
        <span style={{ fontSize: 9.5, color: "var(--color-muted-foreground)", opacity: 0.8 }}>
          · {readTime} MIN READ
        </span>
      </div>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 500, marginTop: 12, marginBottom: 0 }}>
        {post.title}
      </h1>
      <div
        className="post-body"
        style={{ marginTop: 32, fontSize: 19, lineHeight: 1.65 }}
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

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
