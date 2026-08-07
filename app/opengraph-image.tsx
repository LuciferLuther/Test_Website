import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Japan, Slowly — a winter trip for two";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at 50% 25%, #fbf4e8, #e9d7c7 58%, #ceb8a5)", color: "#421d27", fontFamily: "serif", position: "relative" }}>
        <div style={{ position: "absolute", inset: 42, border: "1px solid rgba(92,43,54,.35)", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: 24, letterSpacing: 8, textTransform: "uppercase", marginBottom: 28 }}>15 December 2026 — 3 January 2027</div>
          <div style={{ fontSize: 116, lineHeight: .88 }}>Japan,</div>
          <div style={{ fontSize: 124, lineHeight: .92, fontStyle: "italic", color: "#8c2d43" }}>slowly.</div>
          <div style={{ width: 190, height: 1, background: "#b58a4d", margin: "34px 0 28px" }} />
          <div style={{ fontSize: 29, color: "#5f4a42" }}>Tokyo · Hakodate · Sapporo</div>
        </div>
      </div>
    ),
    size,
  );
}
