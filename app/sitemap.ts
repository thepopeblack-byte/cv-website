import type { MetadataRoute } from "next";

import { siteUrl } from "@/data/site";
import { getBlogPosts } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getBlogPosts();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...["profile", "impact", "expertise", "experience"].map((route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })),
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.78,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.35,
    },
  ];
}
