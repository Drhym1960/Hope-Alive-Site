export type LandingId =
  | "beacon-split"
  | "cinema-field"
  | "trust-first"
  | "care-path"
  | "house-ledger";

export type LandingLayout = {
  id: LandingId;
  number: number;
  name: string;
  tagline: string;
  description: string;
};

export const LANDING_LAYOUTS: LandingLayout[] = [
  {
    id: "beacon-split",
    number: 1,
    name: "Beacon Split",
    tagline: "Classic two-column",
    description: "Headline and photos side by side, then a gold impact bar. A familiar charity homepage that leads with the children.",
  },
  {
    id: "cinema-field",
    number: 2,
    name: "Cinema Field",
    tagline: "Full-screen story",
    description: "A cinematic full-bleed hero with the ask on the photograph, then a filmstrip of children and a quieter page below.",
  },
  {
    id: "trust-first",
    number: 3,
    name: "Trust First",
    tagline: "Credentials opening",
    description: "A compact welcome, then registration documents immediately. Built for donors who need proof before the story.",
  },
  {
    id: "care-path",
    number: 4,
    name: "Care Path",
    tagline: "Three-step journey",
    description: "A centred welcome and a clear path: shelter, school, future. Programs sit as a simple numbered path, not a card grid.",
  },
  {
    id: "house-ledger",
    number: 5,
    name: "House Ledger",
    tagline: "Photo-led editorial",
    description: "Photographs lead on the left. Impact is a typographic ledger, not a coloured bar. Quiet, editorial, and spacious.",
  },
];

export const DEFAULT_LANDING_ID: LandingId = "beacon-split";
export const LANDING_STORAGE_KEY = "hacs-landing-structure-preview";

export function isLandingId(value: string | null): value is LandingId {
  return LANDING_LAYOUTS.some((layout) => layout.id === value);
}

export function getLanding(id: LandingId) {
  return LANDING_LAYOUTS.find((layout) => layout.id === id) ?? LANDING_LAYOUTS[0];
}
