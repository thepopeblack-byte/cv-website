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
    label: "Revenue Impact",
    value: 1.3,
    prefix: "$",
    suffix: "M+",
    display: "$1.3M+",
    short: "$1.3M+ revenue impact",
    claim:
      "Contributed to $1.3M+ in revenue across Web3 products, partnerships and commercial initiatives.",
    description:
      "Career-wide revenue impact across Web3 products, partnerships, product growth, and commercial initiatives.",
  },
  secretRevenue: {
    label: "Revenue Generated in 90 Days",
    value: 300,
    prefix: "$",
    suffix: "K+",
    display: "$300K+",
    short: "$300K+ Secret Network revenue generated in 90 days",
    claim:
      "Generated $300K+ in revenue within my first 90 days as Head of Sales & Business Development.",
    description:
      "Secret Network commercial impact delivered within the first 90 days of senior sales leadership.",
  },
  finaRevenue: {
    label: "Fina Card Revenue Contribution",
    value: 1,
    prefix: "$",
    suffix: "M+",
    display: "$1M+",
    short: "$1M+ Fina Card revenue contribution",
    claim: "Contributed to $1M+ in revenue from the Fina Card product.",
    description:
      "Revenue contribution through community growth, product marketing, user acquisition, campaigns, and ecosystem partnerships.",
  },
  deals: {
    label: "Strategic Deals",
    value: 50,
    suffix: "+",
    display: "50+",
    short: "50+ strategic deals closed",
    claim:
      "Closed and negotiated 50+ strategic partnerships and commercial deals.",
    description:
      "Partnerships and commercial agreements across Web3, AI, infrastructure, DeFi, and emerging technology.",
  },
  finaStakingGrowth: {
    label: "Staking Growth",
    value: 5,
    suffix: "x+",
    display: "5x+",
    short: "5x+ Fina staking growth contribution",
    claim: "Contributed to 5x+ staking growth at Fina.",
    description:
      "Growth contribution across Fina's staking product through community, marketing, adoption, and ecosystem activity.",
  },
  communityReach: {
    label: "Community Reach",
    value: 300,
    suffix: "K+",
    display: "300K+",
    short: "300K+ Fina social and community reach",
    claim:
      "Helped grow Fina's combined social and community audience to 300K+.",
    description:
      "Combined social and community audience growth supported through content, campaigns, acquisition, and community strategy.",
  },
  countries: {
    label: "Countries Internationally",
    value: 6,
    display: "6",
    short: "6 countries internationally",
    claim: "Delivered commercial and ecosystem work across six countries.",
    description:
      "International commercial, partnership, and ecosystem experience spanning six countries.",
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

export const impactStats: Achievement[] = [
  achievements.revenue,
  achievements.deals,
  achievements.finaStakingGrowth,
  achievements.communityReach,
  achievements.countries,
  achievements.evmPartnerships,
  achievements.mainnetLaunches,
  achievements.tvlGrowth,
  achievements.developers,
  achievements.experience,
];

export const heroQuickFacts = [
  achievements.revenue.short,
  achievements.deals.short,
  achievements.finaStakingGrowth.short,
  achievements.communityReach.short,
];

export const experienceProofPoints = [
  { value: achievements.revenue.display, label: "Revenue impact" },
  { value: achievements.deals.display, label: "Strategic deals" },
  {
    value: achievements.finaStakingGrowth.display,
    label: "Staking growth contribution",
  },
  { value: achievements.communityReach.display, label: "Community reach" },
  {
    value: achievements.countries.display,
    label: "Countries internationally",
  },
  {
    value: achievements.secretRevenue.display,
    label: "Secret Network revenue in 90 days",
  },
  {
    value: achievements.finaRevenue.display,
    label: "Fina Card revenue contribution",
  },
  {
    value: achievements.evmPartnerships.display,
    label: "EVM / L2 partnerships",
  },
  {
    value: achievements.tvlGrowth.display,
    label: "TVL growth contribution",
  },
  { value: achievements.developers.display, label: "Developers trained" },
];

export const experienceProofChips = experienceProofPoints.map(
  ({ value, label }) => `${value} ${label.toLowerCase()}`,
);

export const socialProofChips = [
  "Secret Network Foundation",
  "Cosmos Hub Africa",
  "Hacken byline",
];

export const achievementSummary = [
  achievements.revenue.claim,
  achievements.deals.claim,
  achievements.finaStakingGrowth.claim,
  achievements.communityReach.claim,
  achievements.countries.claim,
].join(" ");

export const confidentialityNote =
  "Selected commercial figures are aggregated or anonymised due to confidentiality obligations. Supporting references are available where appropriate.";
