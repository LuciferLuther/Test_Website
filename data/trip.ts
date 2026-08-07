export type CityId =
  | "tokyo"
  | "hakodate"
  | "sapporo"
  | "hakone"
  | "otaru"
  | "jozankei"
  | "kanazawa"
  | "kyoto";

export type CoreCityId = "tokyo" | "hakodate" | "sapporo";
export type RoutePresetId = "balanced" | "tokyo" | "snow" | "hakone";
export type ScoreKey = "overall" | "snow" | "christmas" | "newYear" | "onsen" | "ease";

export const TOKYO_LIGHTS_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Marunouchi_Illumination_2022_%2852646998543%29.jpg/960px-Marunouchi_Illumination_2022_%2852646998543%29.jpg";

export const SAPPORO_ODORI_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Hokkaido_Sapporo_Odori_Park.jpg/1280px-Hokkaido_Sapporo_Odori_Park.jpg";

export interface RouteStop {
  cityId: CityId;
  nights: number;
  note: string;
}

export interface RoutePreset {
  id: RoutePresetId;
  name: string;
  shortName: string;
  summary: string;
  stops: RouteStop[];
}

export interface City {
  id: CityId;
  name: string;
  region: string;
  role: "hotel base" | "day trip" | "alternative" | "visited";
  recommendedNights: string;
  oneLine: string;
  bestFor: string[];
  highlights: string[];
  watchOut: string;
  stayArea: string;
  scores: Record<ScoreKey, number>;
  map: { x: number; y: number };
  image?: string;
  imageAlt?: string;
}

export interface DayPlan {
  day: string;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  pace: "very slow" | "easy" | "full but calm";
}

export const tripStart = "2026-12-15";
export const tripEnd = "2027-01-03";

export const routePresets: RoutePreset[] = [
  {
    id: "balanced",
    name: "Best balance",
    shortName: "Balanced",
    summary: "The best mix of Tokyo, Christmas, snow, and rest.",
    stops: [
      { cityId: "tokyo", nights: 7, note: "Take Tokyo slowly" },
      { cityId: "hakodate", nights: 5, note: "Christmas by the harbour" },
      { cityId: "sapporo", nights: 7, note: "Snow and New Year" },
    ],
  },
  {
    id: "tokyo",
    name: "More Tokyo",
    shortName: "More Tokyo",
    summary: "One extra city day, with a slightly shorter Sapporo stay.",
    stops: [
      { cityId: "tokyo", nights: 8, note: "More time to live in the city" },
      { cityId: "hakodate", nights: 5, note: "Keep Christmas protected" },
      { cityId: "sapporo", nights: 6, note: "Still enough time for snow" },
    ],
  },
  {
    id: "snow",
    name: "More snow",
    shortName: "More snow",
    summary: "Move north one day earlier and use Sapporo as a long winter base.",
    stops: [
      { cityId: "tokyo", nights: 6, note: "A shorter city opening" },
      { cityId: "hakodate", nights: 5, note: "Christmas stays in place" },
      { cityId: "sapporo", nights: 8, note: "Maximum snow time" },
    ],
  },
  {
    id: "hakone",
    name: "Add Hakone",
    shortName: "Add Hakone",
    summary: "Bring back the onsen feeling you loved, without moving on a holiday.",
    stops: [
      { cityId: "tokyo", nights: 5, note: "A shorter Tokyo stay" },
      { cityId: "hakone", nights: 3, note: "Onsen and quiet time" },
      { cityId: "hakodate", nights: 5, note: "Christmas by the harbour" },
      { cityId: "sapporo", nights: 6, note: "Snow and New Year" },
    ],
  },
];

export const cities: City[] = [
  {
    id: "tokyo",
    name: "Tokyo",
    region: "Kanto",
    role: "hotel base",
    recommendedNights: "6–8 nights",
    oneLine: "Your slow city start, with beautiful Christmas nights.",
    bestFor: ["Christmas", "food", "easy days", "shopping"],
    highlights: [
      "Choose one neighbourhood each day",
      "Marunouchi and Ginza lights",
      "Daikanyama, Nakameguro, and Ebisu",
      "Long lunches and hotel breaks",
    ],
    watchOut: "Do not fill every day with cross-city travel. Tokyo feels better when you stay in one area at a time.",
    stayArea: "Marunouchi, Ginza, or Ebisu",
    scores: { overall: 95, snow: 25, christmas: 96, newYear: 70, onsen: 20, ease: 98 },
    map: { x: 481, y: 457 },
    image: TOKYO_LIGHTS_IMAGE,
    imageAlt: "Christmas lights in Marunouchi, Tokyo",
  },
  {
    id: "hakodate",
    name: "Hakodate",
    region: "Hokkaido",
    role: "hotel base",
    recommendedNights: "4–5 nights",
    oneLine: "The strongest Christmas setting for this route.",
    bestFor: ["Christmas", "harbour views", "food", "onsen"],
    highlights: [
      "Red Brick Warehouses",
      "Christmas tree and harbour lights",
      "Fireworks if the 2026 programme confirms them",
      "Yunokawa onsen and seafood",
    ],
    watchOut: "The event is recurring, but the exact 2026 fireworks schedule still needs to be confirmed.",
    stayArea: "Bay Area or a hotel with onsen access",
    scores: { overall: 94, snow: 82, christmas: 100, newYear: 54, onsen: 84, ease: 81 },
    map: { x: 520, y: 201 },
  },
  {
    id: "sapporo",
    name: "Sapporo",
    region: "Hokkaido",
    role: "hotel base",
    recommendedNights: "6–8 nights",
    oneLine: "The snow anchor and the easiest place for a calm New Year.",
    bestFor: ["snow", "New Year", "food", "easy day trips"],
    highlights: [
      "Reliable city snow",
      "White Illumination",
      "Otaru and Jozankei as day trips",
      "A warm, unhurried New Year",
    ],
    watchOut: "Reserve New Year meals early and keep January 1 simple because many places close.",
    stayArea: "Odori, Sapporo Station, or Susukino edge",
    scores: { overall: 98, snow: 100, christmas: 88, newYear: 98, onsen: 79, ease: 92 },
    map: { x: 579, y: 119 },
    image: SAPPORO_ODORI_IMAGE,
    imageAlt: "Snowy view across central Sapporo",
  },
  {
    id: "hakone",
    name: "Hakone",
    region: "Kanto",
    role: "alternative",
    recommendedNights: "2–3 nights",
    oneLine: "The calm onsen feeling you already know and love.",
    bestFor: ["onsen", "quiet", "couple time", "scenery"],
    highlights: ["Private onsen", "Ryokan dinner", "Lake and mountain views", "Slow mornings"],
    watchOut: "Snow is possible, not reliable. Add Hakone only by shortening Tokyo or Sapporo.",
    stayArea: "Gora or a quiet ryokan near Lake Ashi",
    scores: { overall: 82, snow: 45, christmas: 38, newYear: 66, onsen: 100, ease: 68 },
    map: { x: 452, y: 493 },
  },
  {
    id: "otaru",
    name: "Otaru",
    region: "Hokkaido",
    role: "day trip",
    recommendedNights: "Day trip",
    oneLine: "A romantic canal day without another hotel move.",
    bestFor: ["snow", "cafes", "seafood", "photos"],
    highlights: ["Canal walk", "Glass shops", "Sushi lunch", "Warm cafe stop"],
    watchOut: "The famous Snow Light Path takes place later in winter, not during this trip.",
    stayArea: "Visit from Sapporo",
    scores: { overall: 88, snow: 94, christmas: 65, newYear: 55, onsen: 42, ease: 90 },
    map: { x: 560, y: 120 },
  },
  {
    id: "jozankei",
    name: "Jozankei",
    region: "Hokkaido",
    role: "day trip",
    recommendedNights: "Day trip or 1 night",
    oneLine: "Snow, mountains, and onsen without changing the whole route.",
    bestFor: ["onsen", "snow", "quiet", "scenery"],
    highlights: ["Snowy gorge", "Day-use baths", "Private onsen options", "Slow lunch"],
    watchOut: "A night here is lovely, but a day trip keeps the main plan simpler.",
    stayArea: "Visit from Sapporo",
    scores: { overall: 91, snow: 96, christmas: 45, newYear: 62, onsen: 100, ease: 76 },
    map: { x: 590, y: 138 },
  },
  {
    id: "kanazawa",
    name: "Kanazawa",
    region: "Hokuriku",
    role: "alternative",
    recommendedNights: "3–4 nights",
    oneLine: "Beautiful winter food and old streets, but it pulls the route south.",
    bestFor: ["food", "old streets", "gardens", "possible snow"],
    highlights: ["Kenrokuen", "Higashi Chaya", "Seafood", "Crafts"],
    watchOut: "It creates another base and competes with Hokkaido for the same winter days.",
    stayArea: "Korimbo or near Kanazawa Station",
    scores: { overall: 75, snow: 68, christmas: 40, newYear: 63, onsen: 42, ease: 59 },
    map: { x: 366, y: 422 },
  },
  {
    id: "kyoto",
    name: "Kyoto",
    region: "Kansai",
    role: "visited",
    recommendedNights: "Skip this trip",
    oneLine: "A great New Year city, but you visited recently and it adds more moving.",
    bestFor: ["temples", "New Year", "history", "food"],
    highlights: ["Hatsumode", "Temple bells", "Quiet mornings", "Traditional streets"],
    watchOut: "It would turn this trip back into a fast multi-city route.",
    stayArea: "Save it for another slow Kansai trip",
    scores: { overall: 61, snow: 34, christmas: 45, newYear: 94, onsen: 30, ease: 45 },
    map: { x: 316, y: 505 },
  },
];

export const dayPlans: Record<CoreCityId, DayPlan[]> = {
  tokyo: [
    {
      day: "Day 1",
      title: "Arrive and settle in",
      morning: "Land, travel to the hotel, and unpack properly.",
      afternoon: "Rest. Walk only around the hotel area.",
      evening: "Have an easy dinner and sleep early.",
      pace: "very slow",
    },
    {
      day: "Day 2",
      title: "Marunouchi and Tokyo Station",
      morning: "Late breakfast and a gentle walk around Marunouchi.",
      afternoon: "Lunch, shops, then a hotel break.",
      evening: "See the lights and have one booked dinner.",
      pace: "easy",
    },
    {
      day: "Day 3",
      title: "Daikanyama to Ebisu",
      morning: "Coffee and small shops in Daikanyama.",
      afternoon: "Walk toward Nakameguro, then rest.",
      evening: "Dinner in Ebisu. No second neighbourhood.",
      pace: "easy",
    },
    {
      day: "Day 4",
      title: "Ginza and Tsukiji",
      morning: "Start with food around Tsukiji.",
      afternoon: "Ginza shops or a museum, not both.",
      evening: "Return to the hotel or stay for a slow dinner.",
      pace: "easy",
    },
    {
      day: "Day 5",
      title: "Old Tokyo",
      morning: "Asakusa before the busiest hours.",
      afternoon: "A long lunch and one riverside walk.",
      evening: "Keep the evening free.",
      pace: "very slow",
    },
    {
      day: "Day 6",
      title: "Your Christmas date",
      morning: "Sleep in and choose one relaxed activity.",
      afternoon: "Get ready slowly and enjoy the hotel.",
      evening: "One beautiful dinner and one illumination area.",
      pace: "very slow",
    },
    {
      day: "Day 7",
      title: "A free day",
      morning: "Decide after breakfast.",
      afternoon: "Return to a place you loved or do nothing.",
      evening: "Pack calmly for Hokkaido.",
      pace: "very slow",
    },
  ],
  hakodate: [
    {
      day: "Day 1",
      title: "Arrive by the harbour",
      morning: "Travel north and check in.",
      afternoon: "Unpack, rest, and take a short waterfront walk.",
      evening: "Seafood dinner close to the hotel.",
      pace: "very slow",
    },
    {
      day: "Day 2",
      title: "Motomachi and the old streets",
      morning: "Churches, slopes, and quiet streets.",
      afternoon: "Cafe stop and hotel rest.",
      evening: "Return to the harbour lights.",
      pace: "easy",
    },
    {
      day: "Day 3",
      title: "Christmas Eve",
      morning: "Late breakfast and no fixed sightseeing list.",
      afternoon: "Red Brick Warehouses, then time to get ready.",
      evening: "Christmas dinner, tree lighting, and fireworks if confirmed.",
      pace: "very slow",
    },
    {
      day: "Day 4",
      title: "Christmas Day and onsen",
      morning: "A warm bath or slow hotel morning.",
      afternoon: "Yunokawa onsen or a seafood lunch.",
      evening: "One more harbour walk while the event is still running.",
      pace: "very slow",
    },
    {
      day: "Day 5",
      title: "Choose the weather",
      morning: "Pick Goryokaku, Onuma, or Mt. Hakodate based on visibility.",
      afternoon: "Keep the plan flexible.",
      evening: "Early dinner and an easy final night.",
      pace: "full but calm",
    },
  ],
  sapporo: [
    {
      day: "Day 1",
      title: "Arrive and find your winter rhythm",
      morning: "Take the train from Hakodate.",
      afternoon: "Check in and rest.",
      evening: "Soup curry and a short snowy walk.",
      pace: "very slow",
    },
    {
      day: "Day 2",
      title: "Sapporo lights",
      morning: "Late breakfast around Odori.",
      afternoon: "One market or one museum.",
      evening: "White Illumination and a warm dinner.",
      pace: "easy",
    },
    {
      day: "Day 3",
      title: "Otaru day trip",
      morning: "Travel after the rush.",
      afternoon: "Canal, sushi, glass shops, and a cafe.",
      evening: "Return before you are tired.",
      pace: "full but calm",
    },
    {
      day: "Day 4",
      title: "Play in real snow",
      morning: "Choose a beginner snow area or a gentle winter walk.",
      afternoon: "Warm lunch and an early return.",
      evening: "Hotel rest and room-service style comfort.",
      pace: "full but calm",
    },
    {
      day: "Day 5",
      title: "Jozankei onsen",
      morning: "Travel to the snowy gorge.",
      afternoon: "Onsen, lunch, and no extra stops.",
      evening: "Return to Sapporo and sleep well.",
      pace: "very slow",
    },
    {
      day: "Day 6",
      title: "New Year's Eve",
      morning: "Sleep in and take a short snow walk.",
      afternoon: "Rest, spa, and get ready slowly.",
      evening: "A booked dinner and a calm midnight together.",
      pace: "very slow",
    },
    {
      day: "Day 7",
      title: "New Year's Day",
      morning: "No alarm unless you both want one.",
      afternoon: "A shrine visit when it feels comfortable.",
      evening: "Warm food and a quiet final holiday night.",
      pace: "very slow",
    },
  ],
};

export const bookingTasks = [
  { id: "flights", title: "Open-jaw international flights", note: "Arrive in Tokyo and leave from Sapporo if the fare works.", group: "Book first" },
  { id: "tokyo-hotel", title: "Tokyo hotel", note: "Choose one hotel for the whole stay.", group: "Book first" },
  { id: "hakodate-hotel", title: "Hakodate hotel", note: "Prioritise the Bay Area or a hotel with a good bath.", group: "Book first" },
  { id: "sapporo-hotel", title: "Sapporo hotel", note: "Stay near Odori or Sapporo Station for easy winter travel.", group: "Book first" },
  { id: "christmas-dinner", title: "Christmas Eve dinner", note: "Reserve as soon as hotel and event dates are firm.", group: "Holiday meals" },
  { id: "new-year-dinner", title: "New Year's Eve dinner", note: "Many places close or run fixed menus.", group: "Holiday meals" },
  { id: "train", title: "Hakodate to Sapporo train", note: "Buy reserved seats when the booking window opens.", group: "Transport" },
  { id: "onsen", title: "One special onsen day", note: "Choose Yunokawa, Jozankei, or the Hakone route.", group: "Nice to have" },
] as const;

export const officialSources = [
  {
    label: "Sapporo White Illumination",
    status: "Confirmed 2026–27",
    note: "Official dates are published for the 2026–27 season.",
    href: "https://www.sapporo.travel/en/event/event-list/sapporo_white_illumination/",
  },
  {
    label: "Hakodate Christmas Fantasy",
    status: "Check 2026 schedule",
    note: "The event is recurring, but the exact 2026 fireworks programme still needs confirmation.",
    href: "https://www.hakodate.travel/en/events/hakodate-christmas-fantasy/",
  },
  {
    label: "JR Hokkaido reservations",
    status: "Important",
    note: "Limited express seats are reserved. Check the official booking window before travel.",
    href: "https://www.jrhokkaido.co.jp/global/english/ticket/usage/usage04.html",
  },
  {
    label: "Japan New Year travel tips",
    status: "Holiday closures",
    note: "Many businesses reduce hours or close around 29 December to 3 January.",
    href: "https://www.japan.travel/en/sg/story/enjoy-new-year-japan-tips-toshikoshi-and-shogatsu/",
  },
] as const;
