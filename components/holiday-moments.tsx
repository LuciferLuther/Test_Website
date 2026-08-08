"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { OnsenSnowScene } from "@/components/ui/scenes";
import { Icon } from "@/components/ui/icons";

export function HolidayMoments() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="section holiday-section" id="holidays">
      <div className="container">
        <SectionHeading title="Let Christmas glow. Let New Year breathe." copy="You are in Sapporo for both holidays. Keep one good plan each day and leave the rest open." />
      </div>
      <div className="holiday-stories">
        <Reveal className="holiday-story holiday-story--christmas">
          <div className="holiday-story__media holiday-story__media--photo">
            <div className="holiday-story__photo">
              <Image src="/images/sapporo-odori.webp" alt="Snow in central Sapporo" fill sizes="(max-width: 980px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
          <div className="holiday-story__body">
            <p className="meta-label">24–25 December · Sapporo</p>
            <h3>Christmas in the snow.</h3>
            <p>Christmas Eve is a travel day. Christmas Day is yours: sleep, eat well, see the lights, and stop before it becomes work.</p>
            <ul>
              <li><Icon name="plane" /> Use a direct Haneda to New Chitose flight on 24 December.</li>
              <li><Icon name="calendar" /> Book dinner for 24 or 25 December before the best options fill.</li>
              <li><Icon name="sparkle" /> The 2026–27 White Illumination dates are officially published.</li>
            </ul>
            <div className="holiday-story__note"><strong>No fireworks promise</strong><p>No official source confirms a Christmas fireworks event for this plan. The snow, lights, dinner, and time together are enough.</p></div>
          </div>
        </Reveal>
        <Reveal className="holiday-story holiday-story--new-year">
          <div className="holiday-story__media"><OnsenSnowScene /></div>
          <div className="holiday-story__body">
            <p className="meta-label">31 December–1 January · Sapporo</p>
            <h3>A warm, quiet New Year.</h3>
            <p>Stay close to the hotel. Have a booked dinner, choose a quiet midnight, and start the year without an alarm.</p>
            <ul>
              <li><Icon name="calendar" /> Check holiday hours before you leave the hotel.</li>
              <li><Icon name="snow" /> Keep New Year&apos;s Day simple and weather-proof.</li>
              <li><Icon name="sparkle" /> Visit a shrine later, or on 2 January, if crowds feel tiring.</li>
            </ul>
            <div className="holiday-story__note"><strong>The right expectation</strong><p>New Year in Japan is built around food, shrines, temples, and a fresh start—not one national midnight fireworks show.</p></div>
          </div>
        </Reveal>
      </div>
      <div className="container">
        <Reveal className="onsen-banner">
          <div className="onsen-banner__scene"><OnsenSnowScene /></div>
          <div className="onsen-banner__body">
            <h3>Private time is part of the route.</h3>
            <p>Keep whole mornings and nights for baths, sleep, sex, food, and being together. A slow trip needs time when nothing is booked.</p>
            <button type="button" className="text-link" onClick={() => document.getElementById("days")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })}>See the slow day plans <Icon name="arrow-right" /></button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
