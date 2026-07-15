import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  HomeExperiencePreview,
  HomeExpertisePreview,
  HomeImpactPreview,
} from "@/components/HomeOverview";
import { LatestWriting } from "@/components/LatestWriting";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer home-overview pb-6">
        <Hero />
        <HomeImpactPreview />
        <HomeExpertisePreview />
        <HomeExperiencePreview />
        <LatestWriting />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
