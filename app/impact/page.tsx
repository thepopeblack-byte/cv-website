import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RouteIntro } from "@/components/RouteIntro";
import { WorkEvidence } from "@/components/WorkEvidence";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Work & Evidence | Kayode Popoola",
  description:
    "Kayode Popoola's evidence-led Secret Network and Fina commercial portfolio, Cosmos Hub programme, CipherOwl intelligence methods and clearly labelled engagements.",
  alternates: { canonical: `${siteUrl}/impact` },
};

export default function ImpactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer route-main pb-8">
        <RouteIntro
          eyebrow="Work & Evidence"
          title="Work, outcomes, evidence."
          intro="Secret Network and its Fina ecosystem project lead the commercial story; Cosmos follows as a distinct funded programme. My CipherOwl work and published analysis show the investigative direction."
        />
        <WorkEvidence />
      </main>
      <Footer />
    </>
  );
}
