const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { loadTypeScript } = require("./load-ts.cjs");

const dates = loadTypeScript(path.join(__dirname, "../lib/dates.ts"));
const trip = loadTypeScript(path.join(__dirname, "../data/trip.ts"));
const route = trip.routePresets[0];

test("the fixed route stays at sixteen nights", () => {
  assert.equal(dates.totalNights(route), 16);
  assert.equal(dates.daysBetween(trip.tripStart, trip.tripEnd), 16);
});

test("the fixed route matches every requested hotel date", () => {
  const stops = dates.buildDatedStops(trip.tripStart, route);
  assert.deepEqual(
    stops.map(({ cityId, checkIn, checkOut }) => ({ cityId, checkIn, checkOut })),
    [
      { cityId: "tokyo", checkIn: "2026-12-18", checkOut: "2026-12-20" },
      { cityId: "hakone", checkIn: "2026-12-20", checkOut: "2026-12-24" },
      { cityId: "sapporo", checkIn: "2026-12-24", checkOut: "2027-01-02" },
      { cityId: "tokyo", checkIn: "2027-01-02", checkOut: "2027-01-03" },
    ],
  );
});

test("only the planned Christmas Eve transfer is flagged", () => {
  const warnings = dates.transferWarnings(trip.tripStart, route);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /Christmas Eve/);
});

test("Christmas Day and New Year stay free of hotel moves", () => {
  const checkIns = dates.buildDatedStops(trip.tripStart, route).slice(1).map((stop) => stop.checkIn);
  assert.equal(checkIns.includes("2026-12-25"), false);
  assert.equal(checkIns.includes("2026-12-31"), false);
  assert.equal(checkIns.includes("2027-01-01"), false);
});

test("date helpers use stable UTC calendar math", () => {
  assert.equal(dates.addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(dates.daysBetween(trip.travelStart, trip.tripEnd), 17);
});
