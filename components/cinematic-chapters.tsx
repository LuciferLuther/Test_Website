"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Icon, type IconName } from "@/components/ui/icons";

const hakoneIdeas: Array<{ icon: IconName; title: string; copy: string }> = [
  {
    icon: "water",
    title: "Gora and Owakudani",
    copy: "Choose the mountain route only when the weather is comfortable.",
  },
  {
    icon: "map",
    title: "Lake Ashi and Hakone Shrine",
    copy: "Take one lake day slowly and return before the evening feels rushed.",
  },
  {
    icon: "heart",
    title: "One day with no plan",
    copy: "Stay in the room. Bath, eat, sleep, have sex, and leave the bags alone.",
  },
];

const sapporoIdeas: Array<{ icon: IconName; title: string; copy: string }> = [
  {
    icon: "train",
    title: "Otaru",
    copy: "A canal, lunch, and warm cafés without another hotel.",
  },
  {
    icon: "water",
    title: "Jozankei",
    copy: "A snowy onsen day that still ends back in the Sapporo room.",
  },
  {
    icon: "snow",
    title: "Follow the weather",
    copy: "Keep one snow day open. Choose Asahikawa or Biei only when the trip feels easy.",
  },
];

export function CinematicChapters() {
  const reduceMotion = useReducedMotion();
  const reveal = { clipPath: "inset(0 0 0 0)", filter: "blur(0px)", scale: 1 };
  const initial = reduceMotion
    ? false
    : { clipPath: "inset(4% 8% 4% 8%)", filter: "blur(5px)", scale: 1.035 };

  return (
    <div className="cinematic-chapters">
      <section
        className="cinematic-story cinematic-story--hakone"
        id="hakone-film"
        aria-labelledby="hakone-film-title"
      >
        <motion.div
          className="cinematic-story__media"
          initial={initial}
          whileInView={reveal}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: reduceMotion ? 0.01 : 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/hakone-onsen-cinematic.webp"
            alt="A steaming open-air bath looking over misty mountains in Hakone"
            fill
            quality={90}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="cinematic-story__veil" aria-hidden="true" />
        </motion.div>
        <motion.div
          className="cinematic-story__panel"
          initial={reduceMotion ? false : { opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="cinematic-story__dates">20–24 December · Hakone</p>
          <h2 id="hakone-film-title">Four nights to stop.</h2>
          <p className="cinematic-story__lead">
            Use Hakone for long baths, slow meals, sleep, sex, mountain air, and time alone
            together.
          </p>
          <ul className="cinematic-story__ideas">
            {hakoneIdeas.map((idea) => (
              <li key={idea.title}>
                <Icon name={idea.icon} />
                <div>
                  <strong>{idea.title}</strong>
                  <p>{idea.copy}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="cinematic-story__truth">
            <Icon name="snow" /> Snow is possible in Hakone, not promised.
          </p>
        </motion.div>
      </section>

      <section
        className="cinematic-story cinematic-story--sapporo"
        id="sapporo-winter"
        aria-labelledby="sapporo-winter-title"
      >
        <motion.div
          className="cinematic-story__media"
          initial={initial}
          whileInView={reveal}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: reduceMotion ? 0.01 : 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/sapporo-winter-cinematic.webp"
            alt="Two people walking beneath winter lights during snowfall in Sapporo"
            fill
            quality={90}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="cinematic-story__veil" aria-hidden="true" />
          <div className="cinematic-snow" aria-hidden="true">
            {Array.from({ length: 14 }, (_, index) => (
              <i key={index} style={{ "--i": index } as CSSProperties} />
            ))}
          </div>
        </motion.div>
        <motion.div
          className="cinematic-story__panel"
          initial={reduceMotion ? false : { opacity: 0, x: 34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="cinematic-story__dates">24 December–2 January · Sapporo</p>
          <h2 id="sapporo-winter-title">Nine nights in real winter.</h2>
          <p className="cinematic-story__lead">
            Sapporo is the long snow base. Christmas, New Year, food, rest, and nearby places all
            work without another hotel.
          </p>
          <ul className="cinematic-story__ideas">
            {sapporoIdeas.map((idea) => (
              <li key={idea.title}>
                <Icon name={idea.icon} />
                <div>
                  <strong>{idea.title}</strong>
                  <p>{idea.copy}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="cinematic-story__truth">
            <Icon name="sparkle" /> Sapporo White Illumination is confirmed for this trip.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

const principles: Array<{ icon: IconName; title: string; copy: string }> = [
  {
    icon: "heart",
    title: "Protect the room time",
    copy: "Leave space for baths, sleep, sex, and quiet time together.",
  },
  {
    icon: "snow",
    title: "Follow the weather",
    copy: "Move snow days and day trips when the forecast changes.",
  },
  {
    icon: "calendar",
    title: "Book only what matters",
    copy: "Protect flights, hotels, holiday meals, and winter transport. Keep normal sightseeing flexible.",
  },
];

export function SlowRhythm() {
  return (
    <section className="slow-rhythm" id="rhythm" aria-labelledby="slow-rhythm-title">
      <div className="container slow-rhythm__inner">
        <div className="slow-rhythm__heading">
          <h2 id="slow-rhythm-title">
            More time together.
            <br />
            Less time packing.
          </h2>
          <p>The empty hours are part of the holiday.</p>
        </div>
        <ol className="slow-rhythm__list">
          {principles.map((principle, index) => (
            <li key={principle.title}>
              <span>0{index + 1}</span>
              <Icon name={principle.icon} />
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
