import type { RoutePreset } from "@/data/trip";

const DAY_MS = 86_400_000;

export interface DatedStop {
  cityId: RoutePreset["stops"][number]["cityId"];
  nights: number;
  note: string;
  checkIn: string;
  checkOut: string;
}

export function parseDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12));
}

export function addDays(date: string, days: number): string {
  const value = parseDate(date);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function daysBetween(start: string, end: string): number {
  return Math.round((parseDate(end).getTime() - parseDate(start).getTime()) / DAY_MS);
}

export function formatShortDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(parseDate(date));
}

export function formatLongDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseDate(date));
}

export function buildDatedStops(start: string, preset: RoutePreset): DatedStop[] {
  let current = start;
  return preset.stops.map((stop) => {
    const checkIn = current;
    const checkOut = addDays(current, stop.nights);
    current = checkOut;
    return { ...stop, checkIn, checkOut };
  });
}

export function totalNights(preset: RoutePreset): number {
  return preset.stops.reduce((total, stop) => total + stop.nights, 0);
}

export function transferWarnings(start: string, preset: RoutePreset): string[] {
  const sensitive = new Map([
    ["12-24", "Christmas Eve"],
    ["12-25", "Christmas Day"],
    ["12-31", "New Year's Eve"],
    ["01-01", "New Year's Day"],
  ]);

  return buildDatedStops(start, preset)
    .slice(1)
    .flatMap((stop) => {
      const label = sensitive.get(stop.checkIn.slice(5));
      return label ? [`This plan includes a hotel transfer on ${label}.`] : [];
    });
}

export function countdownParts(target: string, now = new Date()): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
} {
  const targetTime = parseDate(target).getTime();
  const distance = Math.max(0, targetTime - now.getTime());
  return {
    days: Math.floor(distance / DAY_MS),
    hours: Math.floor((distance % DAY_MS) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1_000),
    finished: distance === 0,
  };
}
