import type { Metadata } from "next";

import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RouteIntro } from "@/components/RouteIntro";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Executive Profile | Kayode Popoola",
  description:
    "Kayode Popoola's executive profile across commercial leadership, Web3 infrastructure, blockchain intelligence, and emerging-market execution.",
  alternates: { canonical: `${siteUrl}/profile` },
};

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer route-main pb-8">
        <RouteIntro
          eyebrow="Profile"
          title="Commercial leadership for growth, infrastructure, and trust."
          intro="A complete executive profile spanning enterprise partnerships, market development, Web3 infrastructure, digital-asset intelligence, and institutional execution across emerging markets."
        />
        <About />
      </main>
      <Footer />
    </>
  );
}
