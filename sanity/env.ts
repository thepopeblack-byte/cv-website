export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-28";
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const sanityStudioBasePath = "/studio";
export const isSanityConfigured = Boolean(
  sanityProjectId && sanityDataset && sanityApiVersion,
);
