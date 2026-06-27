export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
};

export type ResumeAsset = {
  label: string;
  href: string;
  available: boolean;
  helper: string;
};

export const profile = {
  name: "Kayode Popoola",
  brandName: "Popeblack",
  location: "Remote (UTC+1)",
  email: "thepopeblack@gmail.com",
  linkedin: "https://www.linkedin.com/in/thepopeblack",
  twitter: "https://twitter.com/thepopeblack",
  telegram: "https://t.me/Popeblack",
  headline: "Head of Sales & Business Development",
  strapline:
    "Strategic Partnerships | Revenue Growth | Web3 Ecosystem Leadership",
  subheadline:
    "I build partnerships, revenue systems, and ecosystem growth strategies for Web3, emerging technology, and global innovation teams.",
  executiveSummary:
    "Commercial and partnerships leader with 10+ years of experience across business development, sales, strategic partnerships, customer acquisition, Web3 ecosystems, blockchain infrastructure, financial technology, digital commerce, and emerging markets.",
  currentFocus:
    "Currently serving as Head of Sales & Business Development at Secret Network Foundation, leading global revenue growth, enterprise partnerships, ecosystem expansion, and go-to-market initiatives for a privacy-first blockchain and confidential computing ecosystem.",
  proofLine:
    "Generated over $300,000 in revenue within the first 90 days, closed 50+ strategic deals, helped launch 15+ products on mainnet, and trained 500+ developers through ecosystem programs.",
  aboutTitle: "Building Growth Systems for Web3, Finance & Emerging Technology",
  aboutBody:
    "I help organizations grow through strategic partnerships, revenue development, market expansion, ecosystem activation, and stakeholder engagement. My work sits at the intersection of business development, Web3 infrastructure, financial technology, blockchain intelligence, and emerging markets.",
  aboutBodyExtended:
    "I have worked across sales, partnerships, community growth, developer adoption, customer acquisition, financial crime intelligence, and go-to-market execution. My strength is turning relationships, market insight, and execution discipline into measurable business outcomes.",
  speakingIntro:
    "Selected speaking engagements across Web3, blockchain privacy, DeFi, digital assets, ecosystem growth, and emerging technology adoption.",
  audienceLabel:
    "Built for recruiters, founders, investors, international organizations, and strategic partners evaluating senior commercial leadership.",
  heroHighlights: [
    "Global commercial leadership for privacy-first Web3 ecosystems",
    "Enterprise partnerships, GTM design, and revenue operations",
    "Cross-functional credibility spanning BD, ecosystem growth, and blockchain intelligence",
  ],
  aboutCards: [
    {
      title: "Revenue Growth",
      text: "Designing pipeline systems, commercial programs, and partnership motions that convert strategic relationships into measurable revenue.",
    },
    {
      title: "Strategic Partnerships",
      text: "Structuring high-value collaborations across protocols, infrastructure teams, enterprises, investors, and ecosystem operators.",
    },
    {
      title: "Ecosystem Expansion",
      text: "Activating markets, communities, developer networks, and launch pathways that compound adoption across regions and verticals.",
    },
  ],
  stats: [
    {
      label: "Revenue Generated in 90 Days",
      value: 300,
      prefix: "$",
      suffix: "K+",
      description:
        "Commercial impact delivered shortly after stepping into senior sales leadership.",
    },
    {
      label: "Strategic Deals Closed",
      value: 50,
      suffix: "+",
      description:
        "Partnerships and commercial agreements across Web3, AI, infrastructure, and emerging technology.",
    },
    {
      label: "EVM & Layer-2 Partnerships",
      value: 20,
      suffix: "+",
      description:
        "Collaborations established with leading blockchain ecosystems and ecosystem stakeholders.",
    },
    {
      label: "Mainnet Launches Supported",
      value: 15,
      suffix: "+",
      description:
        "Products guided through onboarding, ecosystem alignment, integration support, and successful mainnet launch.",
    },
    {
      label: "Ecosystem TVL Growth",
      value: 3,
      suffix: "x",
      description:
        "Growth contribution driven through partner activation, liquidity coordination, and GTM execution.",
    },
    {
      label: "Ambassadors Onboarded",
      value: 2000,
      suffix: "+",
      description:
        "Regional ecosystem expansion across Secret Network's African community footprint.",
    },
    {
      label: "Events Hosted",
      value: 50,
      suffix: "+",
      description:
        "Virtual and in-person programming supporting ecosystem education, activation, and visibility.",
    },
    {
      label: "Developers Trained",
      value: 500,
      suffix: "+",
      description:
        "Developer education and onboarding through structured Web3 learning programs.",
    },
    {
      label: "Years of Commercial Experience",
      value: 10,
      suffix: "+",
      description:
        "Leadership across sales, partnerships, ecosystem growth, and business development functions.",
    },
  ] satisfies Stat[],
  opportunityTypes: [
    "Business Development Role",
    "Partnership Opportunity",
    "Speaking Engagement",
    "Advisory / Consulting",
    "Blockchain Intelligence / AML",
    "Other",
  ],
  education: {
    school: "Bayero University, Kano",
    degree: "Bachelor of Business Administration",
    course: "Business Administration and Management",
    highlights: [
      "Organized workshops, meetups, events, and educational programs with over 10,000 participants.",
      "Featured in Bayero University Weekly Bulletin.",
      "Certified Business Developer by the Federal Government of Nigeria through the National Youth Investment Fund.",
    ],
  },
  resumeAssets: [
    {
      label: "Download Executive Resume PDF",
      href: "/resume/Kayode_Popoola_Master_Executive_Resume.pdf",
      available: false,
      helper:
        "Add Kayode_Popoola_Master_Executive_Resume.pdf to public/resume/.",
    },
    {
      label: "Download Web3 Executive CV",
      href: "/resume/Kayode_Popoola_Executive_Web3_CV.pdf",
      available: false,
      helper:
        "Add Kayode_Popoola_Executive_Web3_CV.pdf to public/resume/.",
    },
    {
      label: "Download Blockchain Intelligence CV",
      href: "/resume/Kayode_Popoola_Blockchain_Intelligence_CV.pdf",
      available: false,
      helper:
        "Add Kayode_Popoola_Blockchain_Intelligence_CV.pdf to public/resume/.",
    },
    {
      label: "Download Word Resume",
      href: "/resume/Kayode_Popoola_Master_Executive_Resume.docx",
      available: false,
      helper:
        "Add Kayode_Popoola_Master_Executive_Resume.docx to public/resume/.",
    },
  ] satisfies ResumeAsset[],
};
