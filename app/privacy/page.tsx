import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { profile } from "@/data/profile";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Notice | Kayode Popoola",
  description:
    "Privacy information for professional enquiries submitted through popeblack.com.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: "Privacy Notice | Kayode Popoola",
    description:
      "Privacy information for professional enquiries submitted through popeblack.com.",
    url: `${siteUrl}/privacy`,
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-layer legal-page pb-10">
        <section className="page-layer py-14 md:py-16 lg:py-14">
          <Container>
            <article className="legal-content">
              <div className="meta-stack">Privacy</div>
              <h1>Privacy notice.</h1>
              <p className="legal-intro">
                This notice explains how information submitted through the
                contact form on this website is handled.
              </p>

              <section>
                <h2>Information collected</h2>
                <p>
                  The contact form may collect your name, email address,
                  company or organisation, enquiry type, and the message you
                  choose to provide.
                </p>
              </section>

              <section>
                <h2>Why it is collected</h2>
                <p>
                  The information is used to review and respond to professional
                  enquiries, including partnership, programme, leadership,
                  speaking, training, advisory, and consulting conversations.
                </p>
              </section>

              <section>
                <h2>Form processing</h2>
                <p>
                  Formspree processes contact-form submissions on behalf of
                  this website. Information submitted through the form is sent
                  through Formspree so that Kayode can receive and respond to
                  your enquiry.
                </p>
              </section>

              <section>
                <h2>Optional analytics</h2>
                <p>
                  With your consent, this website uses Google Analytics 4 to
                  understand visits and interactions, and Microsoft Clarity to
                  provide aggregated interaction insights such as session
                  recordings and heatmaps. These services load only after you
                  accept optional analytics.
                </p>
                <p>
                  Contact-form content is explicitly masked from Microsoft
                  Clarity. Names, email addresses, organisations, messages, and
                  form-field values are not sent through the website&apos;s custom
                  analytics events.
                </p>
                <p>
                  Your analytics preference is stored in your browser. You can
                  review or change it at any time using the Change analytics
                  preferences control on the website.
                </p>
              </section>

              <section>
                <h2>Your information</h2>
                <p>
                  You may request access to, correction of, or deletion of the
                  information you submitted by emailing{" "}
                  <Link href={`mailto:${profile.email}`}>{profile.email}</Link>.
                </p>
              </section>

              <div className="article-action-row">
                <Link href="/#contact" className="button-primary">
                  Contact Kayode
                </Link>
                <Link href="/" className="button-secondary">
                  Return home
                </Link>
              </div>
            </article>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
