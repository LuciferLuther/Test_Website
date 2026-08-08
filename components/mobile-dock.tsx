"use client";

import { motion, useReducedMotion } from "motion/react";
import { Icon, type IconName } from "@/components/ui/icons";
import type { SectionId } from "@/components/use-active-section";

const items: Array<{ id: SectionId; label: string; icon: IconName }> = [
  { id: "journey", label: "Trip", icon: "heart" },
  { id: "plan", label: "Plan", icon: "calendar" },
  { id: "map", label: "Map", icon: "map" },
  { id: "places", label: "Places", icon: "sparkle" },
  { id: "book", label: "Book", icon: "check" },
];

export function MobileDock({ active }: { active: SectionId }) {
  const reduceMotion = useReducedMotion();

  return (
    <nav className="mobile-dock aether-surface aether-surface--nav" data-aether="mobile-navigation" aria-label="Quick navigation">
      {items.map((item) => {
        const isActive = active === item.id || (item.id === "journey" && active === "days");
        return (
          <button
            type="button"
            key={item.id}
            className={isActive ? "is-active" : ""}
            aria-current={isActive ? "location" : undefined}
            onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })}
          >
            {isActive ? (
              reduceMotion ? <span className="mobile-dock__pill" /> : <motion.span className="mobile-dock__pill" layoutId="dock-pill" />
            ) : null}
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
