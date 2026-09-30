import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { logoItems, type LogoItem } from "@/data/logos";
import styles from "./WorkEvidence.module.css";

const sources = {
  secret: "https://scrt.network/",
  q1: "https://framerusercontent.com/assets/5xHkbmj5NjgVbYIZX05XsvdaY.pdf",
  q2: "https://framerusercontent.com/assets/njSofqEShz6VOC0sURkbP6bSNI.pdf",
  h2_2024: "https://framerusercontent.com/assets/3SHhbm2N5wWauDuOZFghfSazg.pdf",
  h1_2025: "https://framerusercontent.com/assets/cRmTHCctqZ02ITw383hQmGGaTxw.pdf",
  h2_2025: "https://framerusercontent.com/assets/qeBxNoFfH3hrpbOYd0C4V9drcYA.pdf",
  morpheus:
    "https://scrt.network/blog/stop-letting-rogue-server-hosts-steal-your-client-data-morpheus-and-secret-network-unveil-unhackable-zero-snoop-ai-infrastructure",
  fina: "https://fina.cash/",
  secretApplications:
    "https://docs.scrt.network/secret-network-documentation/overview-ecosystem-and-technology/ecosystem-overview/applications",
  finaGrant:
    "https://scrt.network/blog/secret-labs-announces-latest-grant-recipients-opens-applications-for-q2-2025-cohort",
  aitech:
    "https://scrt.network/blog/aitech-cloud-network-and-secret-network-partner-to-bring-confidential-ai-to-agent-forge",
  cosmosFunding:
    "https://forum.cosmos.network/t/atom-accelerator-dao-transparency-report-9/15449",
  cosmosReport:
    "https://forum.cosmos.network/t/building-the-now-of-cosmos-hub-in-africa/15421",
  hacken: "https://hacken.io/discover/tracing-bybit-billion/",
  whispernode:
    "https://whispernodeweekly.beehiiv.com/p/this-week-in-cosmos-with-whispernode-1981",
  blockleaders: "https://blockleaders.io/popeblacks-web3-journey/",
  cybertechAgenda: "https://africa.cybertechconference.com/sites/africa2020/files/2023-08/AGENDA%20AFRICA_A4%20%287%29.pdf",
  web3LagosTalk: "https://www.youtube.com/watch?v=nC9zMBwnukU&t=4440s",
  africaBlockchainSummit: "https://cryptoevents.global/africa-blockchain-summit-2023/",
  sibanSummitTalk: "https://www.youtube.com/watch?v=o-2dpcgb8oA",
  binanceKenyaCoverage:
    "https://web.archive.org/web/20230123152437/https://www.binance.com/en/feed/post/176451",
  binanceAfricaAma: "https://x.com/BinanceAfrica/status/1647988789569277953",
};

const relationshipOnlyLogos: LogoItem[] = [
  { name: "Fhenix", src: "/logos/fhenix.svg", width: 1406, height: 262, tone: "dark" },
  { name: "Hacken", src: "/logos/hacken.svg", width: 240, height: 240, tone: "light" },
  {
    name: "Blockleaders",
    src: "https://blockleaders.io/wp-content/uploads/2026/04/Logo_Name_White-175x40.png",
    width: 175,
    height: 40,
    tone: "light",
  },
];

const relationships = [
  {
    name: "WhisperNode", id: "whispernode", label: "Ecosystem communications engagement",
    contribution: "Managed social and community activity, partner outreach and customer support across networks WhisperNode validated. Co-published WhisperNode Weekly.",
    proof: { href: sources.whispernode, label: "Co-credited issue" },
  },
  {
    name: "Bybit", id: "bybit", label: "Former affiliate marketing, not employment",
    contribution: "Referred and onboarded users through an earlier affiliate relationship. This is separate from my later Hacken analysis of the Bybit theft.",
  },
  {
    name: "Fhenix", id: "fhenix", label: "Builder-outreach consulting campaign",
    contribution: "Supported a consulting campaign introducing builders to Fhenix technology and hackathon opportunities.",
  },
  {
    name: "Archway", id: "archway", label: "Archway Nigeria community work",
    contribution: "Helped run community activity, workshops and hackathons for developers and creators in Nigeria.",
  },
  {
    name: "KalloView", id: "kalloview", label: "Advisor",
    contribution: "Advised on fundraising strategy, grants, partnerships and introductions.",
  },
  {
    name: "Thinka", id: "thinka", label: "International-growth consultant",
    contribution: "Supported international expansion campaigns and the development of global TikTok and Instagram channels.",
  },
  {
    name: "Jumia", id: "jumia", label: "Earlier sales work · Jun 2015–Dec 2021",
    contribution: "Worked across sales, customer acquisition, product adoption and service, building the commercial discipline later used in digital-asset markets.",
  },
  {
    name: "QuickTech Media", id: "quicktech", label: "Earlier creative operations · Jan 2016–Jan 2022",
    contribution: "Coordinated design production, clients and stakeholders for education-sector projects.",
  },
  {
    name: "Hacken", id: "hacken", label: "Bylined publisher",
    contribution: "Published my analysis of the Bybit theft and the limits of on-chain attribution. This is separate from my earlier Bybit affiliate marketing.",
    proof: { href: sources.hacken, label: "Read original analysis" },
  },
  {
    name: "Blockleaders", id: "blockleaders", label: "Independent coverage",
    contribution: "Jillian Godsil profiled my path from ecosystem work to commercial leadership and blockchain intelligence; it is her reporting, not my byline.",
    proof: { href: sources.blockleaders, label: "Read original profile" },
  },
];

function EvidenceLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={styles.source}>
      {children} <ArrowUpRight size={14} aria-hidden="true" />
    </Link>
  );
}

function CaseSection({
  id,
  relationship,
  title,
  challenge,
  role,
  actions,
  outcome,
  limits,
  children,
}: {
  id: string;
  relationship: string;
  title: string;
  challenge: string;
  role: string;
  actions: string;
  outcome: React.ReactNode;
  limits?: string;
  children: React.ReactNode;
}) {
  return (
    <article id={id} className={styles.case}>
      <div className={styles.caseHeader}>
        <span className="meta-stack">{relationship}</span>
        <h3>{title}</h3>
      </div>
      <dl className={styles.caseFacts}>
        <div><dt>Challenge</dt><dd>{challenge}</dd></div>
        <div><dt>My role</dt><dd>{role}</dd></div>
        <div><dt>Actions</dt><dd>{actions}</dd></div>
        <div><dt>Outcome</dt><dd>{outcome}</dd></div>
      </dl>
      {limits ? <p className={styles.limits}>{limits}</p> : null}
      <div className={styles.sources} aria-label={`Sources for ${title}`}>{children}</div>
    </article>
  );
}

export function WorkEvidence() {
  return (
    <>
      <section id="impact" className={styles.opening} aria-label="Browse selected work">
        <Container>
          <nav className={styles.jumpLinks} aria-label="Work and evidence cases">
            <Link href="#secret-foundation">Secret Network</Link>
            <Link href="#cosmos-hub-africa">Cosmos Hub Africa</Link>
            <Link href="#cipherowl">Intelligence</Link>
            <Link href="#relationships">Relationships</Link>
          </nav>
        </Container>
      </section>

      <section className={styles.portfolio} aria-labelledby="secret-portfolio-heading">
        <Container>
          <div className={styles.groupHeading}>
            <p className="meta-stack">Commercial & ecosystem portfolio</p>
            <h2 id="secret-portfolio-heading">Secret Network</h2>
            <p>I moved from regional ecosystem work into international business development and now lead the Foundation&apos;s sales function. Fina sits within that Secret ecosystem story as a distinct product project, not a Foundation revenue line.</p>
          </div>
          <div className={styles.caseList}>
            <CaseSection
              id="secret-foundation"
              relationship="Secret Network progression · 2022–present"
              title="From lead sourcing to global commercial leadership"
              challenge="Make privacy-focused blockchain and confidential-computing infrastructure legible to commercial partners and move opportunities toward adoption."
              role="I progressed through regional ecosystem work, Business Development Associate and Manager roles, and then Head of Sales & Business Development."
              actions="From 2024 onward I sourced leads, brought prospective partners into the pipeline, developed relationships and opportunities, and worked with colleagues on negotiation, activation and implementation. That contribution spans before and after my promotion."
              outcome="Foundation reports document international partnerships, builder support and an expanding commercial pipeline across 2024–25. Later announcements include confidential-AI work with Morpheus and AITECH Cloud Network (formerly Solidus AI Tech)."
            >
              <EvidenceLink href={sources.h2_2024}>H2 2024 Foundation report, pp. 28–29</EvidenceLink>
              <EvidenceLink href={sources.h1_2025}>H1 2025 report, pp. 26–27</EvidenceLink>
              <EvidenceLink href={sources.h2_2025}>H2 2025 report, p. 4</EvidenceLink>
              <EvidenceLink href={sources.morpheus}>Morpheus announcement</EvidenceLink>
              <EvidenceLink href={sources.aitech}>AITECH announcement</EvidenceLink>
            </CaseSection>
            <CaseSection
              id="secret-africa"
              relationship="Earlier ecosystem role · February 2022–December 2024"
              title="Secret Network Africa"
              challenge="Build sustained education and partner pathways for privacy technology across African developer communities."
              role="Secret Network Africa Lead, overlapping with my later business-development progression."
              actions="I developed the education partnership with Cryptocurrency Academy Kenya, coordinated community and university relationships, and led 12 weeks of Zero-to-Hero developer workshops. I also represented Secret Network Africa at Cybertech Africa in Kigali, Web3 Lagos, the SiBAN Digital Assets Summit in Abuja and the Africa Blockchain Summit in Accra."
              outcome="Archived Binance Feed coverage documents the Cryptocurrency Academy Kenya collaboration; Cybertech Africa's programme lists me on its blockchain and cryptocurrency security panel, and the Q2 2024 Foundation report names me for the developer workshops."
            >
              <EvidenceLink href={sources.binanceKenyaCoverage}>Kenya partnership coverage (archived Binance Feed)</EvidenceLink>
              <EvidenceLink href={sources.binanceAfricaAma}>Binance Africa privacy AMA announcement</EvidenceLink>
              <EvidenceLink href={sources.cybertechAgenda}>Cybertech Africa 2023 programme</EvidenceLink>
              <EvidenceLink href={sources.web3LagosTalk}>Web3 Lagos talk</EvidenceLink>
              <EvidenceLink href={sources.sibanSummitTalk}>SiBAN Digital Assets Summit recording</EvidenceLink>
              <EvidenceLink href={sources.africaBlockchainSummit}>Africa Blockchain Summit speaker listing</EvidenceLink>
              <EvidenceLink href={sources.q2}>Q2 2024 report, pp. 15 and 30</EvidenceLink>
              <EvidenceLink href={sources.q1}>Q1 2024 report, pp. 4 and 25</EvidenceLink>
              <Link href="/experience" className={styles.source}>View role history <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </CaseSection>
            <div className={styles.nestedCase}>
              <CaseSection
                id="fina"
                relationship="Nested Secret ecosystem project · June 2023–April 2025"
                title="Fina / Fina Cash"
                challenge="Support adoption of wallet, staking and card products built for the Secret Network and wider Cosmos/IBC ecosystem."
                role="Community, Growth & Product Marketing for Fina, concurrent with my Secret Network work."
                actions="I worked on community growth, product marketing, acquisition campaigns, social strategy and ecosystem partnerships."
                outcome={<>The Foundation&apos;s H2 2024 report records Fina P2P&apos;s <strong>$60,000 grant</strong>, mainnet launch and first customers; later Fina product figures include <strong>$100K+ monthly top-ups</strong>, <strong>$150K+ monthly card spend</strong>, <strong>100K+ app downloads</strong> and a <strong>200K+ community</strong>.</>}
              >
                <EvidenceLink href={sources.fina}>Fina product</EvidenceLink>
                <EvidenceLink href={sources.secretApplications}>Secret ecosystem listing</EvidenceLink>
                <EvidenceLink href={sources.h2_2024}>H2 2024 report, p. 30</EvidenceLink>
                <EvidenceLink href={sources.finaGrant}>Secret Labs grant announcement</EvidenceLink>
              </CaseSection>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.portfolio} aria-labelledby="independent-work-heading">
        <Container>
          <div className={styles.groupHeading}>
            <p className="meta-stack">Independent initiative & intelligence</p>
            <h2 id="independent-work-heading">Programmes and analysis</h2>
          </div>
          <div className={styles.caseList}>
            <CaseSection
              id="cosmos-hub-africa"
              relationship="Funded initiative · 2024–2025 programme"
              title="Cosmos Hub Africa / Naija HackATOM"
              challenge="Create a practical route from local interest in the Cosmos stack to developer learning, mentorship and project submissions."
              role="Founder and programme lead for Cosmos Hub Africa; the official funding record names Cosmos Nigeria/Popeblack."
              actions="I led programme design, local partnerships, community coordination and delivery across Nigerian cities, including the Naija HackATOM."
              outcome="ATOM Accelerator approved $27,250 for the initiative on 19 November 2024. Our completion report records 500+ attendees, 50+ submissions, 18 finalists and 7 winners."
            >
              <EvidenceLink href={sources.cosmosFunding}>ATOM Accelerator transparency report</EvidenceLink>
              <EvidenceLink href={sources.cosmosReport}>Programme completion report</EvidenceLink>
            </CaseSection>
            <CaseSection
              id="cipherowl"
              relationship="Concurrent intelligence role · March 2026–present"
              title="CipherOwl: investigations with defensible attribution"
              challenge="Investigations require careful tracing and attribution without treating every on-chain connection as proof of identity or wrongdoing."
              role="Blockchain Intelligence Analyst at CipherOwl."
              actions="I research addresses linked to OTC services, marketplaces, escrow services, forums and ATMs; combine transaction analysis with OSINT indicators; and document verifiable links to entities or services with source evidence, taxonomy and confidence limits."
              outcome="This contributes auditable intelligence datasets for investigations, transaction monitoring, compliance and financial-crime analysis while protecting client confidentiality. My Hacken byline demonstrates public analytical writing, not a CipherOwl client outcome."
            >
              <EvidenceLink href={sources.hacken}>Read my bylined Hacken analysis</EvidenceLink>
              <Link href="/blog" className={styles.source}>Writing & speaking <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </CaseSection>
          </div>
        </Container>
      </section>

      <section id="relationships" className={styles.relationships} aria-labelledby="relationships-heading">
        <Container>
          <p className="meta-stack">Selected work / relationship context</p>
          <h2 id="relationships-heading">Different relationships, clearly named.</h2>
          <p className={styles.relationshipIntro}>These logos represent different kinds of work, publication or coverage.</p>
          <div className={styles.relationshipGrid}>
            {relationships.map((relationship) => {
              const logo = [...logoItems, ...relationshipOnlyLogos].find((item) => item.name === relationship.name);
              return (
                <article key={relationship.id} id={relationship.id} className={styles.relationship}>
                  {logo ? <Image src={logo.src} width={logo.width} height={logo.height} alt={`${logo.name} logo`} unoptimized={logo.src.startsWith("https://")} className={`${styles.relationshipLogo} logo-tone-${logo.tone ?? "adaptive"}`} /> : <span className={styles.relationshipNameplate} aria-label="QuickTech Media nameplate">QuickTech Media</span>}
                  <strong>{relationship.name}</strong>
                  <span>{relationship.label}</span>
                  <p>{relationship.contribution}</p>
                  {"proof" in relationship && relationship.proof ? <EvidenceLink href={relationship.proof.href}>{relationship.proof.label}</EvidenceLink> : null}
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
