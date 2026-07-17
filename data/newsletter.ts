export type NewsletterLocation =
  | "homepage"
  | "blog_page"
  | "article_footer"
  | "newsletter_page";

function getPublicUrl(value: string | undefined) {
  const candidate = value?.trim();

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

const publicationUrl = getPublicUrl(process.env.NEXT_PUBLIC_SUBSTACK_URL);
const embedUrl = getPublicUrl(process.env.NEXT_PUBLIC_SUBSTACK_EMBED_URL);

if (process.env.NODE_ENV === "development" && !publicationUrl && !embedUrl) {
  console.warn(
    "The Popeblack Brief is hidden because the public Substack URLs are not configured.",
  );
}

export const newsletterConfig = {
  name: "The Popeblack Brief",
  description:
    "Practical intelligence on AI, privacy, digital assets, financial crime, strategic partnerships and emerging-market growth.",
  frequency: "Published approximately once or twice each month.",
  publicationUrl,
  embedUrl,
  topics: [
    "AI agents and confidential computing",
    "Data privacy and digital trust",
    "Financial crime and blockchain intelligence",
    "Strategic partnerships and go-to-market execution",
    "Stablecoins and digital-asset risk",
    "African and emerging-market growth",
  ],
} as const;
