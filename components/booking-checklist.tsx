"use client";

import { motion, useReducedMotion } from "motion/react";
import { bookingTasks } from "@/data/trip";
import { useTripStore } from "@/store/trip-store";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

export function BookingChecklist() {
  const completedTasks = useTripStore((state) => state.completedTasks);
  const toggleTask = useTripStore((state) => state.toggleTask);
  const resetChecklist = useTripStore((state) => state.resetChecklist);
  const reduceMotion = useReducedMotion();
  const progress = Math.round((completedTasks.length / bookingTasks.length) * 100);
  const groups = [...new Set(bookingTasks.map((task) => task.group))];

  return (
    <section className="section section--soft booking-section" id="book">
      <div className="container">
        <SectionHeading
          eyebrow="Booking checklist"
          title="Book the parts that protect the holiday."
          copy="Hotels, holiday dinners, and winter transport matter. Most normal sightseeing can stay flexible."
        />
        <Reveal className="booking-progress">
          <div><strong>{completedTasks.length}/{bookingTasks.length}</strong><span>ready</span></div>
          <div className="booking-progress__bar" aria-label={`${progress}% of booking tasks complete`}><motion.i animate={{ width: `${progress}%` }} transition={{ duration: reduceMotion ? 0.01 : 0.55 }} /></div>
          <p>{progress === 100 ? "The important parts are protected." : progress >= 50 ? "The trip is taking shape." : "Start with flights and the three main hotels."}</p>
          {completedTasks.length ? <button type="button" onClick={resetChecklist}>Reset</button> : null}
        </Reveal>
        <div className="checklist-groups">
          {groups.map((group, groupIndex) => (
            <Reveal className="checklist-group" delay={groupIndex * 0.05} key={group}>
              <h3>{group}</h3>
              {bookingTasks.filter((task) => task.group === group).map((task) => {
                const complete = completedTasks.includes(task.id);
                return (
                  <button className={complete ? "checklist-item is-complete" : "checklist-item"} type="button" key={task.id} onClick={() => toggleTask(task.id)} aria-pressed={complete}>
                    <span className="checklist-item__check"><Icon name="check" /></span>
                    <span><strong>{task.title}</strong><small>{task.note}</small></span>
                  </button>
                );
              })}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
