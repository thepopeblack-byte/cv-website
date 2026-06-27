import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { profile } from "@/data/profile";

function formatMetric(value: number, prefix = "", suffix = "") {
  const formatted = value >= 1000 ? value.toLocaleString("en-US") : String(value);
  return `${prefix}${formatted}${suffix}`;
}

export function ImpactStats() {
  return (
    <section id="impact" className="page-layer py-9 md:py-10 lg:py-12">
      <Container>
        <SectionReveal className="section-frame proof-stage">
          <div className="meta-stack">02 / COMMERCIAL PROOF</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <div className="proof-brief">
              <div className="proof-brief-glow" aria-hidden="true" />
              <h2 className="section-title">{profile.aboutTitle}</h2>
              <p className="section-copy text-[var(--muted-strong)]">
                {profile.aboutBody}
              </p>
              <p className="mt-5 text-[1rem] leading-8 text-[var(--muted)]">
                {profile.aboutBodyExtended}
              </p>
              <p className="mt-6 border-t border-[var(--line)] pt-5 text-[1rem] leading-8 text-[var(--muted-strong)]">
                {profile.proofLine}
              </p>

              <div className="mt-6 grid gap-3">
                {profile.aboutCards.map((card, index) => (
                  <article key={card.title} className="proof-positioning-card">
                    <div className="meta-stack">0{index + 1} / CORE CAPABILITY</div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="proof-metric-grid">
              {profile.stats.map((stat, index) => (
                <article key={stat.label} className="signal-card h-full">
                  <div className="meta-stack">0{index + 1} / CAREER IMPACT</div>
                  <p className="mt-4 metric-value">
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
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
