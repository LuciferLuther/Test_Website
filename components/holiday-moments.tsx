"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { HakodateHarbourScene, OnsenSnowScene } from "@/components/ui/scenes";
import { Icon } from "@/components/ui/icons";
import { SAPPORO_ODORI_IMAGE } from "@/data/trip";

export function HolidayMoments() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="section holiday-section" id="holidays">
      <div className="container">
        <SectionHeading
          eyebrow="The two big moments"
          title="Christmas feels bright. New Year feels calm."
          copy="Give each holiday its own mood instead of trying to make both nights feel the same."
        />
      </div>
      <div className="holiday-stories">
        <Reveal className="holiday-story holiday-story--christmas">
          <div className="holiday-story__media">
            <HakodateHarbourScene />
            <div className="holiday-story__number" aria-hidden="true">01</div>
          </div>
          <div className="holiday-story__body">
            <p className="eyebrow">24–25 December · Hakodate</p>
            <h3>Christmas by the harbour.</h3>
            <p>Warm warehouses, a giant tree, seafood, onsen, and a waterfront that feels special without needing a packed schedule.</p>
            <ul>
              <li><Icon name="sparkle" /> Book one lovely Christmas dinner.</li>
              <li><Icon name="water" /> Use Yunokawa or a hotel bath for a slow morning.</li>
              <li><Icon name="snow" /> Keep one weather-flexible sightseeing day.</li>
            </ul>
            <div className="holiday-story__note">
              <strong>About fireworks</strong>
              <p>Hakodate has included Christmas fireworks in recent programmes. Treat them as a strong possibility, not a promise, until the official 2026 schedule is published.</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="holiday-story holiday-story--new-year" delay={0.06}>
          <div className="holiday-story__media holiday-story__media--photo">
            <motion.div
              className="holiday-story__photo"
              initial={reduceMotion ? false : { scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={SAPPORO_ODORI_IMAGE} alt="Snowy central Sapporo" fill sizes="100vw" style={{ objectFit: "cover" }} />
            </motion.div>
            <div className="holiday-story__number" aria-hidden="true">02</div>
          </div>
          <div className="holiday-story__body">
            <p className="eyebrow">31 December–1 January · Sapporo</p>
            <h3>A warm, quiet New Year.</h3>
            <p>Snow outside, a good dinner, time together, and a shrine visit when it feels comfortable. No airport. No hotel move. No pressure.</p>
            <ul>
              <li><Icon name="calendar" /> Reserve dinner before holiday hours are announced.</li>
              <li><Icon name="snow" /> Keep New Year’s Day simple and close to the hotel.</li>
              <li><Icon name="sparkle" /> Visit a shrine later or on 2 January for fewer crowds.</li>
            </ul>
            <div className="holiday-story__note">
              <strong>The right expectation</strong>
              <p>Japan’s New Year is more about temples, shrines, food, and a fresh start than one huge national midnight fireworks show.</p>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="container">
        <Reveal className="onsen-banner">
          <div className="onsen-banner__scene"><OnsenSnowScene /></div>
          <div className="onsen-banner__body">
            <p className="eyebrow">What you loved in Hakone</p>
            <h3>Keep the feeling, not the hotel move.</h3>
            <p>Jozankei gives you snow, mountains, and onsen from the Sapporo base. It is the cleanest way to bring the Hakone feeling into this trip.</p>
            <button type="button" className="text-link" onClick={() => document.getElementById("places")?.scrollIntoView({ behavior: "smooth" })}>
              Compare Hakone and Jozankei <Icon name="arrow-right" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
