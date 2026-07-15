import Link from "next/link";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NotFoundTracker } from "@/components/NotFoundTracker";
import { primaryNavigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export default function NotFound() {
  return (
    <>
      <NotFoundTracker />
      <Header />
      <main id="main-content" className="page-layer not-found-page">
        <Container>
          <section className="not-found-content">
            <div className="meta-stack">404 / Page not found</div>
            <h1>This route has moved beyond the map.</h1>
            <p>
              The requested page is unavailable. Continue through Kayode&apos;s
              executive profile, institutional impact, expertise, experience,
              or writing.
            </p>
            <nav className="not-found-links" aria-label="Page not found links">
              {primaryNavigation.map((link) => (
                <Link key={link.id} href={`/${link.href}`} className="button-secondary">
                  {link.label}
                </Link>
              ))}
              <Link href="/blog" className="button-secondary">
                Blog
              </Link>
              <Link href="/#contact" className="button-secondary">
                Contact
              </Link>
              <Link
                href={profile.bookCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
              >
                Book a Call
              </Link>
            </nav>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
