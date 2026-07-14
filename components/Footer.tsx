import Link from "next/link";

import { Container } from "@/components/Container";
import { primaryNavigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="page-layer py-10">
      <Container>
        <div className="border-t border-[var(--line)] pt-6">
          <div className="grid gap-8 lg:grid-cols-[0.48fr_0.52fr] lg:items-end">
            <div>
              <div className="meta-stack">
                {profile.name} / {profile.brandName}
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                Commercial growth, enterprise partnerships, ecosystem
                development, blockchain intelligence, and emerging-market
                execution.
              </p>
              <p className="mt-4 text-sm text-[var(--muted)]">
                Copyright {new Date().getFullYear()} {profile.name}.
              </p>
            </div>

            <div className="footer-link-groups">
              <nav className="footer-link-row" aria-label="Footer navigation">
                {primaryNavigation.map((link) => (
                  <Link key={link.id} href={`/${link.href}`} className="bracket-link">
                    [{link.label}]
                  </Link>
                ))}
                <Link href="/blog" className="bracket-link">
                  [BLOG]
                </Link>
                <Link href="/#contact" className="bracket-link">
                  [CONTACT]
                </Link>
                <Link href="/privacy" className="bracket-link">
                  [PRIVACY]
                </Link>
              </nav>

              <div className="footer-link-row">
                <Link href={profile.cvUrl} className="bracket-link" download>
                  [DOWNLOAD CV]
                </Link>
                <Link href={`mailto:${profile.email}`} className="bracket-link">
                  [EMAIL]
                </Link>
                <Link
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bracket-link"
                >
                  [LINKEDIN]
                </Link>
                <Link
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bracket-link"
                >
                  [X]
                </Link>
                <Link
                  href={profile.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bracket-link"
                >
                  [TELEGRAM]
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
