import { ImageResponse } from "next/og";

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
          color: "#f8fafc",
          background:
            "radial-gradient(circle at top left, rgba(94, 231, 255, 0.22), transparent 28%), radial-gradient(circle at right, rgba(243, 195, 108, 0.18), transparent 22%), linear-gradient(180deg, #08111f 0%, #0c1730 100%)",
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
            color: "#9fb0ca",
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
              color: "#d6e2f4",
              lineHeight: 1.3,
            }}
          >
            Web3 Partnerships & Revenue Growth Leader | Confidential
            Computing | Emerging Markets Growth
          </div>
        </div>
        <div style={{ display: "flex", gap: "18px" }}>
          {["$300K+ revenue", "50+ deals", "20+ ecosystem partners", "3x TVL growth"].map(
            (item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(159, 176, 202, 0.2)",
                  borderRadius: 999,
                  padding: "16px 22px",
                  background: "rgba(11, 22, 40, 0.72)",
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
