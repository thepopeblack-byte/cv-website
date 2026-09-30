import { ImageResponse } from "next/og";

export const alt =
  "Kayode Popoola. Blockchain intelligence. Commercial leadership. CipherOwl and Secret Network Foundation.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "68px 76px 70px",
          background:
            "radial-gradient(circle at 94% 6%, rgba(110, 168, 255, 0.12), transparent 40%), linear-gradient(135deg, #0b0d10 0%, #13161b 100%)",
          color: "#f3efe7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "#9bc2ff",
          }}
        >
          POPEBLACK
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.055em",
              lineHeight: 1.05,
              marginBottom: 35,
            }}
          >
            Kayode Popoola
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 45,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.18,
            }}
          >
            <span>Blockchain intelligence.</span>
            <span>Commercial leadership.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 500,
            color: "#cbc6bb",
          }}
        >
          CipherOwl · Secret Network Foundation
        </div>
      </div>
    ),
    size,
  );
}
