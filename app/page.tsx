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
import { SubstackSignup } from "@/components/SubstackSignup";

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
        <section className="page-layer py-12 md:py-14">
          <div className="container-shell">
            <SubstackSignup variant="compact" location="homepage" />
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
