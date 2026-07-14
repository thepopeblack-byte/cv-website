import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { confidentialityNote } from "@/data/achievements";
import { profile } from "@/data/profile";

function formatMetric(value: number, prefix = "", suffix = "") {
  const formatted =
    value >= 1000 ? value.toLocaleString("en-US") : String(value);
  return `${prefix}${formatted}${suffix}`;
}

export function ImpactStats() {
  return (
    <section
      id="impact"
      data-nav-group="impact"
      data-scene-label="Impact"
      className="page-layer py-14 md:py-16 lg:py-12"
    >
      <Container>
        <SectionReveal className="section-frame proof-stage">
          <div className="meta-stack">Impact</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <div className="proof-brief">
              <div className="proof-brief-glow" aria-hidden="true" />
              <h2 className="section-title">
                Commercial proof across growth, partnerships, and ecosystem
                execution.
              </h2>
              <p className="section-copy text-[var(--muted-strong)]">
                Selected outcomes across revenue growth, enterprise and
                ecosystem partnerships, market activation, developer capacity,
                and blockchain infrastructure adoption.
              </p>
              <p className="mt-6 text-[1rem] leading-8 text-[var(--muted-strong)]">
                {profile.proofLine}
              </p>
              <p className="impact-confidentiality-note">
                {confidentialityNote}
              </p>
            </div>

            <MobileSwipeRegion
              className="proof-metric-grid"
              label="Commercial and ecosystem impact statistics"
            >
              {profile.stats.map((stat) => (
                <article key={stat.label} className="signal-card h-full">
                  <p className="metric-value">
                    {formatMetric(stat.value, stat.prefix, stat.suffix)}
                  </p>
                  <h3 className="mt-3 font-['Sora'] text-[1.2rem] tracking-[-0.03em] text-[var(--foreground)]">
                    {stat.label}
                  </h3>
                  <p className="mt-3 text-[0.96rem] leading-7 text-[var(--muted)]">
                    {stat.description}
                  </p>
                </article>
              ))}
            </MobileSwipeRegion>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
