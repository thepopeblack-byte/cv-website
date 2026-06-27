import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { experience } from "@/data/experience";

function getStatus(period: string) {
  return period.includes("Present") ? "active" : "archive";
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="page-layer py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">03 / EXPERIENCE</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">
                Operating experience across sales, partnerships, growth, and
                intelligence.
              </h2>
              <p className="section-copy">
                The throughline is commercial execution: opening markets,
                building partnerships, structuring growth systems, and creating
                measurable outcomes in complex environments.
              </p>
            </div>

            <div className="space-y-10">
              {experience.map((entry, index) => (
                <SectionReveal key={entry.company} delay={0.05 + index * 0.05}>
                  <article className="border-t border-[var(--line)] pt-8 first:border-t-0 first:pt-0">
                    <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
                      <div>
                        <h3 className="font-['Sora'] text-[1.9rem] tracking-[-0.05em] text-[var(--foreground)]">
                          {entry.company}
                        </h3>
                        <p className="mt-3 text-[0.98rem] leading-8 text-[var(--muted)]">
                          {entry.label}
                        </p>
                      </div>

                      <div className="space-y-6">
                        {entry.roles.map((role) => (
                          <div key={`${entry.company}-${role.title}`} className="space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                              <h4 className="font-['Sora'] text-[1.2rem] tracking-[-0.03em] text-[var(--foreground)]">
                                {role.title}
                              </h4>
                              <span className="meta-stack">[{getStatus(role.period)}]</span>
                            </div>
                            <div className="meta-stack flex flex-wrap gap-4 text-[0.72rem]">
                              <span>{role.period}</span>
                              <span>{role.location}</span>
                            </div>
                            <ul className="space-y-2 text-[0.98rem] leading-8 text-[var(--muted-strong)]">
                              {role.bullets.map((bullet) => (
                                <li key={bullet}>- {bullet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
