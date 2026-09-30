import type { Metadata } from "next";

import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RouteIntro } from "@/components/RouteIntro";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Professional Experience | Kayode Popoola",
  description:
    "Four selected engagements: Secret Network commercial leadership with a nested Fina project, CipherOwl intelligence analysis, WhisperNode communications and a Cosmos Hub programme.",
  alternates: { canonical: `${siteUrl}/experience` },
};

export default function ExperiencePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer route-main pb-8">
        <RouteIntro
          eyebrow="Experience"
          title="Commercial and intelligence work, side by side."
          intro="Complete professional experience across sales leadership, strategic partnerships, ecosystem development, digital commerce, and blockchain intelligence."
        />
        <ExperienceTimeline />
      </main>
      <Footer />
    </>
  );
}
