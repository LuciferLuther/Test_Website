"use client";

import { Fragment } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

const codes = [
  { code: "HND", label: "arrive" },
  { code: "Hakone", label: "4 nights" },
  { code: "CTS", label: "9 nights" },
  { code: "NRT", label: "fly home" },
];

const legs = [
  {
    icon: "plane" as const,
    title: "18 December",
    main: "Arrive at Haneda",
    note: "Use one Tokyo hotel for the first two nights.",
  },
  {
    icon: "train" as const,
    title: "20 December",
    main: "Tokyo → Hakone",
    note: "Travel after breakfast and arrive before the ryokan evening.",
  },
  {
    icon: "plane" as const,
    title: "24 December",
    main: "Hakone → HND → CTS",
    note: "This is the long travel day. Start early and book a direct flight.",
  },
  {
    icon: "plane" as const,
    title: "2 January",
    main: "CTS → Narita",
    note: "Fly one day early and sleep near Narita.",
  },
  {
    icon: "plane" as const,
    title: "3 January",
    main: "Fly home from Narita",
    note: "The buffer night protects the long-haul flight from Hokkaido weather.",
  },
];

export function TravelPlan() {
  return (
    <section className="section section--ink travel-section" id="travel">
      <div className="container">
        <SectionHeading
          title="Make the long moves easy."
          copy="The route uses Haneda first and Narita last. The extra airport night is there to protect the flight home."
          dark
        />
        <div className="travel-layout">
          <Reveal className="airport-choice">
            <div className="airport-choice__copy">
              <h3>HND in. NRT out.</h3>
              <p>
                Hakone sits between the Tokyo stays, and Sapporo gets one long base. This follows
                the route you chose without adding another city.
              </p>
              <div className="airport-codes">
                {codes.map((point, index) => (
                  <Fragment key={`${point.code}-${index}`}>
                    {index ? <i /> : null}
                    <span>
                      {point.code}
                      <small>{point.label}</small>
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal className="transport-legs">
            {legs.map((leg, index) => (
              <article key={leg.title}>
                <span className="transport-legs__number">0{index + 1}</span>
                <span className="transport-legs__icon">
                  <Icon name={leg.icon} />
                </span>
                <div>
                  <small>{leg.title}</small>
                  <h4>{leg.main}</h4>
                  <p>{leg.note}</p>
                </div>
              </article>
            ))}
            <div className="travel-rule">
              <Icon name="snow" />
              <p>
                <strong>Winter rule:</strong> use generous buffers. Hokkaido weather can delay
                flights and trains.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
