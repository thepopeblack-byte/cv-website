import type { Metadata, Viewport } from "next";
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Editorial Studio | Kayode Popoola",
};

export const viewport: Viewport = studioViewport;

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
