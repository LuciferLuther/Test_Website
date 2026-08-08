"use client";

import { motion, useReducedMotion } from "motion/react";
import { cities, routePresets, tripStart } from "@/data/trip";
import { buildDatedStops, formatShortDate, totalNights } from "@/lib/dates";
import { useTripStore } from "@/store/trip-store";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CityMedia } from "@/components/ui/city-media";
import { Icon } from "@/components/ui/icons";

export function JourneyOverview() {
  const setSelectedCity = useTripStore((state) => state.setSelectedCity);
  const preset = routePresets[0];
  const stops = buildDatedStops(tripStart, preset);
  const reduceMotion = useReducedMotion();

  const openOnMap = (cityId: (typeof stops)[number]["cityId"]) => {
    setSelectedCity(cityId);
    document.getElementById("map")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section className="section section--paper journey" id="journey">
      <div className="container">
        <SectionHeading
          title="Three bases. Sixteen nights."
          copy="Tokyo is split into a short arrival and a safe final night. Hakone and Sapporo get the time that matters."
        />
        <Reveal className="journey-summary">
          <div><strong>{totalNights(preset)}</strong><span>nights</span></div>
          <div><strong>4</strong><span>hotel stays</span></div>
          <div><strong>3</strong><span>base cities</span></div>
          <p>{preset.summary}</p>
        </Reveal>
        <div className="journey-cards journey-cards--4">
          {stops.map((stop, index) => {
            const city = cities.find((item) => item.id === stop.cityId)!;
            const nextStop = stops[index + 1];
            const nextCity = nextStop ? cities.find((item) => item.id === nextStop.cityId) : undefined;
            const travelIcon = nextCity && city.region !== "Hokkaido" && nextCity.region === "Hokkaido" ? "plane" : nextCity && city.region === "Hokkaido" ? "plane" : "train";
            return (
              <Reveal key={`${stop.cityId}-${index}`} className="journey-card-wrap">
                <article className="journey-card">
                  <div className="journey-card__media">
                    <CityMedia city={city} sizes="(max-width: 720px) 88vw, (max-width: 1100px) 46vw, 24vw" />
                    <div className="journey-card__number">0{index + 1}</div>
                    <div className="journey-card__shade" aria-hidden="true" />
                    <p>{formatShortDate(stop.checkIn)} — {formatShortDate(stop.checkOut)}</p>
                  </div>
                  <div className="journey-card__body">
                    <span className="journey-card__role">{stop.label}</span>
                    <h3>{city.name}</h3>
                    <p>{stop.note}</p>
                    <div className="journey-card__nights"><strong>{stop.nights}</strong><span>{stop.nights === 1 ? "night" : "nights"}</span></div>
                    <button type="button" onClick={() => openOnMap(city.id)}>See it on the map <Icon name="arrow-right" /></button>
                  </div>
                </article>
                {index < stops.length - 1 ? (
                  <motion.div
                    className="journey-connector"
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    aria-hidden="true"
                  ><Icon name={travelIcon} /></motion.div>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
