import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { profile } from "@/data/profile";

export function Education() {
  return (
    <section id="education" className="page-layer py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">08 / EDUCATION</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Education.</h2>
              <p className="section-copy">
                Business foundations reinforced by large-scale workshop,
                community, and stakeholder leadership.
              </p>
            </div>

            <div className="space-y-5">
              <div className="border-t border-[var(--line)] pt-5">
                <div className="meta-stack">{profile.education.school}</div>
                <h3 className="mt-3 font-['Sora'] text-[1.45rem] tracking-[-0.03em] text-[var(--foreground)]">
                  {profile.education.degree}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-8 text-[var(--muted)]">
                  {profile.education.course}
                </p>
              </div>

              <div className="grid gap-3">
                {profile.education.highlights.map((highlight) => (
                  <p
                    key={highlight}
                    className="text-[0.98rem] leading-8 text-[var(--muted-strong)]"
                  >
                    - {highlight}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
