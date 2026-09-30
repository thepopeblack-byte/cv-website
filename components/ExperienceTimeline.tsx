import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { experience } from "@/data/experience";
import styles from "./ExperienceTimeline.module.css";

const evidenceLinks: Record<string, { href: string; label: string }> = {
  "Secret Network Foundation": { href: "/impact#secret-foundation", label: "Secret Network workstream" },
  "CipherOwl Inc.": { href: "/impact#cipherowl", label: "Intelligence method" },
  "WhisperNode": { href: "/impact#whispernode", label: "Co-credited publication" },
  "Cosmos Hub Nigeria / Naija HackATOM": { href: "/impact#cosmos-hub-africa", label: "Funding and programme record" },
};

export function ExperienceTimeline() {
  return (
    <section id="experience" data-nav-group="experience" className={styles.section}>
      <Container>
        <div className={styles.intro}>
          <div>
            <p className="meta-stack">Professional experience</p>
            <h2>Four selected areas of work.</h2>
          </div>
        </div>
        <div className={styles.timeline}>
          {experience.map((entry) => (
            <article key={entry.company} className={styles.entry}>
              <div className={styles.company}>
                <h3>{entry.company}</h3>
                <p>{entry.label}</p>
                {evidenceLinks[entry.company] ? (
                  <Link href={evidenceLinks[entry.company].href} className="text-link">
                    {evidenceLinks[entry.company].label} <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
              <div className={styles.roles}>
                {entry.roles.map((role) => (
                  <section key={`${entry.company}-${role.title}`} className={styles.role}>
                    <div className={styles.roleHead}>
                      <h4>{role.title}</h4>
                      {role.period ? <span>{role.period}</span> : null}
                    </div>
                    {(role.location || role.engagementType) && (
                      <p className={styles.meta}>{[role.location, role.engagementType].filter(Boolean).join(" · ")}</p>
                    )}
                    <ul>
                      {role.bullets.slice(0, 2).map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                    {role.bullets.length > 2 ? (
                      <details className={styles.details}>
                        <summary>More about this role</summary>
                        <ul>{role.bullets.slice(2).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                      </details>
                    ) : null}
                  </section>
                ))}
                {entry.company === "Secret Network Foundation" ? (
                  <aside className={styles.project} aria-label="Fina ecosystem project">
                    <p className="meta-stack">Nested Secret ecosystem project</p>
                    <h4>Fina / Fina Cash</h4>
                    <p>While working with Secret, I supported Fina&apos;s community, product and social marketing, campaigns, user acquisition and wallet, card and staking adoption. Fina&apos;s product results are separate from Foundation revenue.</p>
                    <Link href="/impact#fina" className="text-link">View the Fina subcase <ArrowUpRight size={14} aria-hidden="true" /></Link>
                  </aside>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
