"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { cities, routePresets, type City, type CityId } from "@/data/trip";
import { useTripStore } from "@/store/trip-store";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

const regions = [
  {
    name: "Hokkaido",
    d: "M654.3 106.2 679.4 88.1 687.3 135.9 634.6 147.5 603.5 189.7 547.7 160.7 528.4 207.2 488.9 207.8 484 165.5 501.6 132.8 539.5 130.5 549.9 71.7 560.4 38.6 602.1 82.8 629.3 97.1Z",
  },
  {
    name: "Tohoku",
    d: "M446.6 372.2 445.5 370.4 470.1 350.3 492.4 298.4 486.4 250.6 501.4 223.7 539.1 215.9 558.5 274.9 557.4 309.3 524.6 352.1 525.1 388.7Z",
  },
  {
    name: "Kanto",
    d: "M434.6 412.6 446.6 372.2 525.1 388.7 525.2 396 511.8 429.9 518 451.2 499.5 481.1 454.1 501.1 447.7 501.4Z",
  },
  {
    name: "Hokuriku",
    d: "M446.6 372.2 434.6 412.6 358.7 464.6 343.7 451.1 374.2 389 397.9 409.3 445.5 370.4Z",
  },
  { name: "Chubu", d: "M358.7 464.6 434.6 412.6 447.7 501.4 391.7 503.7 372.1 522.6Z" },
  {
    name: "Kansai",
    d: "M276.2 460 299.1 455.9 337.1 464.6 343.7 451.1 358.7 464.6 372.1 522.6 341.2 552.2 317.3 535.9 315.8 504.1 280.6 509.5Z",
  },
  {
    name: "Chugoku",
    d: "M280.6 509.5 254.1 513.5 212.1 533.5 187.3 534 173.8 515.2 202.4 497.6 228.4 468.6 276.2 460Z",
  },
  {
    name: "Shikoku",
    d: "M219.7 552.3 239.3 526.9 259.5 531.9 274.1 514 300.2 523.2 304.7 537.7 284.7 563.4 270.1 549.8 251.9 559.7 242.5 584.6 219.4 572.5Z",
  },
  {
    name: "Kyushu",
    d: "M187.3 534 170.5 534.4 206.5 565.6 182.8 637.9 159.9 655.7 142.7 639.2 151.4 600.9 128.9 588.6 114.5 559.4 148.1 546.3 166.7 519.6 173.8 515.2Z",
  },
];

const views = {
  all: { x: 0, y: 0, scale: 1 },
  Hokkaido: { x: -480, y: -22, scale: 1.72 },
  Kanto: { x: -560, y: -500, scale: 2.05 },
  other: { x: -70, y: -270, scale: 1.28 },
} as const;

type ViewId = keyof typeof views;

function getCityView(city: City): ViewId {
  if (city.region === "Hokkaido") return "Hokkaido";
  if (city.region === "Kanto") return "Kanto";
  return "other";
}

function getRoutePath(from: City, to: City): { d: string; type: "flight" | "train" } {
  const hokkaidoJump = (from.region === "Hokkaido") !== (to.region === "Hokkaido");
  if (hokkaidoJump) {
    const midX = (from.map.x + to.map.x) / 2 + 70;
    const midY = Math.min(from.map.y, to.map.y) - 115;
    return {
      d: `M${from.map.x} ${from.map.y} Q${midX} ${midY} ${to.map.x} ${to.map.y}`,
      type: "flight",
    };
  }
  return { d: `M${from.map.x} ${from.map.y} L${to.map.x} ${to.map.y}`, type: "train" };
}

function cityMatchesView(city: City, view: ViewId): boolean {
  if (view === "all") return true;
  if (view === "other") return city.region !== "Hokkaido" && city.region !== "Kanto";
  return city.region === view;
}

export function RouteMap() {
  const [view, setView] = useState<ViewId>("all");
  const selectedCityId = useTripStore((state) => state.selectedCityId);
  const previousSelectedCityId = useRef(selectedCityId);
  const setSelectedCity = useTripStore((state) => state.setSelectedCity);
  const savedCityIds = useTripStore((state) => state.savedCityIds);
  const toggleSavedCity = useTripStore((state) => state.toggleSavedCity);
  const routeVisible = useTripStore((state) => state.routeVisible);
  const setRouteVisible = useTripStore((state) => state.setRouteVisible);
  const reduceMotion = useReducedMotion();

  const preset = routePresets[0];
  const selectedCity = cities.find((city) => city.id === selectedCityId) ?? cities[1];
  const routeCities = useMemo(
    () =>
      preset.stops.map((stop) => cities.find((city) => city.id === stop.cityId)!).filter(Boolean),
    [preset],
  );
  const routeSegments = useMemo(
    () =>
      routeCities
        .slice(0, -1)
        .map((city, index) => ({
          from: city,
          to: routeCities[index + 1],
          ...getRoutePath(city, routeCities[index + 1]),
        })),
    [routeCities],
  );

  useEffect(() => {
    if (previousSelectedCityId.current === selectedCityId) return;
    previousSelectedCityId.current = selectedCityId;
    const frame = window.requestAnimationFrame(() => setView(getCityView(selectedCity)));
    return () => window.cancelAnimationFrame(frame);
  }, [selectedCity, selectedCityId]);

  const chooseCity = (cityId: CityId) => {
    setSelectedCity(cityId);
    const city = cities.find((item) => item.id === cityId);
    if (city) setView(getCityView(city));
  };

  return (
    <section className="section map-section" id="map">
      <div className="container">
        <SectionHeading
          title="See the route before adding another city."
          copy="Large pins are hotel bases. Nearby places work better as day trips, so you get more without packing again."
        />
        <div className="map-layout">
          <Reveal className="map-card">
            <div className="map-toolbar">
              <div className="map-view-tabs" role="group" aria-label="Map view">
                {(["all", "Hokkaido", "Kanto", "other"] as ViewId[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={view === item ? "is-active" : ""}
                    aria-pressed={view === item}
                    onClick={() => setView(item)}
                  >
                    {item === "all" ? "All Japan" : item === "other" ? "Other ideas" : item}
                  </button>
                ))}
              </div>
              <button
                className="map-route-toggle"
                type="button"
                aria-pressed={routeVisible}
                onClick={() => setRouteVisible(!routeVisible)}
              >
                <Icon name="route" /> {routeVisible ? "Hide route" : "Show route"}
              </button>
            </div>
            <div className="map-stage">
              <svg
                viewBox="0 0 760 740"
                role="group"
                aria-label="Interactive map of the Japan winter route"
              >
                <defs>
                  <filter id="map-shadow">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodOpacity=".18" />
                  </filter>
                  <filter id="pin-glow">
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="5"
                      floodColor="#d2a55c"
                      floodOpacity=".65"
                    />
                  </filter>
                </defs>
                <motion.g
                  animate={views[view]}
                  transition={{ duration: reduceMotion ? 0.01 : 0.85, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "380px 370px" }}
                >
                  <g className="map-land" filter="url(#map-shadow)">
                    {regions.map((region) => (
                      <path
                        key={region.name}
                        d={region.d}
                        className={selectedCity.region === region.name ? "is-active" : ""}
                        onClick={() =>
                          setView(
                            region.name === "Hokkaido" || region.name === "Kanto"
                              ? region.name
                              : "other",
                          )
                        }
                      />
                    ))}
                  </g>
                  {routeVisible ? (
                    <g className="map-routes" aria-hidden="true">
                      {routeSegments.map((segment, index) => (
                        <motion.path
                          key={`${segment.from.id}-${segment.to.id}`}
                          d={segment.d}
                          className={`map-route map-route--${segment.type}`}
                          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{
                            duration: reduceMotion ? 0.01 : 1.1,
                            delay: index * 0.18,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      ))}
                    </g>
                  ) : null}
                  <g className="map-pins">
                    {cities
                      .filter((city) => cityMatchesView(city, view) || view === "all")
                      .map((city) => {
                        const isSelected = city.id === selectedCityId;
                        const routeIndex = routeCities.findIndex(
                          (routeCity) => routeCity.id === city.id,
                        );
                        const isRoute = routeIndex >= 0;
                        return (
                          <g
                            key={city.id}
                            className={`map-pin${isSelected ? " is-selected" : ""}${isRoute ? " is-route" : ""}`}
                            transform={`translate(${city.map.x} ${city.map.y})`}
                            role="button"
                            tabIndex={0}
                            aria-label={`Select ${city.name}`}
                            onClick={() => chooseCity(city.id)}
                            onKeyDown={(event: ReactKeyboardEvent<SVGGElement>) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                chooseCity(city.id);
                              }
                            }}
                          >
                            <circle
                              className="map-pin__halo"
                              r={isSelected ? 19 : 14}
                              filter={isSelected ? "url(#pin-glow)" : undefined}
                            />
                            <circle className="map-pin__dot" r={isRoute ? 8 : 6} />
                            {isRoute ? (
                              <text className="map-pin__number" y="3.5">
                                {routeIndex + 1}
                              </text>
                            ) : null}
                            <text className="map-pin__label" x="14" y="4">
                              {city.name}
                            </text>
                          </g>
                        );
                      })}
                  </g>
                </motion.g>
              </svg>
              <div
                className="map-legend aether-surface aether-surface--micro"
                data-aether="map-legend"
                aria-label="Map legend"
              >
                <span>
                  <i className="legend-pin" /> Hotel base
                </span>
                <span>
                  <i className="legend-line legend-line--flight" /> Flight
                </span>
                <span>
                  <i className="legend-line" /> Train or road
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal className="map-detail" delay={0.08}>
            <p className="meta-label">Selected place</p>
            <div className="map-detail__title">
              <div>
                <span>{selectedCity.region}</span>
                <h3>{selectedCity.name}</h3>
              </div>
              <strong>
                {selectedCity.scores.overall}
                <small>/100</small>
              </strong>
            </div>
            <p className="map-detail__lead">{selectedCity.oneLine}</p>
            <dl className="map-detail__facts">
              <div>
                <dt>Best stay</dt>
                <dd>{selectedCity.recommendedNights}</dd>
              </div>
              <div>
                <dt>Use it as</dt>
                <dd>{selectedCity.role}</dd>
              </div>
              <div>
                <dt>Stay near</dt>
                <dd>{selectedCity.stayArea}</dd>
              </div>
            </dl>
            <div className="map-detail__highlights">
              {selectedCity.highlights.slice(0, 3).map((highlight) => (
                <span key={highlight}>
                  <Icon name="sparkle" />
                  {highlight}
                </span>
              ))}
            </div>
            <div className="map-detail__warning">
              <strong>Keep in mind</strong>
              <p>{selectedCity.watchOut}</p>
            </div>
            <button
              className={
                savedCityIds.includes(selectedCity.id)
                  ? "button button--wine is-saved"
                  : "button button--wine"
              }
              type="button"
              onClick={() => toggleSavedCity(selectedCity.id)}
            >
              <Icon name={savedCityIds.includes(selectedCity.id) ? "check" : "heart"} />
              {savedCityIds.includes(selectedCity.id) ? "Saved" : "Save this place"}
            </button>
            {savedCityIds.length ? (
              <p className="map-detail__saved">
                {savedCityIds.length}/4 places saved for comparison.
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
