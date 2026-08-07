"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeImmediately = useCallback(() => {
    clearCloseTimer();
    setOpening(false);
    onClose();
  }, [clearCloseTimer, onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeImmediately();
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
  }, [closeImmediately, open]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, reduceMotion ? 80 : 1180);
  };

  return (
    <AnimatePresence onExitComplete={() => setOpening(false)}>
      {open ? (
        <motion.div
          ref={gateRef}
          className="invitation-gate"
          role="dialog"
          aria-modal="true"
          aria-labelledby="invitation-title"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.08 : 0.62 } }}
        >
          <div className="invitation-gate__glow" aria-hidden="true" />
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
                  : { y: 70, scale: 1.04, rotateX: -7, opacity: 0 }
                : { y: 0, scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="envelope__paper" aria-hidden="true" />
            <motion.span
              className="envelope__flap"
              aria-hidden="true"
              animate={opening && !reduceMotion ? { rotateX: 176 } : { rotateX: 0 }}
              transition={{ duration: 0.78, ease: [0.45, 0, 0.15, 1] }}
            />
            <span className="envelope__emboss envelope__emboss--left" aria-hidden="true">
              <Botanical tone="light" />
            </span>
            <span className="envelope__emboss envelope__emboss--right" aria-hidden="true">
              <Botanical side="right" tone="light" />
            </span>
            <span className="envelope__copy">
              <span className="envelope__kicker">A winter journey for two</span>
              <strong id="invitation-title">Japan,<em> slowly.</em></strong>
              <span className="envelope__date">15 December 2026 — 3 January 2027</span>
              <span className="envelope__rule" aria-hidden="true" />
              <span className="envelope__tap">Tap to open</span>
            </span>
            <motion.span
              className="envelope__seal"
              aria-hidden="true"
              animate={opening && !reduceMotion ? { scale: [1, 1.12, 0], rotate: [0, -4, 12] } : { scale: 1 }}
              transition={{ duration: 0.65 }}
            >
              <WaxSeal />
            </motion.span>
          </motion.button>
          <button className="invitation-gate__skip" type="button" onClick={closeImmediately}>
            Skip opening
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
