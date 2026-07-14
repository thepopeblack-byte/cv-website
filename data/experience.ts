import { achievements } from "@/data/achievements";

export type Role = {
  title: string;
  period: string;
  location: string;
  engagementType?: "Part-time" | "Contract" | "Consulting" | "Advisory" | "Full-time";
  bullets: string[];
};

export type ExperienceEntry = {
  company: string;
  label: string;
  roles: Role[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Secret Network Foundation",
    label: "Revenue leadership | ecosystem growth | global partnerships",
    roles: [
      {
        title: "Head of Sales & Business Development",
        period: "Mar 2026 - Present",
        location: "Remote",
        bullets: [
          "Lead global sales strategy, revenue growth, strategic partnerships, and enterprise engagement for Secret Network Foundation.",
          achievements.revenue.claim,
          achievements.deals.claim,
          achievements.evmPartnerships.claim,
          achievements.mainnetLaunches.claim,
          achievements.tvlGrowth.claim,
          "Build relationships with founders, investors, enterprises, developers, infrastructure teams, and ecosystem partners.",
          "Represent Secret Network in executive meetings, global conferences, partner negotiations, and industry engagements.",
        ],
      },
      {
        title: "Business Development Manager",
        period: "Jun 2025 - Mar 2026",
        location: "Remote",
        bullets: [
          "Managed strategic partnerships, partner success, GTM planning, co-marketing, technical coordination, and commercial follow-up.",
          "Identified new sales programs, partner-led growth opportunities, and commercial models.",
          "Conducted market research, competitive analysis, and ecosystem mapping.",
          "Managed pilot programs with partners and tracked performance outcomes.",
        ],
      },
      {
        title: "Business Development Associate",
        period: "Apr 2024 - Jun 2025",
        location: "Remote",
        bullets: [
          "Supported partner acquisition, relationship management, market research, and ecosystem engagement.",
          "Coordinated go-to-market activities, co-marketing plans, partner communications, and opportunity tracking.",
          "Built research briefs, partner profiles, and competitive insights.",
        ],
      },
      {
        title: "Secret Network Africa Lead",
        period: "Feb 2022 - Dec 2024",
        location: "Remote",
        engagementType: "Part-time",
        bullets: [
          "Built and scaled Secret Network's African ecosystem presence across Nigeria, Kenya, Ghana, Rwanda, and South Africa.",
          achievements.events.claim,
          achievements.ambassadors.claim,
          achievements.developers.claim,
          "Built partnerships with universities, technology hubs, developer communities, and local Web3 organizations.",
          "Supported African developers in hackathons, grants, GTM support, and ecosystem visibility.",
          "Contributed to Secret Network Africa winning Best Blockchain-Based Solution at the 2023 Africa Fintech & AI Awards.",
        ],
      },
    ],
  },
  {
    company: "CipherOwl Inc.",
    label: "AML | OSINT | crypto investigations",
    roles: [
      {
        title: "Blockchain Intelligence Analyst",
        period: "Mar 2026 - Present",
        location: "Remote",
        bullets: [
          "Conduct blockchain intelligence, cryptocurrency investigations, attribution research, and financial crime analysis.",
          "Investigate illicit crypto activity across OTC networks, P2P platforms, mixers, crypto ATMs, forums, wallets, and financial crime typologies.",
          "Document attribution evidence including blockchain addresses, metadata, screenshots, URLs, usernames, transaction patterns, and entity linkages.",
          "Apply professional classification standards to ensure accuracy, auditability, and defensibility of findings.",
          "Track emerging crypto-related risks across African digital asset ecosystems.",
          "Support operational intelligence needs through structured OSINT and evidence-based reporting.",
        ],
      },
    ],
  },
  {
    company: "Jumia Group",
    label: "Sales performance | client acquisition | commercial execution",
    roles: [
      {
        title: "Senior Sales Consultant",
        period: "Jun 2015 - Dec 2021",
        location: "Remote / Nigeria",
        bullets: [
          "Drove sales growth, customer acquisition, product adoption, and client service excellence.",
          "Consistently exceeded sales and customer acquisition targets.",
          "Achieved Gold-Level Sales Recognition.",
          "Recognized among the youngest top-performing sales consultants in the region.",
          "Collaborated with marketing and logistics teams to improve campaign performance, conversion, and customer satisfaction.",
        ],
      },
    ],
  },
  {
    company: "QuickTech Media",
    label: "Creative operations | stakeholder management",
    roles: [
      {
        title: "Graphics Editor / Creative Production Lead",
        period: "Jan 2016 - Jan 2022",
        location: "Nigeria",
        engagementType: "Part-time",
        bullets: [
          "Led creative production of scrapbooks, photo booklets, yearbooks, and plaques for 20,000+ students across Nigeria.",
          "Managed photography, digital organization, design templates, and production coordination.",
          "Developed strong project coordination, stakeholder management, and client service capabilities.",
        ],
      },
    ],
  },
];
