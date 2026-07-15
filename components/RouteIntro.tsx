import Link from "next/link";

import { Container } from "@/components/Container";

type RouteIntroProps = {
  eyebrow: string;
  title: string;
  intro: string;
};

export function RouteIntro({ eyebrow, title, intro }: RouteIntroProps) {
  return (
    <section className="page-layer route-intro py-14 md:py-16 lg:py-14">
      <Container>
        <div className="section-frame route-intro-grid">
          <div>
            <div className="meta-stack">{eyebrow}</div>
            <h1>{title}</h1>
          </div>
          <div>
            <p>{intro}</p>
            <Link href="/" className="text-link route-home-link">
              Return to executive overview
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
