"use client";

import { useEffect, type CSSProperties } from "react";

const LINES = [
  {
    y: "10%",
    parallax: 0.04,
    mouse: 12,
    color: "rgba(34, 211, 238, 0.22)",
    dur: "38s",
    delay: "0s",
  },
  {
    y: "30%",
    parallax: 0.07,
    mouse: -16,
    color: "rgba(6, 182, 212, 0.16)",
    dur: "46s",
    delay: "-8s",
  },
  {
    y: "52%",
    parallax: 0.1,
    mouse: 18,
    color: "rgba(167, 139, 250, 0.14)",
    dur: "42s",
    delay: "-14s",
  },
  {
    y: "74%",
    parallax: 0.13,
    mouse: -10,
    color: "rgba(103, 232, 249, 0.12)",
    dur: "50s",
    delay: "-20s",
  },
] as const;

function wavePath(w: number, amp: number, freq: number, phase: number) {
  const mid = 32;
  const steps = 48;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * w;
    const y =
      mid +
      Math.sin(x * freq + phase) * amp +
      Math.sin(x * freq * 0.5 + phase * 1.3) * (amp * 0.25);
    d += i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const PATH = wavePath(1440, 28, 0.012, 0);

export function NeonLinesBackground() {
  useEffect(() => {
    const root = document.documentElement;
    let scrollTick = false;
    let mouseTick = false;

    const onScroll = () => {
      if (scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(() => {
        root.style.setProperty("--neon-scroll", String(window.scrollY));
        scrollTick = false;
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (mouseTick) return;
      mouseTick = true;
      requestAnimationFrame(() => {
        root.style.setProperty(
          "--neon-mouse",
          String(e.clientX / window.innerWidth - 0.5)
        );
        mouseTick = false;
      });
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) return;

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden neon-lines-mask z-0"
      aria-hidden="true"
    >
      {LINES.map((line, i) => (
        <div
          key={i}
          className="neon-line-layer absolute left-0 w-full h-16 sm:h-20"
          style={
            {
              top: line.y,
              "--parallax": line.parallax,
              "--mouse-shift": `${line.mouse}px`,
            } as CSSProperties
          }
        >
          <svg
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
            className="neon-line-track absolute top-0 left-0 h-full w-[200%]"
            style={
              {
                animationDuration: line.dur,
                animationDelay: line.delay,
              } as CSSProperties
            }
          >
            <path
              d={PATH}
              fill="none"
              stroke={line.color}
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={PATH}
              fill="none"
              stroke={line.color}
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              transform="translate(1440, 0)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
