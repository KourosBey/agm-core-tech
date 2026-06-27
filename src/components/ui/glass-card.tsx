import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  glow?: "cyber" | "emerald" | "none";
  hover?: boolean;
};

export function GlassCard({
  children,
  className,
  glow = "none",
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-500",
        hover && "hover:glass-strong hover:border-white/20 hover:-translate-y-1",
        glow === "cyber" && "shadow-[0_0_40px_-10px_var(--cyber-glow)]",
        glow === "emerald" && "shadow-[0_0_40px_-10px_var(--emerald-glow)]",
        className
      )}
    >
      {children}
    </div>
  );
}
