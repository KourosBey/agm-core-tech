import { NebulaBackground } from "@/components/effects/nebula-background";

export function BackgroundEffects() {
  return (
    <>
      <NebulaBackground />
      <div
        className="pointer-events-none fixed inset-0 z-0 film-grain"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 ambient-vignette"
        aria-hidden="true"
      />
    </>
  );
}
