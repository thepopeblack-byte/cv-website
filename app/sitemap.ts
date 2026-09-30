import type { MetadataRoute } from "next";

import { siteUrl } from "@/data/site";
import { getBlogPosts } from "@/lib/sanity";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...["profile", "impact", "expertise", "experience"].map((route) => ({
      url: `${siteUrl}/${route}`,
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })),
    {
      url: `${siteUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.78,
    },
    {
      url: `${siteUrl}/newsletter`,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.35,
    },
  ];
}
