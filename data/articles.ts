export type BlogPostType = "Original" | "Featured";

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  type: BlogPostType;
  source?: string;
  author: string;
  excerpt: string;
  body: string;
  tags: string[];
  coverImage?: string;
  externalUrl?: string;
  readingTime: string;
  featured: boolean;
  whyItMatters?: string;
  keyContext?: string[];
};

export const binanceArticleUrl =
  "https://www.binance.com/en-IN/square/post/2023-01-23-secret-network-africa-and-cryptocurrency-academy-kenya-collaborate-for-blockchain-and-crypto-adoption-176451";
export const whatsappAiArticleUrl =
  "https://medium.com/@thepopeblack/why-whatsapps-ai-agent-integration-should-concern-us-more-than-it-impresses-us-2b7985819344";

export const localBlogPosts: BlogPost[] = [
  {
    title:
      "Secret Network Africa and Cryptocurrency Academy Kenya collaborate for blockchain and crypto adoption",
    slug: "secret-network-africa-cryptocurrency-academy-kenya-blockchain-crypto-adoption",
    date: "2023-01-23",
    type: "Featured",
    source: "Binance Square",
    author: "Kayode Popoola",
    excerpt:
      "Featured coverage on Secret Network Africa and Cryptocurrency Academy Kenya's collaboration to support blockchain and crypto adoption.",
    body:
      "This featured coverage spotlights ecosystem work between Secret Network Africa and Cryptocurrency Academy Kenya to support blockchain education, crypto literacy, and practical adoption across regional Web3 communities. The collaboration reflects a broader thesis: emerging markets need trusted education, local ecosystem partnerships, and practical community infrastructure to turn technical interest into durable adoption.",
    tags: [
      "Blockchain",
      "Crypto Adoption",
      "Africa",
      "Secret Network",
      "Education",
    ],
    externalUrl: binanceArticleUrl,
    readingTime: "3 min read",
    featured: true,
    whyItMatters:
      "It shows the connective tissue behind ecosystem growth: education partners, local credibility, and repeated community activation rather than one-off awareness campaigns.",
    keyContext: [
      "Secret Network Africa ecosystem growth and community education work.",
      "Kenya-focused crypto education through Cryptocurrency Academy Kenya.",
      "Regional adoption strategy across African Web3 communities.",
    ],
  },
  {
    title:
      "Why WhatsApp's AI Agent Integration Should Concern Us More Than It Impresses Us",
    slug: "why-whatsapps-ai-agent-integration-should-concern-us-more-than-it-impresses-us",
    date: "2025-07-02",
    type: "Original",
    source: "Medium",
    author: "Kayode Popoola / Popeblack",
    excerpt:
      "A privacy and digital-rights argument for treating AI agents inside everyday messaging apps as critical infrastructure, not just convenience.",
    body:
      "This original essay examines the privacy and security tradeoffs created when AI agents move into the messaging interfaces people already use for finance, health, relationships, work, and identity. The central concern is not that AI assistants are useless; it is that convenience can quietly collapse many parts of a person's digital life into one high-value surface without enough transparency, governance, or user control.",
    tags: [
      "AI Agents",
      "Privacy",
      "WhatsApp",
      "Digital Rights",
      "Emerging Technology",
    ],
    externalUrl: whatsappAiArticleUrl,
    readingTime: "3 min read",
    featured: false,
    whyItMatters:
      "AI agents are becoming distribution points for sensitive decisions and personal data. Leaders building Web3, AI, and digital infrastructure need to treat privacy, consent, and resilience as product requirements rather than afterthoughts.",
    keyContext: [
      "Messaging apps are moving from communication tools into personal operating layers.",
      "AI agents can create a larger attack surface when connected to finance, health, identity, and third-party services.",
      "The essay argues for transparency, granular permissions, encryption, audits, and user-controlled deletion before mass adoption.",
    ],
  },
];
