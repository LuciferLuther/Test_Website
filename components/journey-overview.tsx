"use client";

import { motion, useReducedMotion } from "motion/react";
import { cities, routePresets } from "@/data/trip";
import { buildDatedStops, formatShortDate, totalNights } from "@/lib/dates";
import { useTripStore } from "@/store/trip-store";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CityMedia } from "@/components/ui/city-media";
import { Icon } from "@/components/ui/icons";

export function JourneyOverview() {
  const presetId = useTripStore((state) => state.presetId);
  const startDate = useTripStore((state) => state.startDate);
  const setSelectedCity = useTripStore((state) => state.setSelectedCity);
  const preset = routePresets.find((item) => item.id === presetId) ?? routePresets[0];
  const stops = buildDatedStops(startDate, preset);
  const reduceMotion = useReducedMotion();

  const openOnMap = (cityId: (typeof stops)[number]["cityId"]) => {
    setSelectedCity(cityId);
    document.getElementById("map")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section className="section section--paper journey" id="journey">
      <div className="container">
        <SectionHeading
          eyebrow="The simple plan"
          title={`${preset.stops.length} bases. ${Math.max(0, preset.stops.length - 1)} travel days.`}
          copy="Stay long enough to feel each place. Use day trips when you want more, instead of moving hotels again."
        />
        <Reveal className="journey-summary">
          <div><strong>{totalNights(preset)}</strong><span>nights</span></div>
          <div><strong>{preset.stops.length}</strong><span>hotels</span></div>
          <div><strong>{Math.max(0, preset.stops.length - 1)}</strong><span>hotel-change days</span></div>
          <p>{preset.summary}</p>
        </Reveal>
        <div className={`journey-cards journey-cards--${stops.length}`}>
          {stops.map((stop, index) => {
            const city = cities.find((item) => item.id === stop.cityId)!;
            const nextStop = stops[index + 1];
            const nextCity = nextStop ? cities.find((item) => item.id === nextStop.cityId) : undefined;
            const travelIcon = nextCity && city.region !== "Hokkaido" && nextCity.region === "Hokkaido" ? "plane" : "train";
            return (
              <Reveal key={`${stop.cityId}-${index}`} delay={index * 0.08} className="journey-card-wrap">
                <article className="journey-card">
                  <div className="journey-card__media">
                    <CityMedia city={city} sizes="(max-width: 720px) 88vw, (max-width: 1100px) 46vw, 30vw" />
                    <div className="journey-card__number">0{index + 1}</div>
                    <div className="journey-card__shade" aria-hidden="true" />
                    <p>{formatShortDate(stop.checkIn)} — {formatShortDate(stop.checkOut)}</p>
                  </div>
                  <div className="journey-card__body">
                    <span className="journey-card__role">{city.role}</span>
                    <h3>{city.name}</h3>
                    <p>{city.oneLine}</p>
                    <div className="journey-card__nights"><strong>{stop.nights}</strong><span>nights</span></div>
                    <button type="button" onClick={() => openOnMap(city.id)}>
                      See it on the map <Icon name="arrow-right" />
                    </button>
                  </div>
                </article>
                {index < stops.length - 1 ? (
                  <motion.div
                    className="journey-connector"
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.18 + index * 0.08 }}
                    aria-hidden="true"
                  >
                    <Icon name={travelIcon} />
                  </motion.div>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
