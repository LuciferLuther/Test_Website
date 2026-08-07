"use client";

import { useEffect } from "react";
import { useTripStore } from "@/store/trip-store";

export function StoreHydrator() {
  useEffect(() => {
    void useTripStore.persist.rehydrate();
  }, []);

  return null;
}
