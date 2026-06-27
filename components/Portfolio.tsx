import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { portfolioItems } from "@/data/portfolio";

function isExternalHref(href: string) {
  return href.startsWith("http");
}

export function Portfolio() {
  return (
    <section id="portfolio" className="page-layer py-14 md:py-16 lg:py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">05 / SELECTED WORK</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">
                Commercial proof across Web3 partnerships, ecosystem growth, and
                intelligence.
              </h2>
              <p className="section-copy">
                Four high-signal proof points across revenue growth,
                go-to-market strategy, blockchain infrastructure, confidential
                computing, Africa Web3 ecosystem expansion, and blockchain
                intelligence.
              </p>
            </div>

            <div className="portfolio-card-grid grid gap-5 md:grid-cols-2">
              {portfolioItems.map((item, index) => {
                const hrefIsExternal = item.href
                  ? isExternalHref(item.href)
                  : false;

                return (
                  <SectionReveal key={item.title} delay={0.03 + index * 0.03}>
                    <article className="portfolio-card group h-full">
                      <div className="image-panel relative h-56 sm:h-64">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                          sizes="(min-width: 768px) 42vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.04),rgba(10,11,13,0.85))]" />
                        <div className="absolute left-4 top-4 meta-stack text-[0.68rem] text-[var(--muted-strong)]">
                          [{item.category}]
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="meta-stack text-[0.68rem] text-[var(--muted)]">
                            0{index + 1} / CASE STUDY
                          </div>
                          <h3 className="mt-2 font-['Sora'] text-[1.45rem] leading-tight text-[var(--foreground)]">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-4 text-[0.98rem] leading-8 text-[var(--muted)]">
                        {item.description}
                      </p>

                      {item.href ? (
                        <div className="mt-4">
                          <Link
                            href={item.href}
                            target={hrefIsExternal ? "_blank" : undefined}
                            rel={hrefIsExternal ? "noreferrer" : undefined}
                            className="bracket-link inline-flex items-center gap-2"
                          >
                            [{item.ctaLabel ?? "View"}]
                            {hrefIsExternal ? <ArrowUpRight size={13} /> : null}
                          </Link>
                        </div>
                      ) : null}
                    </article>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
