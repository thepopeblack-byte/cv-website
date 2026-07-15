import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { achievements, experienceProofChips } from "@/data/achievements";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { institutionalOutcomes } from "@/data/outcomes";
import { portfolioItems } from "@/data/portfolio";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

const impactPreviewStats = [
  achievements.revenue,
  achievements.deals,
  achievements.mainnetLaunches,
  achievements.developers,
];

function PreviewLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="button-secondary home-preview-link">
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </Link>
  );
}

export function HomeImpactPreview() {
  const featuredOutcome = institutionalOutcomes[0];
  const featuredProject = portfolioItems[0];

  return (
    <section
      id="impact-preview"
      data-nav-group="impact"
      className="page-layer home-preview-section py-14 md:py-16"
    >
      <Container>
        <SectionReveal className="section-frame home-preview">
          <div className="home-preview-heading">
            <div>
              <div className="meta-stack">Impact</div>
              <h2 className="section-title">
                Commercial outcomes with institutional relevance.
              </h2>
            </div>
            <PreviewLink href="/impact">Explore Full Impact</PreviewLink>
          </div>

          <MobileSwipeRegion
            className="home-metric-row"
            label="Selected impact statistics"
          >
            {impactPreviewStats.map((stat) => (
              <article key={stat.label} className="home-metric">
                <strong>{stat.display}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </MobileSwipeRegion>

          <div className="home-impact-features">
            <article className="home-feature home-case-preview">
              <div className="meta-stack">Featured case study</div>
              <h3>{featuredOutcome.title}</h3>
              <p>{featuredOutcome.outcome}</p>
              <Link href="/impact#outcomes" className="text-link">
                Review the case study
              </Link>
            </article>

            <article className="home-feature home-project-preview">
              <div className="home-project-image">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.imageAlt ?? featuredProject.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
              <div>
                <div className="meta-stack">Featured project</div>
                <h3>{featuredProject.title}</h3>
                <p>{featuredProject.summary}</p>
              </div>
            </article>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

export function HomeExpertisePreview() {
  return (
    <section
      id="expertise-preview"
      data-nav-group="expertise"
      className="page-layer home-preview-section py-14 md:py-16"
    >
      <Container>
        <SectionReveal className="section-frame home-preview">
          <div className="home-preview-heading">
            <div>
              <div className="meta-stack">Expertise</div>
              <h2 className="section-title">
                Commercial depth, technical fluency, and intelligence-led
                execution.
              </h2>
            </div>
            <PreviewLink href="/expertise">Explore Full Expertise</PreviewLink>
          </div>

          <MobileSwipeRegion
            className="home-expertise-row"
            label="Featured capability areas"
          >
            {skillGroups.slice(0, 4).map((group) => (
              <article key={group.title} className="home-expertise-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </MobileSwipeRegion>

          <div className="home-credential-summary">
            <div>
              <div className="meta-stack bronze-label">Featured credentials</div>
              {certifications.slice(0, 2).map((credential) => (
                <p key={credential.title}>
                  <strong>{credential.title}</strong>
                  <span>{credential.issuer}</span>
                </p>
              ))}
            </div>
            <div>
              <div className="meta-stack">Education</div>
              <p>
                <strong>{profile.education.degree}</strong>
                <span>{profile.education.school}</span>
              </p>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

export function HomeExperiencePreview() {
  return (
    <section
      id="experience-preview"
      data-nav-group="experience"
      className="page-layer home-preview-section py-14 md:py-16"
    >
      <Container>
        <SectionReveal className="section-frame home-preview">
          <div className="home-preview-heading">
            <div>
              <div className="meta-stack">Experience</div>
              <h2 className="section-title">
                Current leadership across growth and blockchain intelligence.
              </h2>
            </div>
            <PreviewLink href="/experience">View Full Experience</PreviewLink>
          </div>

          <MobileSwipeRegion
            className="home-role-row"
            label="Current professional roles"
          >
            {experience.slice(0, 2).map((entry) => {
              const role = entry.roles[0];

              return (
                <article key={entry.company} className="home-role-preview">
                  <div className="meta-stack">Current role</div>
                  <h3>{role.title}</h3>
                  <p className="home-role-company">{entry.company}</p>
                  <ul>
                    {role.bullets.slice(0, 2).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </MobileSwipeRegion>

          <div className="home-proof-strip" aria-label="Selected experience outcomes">
            {experienceProofChips.slice(0, 4).map((proof) => (
              <span key={proof}>{proof}</span>
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
