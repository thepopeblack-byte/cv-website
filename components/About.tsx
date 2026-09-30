import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import styles from "./About.module.css";

const proof = [
  {
    label: "Commercial leadership",
    title: "Secret Network",
    description: "A progression from regional ecosystem building to global sales and business-development leadership.",
    href: "/impact#secret-foundation",
    action: "View workstream",
  },
  {
    label: "Blockchain intelligence",
    title: "CipherOwl",
    description: "Transaction research, OSINT, careful attribution and defensible reporting, with confidential case details protected.",
    href: "/impact#cipherowl",
    action: "View analytical work",
  },
  {
    label: "Published analysis",
    title: "Hacken",
    description: "My bylined analysis explains the discipline needed to follow stolen digital assets without overclaiming attribution.",
    href: "https://hacken.io/discover/tracing-bybit-billion/",
    action: "Read publication",
    external: true,
  },
];

export function About() {
  return (
    <section id="about" data-nav-group="profile" className={styles.section}>
      <Container>
        <div className={styles.narrative}>
          <div>
            <p className="meta-stack">Career narrative</p>
            <h2>Commercial execution and investigative discipline.</h2>
          </div>
          <div className={styles.body}>
            <p>I began in digital-commerce sales and community-led technology work. At Secret Network I moved from an ambassadorial and regional ecosystem role into Business Development Associate and Manager positions, then Head of Sales &amp; Business Development. Jillian Godsil&apos;s independent Blockleaders profile traces that progression.</p>
            <p>From 2024 onward I sourced leads, introduced prospective partners and developed opportunities with colleagues. Today I lead global commercial work for privacy-focused blockchain and confidential-computing infrastructure: connecting founders, enterprises and technical teams, negotiating pathways and helping partnerships reach implementation. The engineers build the technology; I help bring it to market. My experience in African markets is a proof point of execution, not a limit on my international remit.</p>
            <p>Fina was a project I supported while working with Secret, not an unrelated employer or a Foundation revenue line. I worked on its community, product and social marketing and adoption. I also led the separately funded Cosmos Hub Nigeria programme.</p>
            <p>My parallel role at CipherOwl has given my interest in digital-asset risk an operational direction. I work with transaction flows, open-source sources, entity relationships and evidence capture for blockchain intelligence and financial-crime analysis. I am building this investigative career while continuing senior commercial work; my Hacken byline shows public analysis, not a confidential client case.</p>
          </div>
        </div>
        <div className={styles.proof} aria-label="Career evidence">
          {proof.map((item) => (
            <article key={item.title}>
              <p className="meta-stack">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="text-link">
                {item.action} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
