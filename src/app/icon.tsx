import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #06B6D4, #22D3EE)",
          color: "#0A0F1C",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {SITE_NAME.slice(0, 3).toUpperCase()}
      </div>
    ),
    { ...size }
  );
}
