import type { Metadata } from "next";

import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RouteIntro } from "@/components/RouteIntro";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Professional Experience | Kayode Popoola",
  description:
    "Kayode Popoola's professional experience across commercial leadership, Web3 infrastructure, blockchain intelligence, digital commerce, and emerging markets.",
  alternates: { canonical: `${siteUrl}/experience` },
};

export default function ExperiencePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer route-main pb-8">
        <RouteIntro
          eyebrow="Experience"
          title="A record of disciplined commercial and institutional execution."
          intro="Complete professional experience across sales leadership, strategic partnerships, ecosystem development, digital commerce, and blockchain intelligence."
        />
        <ExperienceTimeline />
      </main>
      <Footer />
    </>
  );
}
