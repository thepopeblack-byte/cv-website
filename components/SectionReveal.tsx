"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const compactViewportQuery = "(max-width: 768px)";

export function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  const [isCompactViewport, setIsCompactViewport] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(compactViewportQuery);
    const syncViewport = () => setIsCompactViewport(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  if (isCompactViewport) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -14% 0px" }}
      transition={{
        duration: 0.52,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(delay, 0.12),
      }}
    >
      {children}
    </motion.div>
  );
}
