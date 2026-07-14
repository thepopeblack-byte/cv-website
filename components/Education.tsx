import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { profile } from "@/data/profile";

export function Education() {
  return (
    <section
      id="education"
      data-nav-group="expertise"
      data-scene-label="Education"
      className="page-layer py-14 md:py-16 lg:py-12"
    >
      <Container>
        <SectionReveal className="section-frame education-stage">
          <div className="meta-stack">Education & development</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Education.</h2>
              <p className="section-copy">
                Business-administration foundations, university leadership, and
                professional development supporting commercial execution,
                stakeholder engagement, and capacity building.
              </p>
            </div>

            <div className="education-groups">
              <article className="education-group">
                <div className="meta-stack">Education</div>
                <h3>{profile.education.school}</h3>
                <p className="education-degree">{profile.education.degree}</p>
                <p>{profile.education.course}</p>
              </article>

              <article className="education-group">
                <div className="meta-stack">
                  University leadership and community impact
                </div>
                <ul>
                  {profile.education.universityLeadership.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="education-group">
                <div className="meta-stack">Professional development</div>
                <ul>
                  {profile.education.professionalDevelopment.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="education-development-note">
                  Compliance, financial-crime, OSINT, leadership, and
                  development-finance credentials are listed in the Credentials
                  section above.
                </p>
              </article>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
