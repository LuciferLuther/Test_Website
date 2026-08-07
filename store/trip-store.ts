"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { bookingTasks, cities, routePresets, type CityId, type RoutePresetId, type ScoreKey } from "@/data/trip";

const validPresetIds = new Set<RoutePresetId>(routePresets.map((preset) => preset.id));
const validCityIds = new Set<CityId>(cities.map((city) => city.id));
const validTaskIds = new Set<string>(bookingTasks.map((task) => task.id));
const validAirportPlans = new Set(["open-jaw", "tokyo-return"] as const);

export type MapViewId = "all" | "Hokkaido" | "Kanto" | "other";

function mapViewForCity(cityId: CityId): MapViewId {
  const city = cities.find((item) => item.id === cityId);
  if (city?.region === "Hokkaido") return "Hokkaido";
  if (city?.region === "Kanto") return "Kanto";
  return "other";
}

function isDateString(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

interface TripState {
  presetId: RoutePresetId;
  startDate: string;
  selectedCityId: CityId;
  mapView: MapViewId;
  dayCityId: "tokyo" | "hakodate" | "sapporo";
  sortBy: ScoreKey;
  savedCityIds: CityId[];
  completedTasks: string[];
  routeVisible: boolean;
  airportPlan: "open-jaw" | "tokyo-return";
  setPreset: (presetId: RoutePresetId) => void;
  setStartDate: (startDate: string) => void;
  setSelectedCity: (cityId: CityId) => void;
  setMapView: (view: MapViewId) => void;
  setDayCity: (cityId: "tokyo" | "hakodate" | "sapporo") => void;
  setSortBy: (sortBy: ScoreKey) => void;
  toggleSavedCity: (cityId: CityId) => void;
  toggleTask: (taskId: string) => void;
  setRouteVisible: (visible: boolean) => void;
  setAirportPlan: (plan: "open-jaw" | "tokyo-return") => void;
  resetChecklist: () => void;
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      presetId: "balanced",
      startDate: "2026-12-15",
      selectedCityId: "hakodate",
      mapView: "all",
      dayCityId: "tokyo",
      sortBy: "overall",
      savedCityIds: [],
      completedTasks: [],
      routeVisible: true,
      airportPlan: "open-jaw",
      setPreset: (presetId) => set({ presetId }),
      setStartDate: (startDate) => set({ startDate }),
      setSelectedCity: (selectedCityId) => set({ selectedCityId, mapView: mapViewForCity(selectedCityId) }),
      setMapView: (mapView) => set({ mapView }),
      setDayCity: (dayCityId) => set({ dayCityId }),
      setSortBy: (sortBy) => set({ sortBy }),
      toggleSavedCity: (cityId) =>
        set((state) => {
          const isSaved = state.savedCityIds.includes(cityId);
          return {
            savedCityIds: isSaved
              ? state.savedCityIds.filter((id) => id !== cityId)
              : [...state.savedCityIds, cityId].slice(-4),
          };
        }),
      toggleTask: (taskId) =>
        set((state) => ({
          completedTasks: state.completedTasks.includes(taskId)
            ? state.completedTasks.filter((id) => id !== taskId)
            : [...state.completedTasks, taskId],
        })),
      setRouteVisible: (routeVisible) => set({ routeVisible }),
      setAirportPlan: (airportPlan) => set({ airportPlan }),
      resetChecklist: () => set({ completedTasks: [] }),
    }),
    {
      name: "japan-slowly-trip",
      skipHydration: true,
      version: 1,
      migrate: (persistedState) => persistedState,
      merge: (persistedState, currentState) => {
        const saved = (persistedState ?? {}) as Partial<TripState>;
        const presetId = saved.presetId && validPresetIds.has(saved.presetId) ? saved.presetId : currentState.presetId;
        const startDate = isDateString(saved.startDate) ? saved.startDate : currentState.startDate;
        const savedCityIds = Array.isArray(saved.savedCityIds)
          ? saved.savedCityIds.filter((cityId): cityId is CityId => validCityIds.has(cityId as CityId)).slice(-4)
          : currentState.savedCityIds;
        const completedTasks = Array.isArray(saved.completedTasks)
          ? saved.completedTasks.filter((taskId): taskId is string => typeof taskId === "string" && validTaskIds.has(taskId))
          : currentState.completedTasks;
        const airportPlan = saved.airportPlan && validAirportPlans.has(saved.airportPlan) ? saved.airportPlan : currentState.airportPlan;

        return { ...currentState, presetId, startDate, savedCityIds, completedTasks, airportPlan };
      },
      partialize: (state) => ({
        presetId: state.presetId,
        startDate: state.startDate,
        savedCityIds: state.savedCityIds,
        completedTasks: state.completedTasks,
        airportPlan: state.airportPlan,
      }),
    },
  ),
);
