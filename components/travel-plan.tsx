"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTripStore } from "@/store/trip-store";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

const plans = {
  "open-jaw": {
    label: "Open-jaw",
    title: "Tokyo in. Sapporo out.",
    badge: "Best fit",
    copy: "Fly into Tokyo, then leave Japan from New Chitose. This avoids flying back to Tokyo only to catch the international flight.",
    codes: [
      { code: "HND", label: "or Narita" },
      { code: "HKD", label: "Hakodate" },
      { code: "CTS", label: "New Chitose" },
    ],
    legs: [
      { icon: "plane" as const, title: "Arrive", main: "HND or NRT", note: "Tokyo hotel for the full first stay" },
      { icon: "plane" as const, title: "Move north", main: "Tokyo → Hakodate", note: "Use a direct domestic flight" },
      { icon: "train" as const, title: "Winter train", main: "Hakodate → Sapporo", note: "Reserved seats and a relaxed travel day" },
      { icon: "plane" as const, title: "Fly home", main: "CTS → home", note: "Book as one multi-city international ticket when possible" },
    ],
  },
  "tokyo-return": {
    label: "Tokyo return",
    title: "Return to Tokyo one day early.",
    badge: "Safe backup",
    copy: "Use this only when the international fare must start and end in Tokyo. Fly back on 2 January and sleep near Haneda before the long flight home.",
    codes: [
      { code: "HND", label: "or Narita" },
      { code: "HKD", label: "Hakodate" },
      { code: "CTS", label: "New Chitose" },
      { code: "HND", label: "buffer night" },
    ],
    legs: [
      { icon: "plane" as const, title: "Arrive", main: "HND or NRT", note: "Tokyo hotel for the full first stay" },
      { icon: "plane" as const, title: "Move north", main: "Tokyo → Hakodate", note: "Use a direct domestic flight" },
      { icon: "train" as const, title: "Winter train", main: "Hakodate → Sapporo", note: "Reserved seats and a weather-aware plan" },
      { icon: "plane" as const, title: "Buffer night", main: "CTS → HND on 2 Jan", note: "Do not connect to the long-haul flight on a separate same-day ticket" },
    ],
  },
};

export function TravelPlan() {
  const airportPlan = useTripStore((state) => state.airportPlan);
  const reduceMotion = useReducedMotion();
  const presetId = useTripStore((state) => state.presetId);
  const setAirportPlan = useTripStore((state) => state.setAirportPlan);
  const plan = plans[airportPlan];
  const legs = plan.legs.map((leg, index) =>
    index === 1 && presetId === "hakone"
      ? { ...leg, main: "Hakone → Hakodate", note: "Return to Haneda, then take a direct flight to Hakodate" }
      : leg,
  );

  return (
    <section className="section section--ink travel-section" id="travel">
      <div className="container">
        <SectionHeading
          eyebrow="Flights and trains"
          title="Keep the long moves simple."
          copy="The route works best when the ticket follows the direction of the trip instead of forcing you back to where you started."
          dark
        />
        <div className="travel-layout">
          <Reveal className="airport-choice">
            <div className="airport-choice__tabs" role="group" aria-label="Choose an airport plan">
              {(Object.keys(plans) as Array<keyof typeof plans>).map((id) => (
                <button key={id} type="button" aria-pressed={airportPlan === id} className={airportPlan === id ? "is-active" : ""} onClick={() => setAirportPlan(id)}>
                  <span className="airport-choice__radio" />
                  <strong>{plans[id].label}</strong>
                  <small>{plans[id].badge}</small>
                </button>
              ))}
            </div>
            <motion.div
              className="airport-choice__copy"
              key={airportPlan}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.35 }}
            >
              <p className="eyebrow">{plan.badge}</p>
              <h3>{plan.title}</h3>
              <p>{plan.copy}</p>
              <div className="airport-codes">
                {plan.codes.map((point, index) => (
                  <Fragment key={`${airportPlan}-${point.code}-${index}`}>
                    {index ? <i /> : null}
                    <span>{point.code}<small>{point.label}</small></span>
                  </Fragment>
                ))}
              </div>
            </motion.div>
          </Reveal>
          <Reveal className="transport-legs" delay={0.08}>
            {legs.map((leg, index) => (
              <article key={`${airportPlan}-${leg.title}`}>
                <span className="transport-legs__number">0{index + 1}</span>
                <span className="transport-legs__icon"><Icon name={leg.icon} /></span>
                <div><small>{leg.title}</small><h4>{leg.main}</h4><p>{leg.note}</p></div>
              </article>
            ))}
            <div className="travel-rule">
              <Icon name="snow" />
              <p><strong>Winter rule:</strong> build a buffer before the international flight. Weather can delay Hokkaido transport.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
