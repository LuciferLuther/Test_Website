export type CityId =
  | "tokyo"
  | "hakone"
  | "sapporo"
  | "otaru"
  | "jozankei"
  | "kanazawa"
  | "kyoto";

export type CoreCityId = "tokyo" | "hakone" | "sapporo";
export type RoutePresetId = "winter";
export type ScoreKey = "overall" | "snow" | "christmas" | "newYear" | "onsen" | "ease";

export interface RouteStop {
  cityId: CityId;
  label: string;
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
  image?: "/images/tokyo-lights.webp" | "/images/sapporo-odori.webp";
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

export const travelStart = "2026-12-17";
export const tripStart = "2026-12-18";
export const tripEnd = "2027-01-03";

export const routePresets: RoutePreset[] = [
  {
    id: "winter",
    name: "Our winter route",
    shortName: "Our route",
    summary: "Three bases, four hotel stays, and enough open time to rest together.",
    stops: [
      { cityId: "tokyo", label: "Tokyo · HND", nights: 2, note: "Arrive, recover, and see one winter night" },
      { cityId: "hakone", label: "Hakone", nights: 4, note: "Ryokan, onsen, and private time" },
      { cityId: "sapporo", label: "Sapporo", nights: 9, note: "Christmas, snow, New Year, and day trips" },
      { cityId: "tokyo", label: "Tokyo · NRT", nights: 1, note: "A safe final night before the flight home" },
    ],
  },
];

export const cities: City[] = [
  {
    id: "tokyo",
    name: "Tokyo",
    region: "Kanto",
    role: "hotel base",
    recommendedNights: "3 nights in two stays",
    oneLine: "A soft landing near Haneda and a safe last night near Narita.",
    bestFor: ["easy arrival", "food", "winter lights", "flight buffer"],
    highlights: [
      "Stay near Haneda or central Tokyo first",
      "Choose one neighbourhood on 19 December",
      "See Marunouchi or Ginza lights",
      "Sleep near Narita on 2 January",
    ],
    watchOut: "The first Tokyo stay is short. Do not try to cross the whole city in one day.",
    stayArea: "Shinagawa or Ginza first; Narita airport area last",
    scores: { overall: 90, snow: 25, christmas: 92, newYear: 60, onsen: 20, ease: 98 },
    map: { x: 481, y: 457 },
    image: "/images/tokyo-lights.webp",
    imageAlt: "Christmas lights in Marunouchi, Tokyo",
  },
  {
    id: "hakone",
    name: "Hakone",
    region: "Kanto",
    role: "hotel base",
    recommendedNights: "4 nights",
    oneLine: "Four slow nights for onsen, mountain air, and time alone together.",
    bestFor: ["onsen", "quiet", "couple time", "scenery"],
    highlights: ["Private onsen", "Ryokan dinner", "Lake Ashi and Hakone Shrine", "Gora and Owakudani"],
    watchOut: "Snow is possible, not guaranteed. Mountain transport can pause in bad weather.",
    stayArea: "Gora for easy access, or Lake Ashi for a quieter stay",
    scores: { overall: 94, snow: 48, christmas: 72, newYear: 66, onsen: 100, ease: 75 },
    map: { x: 452, y: 493 },
  },
  {
    id: "sapporo",
    name: "Sapporo",
    region: "Hokkaido",
    role: "hotel base",
    recommendedNights: "9 nights",
    oneLine: "The long snow base for Christmas, New Year, rest, and easy day trips.",
    bestFor: ["snow", "New Year", "food", "easy day trips"],
    highlights: [
      "Sapporo White Illumination",
      "Otaru and Jozankei day trips",
      "A flexible snow day",
      "A warm, unhurried New Year",
    ],
    watchOut: "Reserve holiday meals early and keep 1 January simple because many places close.",
    stayArea: "Odori, Sapporo Station, or the quiet edge of Susukino",
    scores: { overall: 99, snow: 100, christmas: 96, newYear: 98, onsen: 82, ease: 93 },
    map: { x: 579, y: 119 },
    image: "/images/sapporo-odori.webp",
    imageAlt: "Snowy view across central Sapporo",
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
    watchOut: "The Snow Light Path happens later in winter, after this trip.",
    stayArea: "Visit from Sapporo",
    scores: { overall: 88, snow: 94, christmas: 68, newYear: 55, onsen: 42, ease: 90 },
    map: { x: 560, y: 120 },
  },
  {
    id: "jozankei",
    name: "Jozankei",
    region: "Hokkaido",
    role: "day trip",
    recommendedNights: "Day trip",
    oneLine: "A second onsen day in deep snow, without changing hotels.",
    bestFor: ["onsen", "snow", "quiet", "scenery"],
    highlights: ["Snowy gorge", "Day-use baths", "Private onsen options", "Slow lunch"],
    watchOut: "Book a day-use bath before leaving Sapporo.",
    stayArea: "Visit from Sapporo",
    scores: { overall: 92, snow: 96, christmas: 50, newYear: 62, onsen: 100, ease: 78 },
    map: { x: 590, y: 138 },
  },
  {
    id: "kanazawa",
    name: "Kanazawa",
    region: "Hokuriku",
    role: "alternative",
    recommendedNights: "Save for another trip",
    oneLine: "Beautiful in winter, but it would add another long move.",
    bestFor: ["food", "old streets", "gardens", "possible snow"],
    highlights: ["Kenrokuen", "Higashi Chaya", "Seafood", "Crafts"],
    watchOut: "It pulls this route away from the three places you chose.",
    stayArea: "Save it for a separate Hokuriku trip",
    scores: { overall: 72, snow: 68, christmas: 40, newYear: 63, onsen: 42, ease: 45 },
    map: { x: 366, y: 422 },
  },
  {
    id: "kyoto",
    name: "Kyoto",
    region: "Kansai",
    role: "visited",
    recommendedNights: "Skip this trip",
    oneLine: "You have been recently, and this route is calmer without it.",
    bestFor: ["temples", "New Year", "history", "food"],
    highlights: ["Hatsumode", "Temple bells", "Quiet mornings", "Traditional streets"],
    watchOut: "It would turn this holiday back into a fast multi-city trip.",
    stayArea: "Save it for another slow Kansai trip",
    scores: { overall: 60, snow: 34, christmas: 45, newYear: 94, onsen: 30, ease: 40 },
    map: { x: 316, y: 505 },
  },
];

export const dayPlans: Record<CoreCityId, DayPlan[]> = {
  tokyo: [
    {
      day: "18 Dec",
      title: "Land and stop",
      morning: "Arrive at Haneda and travel straight to the hotel.",
      afternoon: "Unpack, shower, eat, and sleep if you need it.",
      evening: "Take one short walk near the hotel. Nothing else is required.",
      pace: "very slow",
    },
    {
      day: "19 Dec",
      title: "One Tokyo day",
      morning: "Sleep in, then choose Ginza, Marunouchi, or a neighbourhood you already love.",
      afternoon: "Have a long lunch and return to the hotel before you get tired.",
      evening: "See one illumination area and have one good dinner.",
      pace: "easy",
    },
    {
      day: "2 Jan",
      title: "The Narita buffer night",
      morning: "Fly from Sapporo to Narita with time for winter delays.",
      afternoon: "Check in near the airport and fully repack.",
      evening: "Eat close to the hotel and sleep early before the flight home.",
      pace: "very slow",
    },
  ],
  hakone: [
    {
      day: "20 Dec",
      title: "Arrive at the ryokan",
      morning: "Leave Tokyo after breakfast and travel to Hakone.",
      afternoon: "Check in, put the bags away, and use the bath.",
      evening: "Have dinner at the ryokan. Keep the room and the night private.",
      pace: "very slow",
    },
    {
      day: "21 Dec",
      title: "Gora and Owakudani",
      morning: "Start late and explore Gora or the open-air museum.",
      afternoon: "Go up toward Owakudani only if the weather is clear.",
      evening: "Return early for onsen, dinner, and time together.",
      pace: "easy",
    },
    {
      day: "22 Dec",
      title: "Lake Ashi",
      morning: "Visit Hakone Shrine before the busiest part of the day.",
      afternoon: "Walk by Lake Ashi and stop for a slow lunch.",
      evening: "Do nothing. Bath, bed, room service, or another long dinner.",
      pace: "easy",
    },
    {
      day: "23 Dec",
      title: "Choose the weather",
      morning: "Pick Odawara, another Hakone loop stop, or stay in the ryokan.",
      afternoon: "Pack before dinner so the next morning stays calm.",
      evening: "Leave the last Hakone night open for sex, sleep, baths, and no schedule.",
      pace: "very slow",
    },
  ],
  sapporo: [
    {
      day: "24 Dec",
      title: "Christmas Eve arrival",
      morning: "Leave Hakone early and travel to Haneda.",
      afternoon: "Fly to New Chitose, check in, and rest.",
      evening: "Have a booked dinner and take a short walk through the lights if you still have energy.",
      pace: "very slow",
    },
    {
      day: "25 Dec",
      title: "Christmas in the snow",
      morning: "Sleep in. Keep the first half of the day empty.",
      afternoon: "Walk around Odori and stop whenever you feel cold.",
      evening: "See the White Illumination and share a warm dinner.",
      pace: "very slow",
    },
    {
      day: "26 Dec",
      title: "Otaru day trip",
      morning: "Take the train after the rush.",
      afternoon: "Canal, sushi, glass shops, and a warm cafe.",
      evening: "Return to Sapporo before you are tired.",
      pace: "full but calm",
    },
    {
      day: "27 Dec",
      title: "Play in real snow",
      morning: "Choose a beginner snow area or a gentle winter walk.",
      afternoon: "Have a warm lunch and stop before your body is tired.",
      evening: "Hotel rest and an easy dinner.",
      pace: "full but calm",
    },
    {
      day: "28 Dec",
      title: "Jozankei onsen",
      morning: "Travel to the snowy gorge.",
      afternoon: "Book one bath, one lunch, and nothing more.",
      evening: "Return to Sapporo and sleep well.",
      pace: "very slow",
    },
    {
      day: "29 Dec",
      title: "Choose one nearby place",
      morning: "Pick Asahikawa, a guided Biei day, or stay in Sapporo based on weather.",
      afternoon: "Keep the return time early and simple.",
      evening: "No second plan after dinner.",
      pace: "full but calm",
    },
    {
      day: "30 Dec",
      title: "A private day",
      morning: "No alarm. Order breakfast or go out only when you want to.",
      afternoon: "Shop, visit a spa, nap, or stay in bed together.",
      evening: "Keep the whole night free for the two of you.",
      pace: "very slow",
    },
    {
      day: "31 Dec",
      title: "A calm New Year's Eve",
      morning: "Take one short snow walk.",
      afternoon: "Rest, bathe, and get ready slowly.",
      evening: "Have a booked dinner and choose your own quiet midnight.",
      pace: "very slow",
    },
    {
      day: "1 Jan",
      title: "New Year's Day",
      morning: "Sleep. There is no reason to rush the first morning of the year.",
      afternoon: "Visit a shrine only if you both want to.",
      evening: "Eat something warm and pack for the flight to Narita.",
      pace: "very slow",
    },
  ],
};

export const bookingTasks = [
  { id: "flights", title: "International flights", note: "Depart on 17 December and return from Narita on 3 January.", group: "Book first" },
  { id: "tokyo-hnd-hotel", title: "Tokyo HND hotel", note: "Two nights from 18 to 20 December.", group: "Book first" },
  { id: "hakone-hotel", title: "Hakone ryokan", note: "Four nights with a good bath and dinner plan.", group: "Book first" },
  { id: "sapporo-hotel", title: "Sapporo hotel", note: "Nine nights near Odori or Sapporo Station.", group: "Book first" },
  { id: "tokyo-nrt-hotel", title: "Tokyo NRT hotel", note: "One buffer night on 2 January.", group: "Book first" },
  { id: "christmas-dinner", title: "Christmas dinner", note: "Book 24 or 25 December when the flight time is clear.", group: "Holiday meals" },
  { id: "new-year-dinner", title: "New Year's Eve dinner", note: "Many places close or use fixed menus.", group: "Holiday meals" },
  { id: "domestic-flights", title: "HND to CTS and CTS to NRT", note: "Use generous winter buffers on both flight days.", group: "Transport" },
  { id: "hakone-transport", title: "Tokyo to Hakone transport", note: "Reserve seats once the ryokan is fixed.", group: "Transport" },
  { id: "onsen", title: "Private onsen time", note: "Protect the time before filling the days with sightseeing.", group: "Nice to have" },
] as const;

export const officialSources = [
  {
    label: "Sapporo White Illumination",
    status: "Confirmed 2026–27",
    note: "The official page lists 20 November 2026 to 14 March 2027. Venue periods can differ.",
    href: "https://www.sapporo.travel/en/event/event-list/sapporo_white_illumination/",
  },
  {
    label: "Winter in Hakone",
    status: "Official guide",
    note: "Hakone can have snow in winter, but it is not guaranteed. Check local transport before each mountain day.",
    href: "https://www.hakonenavi.jp/international/en/winter",
  },
  {
    label: "JR Hokkaido reservations",
    status: "Important",
    note: "Reserve limited express seats before any longer Hokkaido rail day.",
    href: "https://www.jrhokkaido.co.jp/global/english/ticket/usage/usage04.html",
  },
  {
    label: "Japan New Year travel tips",
    status: "Holiday closures",
    note: "Many businesses reduce hours or close around 29 December to 3 January.",
    href: "https://www.japan.travel/en/sg/story/enjoy-new-year-japan-tips-toshikoshi-and-shogatsu/",
  },
] as const;
