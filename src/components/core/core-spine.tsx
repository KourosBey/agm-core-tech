"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCore } from "@/components/core/core-context";

export function CoreSpine() {
  const { scrollYProgress } = useScroll();
  const { activeLayer } = useCore();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="fixed left-[27px] top-0 bottom-0 w-px z-[5] hidden xl:block pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-white/[0.04]" />
      <motion.div
        className="absolute top-0 left-0 w-full origin-top bg-gradient-to-b from-cyber via-emerald-neon to-cyber/30"
        style={{ height }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-emerald-neon shadow-[0_0_12px_var(--emerald-glow)]"
        style={{
          top: useTransform(scrollYProgress, [0, 1], ["0%", "98%"]),
        }}
        animate={{ opacity: activeLayer >= 0 ? 1 : 0.5 }}
      />
    </div>
  );
}
