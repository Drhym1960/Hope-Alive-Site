export type LandingId =
  | "dawn-verse"
  | "gold-promise"
  | "house-letter"
  | "script-sunrise"
  | "quiet-record";

export type LandingLayout = {
  id: LandingId;
  number: number;
  name: string;
  tagline: string;
  description: string;
};

export const LANDING_LAYOUTS: LandingLayout[] = [
  {
    id: "dawn-verse",
    number: 1,
    name: "Dawn Verse",
    tagline: "Poetic italic lines",
    description: "Soft hymn-like writing. The headline falls in three quiet lines, like a verse at first light.",
  },
  {
    id: "gold-promise",
    number: 2,
    name: "Gold Promise",
    tagline: "Three short vows",
    description: "Bold stacked promises: a child, a home, a horizon. Few words, large type, gold on the middle line.",
  },
  {
    id: "house-letter",
    number: 3,
    name: "House Letter",
    tagline: "A letter to a friend",
    description: "Warm first-person voice. Opens like a letter from the house in Makurdi, not a campaign slogan.",
  },
  {
    id: "script-sunrise",
    number: 4,
    name: "Script Sunrise",
    tagline: "Handwritten blessing",
    description: "A script blessing over a clear serif line. Elegant, ceremonial, and close to the old motto.",
  },
  {
    id: "quiet-record",
    number: 5,
    name: "Quiet Record",
    tagline: "Small-caps institutional",
    description: "Measured, official type. Small capitals and a spare headline for donors who read like a ledger.",
  },
];

export const DEFAULT_LANDING_ID: LandingId = "dawn-verse";
export const LANDING_STORAGE_KEY = "hacs-landing-structure-preview";

export function isLandingId(value: string | null): value is LandingId {
  return LANDING_LAYOUTS.some((layout) => layout.id === value);
}

export function getLanding(id: LandingId) {
  return LANDING_LAYOUTS.find((layout) => layout.id === id) ?? LANDING_LAYOUTS[0];
}
