import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CustomCursor } from "@/components/Brand";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pavan Siddapuram" },
      {
        name: "description",
        content: "Software engineer in Bengaluru working on 3D CAD platforms, WebAssembly, and AI systems.",
      },
      { name: "author", content: "Pavan Siddapuram" },
      { property: "og:title", content: "Pavan Siddapuram" },
      {
        property: "og:description",
        content: "Software engineer in Bengaluru working on 3D CAD platforms, WebAssembly, and AI systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/", label: "home" },
  { to: "/work", label: "work" },
  { to: "/projects", label: "projects" },
  { to: "/blog", label: "blog" },
  { to: "/about", label: "about" },
];

function LayoutShell({ children }: { children: React.ReactNode }) {
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
          <Link
            to="/"
            data-hover
            style={{
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
              color: "inherit",
              textAlign: "left",
              fontSize: 17,
              letterSpacing: "-0.01em",
              textDecoration: "none",
            }}
          >
            Pavan Siddapuram
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.08em", color: "var(--color-muted-foreground)", marginLeft: 10 }}>
              / SE
            </span>
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                data-hover
                className="mono"
                activeProps={{
                  style: {
                    color: "var(--color-foreground)",
                    borderBottom: "1px solid var(--color-foreground)",
                  }
                }}
                inactiveProps={{
                  style: {
                    color: "var(--color-muted-foreground)",
                    borderBottom: "1px solid transparent",
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px 10px",
                  font: "inherit",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  textTransform: "lowercase",
                  textDecoration: "none",
                  borderRadius: 0,
                }}
              >
                {n.label}
              </Link>
            ))}
            <span style={{ width: 12 }} />
            <ThemeToggle />
          </nav>
        </header>

        {/* Main */}
        <main
          style={{
            flex: 1,
            padding: "clamp(48px, 8vw, 96px) clamp(20px, 5vw, 56px)",
            maxWidth: 1100,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {children}
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
    </>
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutShell>
        <Outlet />
      </LayoutShell>
    </QueryClientProvider>
  );
}
