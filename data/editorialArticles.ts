import type { BlogPost } from "@/data/articles";
import aiSafetyArticle from "@/data/ai-safety-article.json";

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
  blockleadersFeature,
];
