"use client";

import { useCallback, useEffect, useState } from "react";
import { InvitationGate } from "@/components/invitation-gate";
import { SiteHeader } from "@/components/site-header";
import { MobileDock } from "@/components/mobile-dock";
import { Hero } from "@/components/hero";
import { Countdown } from "@/components/countdown";
import { JourneyOverview } from "@/components/journey-overview";
import { ItineraryBuilder } from "@/components/itinerary-builder";
import { RouteMap } from "@/components/route-map";
import { DayPlans } from "@/components/day-plans";
import { HolidayMoments } from "@/components/holiday-moments";
import { PlaceExplorer } from "@/components/place-explorer";
import { TravelPlan } from "@/components/travel-plan";
import { BookingChecklist } from "@/components/booking-checklist";
import { OfficialNotes } from "@/components/official-notes";
import { SiteFooter } from "@/components/site-footer";
import { useActiveSection } from "@/components/use-active-section";
import { AetherRuntime } from "@/components/ui/aether-runtime";
import { CinematicChapters, SlowRhythm } from "@/components/cinematic-chapters";

const INTRO_KEY = "japan-slowly-intro-seen";

export function WinterExperience() {
  const [introOpen, setIntroOpen] = useState(true);
  const active = useActiveSection();

  useEffect(() => {
    let frame = 0;
    try {
      if (window.sessionStorage.getItem(INTRO_KEY) === "yes") {
        frame = window.requestAnimationFrame(() => setIntroOpen(false));
      }
    } catch {
      // The invitation still works when storage is unavailable.
    }
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, "yes");
    } catch {
      // Keep the in-memory state working in private or restricted browsers.
    }
    setIntroOpen(false);
  }, []);

  const replayIntro = useCallback(() => {
    try {
      window.sessionStorage.removeItem(INTRO_KEY);
    } catch {
      // Replaying does not depend on storage.
    }
    setIntroOpen(true);
  }, []);

  return (
    <>
      <AetherRuntime />
      <a className="skip-link" href="#journey">
        Skip to the trip plan
      </a>
      <InvitationGate open={introOpen} onClose={closeIntro} />
      <SiteHeader active={active} onReplay={replayIntro} />
      <main>
        <Hero />
        <Countdown />
        <JourneyOverview />
        <CinematicChapters />
        <HolidayMoments />
        <SlowRhythm />
        <ItineraryBuilder />
        <TravelPlan />
        <RouteMap />
        <DayPlans />
        <PlaceExplorer />
        <BookingChecklist />
        <OfficialNotes />
      </main>
      <SiteFooter />
      <MobileDock active={active} />
    </>
  );
}
