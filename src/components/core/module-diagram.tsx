"use client";

type ModuleDiagramProps = {
  moduleId: string;
};

const DIAGRAMS: Record<
  string,
  { nodes: { x: number; y: number; label: string }[]; edges: [number, number][] }
> = {
  website: {
    nodes: [
      { x: 20, y: 50, label: "UI" },
      { x: 50, y: 30, label: "CMS" },
      { x: 50, y: 70, label: "SEO" },
      { x: 80, y: 50, label: "CDN" },
    ],
    edges: [[0, 1], [0, 2], [1, 3], [2, 3]],
  },
  mobileApp: {
    nodes: [
      { x: 25, y: 35, label: "iOS" },
      { x: 25, y: 65, label: "Android" },
      { x: 55, y: 50, label: "App" },
      { x: 80, y: 50, label: "API" },
    ],
    edges: [[0, 2], [1, 2], [2, 3]],
  },
  saas: {
    nodes: [
      { x: 15, y: 50, label: "User" },
      { x: 40, y: 30, label: "Auth" },
      { x: 40, y: 70, label: "Billing" },
      { x: 65, y: 50, label: "Core" },
      { x: 88, y: 50, label: "Cloud" },
    ],
    edges: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]],
  },
  integration: {
    nodes: [
      { x: 18, y: 35, label: "CRM" },
      { x: 18, y: 65, label: "ERP" },
      { x: 50, y: 50, label: "API" },
      { x: 82, y: 50, label: "Sync" },
    ],
    edges: [[0, 2], [1, 2], [2, 3]],
  },
  ecommerce: {
    nodes: [
      { x: 15, y: 35, label: "Store" },
      { x: 15, y: 65, label: "Market" },
      { x: 50, y: 50, label: "Hub" },
      { x: 82, y: 35, label: "Stock" },
      { x: 82, y: 65, label: "Order" },
    ],
    edges: [[0, 2], [1, 2], [2, 3], [2, 4]],
  },
  workflow: {
    nodes: [
      { x: 18, y: 35, label: "Task" },
      { x: 18, y: 65, label: "Rule" },
      { x: 50, y: 50, label: "BPM" },
      { x: 82, y: 50, label: "ERP" },
    ],
    edges: [[0, 2], [1, 2], [2, 3]],
  },
};

export function ModuleDiagram({ moduleId }: ModuleDiagramProps) {
  const diagram = DIAGRAMS[moduleId];
  if (!diagram) return null;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-24 mt-4" aria-hidden="true">
      {diagram.edges.map(([from, to], i) => {
        const a = diagram.nodes[from];
        const b = diagram.nodes[to];
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgba(34,211,238,0.35)"
            strokeWidth={0.8}
            strokeDasharray="2 2"
          />
        );
      })}
      {diagram.nodes.map((node, i) => (
        <g key={i}>
          <circle
            cx={node.x}
            cy={node.y}
            r={4}
            fill="rgba(167,139,250,0.2)"
            stroke="rgba(167,139,250,0.6)"
            strokeWidth={0.8}
          />
          <text
            x={node.x}
            y={node.y + 10}
            textAnchor="middle"
            fill="rgba(100,116,139,0.9)"
            fontSize={5}
            fontFamily="monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
