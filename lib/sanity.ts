import { localBlogPosts, type BlogPost } from "@/data/articles";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-28";

const postProjection = `{
  title,
  "slug": slug.current,
  date,
  type,
  source,
  author,
  excerpt,
  "body": pt::text(body),
  tags,
  "coverImage": coverImage.asset->url,
  externalUrl,
  readingTime,
  featured,
  whyItMatters,
  keyContext
}`;

function isSanityConfigured() {
  return Boolean(projectId && dataset && apiVersion);
}

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
    body: post.body || post.excerpt,
    tags: post.tags || [],
    coverImage: post.coverImage,
    externalUrl: post.externalUrl,
    readingTime: post.readingTime || "3 min read",
    featured: Boolean(post.featured),
    whyItMatters: post.whyItMatters,
    keyContext: post.keyContext || [],
  };
}

async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  const url = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  url.searchParams.set("query", query);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { result?: T };
    return payload.result ?? null;
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
    .filter(Boolean) as BlogPost[] | undefined;

  return normalizedPosts?.length ? normalizedPosts : localBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const quotedSlug = JSON.stringify(slug);
  const sanityPost = await sanityFetch<Partial<BlogPost>>(
    `*[_type == "post" && slug.current == ${quotedSlug}][0] ${postProjection}`,
  );
  const normalizedPost = sanityPost ? normalizePost(sanityPost) : null;

  return (
    normalizedPost ??
    localBlogPosts.find((post) => post.slug === slug) ??
    null
  );
}

export function getLocalBlogPostSlugs() {
  return localBlogPosts.map((post) => post.slug);
}
