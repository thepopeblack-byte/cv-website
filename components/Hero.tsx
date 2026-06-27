"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Clock } from "@/components/Clock";
import { Container } from "@/components/Container";
import { profile } from "@/data/profile";

const primaryLinks = [
  { label: "Download Resume", href: "#resume", variant: "button-primary" },
  { label: "View Portfolio", href: "#portfolio", variant: "button-secondary" },
  { label: "Contact Me", href: "#contact", variant: "button-ghost" },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    variant: "button-ghost",
    external: true,
  },
];

const impactSignals = [
  {
    value: "$300K+",
    label: "Revenue generated in the first 90 days of senior sales leadership.",
  },
  {
    value: "50+",
    label: "Strategic deals and commercial partnerships negotiated and closed.",
  },
  {
    value: "20+",
    label: "Leading EVM and Layer-2 ecosystem relationships activated.",
  },
  {
    value: "3x",
    label: "TVL growth contribution through partner-led market expansion.",
  },
];

const operatingAreas = [
  "Revenue strategy",
  "Strategic partnerships",
  "Ecosystem expansion",
  "Commercial intelligence",
];

const audienceTracks = [
  "Recruiters",
  "Founders",
  "Investors",
  "Banks",
  "Protocols",
  "International programs",
];

export function Hero() {
  return (
    <section id="home" className="page-layer pt-8 pb-10">
      <Container>
        <div className="section-frame">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-10 xl:grid-cols-[0.58fr_0.42fr]"
          >
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <span className="hero-chip">Global commercial leadership</span>
                <span className="hero-chip">Web3 partnerships</span>
                <span className="hero-chip">Blockchain intelligence</span>
              </div>

              <div>
                <div className="meta-stack">00 / PROFILE</div>
                <h1 className="mt-4 font-['Sora'] text-[clamp(3.6rem,8vw,7.25rem)] leading-[0.88] tracking-[-0.1em] text-[var(--foreground)]">
                  Kayode
                  <span className="block text-[var(--muted-strong)]">Popoola</span>
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.78rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  <span>{profile.headline}</span>
                  <span className="text-[var(--line-strong)]">/</span>
                  <span>
                    <Clock />
                  </span>
                  <span className="text-[var(--line-strong)]">/</span>
                  <span>{profile.location}</span>
                </div>

                <p className="mt-6 max-w-3xl text-[1.08rem] leading-8 text-[var(--muted-strong)]">
                  {profile.subheadline}
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <p className="text-[1rem] leading-8 text-[var(--muted)]">
                  Commercial and partnerships leader with 10+ years spanning
                  business development, strategic partnerships, customer
                  acquisition, digital commerce, emerging markets, and blockchain
                  ecosystems.
                </p>
                <p className="text-[1rem] leading-8 text-[var(--muted)]">
                  Currently leading sales and business development at Secret
                  Network Foundation, building global revenue programs, enterprise
                  partnerships, and ecosystem growth for a privacy-first blockchain
                  and confidential computing network.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className={`${link.variant} group`}
                  >
                    {link.label}
                    {link.external ? (
                      <ArrowUpRight
                        size={15}
                        className="transition group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                      />
                    ) : null}
                  </Link>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {impactSignals.map((signal, index) => (
                  <article key={signal.value} className="signal-card">
                    <div className="meta-stack">0{index + 1} / IMPACT SIGNAL</div>
                    <p className="mt-4 font-['Sora'] text-[2rem] tracking-[-0.08em] text-[var(--foreground)]">
                      {signal.value}
                    </p>
                    <p className="mt-3 text-[0.98rem] leading-7 text-[var(--muted)]">
                      {signal.label}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="executive-mosaic dark-panel rich-border p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="meta-stack">01 / CURRENT PRESENCE</div>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--muted)]">
                      Executive representation across conference rooms, partner
                      tables, and market-facing ecosystem environments.
                    </p>
                  </div>
                  <span className="hero-chip hidden sm:inline-flex">POPEBLACK</span>
                </div>

                <div className="relative mt-5 overflow-hidden rounded-[1.45rem] border border-[var(--line)] bg-[var(--panel)]">
                  <div className="relative min-h-[500px]">
                    <Image
                      src="/images/kayode-networking.jpg"
                      alt="Kayode Popoola in discussion at an industry event"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 36vw, 100vw"
                      priority
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,12,0.08),rgba(9,10,12,0.76)_62%,rgba(9,10,12,0.92))]" />

                    <div className="absolute left-4 top-4 rounded-full border border-white/14 bg-[rgba(8,10,12,0.62)] px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--foreground)] backdrop-blur-md">
                      Strategic partnerships / market access / public presence
                    </div>

                    <div className="absolute bottom-4 left-4 max-w-[20rem] rounded-[1.2rem] border border-white/12 bg-[rgba(9,10,12,0.76)] p-5 backdrop-blur-md">
                      <div className="meta-stack">Current mandate</div>
                      <h2 className="mt-3 font-['Sora'] text-[1.35rem] tracking-[-0.04em] text-[var(--foreground)]">
                        Secret Network Foundation
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                        Leading global sales, enterprise partnerships, ecosystem
                        alignment, and revenue activation across a privacy-first
                        blockchain stack.
                      </p>
                    </div>

                    <div className="absolute bottom-4 right-4 hidden w-[11rem] overflow-hidden rounded-[1.15rem] border border-white/12 bg-[rgba(9,10,12,0.6)] p-2 backdrop-blur-md sm:block">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[0.9rem]">
                        <Image
                          src="/images/kayode-speaking.jpg"
                          alt="Kayode Popoola speaking to a live audience"
                          fill
                          className="object-cover"
                          sizes="176px"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,12,0.04),rgba(9,10,12,0.78))]" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="meta-stack text-[0.62rem] text-[var(--muted-strong)]">
                            Speaker brief
                          </div>
                          <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                            On stage with operators, founders, and developers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <article className="signal-card">
                  <div className="meta-stack">02 / OPERATING AREAS</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {operatingAreas.map((item) => (
                      <span key={item} className="hero-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>

                <article className="signal-card">
                  <div className="meta-stack">03 / TARGET AUDIENCE</div>
                  <p className="mt-4 text-[0.98rem] leading-7 text-[var(--muted)]">
                    Built for senior hiring teams and ecosystem decision-makers
                    across:
                  </p>
                  <p className="mt-3 text-[0.88rem] uppercase tracking-[0.16em] text-[var(--foreground)]">
                    {audienceTracks.join(" / ")}
                  </p>
                </article>
              </div>
            </div>
          </motion.div>

          <div className="marquee-band mt-8">
            <div className="marquee-row">
              KAYODE POPOOLA / POPEBLACK / STRATEGIC PARTNERSHIPS / REVENUE GROWTH
              / WEB3 ECOSYSTEM LEADERSHIP / BLOCKCHAIN INTELLIGENCE /
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
