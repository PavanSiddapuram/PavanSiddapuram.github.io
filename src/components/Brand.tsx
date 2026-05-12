import { useEffect, useRef, useState } from "react";
import { LOGOS, type Logo } from "@/lib/logos";

// ---------- Logo component ----------
export function BrandLogo({ id, size = 16 }: { id: string; size?: number }) {
  const logo: Logo | undefined = LOGOS[id];
  if (!logo || !logo.path) {
    // Lettermark fallback
    const letters = (logo?.name ?? id).slice(0, 2).toUpperCase();
    const color = logo?.color ?? "#444";
    return (
      <span
        aria-hidden
        style={{
          width: size,
          height: size,
          background: color,
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: Math.max(7, size * 0.42),
          fontWeight: 600,
          borderRadius: 2,
          letterSpacing: "-0.02em",
          flexShrink: 0,
        }}
      >
        {letters}
      </span>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={logo.color}
      aria-label={logo.name}
      style={{ flexShrink: 0 }}
    >
      <path d={logo.path} />
    </svg>
  );
}

// ---------- Cursor ----------
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const mv = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px) scale(${hover ? 2.2 : 1})`;
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseover", over);
    };
  }, [hover]);
  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "var(--color-foreground)",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        transition: "transform 0.12s ease-out, width 0.12s, height 0.12s",
        willChange: "transform",
      }}
    />
  );
}
