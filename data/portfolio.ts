export type PortfolioItem = {
  title: string;
  category: string;
  description: string;
  image: string;
  href?: string;
  ctaLabel?: string;
  videoEmbedUrl?: string;
  videoWatchUrl?: string;
  placeholderNote?: string;
};

// Replace placeholder images with higher-resolution event media if more assets become available.
export const portfolioItems: PortfolioItem[] = [
  {
    title: "Cybertech Africa, Kigali 2023",
    category: "Conference",
    description:
      "Keynote speaker in Kigali, contributing to a panel discussion on blockchain technology and the imperative of securing cryptocurrencies.",
    image: "/images/kayode-networking.jpg",
    href: "https://africa.cybertechconference.com/speakers",
    ctaLabel: "View Event",
    videoEmbedUrl: "https://www.youtube.com/embed/ktdhwuTZcb0",
    videoWatchUrl: "https://youtu.be/ktdhwuTZcb0?si=5UBjckrIDlPBHddQ",
  },
  {
    title: "Web3 Lagos Conference",
    category: "Workshop",
    description:
      "Featured speaker leading a developer workshop on Web3 privacy, protocol design, and adoption strategy.",
    image: "/images/kayode-speaking.jpg",
    href: "https://event.web3bridge.com/",
    ctaLabel: "View Event",
    videoEmbedUrl: "https://www.youtube.com/embed/nC9zMBwnukU?start=3420",
    videoWatchUrl:
      "https://www.youtube.com/live/nC9zMBwnukU?si=BtEl8a089EQSmh55&t=3420",
  },
  {
    title: "JCI Made 1.0",
    category: "Speaking",
    description:
      "Speaker appearance highlighted on the legacy site as part of a broader event and leadership showcase.",
    image: "/images/kayode-networking.jpg",
    placeholderNote:
      "Current site references this appearance but does not expose a direct destination URL. Add the event page or media link when available.",
  },
  {
    title: "Blockchain Africa Summit South Africa 2023",
    category: "Conference",
    description:
      "Regional ecosystem visibility and on-ground participation across one of Africa's flagship blockchain gatherings.",
    image: "/images/kayode-speaking.jpg",
    placeholderNote:
      "Add the official summit page or a gallery link if a preferred destination becomes available.",
  },
  {
    title: "Tech Talk Episode 4: Web 3.0: The Future of the Internet",
    category: "Media",
    description:
      "Selected media appearance from the current site archive focused on Web3 adoption and the future internet stack.",
    image: "/images/kayode-speaking.jpg",
    placeholderNote:
      "The legacy site lists the title but does not expose a public video URL in the HTML. Add the final video link when confirmed.",
  },
  {
    title: "Secret Agent Showcase",
    category: "Media",
    description:
      "Showcase feature referenced on the current website as part of the broader speaking and thought-leadership library.",
    image: "/images/kayode-networking.jpg",
    placeholderNote:
      "Add the showcase recording or publication URL here when available.",
  },
  {
    title: "Daybreak Extra: Web3 Blockchain and DeFi Privacy",
    category: "Media",
    description:
      "Broadcast-style media feature centered on privacy, digital assets, and the wider DeFi conversation.",
    image: "/images/kayode-speaking.jpg",
    placeholderNote:
      "Current site exposes the title only. Add the verified broadcast or replay link when available.",
  },
  {
    title: "The Alt Kings Episode 111",
    category: "Podcast",
    description:
      "Podcast appearance highlighted in the existing portfolio section as part of ongoing ecosystem commentary.",
    image: "/images/kayode-networking.jpg",
    placeholderNote:
      "Add the public episode URL or streaming link when available.",
  },
  {
    title: "CoCreate West Africa Tech Conference",
    category: "Conference",
    description:
      "Conference reference carried over from the original site to preserve the breadth of public-facing ecosystem activity.",
    image: "/images/kayode-speaking.jpg",
    placeholderNote:
      "Current site lists the event title without a direct link. Add the official event or media page when available.",
  },
];

export const speakingMediaItems: PortfolioItem[] = [
  {
    title: "Web3 Lagos Conference",
    category: "Featured Video",
    description:
      "Developer workshop segment on privacy in Web3 and how design choices shape protocol trust.",
    image: "/images/kayode-speaking.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/nC9zMBwnukU?start=3396",
    videoWatchUrl:
      "https://www.youtube.com/live/nC9zMBwnukU?si=PuP2m9ZtZLrmt9q4&t=3396",
  },
  {
    title: "Cybertech Africa, Kigali 2023",
    category: "Featured Video",
    description:
      "Conference appearance focused on blockchain security and the commercial implications of trust in digital assets.",
    image: "/images/kayode-networking.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/ktdhwuTZcb0",
    videoWatchUrl: "https://youtu.be/ktdhwuTZcb0?si=5UBjckrIDlPBHddQ",
  },
  {
    title: "Daybreak Extra: Web3 Blockchain and DeFi Privacy",
    category: "Broadcast",
    description:
      "Legacy site reference preserved as a placeholder until the verified replay URL is added.",
    image: "/images/kayode-speaking.jpg",
    placeholderNote: "Add the replay or station page URL here.",
  },
  {
    title: "The Alt Kings Episode 111",
    category: "Podcast",
    description:
      "Current site archive reference retained for continuity while awaiting the confirmed public episode link.",
    image: "/images/kayode-networking.jpg",
    placeholderNote: "Add the public podcast link here.",
  },
];
