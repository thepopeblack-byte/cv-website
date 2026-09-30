"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { LiveClock } from "@/components/LiveClock";
import { profile } from "@/data/profile";

type HeroAction = {
  label: string;
  href: string;
  variant: string;
  external?: boolean;
  download?: boolean;
};

const heroActions: HeroAction[] = [
  {
    label: "Discuss a role",
    href: `mailto:${profile.email}?subject=Senior%20commercial%20opportunity`,
    variant: "button-primary",
  },
  { label: "Selected Work", href: "/impact", variant: "button-secondary" },
  {
    label: "Download CV",
    href: profile.cvUrl,
    variant: "button-ghost",
    download: true,
  },
  {
    label: "Book a Call",
    href: profile.bookCallUrl,
    variant: "button-ghost",
    external: true,
  },
];

const proofLinks = [
  { label: "Secret Network report", href: "https://framerusercontent.com/assets/njSofqEShz6VOC0sURkbP6bSNI.pdf" },
  { label: "Encryption Day speaking", href: profile.youtube },
  { label: "Hacken byline", href: "https://hacken.io/discover/tracing-bybit-billion/" },
  { label: "Independent profile", href: "https://blockleaders.io/popeblacks-web3-journey/" },
];

export function Hero() {
  return (
    <section
      id="profile"
      data-nav-group="profile"
      data-scene-label="Profile"
      className="page-layer pt-8"
    >
      <span id="top" className="anchor-alias" aria-hidden="true" />
      <span id="home" className="anchor-alias" aria-hidden="true" />
      <Container>
        <div className="section-frame">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
            <div className="space-y-8">
              <div className="meta-stack space-y-2">
                <LiveClock />
                <div>BLOCKCHAIN INTELLIGENCE / FINANCIAL CRIME</div>
                <div>GLOBAL COMMERCIAL LEADERSHIP</div>
              </div>

              <div className="hero-actions">
                {heroActions.map((link) => (
                  <div key={link.label} className="hero-action-item">
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      download={link.download}
                      className={`${link.variant} text-sm`}
                    >
                      {link.label}
                      {link.external ? <ArrowUpRight size={13} /> : null}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="meta-stack">Secret Network Foundation · CipherOwl</div>
              <h1 className="mt-4 font-['Sora'] text-[4rem] leading-none text-[var(--foreground)] sm:text-[5rem] lg:text-[6rem]">
                Kayode Popoola
              </h1>
              <div className="hero-pillar-stack mt-5">
                <p>Commercial growth. Blockchain intelligence.</p>
              </div>
              <div className="hero-evidence-links mt-7" aria-label="Independent evidence">
                <span className="meta-stack">Public evidence</span>
                {proofLinks.map((link) => (
                  <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-link">
                    {link.label}<ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <div className="mt-6 max-w-4xl space-y-5 text-[1.08rem] leading-9 text-[var(--muted-strong)]">
                <p>
                  At Secret Network Foundation, I lead partnerships, revenue and market adoption for privacy-focused blockchain and AI infrastructure. I turn technical capability into commercial relationships with founders, product teams and enterprises.
                </p>
                <p>
                  At CipherOwl, I investigate and attribute blockchain addresses linked to cryptocurrency services and higher-risk activity. I combine transaction analysis with OSINT to produce evidence-backed intelligence for investigations, compliance and financial-crime analysis.
                </p>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
