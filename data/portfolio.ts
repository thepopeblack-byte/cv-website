export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioItem = {
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  imageObjectPosition?: string;
  href?: string;
  ctaLabel?: string;
  videoEmbedUrl?: string;
  videoWatchUrl?: string;
  links?: PortfolioLink[];
};

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Secret Network Commercial Growth & Partnerships",
    category: "Revenue Growth / Strategic Partnerships",
    description:
      "Commercial leadership for Secret Network Foundation across global sales strategy, enterprise sales, blockchain partnerships, AI infrastructure partnerships, DeFi partnerships, EVM and Layer-2 partnerships, and partner-led go-to-market execution.",
    image: "/images/popeblack/proof/secret-network-commercial-leadership.jpg",
    imageAlt:
      "Kayode Popoola with Secret Network ecosystem partners during commercial and partnership activity.",
    imageObjectPosition: "center 42%",
    href: "#experience",
    ctaLabel: "View Experience",
  },
  {
    title: "Secret Network Africa Ecosystem Growth",
    category: "Africa Web3 Ecosystem",
    description:
      "Ecosystem growth work across Nigeria, Kenya, Ghana, Rwanda, and South Africa, including 2,000+ ambassadors onboarded, 50+ events supported, 500+ developers trained, and regional partnerships with universities, hubs, and Web3 communities.",
    image: "/images/popeblack/proof/ecosystem-growth-africa.jpg",
    imageAlt:
      "Kayode Popoola speaking on a DeFi panel in front of an African Web3 conference audience.",
    imageObjectPosition: "center 45%",
    href: "#impact",
    ctaLabel: "View Impact",
  },
  {
    title: "Blockchain Intelligence, AML/CFT & OSINT Capability",
    category: "Blockchain Intelligence",
    description:
      "Blockchain Intelligence Analyst capability covering crypto investigations, attribution research, AML/CFT risk context, OSINT workflows, digital asset typologies, and evidence-based reporting for complex crypto-related risks.",
    image: "/images/popeblack/proof/blockchain-intelligence-proof.jpg",
    imageAlt:
      "Verified IMF edX AML/CFT risk-based supervision certificate awarded to Kayode Popoola.",
    imageFit: "contain",
    href: "#experience",
    ctaLabel: "View Experience",
  },
  {
    title: "Speaking & Media Credibility",
    category: "Public Visibility",
    description:
      "Conference participation and ecosystem visibility from Blockchain Africa Summit South Africa 2023, highlighting Web3, blockchain adoption, and African ecosystem engagement.",
    image: "/images/popeblack/events/blockchain-africa-01.webp",
    href: "#speaking",
    ctaLabel: "View Media",
  },
];

export const speakingMediaItems: PortfolioItem[] = [
  {
    title: "Tech Talk Episode 4: Web 3.0: The Future of the Internet",
    category: "Media Video",
    description:
      "A public media appearance on Web3, blockchain infrastructure, digital ownership, and the future internet stack.",
    image: "/images/popeblack/videos/tech-talk-episode-4.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/ZONnY2kfCAQ",
    videoWatchUrl: "https://www.youtube.com/watch?v=ZONnY2kfCAQ",
  },
  {
    title: "Secret Agent Showcase",
    category: "Showcase Video",
    description:
      "A Secret Network ecosystem feature discussing privacy-first blockchain adoption, community growth, and the value of confidential computing infrastructure.",
    image: "/images/popeblack/videos/secret-agent-showcase.webp",
    videoEmbedUrl: "https://www.youtube.com/embed/EUlslDNj-ok?start=114",
    videoWatchUrl: "https://www.youtube.com/watch?v=EUlslDNj-ok&t=114s",
  },
  {
    title: "Daybreak Extra: Web3 Blockchain and DeFi Privacy",
    category: "Broadcast",
    description:
      "Broadcast appearance focused on Web3, blockchain adoption, DeFi privacy, and the need for privacy-preserving technology in digital asset markets.",
    image: "/images/popeblack/videos/daybreak-extra.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/b9gn2C4DC3M",
    videoWatchUrl: "https://www.youtube.com/watch?v=b9gn2C4DC3M",
  },
  {
    title: "The Alt Kings Episode 111",
    category: "Podcast Video",
    description:
      "Podcast appearance covering Web3 ecosystem growth, blockchain partnerships, digital assets, and adoption across emerging markets.",
    image: "/images/popeblack/videos/alt-kings-episode-111.webp",
    videoEmbedUrl: "https://www.youtube.com/embed/VxAE2QwMdw8?start=166",
    videoWatchUrl: "https://www.youtube.com/watch?v=VxAE2QwMdw8&t=166s",
  },
  {
    title: "Speaker at Web3 Lagos Conference",
    category: "Conference Video",
    description:
      "Conference session on Web3 education, developer adoption, ecosystem participation, and blockchain infrastructure opportunities in Africa.",
    image: "/images/popeblack/videos/web3-lagos-conference.webp",
    href: "https://event.web3bridge.com/",
    ctaLabel: "Event",
    videoEmbedUrl: "https://www.youtube.com/embed/nC9zMBwnukU?start=4440",
    videoWatchUrl: "https://www.youtube.com/watch?v=nC9zMBwnukU&t=4440s",
  },
  {
    title: "Cybertech Africa Conference Kigali, Rwanda 2023",
    category: "Conference Video",
    description:
      "Conference appearance in Kigali covering blockchain, cybersecurity, digital trust, and emerging market technology adoption.",
    image: "/images/popeblack/videos/cybertech-africa-2023.webp",
    href: "https://africa.cybertechconference.com/speakers",
    ctaLabel: "Event",
    videoEmbedUrl: "https://www.youtube.com/embed/ktdhwuTZcb0?start=7",
    videoWatchUrl: "https://www.youtube.com/watch?v=ktdhwuTZcb0&t=7s",
  },
];
