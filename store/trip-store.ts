"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { bookingTasks, cities, type CityId, type CoreCityId, type ScoreKey } from "@/data/trip";

const validCityIds = new Set<CityId>(cities.map((city) => city.id));
const validTaskIds = new Set<string>(bookingTasks.map((task) => task.id));

interface TripState {
  selectedCityId: CityId;
  dayCityId: CoreCityId;
  sortBy: ScoreKey;
  savedCityIds: CityId[];
  completedTasks: string[];
  routeVisible: boolean;
  setSelectedCity: (cityId: CityId) => void;
  setDayCity: (cityId: CoreCityId) => void;
  setSortBy: (sortBy: ScoreKey) => void;
  toggleSavedCity: (cityId: CityId) => void;
  toggleTask: (taskId: string) => void;
  setRouteVisible: (visible: boolean) => void;
  resetChecklist: () => void;
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      selectedCityId: "hakone",
      dayCityId: "tokyo",
      sortBy: "overall",
      savedCityIds: [],
      completedTasks: [],
      routeVisible: true,
      setSelectedCity: (selectedCityId) => set({ selectedCityId }),
      setDayCity: (dayCityId) => set({ dayCityId }),
      setSortBy: (sortBy) => set({ sortBy }),
      toggleSavedCity: (cityId) =>
        set((state) => ({
          savedCityIds: state.savedCityIds.includes(cityId)
            ? state.savedCityIds.filter((id) => id !== cityId)
            : [...state.savedCityIds, cityId].slice(-4),
        })),
      toggleTask: (taskId) =>
        set((state) => ({
          completedTasks: state.completedTasks.includes(taskId)
            ? state.completedTasks.filter((id) => id !== taskId)
            : [...state.completedTasks, taskId],
        })),
      setRouteVisible: (routeVisible) => set({ routeVisible }),
      resetChecklist: () => set({ completedTasks: [] }),
    }),
    {
      name: "japan-slowly-trip",
      skipHydration: true,
      version: 2,
      migrate: () => ({}),
      merge: (persistedState, currentState) => {
        const saved = (persistedState ?? {}) as Partial<TripState>;
        const savedCityIds = Array.isArray(saved.savedCityIds)
          ? saved.savedCityIds.filter((cityId): cityId is CityId => validCityIds.has(cityId as CityId)).slice(-4)
          : currentState.savedCityIds;
        const completedTasks = Array.isArray(saved.completedTasks)
          ? saved.completedTasks.filter((taskId): taskId is string => typeof taskId === "string" && validTaskIds.has(taskId))
          : currentState.completedTasks;
        return { ...currentState, savedCityIds, completedTasks };
      },
      partialize: (state) => ({ savedCityIds: state.savedCityIds, completedTasks: state.completedTasks }),
    },
  ),
);
