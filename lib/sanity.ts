import { localBlogPosts, type BlogPost } from "@/data/articles";
import { sanityClient } from "@/sanity/lib/client";

const postProjection = `{
  title,
  "slug": slug.current,
  date,
  type,
  source,
  author,
  excerpt,
  body[]{
    ...,
    markDefs[]{...},
    _type == "image" => {
      "url": asset->url,
      "dimensions": asset->metadata.dimensions
    }
  },
  tags,
  "coverImage": coverImage.asset->url,
  externalUrl,
  readingTime,
  featured,
  whyItMatters,
  keyContext
}`;

function normalizePost(post: Partial<BlogPost>): BlogPost | null {
  if (!post.title || !post.slug || !post.excerpt) {
    return null;
  }

  return {
    title: post.title,
    slug: post.slug,
    date: post.date || new Date().toISOString().slice(0, 10),
    type: post.type === "Original" ? "Original" : "Featured",
    source: post.source,
    author: post.author || "Kayode Popoola",
    excerpt: post.excerpt,
    body: post.body ?? post.excerpt,
    tags: post.tags || [],
    coverImage: post.coverImage,
    externalUrl: post.externalUrl,
    readingTime: post.readingTime || "3 min read",
    featured: Boolean(post.featured),
    whyItMatters: post.whyItMatters,
    keyContext: post.keyContext || [],
  };
}

async function sanityFetch<T>(
  query: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: {
        revalidate: 300,
        tags: ["sanity:posts"],
      },
    });
  } catch {
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const sanityPosts = await sanityFetch<Array<Partial<BlogPost>>>(
    `*[_type == "post"] | order(featured desc, date desc) ${postProjection}`,
  );

  const normalizedPosts = sanityPosts
    ?.map((post) => normalizePost(post))
    .filter((post): post is BlogPost => Boolean(post));

  if (!normalizedPosts?.length) {
    return localBlogPosts;
  }

  const postsBySlug = new Map(
    localBlogPosts.map((post) => [post.slug, post] as const),
  );

  for (const post of normalizedPosts) {
    postsBySlug.set(post.slug, post);
  }

  return Array.from(postsBySlug.values()).sort((a, b) => {
    if (a.featured !== b.featured) {
      return Number(b.featured) - Number(a.featured);
    }

    return b.date.localeCompare(a.date);
  });
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const sanityPost = await sanityFetch<Partial<BlogPost>>(
    `*[_type == "post" && slug.current == $slug][0] ${postProjection}`,
    { slug },
  );
  const normalizedPost = sanityPost ? normalizePost(sanityPost) : null;

  return (
    normalizedPost ?? localBlogPosts.find((post) => post.slug === slug) ?? null
  );
}
