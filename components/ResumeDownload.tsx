import Link from "next/link";

import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { profile } from "@/data/profile";

export function ResumeDownload() {
  return (
    <section id="resume" className="page-layer py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">09 / RESUME</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Resume downloads.</h2>
              <p className="section-copy">
                Download the version that best fits the opportunity. File paths
                are already wired and will go live as soon as the documents are
                added.
              </p>
            </div>

            <div className="space-y-5">
              {profile.resumeAssets.map((asset) => (
                <div key={asset.label} className="border-t border-[var(--line)] pt-5">
                  <div className="meta-stack">{asset.href}</div>
                  <h3 className="mt-3 font-['Sora'] text-[1.35rem] tracking-[-0.03em] text-[var(--foreground)]">
                    {asset.label}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-8 text-[var(--muted)]">
                    {asset.helper}
                  </p>
                  {asset.available ? (
                    <Link href={asset.href} className="bracket-link mt-4 inline-block">
                      [DOWNLOAD]
                    </Link>
                  ) : (
                    <p className="mt-4 text-sm leading-7 text-[var(--accent-soft)]">
                      Placeholder ready. Add the file to enable this download.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
