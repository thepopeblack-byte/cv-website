import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import type { BlogImage } from "@/data/articles";

import { isSanityConfigured, sanityDataset, sanityProjectId } from "../env";

const imageBuilder = isSanityConfigured
  ? createImageUrlBuilder({
      projectId: sanityProjectId,
      dataset: sanityDataset,
    })
  : null;

type ImageUrlOptions = {
  width: number;
  height: number;
  quality?: number;
};

export function getSanityImageUrl(
  image: BlogImage | undefined,
  { width, height, quality = 88 }: ImageUrlOptions,
) {
  if (!imageBuilder || !image?.asset) {
    return null;
  }

  return imageBuilder
    .image(image as SanityImageSource)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .quality(quality)
    .url();
}

export function getSanityImageDimensions(image: BlogImage | undefined) {
  return (
    image?.assetData?.metadata?.dimensions ?? image?.asset?.metadata?.dimensions
  );
}
