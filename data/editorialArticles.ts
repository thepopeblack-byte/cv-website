import type { BlogPost } from "@/data/articles";
import aiSafetyArticle from "@/data/ai-safety-article.json";

const hackerNoonBybitCoverage: BlogPost = {
  _id: "local.the-bybit-hack-tracing-is-only-half-the-battle",
  title: "The Bybit $1.46 Billion Hack Shows Why Tracing Stolen Crypto Is Only Half the Battle",
  slug: "the-bybit-hack-tracing-is-only-half-the-battle",
  date: "2026-10-13T00:00:00.000Z",
  publishedAt: "2026-10-13T00:00:00.000Z",
  _createdAt: "2026-10-13T00:00:00.000Z",
  type: "Featured",
  contentType: "external",
  visibility: "public",
  category: "Blockchain Intelligence",
  source: "HackerNoon",
  author: "Harry Hood",
  excerpt:
    "Harry Hood draws on my Hacken analysis of the Bybit theft to examine why tracing stolen funds is different from establishing attribution or recovering assets.",
  body:
    "In this HackerNoon article, Harry Hood discusses my published analysis for Hacken alongside reporting from blockchain-investigation firms. The piece examines the gap between following stolen value across services and building evidence strong enough to support attribution or intervention. This is independent coverage of my work, not an article I wrote for HackerNoon. Read the full story at the original publication.",
  tags: ["Blockchain Intelligence", "Financial Crime", "Bybit", "Crypto Investigations"],
  coverImage: {
    url: "/images/blog/hackernoon-bybit-coverage.svg",
    alt: "Editorial graphic for HackerNoon coverage of the Bybit theft analysis.",
  },
  externalUrl:
    "https://hackernoon.com/the-bybit-$146-billion-hack-shows-why-tracing-stolen-crypto-is-only-half-the-battle",
  readingTime: "4 min read",
  featured: true,
};

const blockleadersCommercialFeature: BlogPost = {
  _id: "local.kayode-popoola-commercial-achievements-and-international-partnerships",
  title: "Kayode Popoola: Commercial Achievements and International Partnerships",
  slug: "kayode-popoola-commercial-achievements-and-international-partnerships",
  date: "2026-10-08T06:24:00.000Z",
  publishedAt: "2026-10-08T06:24:00.000Z",
  _createdAt: "2026-10-08T06:24:00.000Z",
  type: "Featured",
  contentType: "external",
  visibility: "public",
  category: "Commercial Leadership",
  source: "Blockleaders",
  author: "Jillian Godsil",
  excerpt:
    "Jillian Godsil profiles Kayode Popoola's progression from Secret Network Africa to international sales leadership, commercial adoption and strategic partnerships.",
  body:
    "In this independent Blockleaders profile, Jillian Godsil examines Kayode Popoola's commercial work at Secret Network Foundation, from regional ecosystem development to international partnerships and revenue. Read the original publication for the full reporting and attributed comments.",
  tags: ["Commercial Leadership", "Strategic Partnerships", "Secret Network"],
  coverImage: {
    url: "/images/popeblack/proof/secret-network-commercial-leadership.jpg",
    alt: "Kayode Popoola with Secret Network colleagues.",
    caption: "Kayode Popoola with the Secret Network team; portfolio archive photo.",
  },
  externalUrl:
    "https://blockleaders.io/kayode-popoola-commercial-achievements-and-international-partnerships/",
  readingTime: "4 min read",
  featured: true,
};

const blockleadersFeature: BlogPost = {
  _id: "local.popeblacks-web3-journey",
  title:
    "From Community Builder to Blockchain Investigator: Popeblack’s Web3 Journey",
  slug: "popeblacks-web3-journey",
  date: "2026-09-25T06:45:00.000Z",
  publishedAt: "2026-09-25T06:45:00.000Z",
  _createdAt: "2026-09-25T06:45:00.000Z",
  type: "Featured",
  contentType: "external",
  visibility: "public",
  category: "Leadership & Web3",
  source: "Blockleaders",
  author: "Jillian Godsil",
  excerpt:
    "Blockleaders profiles Kayode Popoola’s path from community building and privacy advocacy to commercial leadership and blockchain intelligence.",
  body:
    "A Blockleaders profile tracing Kayode Popoola’s journey from university community building and African Web3 ecosystem development to privacy technology, commercial leadership and blockchain intelligence.",
  tags: ["Web3", "Privacy", "Leadership", "Blockchain Intelligence"],
  coverImage: {
    url: "/images/blog/popeblacks-web3-journey.jpg",
    alt: "Kayode Popoola speaking on a conference panel.",
  },
  externalUrl: "https://blockleaders.io/popeblacks-web3-journey/",
  readingTime: "6 min read",
  featured: true,
};

// Locally authored editorial entries are merged with published Sanity posts.
export const editorialBlogPosts = [
  aiSafetyArticle as BlogPost,
  hackerNoonBybitCoverage,
  blockleadersCommercialFeature,
  blockleadersFeature,
];
