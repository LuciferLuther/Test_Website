"use client";

import { useEffect, useState } from "react";

const ids = ["journey", "plan", "map", "days", "places", "book"] as const;
export type SectionId = (typeof ids)[number];

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("journey");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id && ids.includes(visible.target.id as SectionId)) {
          setActive(visible.target.id as SectionId);
        }
      },
      { rootMargin: "-24% 0px -58%", threshold: [0.05, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}
