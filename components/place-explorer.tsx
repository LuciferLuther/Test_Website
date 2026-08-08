"use client";

import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cities, type City, type ScoreKey } from "@/data/trip";
import { titleCase } from "@/lib/utils";
import { useTripStore } from "@/store/trip-store";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CityMedia } from "@/components/ui/city-media";
import { Icon } from "@/components/ui/icons";
import { Modal } from "@/components/ui/modal";

const sortOptions: Array<{ value: ScoreKey; label: string }> = [
  { value: "overall", label: "Best overall fit" },
  { value: "snow", label: "Best for snow" },
  { value: "christmas", label: "Best for Christmas" },
  { value: "newYear", label: "Best for New Year" },
  { value: "onsen", label: "Best for onsen" },
  { value: "ease", label: "Easiest logistics" },
];

const roles = ["all", "hotel base", "day trip", "alternative", "visited"] as const;

export function PlaceExplorer() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<(typeof roles)[number]>("all");
  const [detailCityId, setDetailCityId] = useState<City["id"] | null>(null);
  const reduceMotion = useReducedMotion();
  const sortBy = useTripStore((state) => state.sortBy);
  const setSortBy = useTripStore((state) => state.setSortBy);
  const savedCityIds = useTripStore((state) => state.savedCityIds);
  const toggleSavedCity = useTripStore((state) => state.toggleSavedCity);
  const selectedCity = detailCityId ? cities.find((city) => city.id === detailCityId) ?? null : null;
  const closeDetails = useCallback(() => setDetailCityId(null), []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...cities]
      .filter((city) => role === "all" || city.role === role)
      .filter((city) => !query || `${city.name} ${city.region} ${city.bestFor.join(" ")}`.toLowerCase().includes(query))
      .sort((a, b) => b.scores[sortBy] - a.scores[sortBy]);
  }, [role, search, sortBy]);

  const savedCities = savedCityIds.map((id) => cities.find((city) => city.id === id)).filter((city): city is City => Boolean(city));

  return (
    <section className="section places-section" id="places">
      <div className="container">
        <SectionHeading
          title="Compare places without adding more hotels."
          copy="Save the places that fit this holiday. Leave the rest for another trip."
        />
        <Reveal className="place-controls">
          <label className="search-field">
            <span className="sr-only">Search places</span>
            <Icon name="sparkle" />
            <input value={search} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} placeholder="Search by city or mood" type="search" />
          </label>
          <label className="select-field">
            <span className="sr-only">Sort places</span>
            <select value={sortBy} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSortBy(event.target.value as ScoreKey)}>
              {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <Icon name="chevron-down" />
          </label>
          <div className="role-filters" role="group" aria-label="Filter place type">
            {roles.map((item) => (
              <button key={item} type="button" className={role === item ? "is-active" : ""} onClick={() => setRole(item)}>
                {item === "all" ? "All" : titleCase(item)}
              </button>
            ))}
          </div>
        </Reveal>
        {filtered.length ? (
          <motion.div className="place-grid" layout={!reduceMotion}>
            {filtered.map((city, index) => {
              const isSaved = savedCityIds.includes(city.id);
              return (
                <motion.article
                  className="place-card"
                  layout={!reduceMotion}
                  key={city.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.45, delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.18) }}
                >
                  <button className="place-card__open" type="button" onClick={() => setDetailCityId(city.id)} aria-label={`Open details for ${city.name}`}>
                    <span className="place-card__media"><CityMedia city={city} sizes="(max-width: 720px) 92vw, (max-width: 1100px) 48vw, 31vw" /><span className="place-card__shade" /></span>
                    <span className="place-card__score"><strong>{city.scores[sortBy]}</strong><small>{titleCase(sortBy)}</small></span>
                    <span className="place-card__copy">
                      <small>{city.region} · {city.role}</small>
                      <strong>{city.name}</strong>
                      <span>{city.oneLine}</span>
                    </span>
                  </button>
                  <button
                    className={isSaved ? "place-card__save is-saved" : "place-card__save"}
                    type="button"
                    onClick={() => toggleSavedCity(city.id)}
                    aria-label={isSaved ? `Remove ${city.name} from saved places` : `Save ${city.name}`}
                  >
                    <Icon name={isSaved ? "check" : "heart"} />
                  </button>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <div className="empty-state"><Icon name="snow" /><h3>No place matches that search.</h3><p>Try a city name, “snow”, “onsen”, or clear the filters.</p></div>
        )}
        {savedCities.length ? (
          <Reveal className="saved-compare">
            <div className="saved-compare__header">
              <div><p className="meta-label">Saved places</p><h3>Quick comparison</h3></div>
              <span>{savedCities.length}/4</span>
            </div>
            <div className="saved-compare__table" role="table" aria-label="Saved place comparison">
              <div className="saved-compare__row saved-compare__row--head" role="row">
                <span role="columnheader">Place</span><span role="columnheader">Snow</span><span role="columnheader">Christmas</span><span role="columnheader">Onsen</span><span role="columnheader">Ease</span>
              </div>
              {savedCities.map((city) => (
                <div className="saved-compare__row" role="row" key={city.id}>
                  <button type="button" onClick={() => setDetailCityId(city.id)} role="cell">{city.name}</button>
                  <span role="cell">{city.scores.snow}</span><span role="cell">{city.scores.christmas}</span><span role="cell">{city.scores.onsen}</span><span role="cell">{city.scores.ease}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
      <Modal open={Boolean(selectedCity)} title={selectedCity?.name ?? "Place"} onClose={closeDetails}>
        {selectedCity ? (
          <div className="place-modal">
            <p className="place-modal__lead">{selectedCity.oneLine}</p>
            <div className="place-modal__meta">
              <span>{selectedCity.region}</span><span>{selectedCity.role}</span><span>{selectedCity.recommendedNights}</span>
            </div>
            <h3>Why it works</h3>
            <ul>{selectedCity.highlights.map((highlight) => <li key={highlight}><Icon name="sparkle" />{highlight}</li>)}</ul>
            <h3>Stay near</h3><p>{selectedCity.stayArea}</p>
            <div className="place-modal__warning"><strong>Keep in mind</strong><p>{selectedCity.watchOut}</p></div>
            <div className="score-grid">
              {sortOptions.slice(1).map((option) => (
                <div key={option.value}><span>{option.label.replace("Best for ", "")}</span><i><b style={{ width: `${selectedCity.scores[option.value]}%` }} /></i><strong>{selectedCity.scores[option.value]}</strong></div>
              ))}
            </div>
            <button className="button button--wine" type="button" onClick={() => toggleSavedCity(selectedCity.id)}>
              <Icon name={savedCityIds.includes(selectedCity.id) ? "check" : "heart"} />
              {savedCityIds.includes(selectedCity.id) ? "Saved" : "Save for comparison"}
            </button>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
