import { Container } from "@/components/Container";
import {
  ControlledScene,
  type ControlledSceneItem,
} from "@/components/ControlledScene";
import { profile } from "@/data/profile";

const educationPanels: ControlledSceneItem[] = [
  {
    id: "education",
    label: "Education",
    content: (
      <article className="education-group">
        <div className="meta-stack">Education</div>
        <h3>{profile.education.school}</h3>
        <p className="education-degree">{profile.education.degree}</p>
        <p>{profile.education.course}</p>
      </article>
    ),
  },
  {
    id: "university-leadership",
    label: "University leadership",
    content: (
      <article className="education-group">
        <div className="meta-stack">
          University leadership & community impact
        </div>
        <ul>
          {profile.education.universityLeadership.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    ),
  },
  {
    id: "professional-development",
    label: "Professional development",
    content: (
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
    ),
  },
];

export function Education() {
  return (
    <section
      id="education"
      data-nav-group="expertise"
      data-scene-label="Education"
      className="page-layer controlled-section py-14 md:py-16 lg:py-12"
    >
      <Container>
        <ControlledScene
          eyebrow="Education & development"
          title="Education."
          intro="Business-administration foundations, university leadership, and professional development supporting commercial execution, stakeholder engagement, and capacity building."
          items={educationPanels}
          ariaLabel="Education and professional development"
        />
      </Container>
    </section>
  );
}
