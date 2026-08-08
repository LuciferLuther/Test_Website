"use client";

import Image from "next/image";
import type { City } from "@/data/trip";
import {
  OnsenSnowScene,
  OtaruCanalScene,
  ToriiPathScene,
  TraditionalStreetScene,
} from "@/components/ui/scenes";

interface CityMediaProps {
  city: City;
  sizes: string;
}

export function CityMedia({ city, sizes }: CityMediaProps) {
  if (city.image) {
    return (
      <Image
        src={city.image}
        alt={city.imageAlt ?? city.name}
        fill
        sizes={sizes}
        style={{ objectFit: "cover" }}
      />
    );
  }

  if (city.id === "otaru") return <OtaruCanalScene />;
  if (city.id === "kanazawa") return <TraditionalStreetScene />;
  if (city.id === "kyoto") return <ToriiPathScene />;
  return <OnsenSnowScene />;
}
