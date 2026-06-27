import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0A0F1C 0%, #0F172A 45%, #111827 100%)",
          color: "#F1F5F9",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#22D3EE",
            marginBottom: 24,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.1,
            fontWeight: 600,
            maxWidth: 900,
          }}
        >
          Engineering the Future, Core by Core
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            color: "#64748B",
            maxWidth: 760,
          }}
        >
          Software engineering, architecture consulting, and digital transformation.
        </div>
      </div>
    ),
    { ...size }
  );
}
