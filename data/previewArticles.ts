import type { BlogPost } from "@/data/articles";
import previewArticle from "@/data/preview-ai-safety-article.json";

const blockleadersFeature: BlogPost = {
  _id: "preview.popeblacks-web3-journey",
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
  externalUrl: "https://blockleaders.io/popeblacks-web3-journey/",
  readingTime: "6 min read",
  featured: true,
};

// Editorial previews are development-only. Approved articles are published in Sanity.
export const previewBlogPosts = [
  previewArticle as BlogPost,
  blockleadersFeature,
];
