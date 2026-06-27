import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { profile } from "@/data/profile";

function formatMetric(value: number, prefix = "", suffix = "") {
  const formatted = value >= 1000 ? value.toLocaleString("en-US") : String(value);
  return `${prefix}${formatted}${suffix}`;
}

export function ImpactStats() {
  return (
    <section id="impact" className="page-layer py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">04 / IMPACT</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Selected impact.</h2>
              <p className="section-copy">{profile.proofLine}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
