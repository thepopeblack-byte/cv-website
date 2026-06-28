import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { certifications } from "@/data/certifications";
import { profile } from "@/data/profile";

export function Certifications() {
  return (
    <section id="credentials" className="page-layer py-14 md:py-16 lg:py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">07 / CREDENTIALS</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Credentials.</h2>
              <p className="section-copy">
                Certification work and education foundations across compliance,
                financial crime analysis, open-source intelligence, and
                leadership.
              </p>
            </div>

            <div className="credential-stage">
              {certifications.map((certification) => (
                <article
                  key={`${certification.issuer}-${certification.title}`}
                  className="credential-card"
                >
                  <div className="meta-stack">{certification.issuer}</div>
                  <h3>{certification.title}</h3>
                </article>
              ))}

              <article className="education-card credential-education">
                <div>
                  <div className="meta-stack">Education</div>
                  <h3>{profile.education.degree}</h3>
                  <p className="mt-3 text-[0.98rem] leading-8 text-[var(--muted)]">
                    {profile.education.school}
                  </p>
                  <p className="mt-2 text-[0.98rem] leading-8 text-[var(--muted)]">
                    {profile.education.course}
                  </p>
                </div>

                <div className="education-highlight-grid">
                  {profile.education.highlights.map((highlight, index) => (
                    <article
                      key={highlight}
                      className="education-highlight-card"
                    >
                      <div className="meta-stack">
                        0{index + 1} / FOUNDATION
                      </div>
                      <p>{highlight}</p>
                    </article>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
