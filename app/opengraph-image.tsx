import { ImageResponse } from "next/og";

import { socialProofChips } from "@/data/achievements";

export const alt = "Kayode Popoola executive profile card";
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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          color: "#f4efe8",
          background:
            "radial-gradient(circle at top left, rgba(244, 239, 232, 0.12), transparent 28%), linear-gradient(180deg, #0a0b0d 0%, #111317 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#9a968d",
          }}
        >
          <span>Popeblack</span>
          <span>Global Partnerships</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: "-0.07em",
              lineHeight: 1,
            }}
          >
            Kayode Popoola
          </div>
          <div
            style={{
              maxWidth: "860px",
              fontSize: 34,
              color: "#cbc6bb",
              lineHeight: 1.3,
            }}
          >
            Web3 Partnerships & Revenue Growth Leader | Confidential
            Computing | Emerging Markets Growth
          </div>
        </div>
        <div style={{ display: "flex", gap: "18px" }}>
          {socialProofChips.map(
            (item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(244, 239, 232, 0.15)",
                  borderRadius: 999,
                  padding: "16px 22px",
                  background: "rgba(244, 239, 232, 0.04)",
                  fontSize: 24,
                }}
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
