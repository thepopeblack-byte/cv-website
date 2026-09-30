import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { portfolioItems, speakingMediaItems } from "@/data/portfolio";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

function PreviewLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="button-secondary home-preview-link">
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </Link>
  );
}

export function HomeImpactPreview() {
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
              <div className="meta-stack">Work &amp; Evidence</div>
              <h2 className="section-title">
                Partnerships at Secret. Intelligence at CipherOwl.
              </h2>
            </div>
            <PreviewLink href="/impact">Explore Work & Evidence</PreviewLink>
          </div>

          <div className="home-impact-features">
            <div className="home-secret-preview">
              <article className="home-feature home-case-preview">
                <div className="meta-stack">Secret Network · international partnerships</div>
                <h3>Secret Network Commercial Growth &amp; Partnerships</h3>
                <p>
                  Global sales strategy, enterprise partnerships, and partner-led go-to-market execution for privacy-first blockchain and confidential computing infrastructure. Reports document team partnerships; Q2 2024 directly credits my 12-week developer workshop contribution.
                </p>
                <Link href="/impact#secret-foundation" className="text-link">
                  Read the Secret case
                </Link>
              </article>
              <figure className="home-secret-team">
                <Link href="/impact#secret-foundation" className="home-project-image">
                  <Image
                    src={featuredProject.image}
                    alt="Kayode Popoola with the Secret Network team"
                    fill
                    className="object-cover"
                    style={{ objectPosition: featuredProject.imageObjectPosition }}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                  />
                </Link>
                <figcaption>With the Secret Network team</figcaption>
              </figure>
            </div>
            <article className="home-feature home-cipherowl-preview">
              <div className="meta-stack">Blockchain intelligence</div>
              <h3>CipherOwl</h3>
              <p>I investigate and attribute crypto-service addresses using transaction analysis and OSINT, with documented evidence and careful confidence limits. The work supports investigations, compliance and financial-crime analysis.</p>
              <Link href="/impact#cipherowl" className="text-link">Read the CipherOwl case</Link>
            </article>
          </div>
          <p className="home-secondary-proof">Separate programme: <Link href="/impact#cosmos-hub-africa" className="text-link">Cosmos Hub Nigeria / Naija HackATOM</Link> received $27,250 in ATOM Accelerator funding approval, with outcomes reported by the programme.</p>
        </SectionReveal>
      </Container>
    </section>
  );
}

export function HomeExpertisePreview() {
  const featuredSpeaking = speakingMediaItems[0];

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
                Commercial and investigative capabilities, with linked evidence.
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

          <div className="home-speaking-proof">
            <Link
              href={featuredSpeaking.videoWatchUrl ?? "/expertise#speaking"}
              target={featuredSpeaking.videoWatchUrl ? "_blank" : undefined}
              rel={
                featuredSpeaking.videoWatchUrl
                  ? "noopener noreferrer"
                  : undefined
              }
              className="home-speaking-preview"
              aria-label={`Watch ${featuredSpeaking.title}`}
            >
              <div className="home-speaking-image">
                <Image
                  src={featuredSpeaking.image}
                  alt={featuredSpeaking.imageAlt ?? featuredSpeaking.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
                <span className="home-speaking-play" aria-hidden="true">
                  <Play size={18} fill="currentColor" />
                </span>
              </div>
              <div className="home-speaking-copy">
                <div className="meta-stack bronze-label">
                  Featured speaking
                </div>
                <h3>{featuredSpeaking.title}</h3>
                <p>{featuredSpeaking.description}</p>
                <span className="text-link home-speaking-watch">
                  Watch featured talk
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Link>

            <Link
              href="/expertise#speaking"
              className="text-link home-speaking-more"
            >
              View all speaking &amp; media
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
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

          <div className="home-proof-strip" aria-label="Career progression">
            <span>Secret Network Africa</span>
            <span>Business Development Associate</span>
            <span>Business Development Manager</span>
            <span>Head of Sales &amp; Business Development</span>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
