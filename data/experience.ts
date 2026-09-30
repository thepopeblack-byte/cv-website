export type Role = {
  title: string;
  period?: string;
  location?: string;
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
    label: "Global commercial leadership | partnerships | ecosystem adoption",
    roles: [
      {
        title: "Head of Sales & Business Development",
        period: "Mar 2026 - Present",
        location: "Remote",
        bullets: [
          "Lead global sales and business development for privacy-focused blockchain and confidential-computing infrastructure.",
          "Source leads, develop commercial opportunities and coordinate negotiation, partner activation and implementation with colleagues across the Foundation and technical teams.",
        ],
      },
      {
        title: "Business Development Manager",
        period: "Jun 2025 - Mar 2026",
        location: "Remote",
        bullets: [
          "Developed strategic partnerships, partner success plans, go-to-market activity and commercial follow-up across an international pipeline.",
          "Introduced prospects and helped advance relationships through cross-functional planning; public Foundation reports document team outcomes, not individual deal ownership.",
        ],
      },
      {
        title: "Business Development Associate",
        period: "Apr 2024 - Jun 2025",
        location: "Remote",
        bullets: [
          "Sourced and researched prospective partners, built briefs and moved relevant opportunities into the business-development pipeline.",
          "Worked with colleagues on co-marketing, partner communications and routes from ecosystem interest to adoption.",
        ],
      },
      {
        title: "Secret Network Africa Lead",
        period: "Feb 2022 - Dec 2024",
        location: "Remote",
        engagementType: "Part-time",
        bullets: [
          "Developed the Cryptocurrency Academy Kenya education partnership and represented Secret Network Africa at Cybertech Africa, Web3 Lagos and the Africa Blockchain Summit.",
          "The Foundation's Q2 2024 report names Popeblack for 12 weeks of Zero-to-Hero workshops; the reported developer-onboarding total was a Growth and DevRel team result.",
        ],
      },
    ],
  },
  {
    company: "CipherOwl Inc.",
    label: "Blockchain intelligence | OSINT | digital-asset risk",
    roles: [
      {
        title: "Blockchain Intelligence Analyst",
        period: "Mar 2026 - Present",
        location: "Remote",
        bullets: [
          "Investigate and attribute blockchain addresses linked to OTC services, marketplaces, escrow services, forums, ATMs and higher-risk activity using on-chain transaction analysis and OSINT.",
          "Document verifiable links between addresses and real-world entities or services, recording source evidence, OSINT indicators and confidence limits for auditable intelligence.",
          "Apply structured taxonomy and metadata to intelligence datasets supporting cryptocurrency investigations, transaction monitoring, compliance and financial-crime analysis.",
          "Prioritise evidence quality and defensible attribution while protecting confidential investigation details.",
        ],
      },
    ],
  },
  {
    company: "WhisperNode",
    label: "Ecosystem growth & partner communications | descriptive engagement",
    roles: [
      {
        title: "Community, content and partner support",
        bullets: [
          "Managed social and community communications and supported outreach and customer service for partners across networks validated by WhisperNode.",
          "Co-published WhisperNode Weekly issues credited to WhisperNode & Popeblack; staking-growth percentage awaits validator analytics.",
        ],
      },
    ],
  },
  {
    company: "Cosmos Hub Nigeria / Naija HackATOM",
    label: "Funded ecosystem and developer programme | independent initiative",
    roles: [
      {
        title: "Founder & programme lead",
        bullets: [
          "Led programme design, local partnerships and delivery across Nigerian cities for a Cosmos Hub developer-activation initiative.",
          "ATOM Accelerator approved $27,250 for Cosmos Nigeria/Popeblack; the programme report records 500+ attendees and 50+ project submissions.",
        ],
      },
    ],
  },
];
