const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { loadTypeScript } = require("./load-ts.cjs");

const dates = loadTypeScript(path.join(__dirname, "../lib/dates.ts"));
const trip = loadTypeScript(path.join(__dirname, "../data/trip.ts"));

const balanced = trip.routePresets.find((preset) => preset.id === "balanced");
const hakone = trip.routePresets.find((preset) => preset.id === "hakone");

test("every route preset stays at nineteen nights", () => {
  for (const preset of trip.routePresets) {
    assert.equal(dates.totalNights(preset), 19, preset.name);
  }
});

test("the balanced route protects Christmas and New Year", () => {
  const stops = dates.buildDatedStops(trip.tripStart, balanced);
  assert.deepEqual(
    stops.map(({ cityId, checkIn, checkOut }) => ({ cityId, checkIn, checkOut })),
    [
      { cityId: "tokyo", checkIn: "2026-12-15", checkOut: "2026-12-22" },
      { cityId: "hakodate", checkIn: "2026-12-22", checkOut: "2026-12-27" },
      { cityId: "sapporo", checkIn: "2026-12-27", checkOut: "2027-01-03" },
    ],
  );
  assert.deepEqual(dates.transferWarnings(trip.tripStart, balanced), []);
});

test("the corrected Hakone route keeps holiday transfer days clear", () => {
  assert.deepEqual(dates.transferWarnings(trip.tripStart, hakone), []);
  const stops = dates.buildDatedStops(trip.tripStart, hakone);
  assert.equal(stops.at(-1).checkOut, trip.tripEnd);
});

test("changing the start date can produce a visible holiday warning", () => {
  const warnings = dates.transferWarnings("2026-12-17", balanced);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /Christmas Eve/);
});

test("date helpers use stable UTC calendar math", () => {
  assert.equal(dates.addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(dates.daysBetween("2026-12-15", "2027-01-03"), 19);
});
