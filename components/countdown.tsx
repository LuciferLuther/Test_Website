"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { countdownParts } from "@/lib/dates";
import { travelStart } from "@/data/trip";

const labels = ["Days", "Hours", "Minutes", "Seconds"] as const;

export function Countdown() {
  const [parts, setParts] = useState<ReturnType<typeof countdownParts> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setParts(countdownParts(travelStart));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const values = parts ? [parts.days, parts.hours, parts.minutes, parts.seconds] : [null, null, null, null];

  return (
    <section className="countdown aether-surface aether-surface--paper" data-aether="countdown" aria-label="Countdown to the trip">
      <p className="meta-label">Our winter starts in</p>
      <div className="countdown__grid">
        {values.map((value, index) => (
          <div className="countdown__item" key={labels[index]}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.strong
                key={value}
                initial={reduceMotion ? false : { opacity: 0, y: -9 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 9 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
              >
                {value === null ? "--" : String(value).padStart(2, "0")}
              </motion.strong>
            </AnimatePresence>
            <span>{labels[index]}</span>
          </div>
        ))}
      </div>
      <p className="countdown__note">
        {parts?.finished ? "The trip has begun." : parts ? "Enough time to book the important parts without rushing." : "Loading the countdown…"}
      </p>
    </section>
  );
}
