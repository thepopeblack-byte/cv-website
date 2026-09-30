import type { Metadata } from "next";

import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RouteIntro } from "@/components/RouteIntro";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Profile | Kayode Popoola",
  description:
    "Kayode Popoola's progression through Secret Network commercial leadership and developing blockchain-intelligence work at CipherOwl, with sourced project evidence.",
  alternates: { canonical: `${siteUrl}/profile` },
};

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer route-main pb-8">
        <RouteIntro
          eyebrow="Profile"
          title="Two directions, grounded in digital assets."
          intro="I lead global partnerships and adoption for privacy-focused infrastructure, and work in blockchain intelligence and financial-crime analysis. Both disciplines depend on clear evidence and trust."
        />
        <About />
      </main>
      <Footer />
    </>
  );
}
