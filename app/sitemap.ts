import type { MetadataRoute } from "next";

import { getLocalBlogPostSlugs } from "@/lib/sanity";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://popeblack.com",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://popeblack.com/blog",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.78,
    },
    ...getLocalBlogPostSlugs().map((slug) => ({
      url: `https://popeblack.com/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
