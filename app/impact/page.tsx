import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImpactStats } from "@/components/ImpactStats";
import { Portfolio } from "@/components/Portfolio";
import { RouteIntro } from "@/components/RouteIntro";
import { SelectedEcosystems } from "@/components/SelectedEcosystems";
import { SelectedOutcomes } from "@/components/SelectedOutcomes";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Impact & Selected Outcomes | Kayode Popoola",
  description:
    "Commercial impact, institutional case studies, ecosystem development, and selected Web3 and blockchain-intelligence work from Kayode Popoola.",
  alternates: { canonical: `${siteUrl}/impact` },
};

export default function ImpactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer route-main pb-8">
        <RouteIntro
          eyebrow="Impact"
          title="Measured outcomes across partnerships, markets, and ecosystems."
          intro="Commercial proof and institutional case studies covering revenue growth, strategic partnerships, ecosystem activation, capacity building, and evidence-led digital-asset intelligence."
        />
        <ImpactStats />
        <SelectedOutcomes />
        <SelectedEcosystems />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
