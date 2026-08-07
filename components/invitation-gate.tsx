"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Botanical, WaxSeal } from "@/components/ui/botanical";

interface InvitationGateProps {
  open: boolean;
  onClose: () => void;
}

const subscribeToHydration = () => () => undefined;

function InvitationPlaceholder() {
  return (
    <div className="invitation-gate" aria-hidden="true">
      <div className="invitation-gate__glow" />
      <Botanical className="invitation-gate__branch invitation-gate__branch--left" tone="gold" />
      <Botanical className="invitation-gate__branch invitation-gate__branch--right" side="right" tone="gold" />
      <div className="envelope">
        <span className="envelope__paper" />
        <span className="envelope__flap" />
        <span className="envelope__emboss envelope__emboss--left"><Botanical tone="light" /></span>
        <span className="envelope__emboss envelope__emboss--right"><Botanical side="right" tone="light" /></span>
        <span className="envelope__copy">
          <span className="envelope__kicker">A winter journey for two</span>
          <strong>Japan,<em> slowly.</em></strong>
          <span className="envelope__date">15 December 2026 — 3 January 2027</span>
          <span className="envelope__rule" />
          <span className="envelope__tap">Opening…</span>
        </span>
        <span className="envelope__seal"><WaxSeal /></span>
      </div>
    </div>
  );
}

export function InvitationGate({ open, onClose }: InvitationGateProps) {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const gateRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const closeInvitation = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open || !hydrated) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeInvitation();
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
  }, [closeInvitation, hydrated, open]);

  if (!hydrated) return open ? <InvitationPlaceholder /> : null;

  const gateVariants = {
    visible: { opacity: 1 },
    exit: reduceMotion
      ? { opacity: 0, transition: { duration: 0.08 } }
      : { opacity: 0, scale: 1.015, filter: "blur(8px)", transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const envelopeVariants = {
    visible: { y: 0, scale: 1, rotateX: 0, opacity: 1 },
    exit: reduceMotion
      ? { opacity: 0, transition: { duration: 0.08 } }
      : { y: 70, scale: 1.04, rotateX: -7, opacity: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const flapVariants = {
    visible: { rotateX: 0 },
    exit: reduceMotion
      ? { rotateX: 0, transition: { duration: 0.08 } }
      : { rotateX: 176, transition: { duration: 0.78, ease: [0.45, 0, 0.15, 1] as const } },
  };

  const sealVariants = {
    visible: { scale: 1, rotate: 0, opacity: 1 },
    exit: reduceMotion
      ? { opacity: 0, transition: { duration: 0.08 } }
      : { scale: [1, 1.12, 0], rotate: [0, -4, 12], opacity: [1, 1, 0], transition: { duration: 0.65 } },
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="invitation-gate"
          ref={gateRef}
          className="invitation-gate"
          role="dialog"
          aria-modal="true"
          aria-labelledby="invitation-title"
          data-hydrated="true"
          initial="visible"
          animate="visible"
          exit="exit"
          variants={gateVariants}
        >
          <div className="invitation-gate__glow" aria-hidden="true" />
          <Botanical className="invitation-gate__branch invitation-gate__branch--left" tone="gold" />
          <Botanical className="invitation-gate__branch invitation-gate__branch--right" side="right" tone="gold" />
          <motion.button
            type="button"
            className="envelope"
            onClick={closeInvitation}
            aria-label="Open the Japan winter invitation"
            variants={envelopeVariants}
          >
            <span className="envelope__paper" aria-hidden="true" />
            <motion.span className="envelope__flap" aria-hidden="true" variants={flapVariants} />
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
            <motion.span className="envelope__seal" aria-hidden="true" variants={sealVariants}>
              <WaxSeal />
            </motion.span>
          </motion.button>
          <button className="invitation-gate__skip" type="button" onClick={closeInvitation}>
            Skip opening
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
