import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "A2Tool – Free Online Utility Tools";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #0f172a, #1e1b4b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "#4f46e5",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            A2
          </div>
          <h1 style={{ fontSize: "86px", color: "white", margin: 0, fontWeight: "bolder" }}>
            A2Tool
          </h1>
        </div>
        <p style={{ fontSize: "36px", color: "#94a3b8", marginTop: "40px", textAlign: "center", maxWidth: "800px" }}>
          The Ultimate All-in-One Toolkit for text, image, PDF & utilities.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}