"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Container } from "@/components/Container";
import { LiveClock } from "@/components/LiveClock";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { heroQuickFacts } from "@/data/achievements";
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
    label: "Book a Call",
    href: profile.bookCallUrl,
    variant: "button-primary",
    external: true,
  },
  {
    label: "View Experience",
    href: "/experience",
    variant: "button-secondary",
  },
  {
    label: "Read Blog",
    href: "/blog",
    variant: "button-ghost",
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    variant: "button-ghost",
    external: true,
  },
];

const heroPillars = [
  "Commercial Growth.",
  "Web3 Partnerships.",
  "Blockchain Intelligence.",
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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]"
          >
            <div className="space-y-8">
              <div className="meta-stack space-y-2">
                <LiveClock />
                <div>WEB3 / AI / PARTNERSHIPS / REVENUE</div>
                <div>BLOCKCHAIN INTELLIGENCE / AML-CFT / OSINT</div>
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
              <div className="meta-stack">Executive profile</div>
              <h1 className="mt-4 font-['Sora'] text-[4rem] leading-none text-[var(--foreground)] sm:text-[5rem] lg:text-[6rem]">
                Kayode Popoola
              </h1>
              <div className="hero-pillar-stack mt-5">
                {heroPillars.map((pillar) => (
                  <p key={pillar}>{pillar}</p>
                ))}
              </div>
              <div className="mt-6 max-w-4xl space-y-5 text-[1.08rem] leading-9 text-[var(--muted-strong)]">
                <p>
                  Building revenue, ecosystem growth, and trust infrastructure
                  across Web3, AI, DeFi, and emerging markets.
                </p>
                <p>{profile.currentFocus}</p>
              </div>

              <MobileSwipeRegion
                className="hero-quick-facts mt-10 grid gap-3 pt-3 md:grid-cols-2"
                label="Selected commercial highlights"
              >
                {heroQuickFacts.map((fact) => (
                  <div key={fact} className="flex gap-4">
                    <p className="text-[1rem] leading-8 text-[var(--foreground)]">
                      {fact}
                    </p>
                  </div>
                ))}
              </MobileSwipeRegion>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
