import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section
      id="about"
      data-nav-group="profile"
      data-scene-label="Executive Profile"
      className="page-layer py-12"
    >
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">Executive profile</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
            <div>
              <h2 className="section-title">{profile.aboutTitle}</h2>
            </div>

            <div>
              <p className="section-copy max-w-none text-[var(--muted-strong)]">
                {profile.aboutBody}
              </p>
              <p className="mt-5 text-[1rem] leading-8 text-[var(--muted)]">
                {profile.aboutBodyExtended}
              </p>
              <p className="mt-5 text-[1rem] leading-8 text-[var(--muted)]">
                The work supports enterprises, public-sector institutions,
                development organisations, universities, technology companies,
                digital-asset businesses, regulated organisations, investors,
                and strategic partners navigating growth, market entry,
                capacity building, and digital-asset risk.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {profile.aboutCards.map((card) => (
                  <article key={card.title} className="signal-card h-full">
                    <h3 className="font-['Sora'] text-[1.4rem] tracking-[-0.05em] text-[var(--foreground)]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[0.98rem] leading-7 text-[var(--muted)]">
                      {card.text}
                    </p>
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
