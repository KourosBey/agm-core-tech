"use client";

import { motion, AnimatePresence } from "framer-motion";

const BURST_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

const FLOAT_PARTICLES = [
  { left: "8%", top: "22%", size: 2, delay: 0 },
  { left: "14%", top: "68%", size: 1.5, delay: 0.4 },
  { left: "72%", top: "18%", size: 2, delay: 0.8 },
  { left: "88%", top: "55%", size: 1.5, delay: 1.1 },
  { left: "48%", top: "78%", size: 1, delay: 1.6 },
];

type TechStepSparksProps = {
  active: boolean;
  burstKey: number;
  index: number;
};

export function TechStepSparks({ active, burstKey, index }: TechStepSparksProps) {
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-0 top-7 sm:left-[0.72rem] sm:top-[0.72rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={burstKey}
            className="relative h-0 w-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {BURST_ANGLES.map((angle, i) => (
              <motion.span
                key={`${burstKey}-${angle}`}
                className="absolute left-0 top-0 h-px origin-left bg-gradient-to-r from-[#22D3EE] via-[#A78BFA] to-transparent"
                style={{
                  width: i % 3 === 0 ? 18 : 12,
                  rotate: angle,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: [0, 1, 0.4],
                  opacity: [0, 0.95, 0],
                  x: [0, i % 2 === 0 ? 10 : 6],
                }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.018,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}

            <motion.span
              className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[#22D3EE]/80"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.6, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {FLOAT_PARTICLES.map((particle, i) => (
        <motion.span
          key={`${index}-${i}`}
          className="absolute rounded-full bg-[#22D3EE]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.2, 0.5],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: particle.delay + index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute left-[88px] right-0 top-0 h-px bg-gradient-to-r from-[#22D3EE]/70 via-[#06B6D4]/40 to-transparent sm:left-[88px]"
        animate={{ top: ["8%", "88%"], opacity: [0, 0.75, 0] }}
        transition={{
          duration: 1.35,
          repeat: Infinity,
          repeatDelay: 1.8 + index * 0.2,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-[88px] top-[18%] h-8 w-px bg-gradient-to-b from-transparent via-[#A78BFA]/50 to-transparent sm:left-[88px]"
        animate={{ opacity: [0.2, 0.7, 0.2], scaleY: [0.6, 1, 0.6] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
