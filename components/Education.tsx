import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { profile } from "@/data/profile";

export function Education() {
  return (
    <section id="education" className="page-layer py-14 md:py-16 lg:py-12">
      <Container>
        <SectionReveal className="section-frame education-stage">
          <div className="meta-stack">08 / EDUCATION</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Education.</h2>
              <p className="section-copy">
                Business administration foundations supporting commercial
                leadership, stakeholder management, and emerging-market
                ecosystem work.
              </p>
            </div>

            <div className="education-card">
              <div>
                <div className="meta-stack">{profile.education.school}</div>
                <h3>{profile.education.degree}</h3>
                <p className="mt-3 text-[0.98rem] leading-8 text-[var(--muted)]">
                  {profile.education.course}
                </p>
              </div>

              <div className="education-highlight-grid">
                {profile.education.highlights.map((highlight, index) => (
                  <article key={highlight} className="education-highlight-card">
                    <div className="meta-stack">0{index + 1} / FOUNDATION</div>
                    <p>{highlight}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
