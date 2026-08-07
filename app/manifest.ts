import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Japan, Slowly",
    short_name: "Japan Slowly",
    description: "A relaxed winter itinerary for Tokyo, Hakodate, and Sapporo.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f3eadf",
    theme_color: "#7c263b",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
