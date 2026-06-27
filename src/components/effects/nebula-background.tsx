export function NebulaBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 nebula-base" />
      <div className="nebula-orb nebula-orb-violet" />
      <div className="nebula-orb nebula-orb-fuchsia" />
      <div className="nebula-orb nebula-orb-indigo" />
    </div>
  );
}
