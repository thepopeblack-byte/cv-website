export type Achievement = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  display: string;
  short: string;
  claim: string;
  description: string;
};

export const achievements = {
  revenue: {
    label: "Revenue Generated in 90 Days",
    value: 300,
    prefix: "$",
    suffix: "K+",
    display: "$300K+",
    short: "$300K+ revenue generated in 90 days",
    claim: "Generated $300K+ in revenue within the first 90 days.",
    description:
      "Commercial impact delivered shortly after stepping into senior sales leadership.",
  },
  deals: {
    label: "Strategic Deals Closed",
    value: 50,
    suffix: "+",
    display: "50+",
    short: "50+ strategic deals closed",
    claim:
      "Closed and negotiated 50+ strategic partnerships and commercial deals.",
    description:
      "Partnerships and commercial agreements across Web3, AI, infrastructure, DeFi, and emerging technology.",
  },
  evmPartnerships: {
    label: "EVM & Layer-2 Partnerships",
    value: 20,
    suffix: "+",
    display: "20+",
    short: "20+ EVM and Layer-2 partnerships",
    claim: "Established collaborations with 20+ EVM and Layer-2 ecosystems.",
    description:
      "Collaborations established with blockchain ecosystems and their stakeholders.",
  },
  mainnetLaunches: {
    label: "Mainnet Launches Supported",
    value: 15,
    suffix: "+",
    display: "15+",
    short: "15+ product and team launches supported on mainnet",
    claim: "Supported 15+ product and team launches on mainnet.",
    description:
      "Teams supported through onboarding, ecosystem alignment, integration, and launch execution.",
  },
  tvlGrowth: {
    label: "Ecosystem TVL Growth",
    value: 3,
    suffix: "x",
    display: "3x",
    short: "Contributed to 3x ecosystem TVL growth",
    claim: "Contributed to 3x ecosystem TVL growth.",
    description:
      "Growth contribution through partner activation, liquidity coordination, and go-to-market execution.",
  },
  ambassadors: {
    label: "Ambassadors Onboarded",
    value: 2000,
    suffix: "+",
    display: "2,000+",
    short: "2,000+ ambassadors onboarded",
    claim: "Onboarded 2,000+ ambassadors into the Secret Network ecosystem.",
    description:
      "Regional ecosystem expansion across Secret Network's African community footprint.",
  },
  events: {
    label: "Events Supported",
    value: 50,
    suffix: "+",
    display: "50+",
    short: "50+ ecosystem events supported",
    claim: "Supported 50+ physical and virtual ecosystem events.",
    description:
      "Programming supporting ecosystem education, activation, stakeholder engagement, and visibility.",
  },
  developers: {
    label: "Developers Trained",
    value: 500,
    suffix: "+",
    display: "500+",
    short: "500+ developers trained",
    claim: "Designed and launched a developer programme that trained 500+ developers.",
    description:
      "Developer education and onboarding through structured Web3 learning programmes.",
  },
  experience: {
    label: "Years of Commercial Experience",
    value: 10,
    suffix: "+",
    display: "10+",
    short: "10+ years of commercial experience",
    claim: "10+ years across sales, partnerships, and business development.",
    description:
      "Commercial work across sales, partnerships, ecosystem growth, and business development.",
  },
} satisfies Record<string, Achievement>;

export const impactStats: Achievement[] = Object.values(achievements);

export const heroQuickFacts = [
  achievements.revenue.short,
  achievements.deals.short,
  achievements.mainnetLaunches.short,
  achievements.developers.short,
];

export const experienceProofChips = [
  achievements.revenue.display + " revenue",
  achievements.deals.display + " deals",
  achievements.evmPartnerships.display + " EVM / L2 partnerships",
  achievements.tvlGrowth.display + " TVL growth contribution",
  achievements.developers.display + " developers trained",
];

export const socialProofChips = [
  achievements.revenue.display + " revenue",
  achievements.deals.display + " deals",
  achievements.evmPartnerships.display + " EVM / L2 partnerships",
  achievements.tvlGrowth.display + " TVL growth",
];

export const achievementSummary = [
  achievements.revenue.claim,
  achievements.deals.claim,
  achievements.mainnetLaunches.claim,
  achievements.developers.claim,
].join(" ");

export const confidentialityNote =
  "Selected commercial figures are aggregated or anonymised due to confidentiality obligations. Supporting references are available where appropriate.";
