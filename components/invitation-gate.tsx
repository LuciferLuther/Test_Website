"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Botanical, WaxSeal } from "@/components/ui/botanical";

interface InvitationGateProps {
  open: boolean;
  onClose: () => void;
}

export function InvitationGate({ open, onClose }: InvitationGateProps) {
  const [opening, setOpening] = useState(false);
  const gateRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !gateRef.current) return;
      const focusable = Array.from(gateRef.current.querySelectorAll<HTMLElement>("button"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.documentElement.classList.add("intro-open");
    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => gateRef.current?.querySelector<HTMLElement>("button")?.focus());

    return () => {
      document.documentElement.classList.remove("intro-open");
      window.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    let frame = 0;
    if (open) frame = window.requestAnimationFrame(() => setOpening(false));
    if (!open && closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, [open]);

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, reduceMotion ? 80 : 2380);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={gateRef}
          className="invitation-gate"
          data-opening={opening ? "true" : "false"}
          role="dialog"
          aria-modal="true"
          aria-labelledby="invitation-title"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.08 : 0.55 } }}
        >
          <motion.div
            className="invitation-gate__glow"
            aria-hidden="true"
            animate={opening && !reduceMotion ? { opacity: [0.28, 0.62, 0], scale: [0.82, 1.24, 1.5] } : { opacity: 0.28, scale: 1 }}
            transition={{ duration: 2.2, times: [0, 0.46, 1], ease: [0.16, 1, 0.3, 1] }}
          />
          <Botanical className="invitation-gate__branch invitation-gate__branch--left" tone="gold" />
          <Botanical className="invitation-gate__branch invitation-gate__branch--right" side="right" tone="gold" />
          <motion.button
            type="button"
            className="envelope"
            onClick={openInvitation}
            aria-label="Open the Japan winter invitation"
            animate={
              opening
                ? reduceMotion
                  ? { opacity: 0 }
                  : { y: [0, -8, 44], scale: [1, 1.018, 0.97], rotateX: [0, -2, -7], opacity: [1, 1, 0] }
                : { y: 0, scale: 1, opacity: 1 }
            }
            transition={{ duration: 2.24, times: [0, 0.62, 1], ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="envelope__paper" aria-hidden="true" />
            <motion.span
              className="envelope__letter"
              aria-hidden="true"
              animate={opening && !reduceMotion ? { y: ["28%", "-23%", "-30%"], opacity: [0, 1, 0.96], scale: [0.94, 1, 1.015] } : { y: "28%", opacity: 0, scale: 0.94 }}
              transition={{ duration: 1.48, delay: 0.48, times: [0, 0.72, 1], ease: [0.16, 1, 0.3, 1] }}
            >
              <strong>Japan,<em> slowly.</em></strong>
              <i />
              <small>Tokyo · Hakone · Sapporo</small>
              <small>17 December 2026 — 3 January 2027</small>
            </motion.span>
            <motion.span
              className="envelope__seam-glow"
              aria-hidden="true"
              animate={opening && !reduceMotion ? { opacity: [0, 1, 0], scaleX: [0.2, 1.08, 1.25] } : { opacity: 0, scaleX: 0.2 }}
              transition={{ duration: 1.35, delay: 0.22, times: [0, 0.48, 1] }}
            />
            <motion.span
              className="envelope__flap"
              aria-hidden="true"
              animate={opening && !reduceMotion ? { rotateX: 176 } : { rotateX: 0 }}
              transition={{ duration: 0.92, delay: opening ? 0.28 : 0, ease: [0.45, 0, 0.15, 1] }}
            />
            <span className="envelope__emboss envelope__emboss--left" aria-hidden="true"><Botanical tone="light" /></span>
            <span className="envelope__emboss envelope__emboss--right" aria-hidden="true"><Botanical side="right" tone="light" /></span>
            <motion.span
              className="envelope__copy"
              animate={opening && !reduceMotion ? { opacity: 0, y: 16, filter: "blur(8px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.42 }}
            >
              <strong id="invitation-title">Japan,<em> slowly.</em></strong>
              <span className="envelope__date">17 December 2026 — 3 January 2027</span>
              <span className="envelope__rule" aria-hidden="true" />
              <span className="envelope__tap">Tap to open</span>
            </motion.span>
            <motion.span
              className="envelope__seal"
              aria-hidden="true"
              animate={opening && !reduceMotion ? { scale: [1, 1.12, 0], rotate: [0, -4, 12] } : { scale: 1 }}
              transition={{ duration: 0.62, times: [0, 0.44, 1] }}
            >
              <WaxSeal />
            </motion.span>
          </motion.button>
          <button className="invitation-gate__skip" type="button" onClick={onClose}>Skip opening</button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
