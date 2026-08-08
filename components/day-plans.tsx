"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cities, dayPlans, type CoreCityId } from "@/data/trip";
import { useTripStore } from "@/store/trip-store";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";
import { CityMedia } from "@/components/ui/city-media";

const cityOrder: CoreCityId[] = ["tokyo", "hakone", "sapporo"];

export function DayPlans() {
  const dayCityId = useTripStore((state) => state.dayCityId);
  const setDayCity = useTripStore((state) => state.setDayCity);
  const [accordion, setAccordion] = useState({ cityId: dayCityId, openDay: 0 });
  const reduceMotion = useReducedMotion();
  const plans = dayPlans[dayCityId];
  const city = cities.find((item) => item.id === dayCityId)!;
  const openDay = accordion.cityId === dayCityId ? accordion.openDay : 0;
  const setOpenDay = (nextOpenDay: number) => setAccordion({ cityId: dayCityId, openDay: nextOpenDay });

  return (
    <section className="section section--soft days-section" id="days">
      <div className="container">
        <SectionHeading
          title="Plan one main thing each day."
          copy="These are flexible ideas, not strict schedules. Sleep in, rest at the hotel, and change the plan when the weather changes."
        />
        <Reveal className="day-city-tabs" role="group" aria-label="Choose a city day plan">
          {cityOrder.map((cityId, index) => {
            const tabCity = cities.find((item) => item.id === cityId)!;
            return (
              <button
                key={cityId}
                type="button"
                aria-pressed={dayCityId === cityId}
                className={dayCityId === cityId ? "is-active" : ""}
                onClick={() => setDayCity(cityId)}
              >
                <span>0{index + 1}</span>
                <strong>{tabCity.name}</strong>
                <small>{tabCity.recommendedNights}</small>
              </button>
            );
          })}
        </Reveal>
        <div className="day-plan-layout">
          <Reveal className="day-plan-intro">
            <div className="day-plan-intro__media" aria-hidden="true">
              <CityMedia city={city} sizes="(max-width: 980px) 100vw, 42vw" />
            </div>
            <p className="meta-label">Current base</p>
            <h3>{city.name}</h3>
            <p>{city.oneLine}</p>
            <div className="day-plan-intro__rule" />
            <blockquote>“The day worked when you both enjoyed it—not when every pin was completed.”</blockquote>
          </Reveal>
          <Reveal className="day-accordion" delay={0.08}>
            {plans.map((plan, index) => {
              const isOpen = openDay === index;
              return (
                <article className={isOpen ? "day-item is-open" : "day-item"} key={plan.title}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpenDay(isOpen ? -1 : index)}>
                    <span>{plan.day}</span>
                    <div><h4>{plan.title}</h4><small>{plan.pace}</small></div>
                    <Icon name="chevron-down" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        className="day-item__content"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div><span>Morning</span><p>{plan.morning}</p></div>
                        <div><span>Afternoon</span><p>{plan.afternoon}</p></div>
                        <div><span>Evening</span><p>{plan.evening}</p></div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </article>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
