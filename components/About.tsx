import { Container } from "@/components/Container";
import {
  ControlledScene,
  type ControlledSceneItem,
} from "@/components/ControlledScene";
import { profile } from "@/data/profile";

const profilePanels: ControlledSceneItem[] = [
  {
    id: "who-kayode-helps",
    label: "Who Kayode helps",
    content: (
      <article className="profile-scene-panel">
        <div className="meta-stack">Institutional relevance</div>
        <h3>Built for organisations navigating growth and trust.</h3>
        <p>
          The work supports enterprises, public-sector institutions,
          development organisations, universities, technology companies,
          digital-asset businesses, regulated organisations, investors, and
          strategic partners navigating growth, market entry, capacity
          building, and digital-asset risk.
        </p>
      </article>
    ),
  },
  {
    id: "commercial-leadership",
    label: "Commercial leadership",
    content: (
      <article className="profile-scene-panel">
        <div className="meta-stack">Revenue and partnerships</div>
        <h3>{profile.aboutCards[0].title}</h3>
        <p>{profile.aboutCards[0].text}</p>
        <h4>{profile.aboutCards[1].title}</h4>
        <p>{profile.aboutCards[1].text}</p>
      </article>
    ),
  },
  {
    id: "web3-infrastructure",
    label: "Web3 & infrastructure",
    content: (
      <article className="profile-scene-panel">
        <div className="meta-stack">Infrastructure and ecosystems</div>
        <h3>{profile.aboutCards[2].title}</h3>
        <p>{profile.aboutBody}</p>
        <p>{profile.aboutCards[2].text}</p>
      </article>
    ),
  },
  {
    id: "intelligence-risk",
    label: "Intelligence & risk",
    content: (
      <article className="profile-scene-panel">
        <div className="meta-stack">Blockchain intelligence</div>
        <h3>Evidence-led digital-asset intelligence.</h3>
        <p>{profile.aboutBodyExtended}</p>
      </article>
    ),
  },
];

export function About() {
  return (
    <section
      id="about"
      data-nav-group="profile"
      data-scene-label="Executive Profile"
      className="page-layer controlled-section py-12"
    >
      <Container>
        <ControlledScene
          eyebrow="Executive profile"
          title={profile.aboutTitle}
          intro="Commercial leadership, infrastructure fluency, ecosystem execution, and intelligence-led operating depth presented in one concise profile."
          items={profilePanels}
          ariaLabel="Executive profile topics"
        />
      </Container>
    </section>
  );
}
