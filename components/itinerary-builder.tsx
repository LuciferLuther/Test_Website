"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cities, routePresets, tripEnd, tripStart, travelStart } from "@/data/trip";
import { buildDatedStops, formatLongDate, formatShortDate, transferWarnings } from "@/lib/dates";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

export function ItineraryBuilder() {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const preset = routePresets[0];
  const stops = buildDatedStops(tripStart, preset);
  const warnings = transferWarnings(tripStart, preset);

  const copyPlan = async () => {
    const text = [
      "Japan, Slowly",
      `Depart ${formatLongDate(travelStart)} · Return ${formatLongDate(tripEnd)}`,
      "",
      ...stops.map((stop, index) => `${index + 1}. ${stop.label}: ${stop.nights} ${stop.nights === 1 ? "night" : "nights"} (${formatShortDate(stop.checkIn)}–${formatShortDate(stop.checkOut)})`),
      "",
      "Christmas Eve: travel to Sapporo",
      "New Year's Day: Sapporo",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="section section--wine plan-section" id="plan">
      <div className="container">
        <SectionHeading
          title="This is the route. Keep it slow."
          copy="The dates are fixed. The open space inside each stay is part of the plan, not a gap to fill."
          dark
        />
        <div className="plan-layout">
          <Reveal className="plan-controls plan-principles">
            <article><Icon name="water" /><div><strong>Protect the room time.</strong><p>Leave space for baths, sleep, sex, and quiet time together.</p></div></article>
            <article><Icon name="snow" /><div><strong>Follow the weather.</strong><p>Move snow days and day trips when the forecast changes.</p></div></article>
            <article><Icon name="calendar" /><div><strong>Book the holiday meals.</strong><p>Christmas and New Year are easier when dinner is already handled.</p></div></article>
          </Reveal>
          <Reveal className="plan-result aether-surface aether-surface--paper" data-aether="selected-itinerary">
            <div className="plan-result__header">
              <div><h3>{preset.name}</h3><p>{formatLongDate(travelStart)} — {formatLongDate(tripEnd)}</p></div>
              <button className="button button--small button--paper" type="button" onClick={copyPlan}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={copied ? "copied" : "copy"} initial={reduceMotion ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}>
                    <Icon name={copied ? "check" : "calendar"} /> {copied ? "Copied" : "Copy route"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
            <ol className="plan-timeline">
              {stops.map((stop, index) => {
                const city = cities.find((item) => item.id === stop.cityId)!;
                const nextCity = stops[index + 1] ? cities.find((item) => item.id === stops[index + 1].cityId) : undefined;
                const travelIcon = nextCity && (city.region === "Hokkaido" || nextCity.region === "Hokkaido") ? "plane" : "train";
                return (
                  <li key={`${stop.cityId}-${index}`}>
                    <span className="plan-timeline__number">0{index + 1}</span>
                    <div><p>{formatShortDate(stop.checkIn)} — {formatShortDate(stop.checkOut)}</p><h4>{stop.label}</h4><span>{stop.nights} {stop.nights === 1 ? "night" : "nights"} · {stop.note}</span></div>
                    {index < stops.length - 1 ? <Icon name={travelIcon} /> : null}
                  </li>
                );
              })}
            </ol>
            <div className="holiday-checks">
              <article><span>24 Dec</span><strong>Christmas Eve</strong><p>Fly to Sapporo, then stop.</p></article>
              <article><span>1 Jan</span><strong>New Year&apos;s Day</strong><p>Stay in Sapporo with no hotel move.</p></article>
            </div>
            <div className="route-status route-status--warn">
              <Icon name="sparkle" />
              <div><strong>One planned holiday move</strong><p>{warnings[0]} Leave Hakone early, use a direct HND–CTS flight, and keep the Sapporo evening simple.</p></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
