import Link from "next/link";

import { Container } from "@/components/Container";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="page-layer py-10">
      <Container>
        <div className="border-t border-[var(--line)] pt-6">
          <div className="grid gap-6 lg:grid-cols-[0.56fr_0.44fr] lg:items-end">
            <div>
              <div className="meta-stack">
                {profile.name} / {profile.brandName}
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                Building partnerships, ecosystems, and revenue systems for Web3
                and emerging technology.
              </p>
              <p className="mt-4 text-sm text-[var(--muted)]">
                Copyright {new Date().getFullYear()} {profile.name}.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link href={`mailto:${profile.email}`} className="bracket-link">
                [EMAIL]
              </Link>
              <Link
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="bracket-link"
              >
                [LINKEDIN]
              </Link>
              <Link
                href={profile.twitter}
                target="_blank"
                rel="noreferrer"
                className="bracket-link"
              >
                [X]
              </Link>
              <Link
                href={profile.telegram}
                target="_blank"
                rel="noreferrer"
                className="bracket-link"
              >
                [TELEGRAM]
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
