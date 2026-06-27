"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const RING_COUNT = 6;

type CoreEngineProps = {
  activeLayer?: number;
  size?: "hero" | "compact" | "mini";
  className?: string;
  showLabel?: boolean;
};

const sizeMap = {
  hero: 420,
  compact: 280,
  mini: 160,
};

export function CoreEngine({
  activeLayer = 0,
  size = "hero",
  className,
  showLabel = true,
}: CoreEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || size === "mini") return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      };
    };

    container.addEventListener("mousemove", onMove);
    return () => container.removeEventListener("mousemove", onMove);
  }, [size]);

  const dim = sizeMap[size];
  const center = dim / 2;

  return (
    <div
      ref={containerRef}
      className={cn("relative select-none", className)}
      style={{ width: dim, height: dim }}
      aria-hidden="true"
    >
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.15)" />
            <stop offset="60%" stopColor="rgba(167,139,250,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="core-blur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <circle
          cx={center}
          cy={center}
          r={center * 0.45}
          fill="url(#core-glow)"
          filter="url(#core-blur)"
          opacity={size === "hero" ? 0.3 : 0.2}
        />

        {Array.from({ length: RING_COUNT }).map((_, i) => {
          const ringIndex = RING_COUNT - 1 - i;
          const radius = center * 0.18 + ringIndex * (center * 0.11);
          const isActive = ringIndex <= activeLayer;
          const isCurrent = ringIndex === activeLayer;
          const isCyber = ringIndex % 2 === 0;

          return (
            <motion.g
              key={ringIndex}
              animate={{
                rotate: isCurrent ? [0, 360] : 0,
              }}
              transition={
                isCurrent
                  ? { duration: 48, repeat: Infinity, ease: "linear" }
                  : {}
              }
              style={{ transformOrigin: `${center}px ${center}px` }}
            >
              <motion.circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={
                  isActive
                    ? isCyber
                      ? "rgba(34,211,238,0.55)"
                      : "rgba(167,139,250,0.45)"
                    : "rgba(255,255,255,0.06)"
                }
                strokeWidth={isCurrent ? 2 : 1}
                strokeDasharray={isActive ? "none" : "4 8"}
                initial={false}
                animate={{
                  opacity: isActive ? (isCurrent ? 1 : 0.55) : 0.25,
                  scale: isCurrent ? [1, 1.02, 1] : 1,
                }}
                transition={
                  isCurrent
                    ? { scale: { duration: 3, repeat: Infinity } }
                    : { duration: 0.6 }
                }
              />

              {isCurrent && (
                <motion.circle
                  cx={center}
                  cy={center - radius}
                  r={3}
                  fill={isCyber ? "#22D3EE" : "#A78BFA"}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.g>
          );
        })}

        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const outerR = center * 0.78;
          const x2 = center + Math.cos(rad) * outerR;
          const y2 = center + Math.sin(rad) * outerR;
          const lit = i <= activeLayer;

          return (
            <motion.line
              key={angle}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke={lit ? "rgba(34,211,238,0.15)" : "rgba(100,116,139,0.12)"}
              strokeWidth={1}
              initial={false}
              animate={{ opacity: lit ? 1 : 0.4 }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className={cn(
            "rounded-full flex items-center justify-center border",
            size === "hero"
              ? "h-20 w-20 border-emerald-neon/30 bg-emerald-neon/8 shadow-[0_0_24px_-8px_var(--emerald-glow)]"
              : size === "compact"
                ? "h-14 w-14 border-cyber/30 bg-cyber/10"
                : "h-8 w-8 border-white/20 bg-white/5"
          )}
        >
          {showLabel && (
            <span
              className={cn(
                "font-heading font-bold text-gradient",
                size === "hero" ? "text-lg" : size === "compact" ? "text-sm" : "text-[10px]"
              )}
            >
              AGM
            </span>
          )}
        </motion.div>
      </div>

      {size === "hero" && (
        <div className="absolute -inset-8 rounded-full border border-white/[0.03] pointer-events-none" />
      )}
    </div>
  );
}
