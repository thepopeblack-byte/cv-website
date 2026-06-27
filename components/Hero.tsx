"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
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
    label: "Book a Call",
    href: profile.bookCallUrl,
    variant: "button-primary",
    external: true,
  },
  { label: "View Experience", href: "#experience", variant: "button-secondary" },
  {
    label: "Download CV",
    href: profile.cvUrl,
    variant: "button-ghost",
    download: true,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    variant: "button-ghost",
    external: true,
  },
];

const quickFacts = [
  "$300K+ revenue in 90 days",
  "50+ strategic deals closed",
  "15+ products launched on mainnet",
  "500+ developers trained",
];

export function Hero() {
  return (
    <section id="home" className="page-layer pt-8">
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
                <div>*</div>
                <LiveClock />
                <div>WEB3 / AI / PARTNERSHIPS / REVENUE</div>
                <div>BLOCKCHAIN INTELLIGENCE / AML-CFT / OSINT</div>
              </div>

              <div className="flex flex-wrap gap-3">
                {heroActions.map((link) => (
                  <div key={link.label}>
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
              <div className="meta-stack">01 / EXECUTIVE PROFILE</div>
              <h1 className="mt-4 font-['Sora'] text-[4rem] leading-none text-[var(--foreground)] sm:text-[5rem] lg:text-[6rem]">
                Kayode Popoola
              </h1>
              <p className="mt-4 text-[1.05rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                {profile.headline}
              </p>
              <div className="mt-6 max-w-4xl space-y-6 text-[1.08rem] leading-9 text-[var(--muted-strong)]">
                <p>{profile.subheadline}</p>
                <p>{profile.currentFocus}</p>
              </div>

              <div className="mt-10 grid gap-3 border-t border-[var(--line)] pt-6 md:grid-cols-2">
                {quickFacts.map((fact, index) => (
                  <div key={fact} className="flex gap-4">
                    <span className="meta-stack">0{index + 1}</span>
                    <p className="text-[1rem] leading-8 text-[var(--foreground)]">
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
