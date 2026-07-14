import { achievements } from "@/data/achievements";

export type InstitutionalOutcome = {
  title: string;
  context: string;
  role: string;
  actions: string;
  outcome: string;
  evidenceLabel: string;
  evidenceHref?: string;
};

export const institutionalOutcomes: InstitutionalOutcome[] = [
  {
    title: "Commercial growth for privacy-first blockchain infrastructure",
    context:
      "Secret Network Foundation required a global commercial motion spanning enterprise engagement, ecosystem partnerships, DeFi, AI infrastructure, and go-to-market execution.",
    role: "Head of Sales & Business Development, following earlier business-development roles within the ecosystem.",
    actions:
      "Led sales strategy, structured partnership pipelines, negotiated commercial opportunities, coordinated partner activation, and supported teams through ecosystem and mainnet readiness.",
    outcome: `${achievements.revenue.claim} ${achievements.deals.claim} ${achievements.evmPartnerships.claim} ${achievements.mainnetLaunches.claim} ${achievements.tvlGrowth.claim}`,
    evidenceLabel:
      "Supporting documentation or professional references are available where appropriate.",
  },
  {
    title: "Regional ecosystem development and capacity building in Africa",
    context:
      "Secret Network's African ecosystem required locally relevant education, developer pathways, university relationships, and sustained community activation across multiple markets.",
    role: "Secret Network Africa Lead.",
    actions:
      "Built regional partnerships, supported physical and virtual programmes, created developer education pathways, and connected teams with hackathons, grants, go-to-market support, and ecosystem visibility.",
    outcome: `${achievements.ambassadors.claim} ${achievements.events.claim} ${achievements.developers.claim}`,
    evidenceLabel: "View public ecosystem context",
    evidenceHref:
      "/blog/secret-network-africa-cryptocurrency-academy-kenya-blockchain-crypto-adoption",
  },
  {
    title: "Blockchain intelligence and digital-asset risk analysis",
    context:
      "Crypto-related financial-crime work requires defensible attribution, clear evidence chains, and structured analysis across wallets, entities, platforms, and emerging typologies.",
    role: "Blockchain Intelligence Analyst at CipherOwl Inc.",
    actions:
      "Conducted cryptocurrency investigations, attribution research, OSINT, typology analysis, and evidence capture across addresses, metadata, transaction patterns, usernames, URLs, and entity relationships.",
    outcome:
      "Produced structured, auditable and evidence-based intelligence reporting for complex crypto-related risks.",
    evidenceLabel:
      "Supporting documentation or professional references are available where appropriate.",
  },
  {
    title: "Commercial execution in a high-growth African marketplace",
    context:
      "Jumia's sales environment required disciplined customer acquisition, product adoption, client service, and cross-functional coordination across marketing and logistics.",
    role: "Senior Sales Consultant, Jumia Group.",
    actions:
      "Drove customer acquisition and product adoption, managed client relationships, and worked with marketing and logistics teams to improve campaign performance and customer satisfaction.",
    outcome:
      "Consistently exceeded sales and customer-acquisition targets and achieved Gold-Level Sales Recognition.",
    evidenceLabel:
      "Supporting documentation or professional references are available where appropriate.",
  },
];
