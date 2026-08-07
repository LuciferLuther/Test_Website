"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Botanical, FloralDivider } from "@/components/ui/botanical";
import { Icon } from "@/components/ui/icons";
import { TOKYO_LIGHTS_IMAGE } from "@/data/trip";

const route = [
  { city: "Tokyo", note: "7 nights" },
  { city: "Hakodate", note: "5 nights" },
  { city: "Sapporo", note: "7 nights" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "17%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 84]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <motion.div className="hero__image" style={{ y: imageY }} aria-hidden="true">
        <Image
          src={TOKYO_LIGHTS_IMAGE}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </motion.div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />
      <div className="snowfall" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            style={
              {
                "--snow-x": `${(index * 37) % 101}%`,
                "--snow-size": `${4 + ((index * 5) % 8)}px`,
                "--snow-delay": `${-((index * 1.7) % 13)}s`,
                "--snow-duration": `${11 + ((index * 3) % 10)}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <Botanical className="hero__branch hero__branch--left" tone="light" />
      <Botanical className="hero__branch hero__branch--right" side="right" tone="light" />
      <motion.div className="hero__content" style={{ y: contentY, opacity: contentOpacity }}>
        <p className="hero__date">15 December 2026 — 3 January 2027</p>
        <FloralDivider dark />
        <h1 id="hero-title">Japan,<em> slowly.</em></h1>
        <p className="hero__lead">
          A relaxed winter trip for two. Christmas lights, real snow, warm hotels, and a calm New Year.
        </p>
        <div className="hero__actions">
          <button className="button button--light" type="button" onClick={() => goTo("plan")}>
            Build our trip <Icon name="arrow-down" />
          </button>
          <button className="button button--ghost-light" type="button" onClick={() => goTo("map")}>
            Open the map <Icon name="map" />
          </button>
        </div>
        <ol className="hero-route" aria-label="Recommended route">
          {route.map((stop, index) => (
            <li key={stop.city}>
              <span>0{index + 1}</span>
              <strong>{stop.city}</strong>
              <small>{stop.note}</small>
            </li>
          ))}
        </ol>
      </motion.div>
      <button className="hero__scroll" type="button" onClick={() => goTo("journey")} aria-label="Scroll to the journey">
        <span>Scroll</span>
        <Icon name="arrow-down" />
      </button>
    </section>
  );
}
