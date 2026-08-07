"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cities, routePresets, type RoutePresetId } from "@/data/trip";
import {
  addDays,
  buildDatedStops,
  formatLongDate,
  formatShortDate,
  totalNights,
  transferWarnings,
} from "@/lib/dates";
import { useTripStore } from "@/store/trip-store";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

function findCityOnDate(stops: ReturnType<typeof buildDatedStops>, date: string): string {
  const stop = stops.find((item) => item.checkIn <= date && item.checkOut > date);
  return cities.find((city) => city.id === stop?.cityId)?.name ?? "Outside this route";
}

export function ItineraryBuilder() {
  const presetId = useTripStore((state) => state.presetId);
  const startDate = useTripStore((state) => state.startDate);
  const setPreset = useTripStore((state) => state.setPreset);
  const setStartDate = useTripStore((state) => state.setStartDate);
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  const preset = routePresets.find((item) => item.id === presetId) ?? routePresets[0];
  const stops = useMemo(() => buildDatedStops(startDate, preset), [startDate, preset]);
  const warnings = transferWarnings(startDate, preset);
  const endDate = addDays(startDate, totalNights(preset));
  const christmasCity = findCityOnDate(stops, "2026-12-24");
  const newYearCity = findCityOnDate(stops, "2027-01-01");

  const copyPlan = async () => {
    const text = [
      "Japan, Slowly",
      `${formatLongDate(startDate)} to ${formatLongDate(endDate)}`,
      "",
      ...stops.map((stop, index) => {
        const city = cities.find((item) => item.id === stop.cityId)?.name ?? stop.cityId;
        return `${index + 1}. ${city}: ${stop.nights} nights (${formatShortDate(stop.checkIn)}–${formatShortDate(stop.checkOut)})`;
      }),
      "",
      `Christmas Eve: ${christmasCity}`,
      `New Year’s Day: ${newYearCity}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section className="section section--wine plan-section" id="plan">
      <div className="container">
        <SectionHeading
          eyebrow="Interactive trip builder"
          title="Choose the pace that feels right."
          copy="Every option keeps the trip at 19 nights. The difference is where you spend the extra time."
          dark
        />
        <div className="plan-layout">
          <Reveal className="plan-controls">
            <label className="date-field">
              <span>Trip start</span>
              <input
                type="date"
                value={startDate}
                min="2026-12-10"
                max="2026-12-20"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setStartDate(event.target.value)}
              />
              <small>The end date updates automatically.</small>
            </label>
            <div className="preset-list" role="group" aria-label="Trip pace">
              {routePresets.map((item) => (
                <button
                  key={item.id}
                  className={item.id === presetId ? "preset-card is-active" : "preset-card"}
                  type="button"
                  aria-pressed={item.id === presetId}
                  onClick={() => setPreset(item.id as RoutePresetId)}
                >
                  <span className="preset-card__radio" aria-hidden="true" />
                  <span><strong>{item.name}</strong><small>{item.summary}</small></span>
                  <Icon name="arrow-right" />
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal className="plan-result" delay={0.1}>
            <div className="plan-result__header">
              <div>
                <p className="eyebrow">Your current route</p>
                <h3>{preset.name}</h3>
                <p>{formatLongDate(startDate)} — {formatLongDate(endDate)}</p>
              </div>
              <button className="button button--small button--paper" type="button" onClick={copyPlan}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "copied" : "copy"}
                    initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                  >
                    <Icon name={copied ? "check" : "calendar"} /> {copied ? "Copied" : "Copy plan"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
            <ol className="plan-timeline">
              {stops.map((stop, index) => {
                const city = cities.find((item) => item.id === stop.cityId)!;
                const nextStop = stops[index + 1];
                const nextCity = nextStop ? cities.find((item) => item.id === nextStop.cityId) : undefined;
                const travelIcon = nextCity && city.region !== "Hokkaido" && nextCity.region === "Hokkaido" ? "plane" : "train";
                return (
                  <li key={`${stop.cityId}-${index}`}>
                    <span className="plan-timeline__number">0{index + 1}</span>
                    <div>
                      <p>{formatShortDate(stop.checkIn)} — {formatShortDate(stop.checkOut)}</p>
                      <h4>{city.name}</h4>
                      <span>{stop.nights} nights · {stop.note}</span>
                    </div>
                    {index < stops.length - 1 ? <Icon name={travelIcon} /> : null}
                  </li>
                );
              })}
            </ol>
            <div className="holiday-checks">
              <article>
                <span>24 Dec</span>
                <strong>Christmas Eve</strong>
                <p>{christmasCity}</p>
              </article>
              <article>
                <span>1 Jan</span>
                <strong>New Year’s Day</strong>
                <p>{newYearCity}</p>
              </article>
            </div>
            <div className={warnings.length ? "route-status route-status--warn" : "route-status route-status--good"}>
              <Icon name={warnings.length ? "sparkle" : "check"} />
              <div>
                <strong>{warnings.length ? "One thing to fix" : "Holiday timing looks good"}</strong>
                {warnings.length ? warnings.map((warning) => <p key={warning}>{warning}</p>) : <p>No hotel move on Christmas Eve, Christmas Day, New Year’s Eve, or New Year’s Day.</p>}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
