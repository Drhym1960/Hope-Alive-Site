export type ThemeId =
  | "ivory-estate"
  | "midnight-gala"
  | "savannah-copper"
  | "pearl-atelier"
  | "velvet-patron";

export type ThemeHeroTone = "light" | "dark";

export type PremiumTheme = {
  id: ThemeId;
  number: number;
  name: string;
  tagline: string;
  description: string;
  heroTone: ThemeHeroTone;
  swatches: string[];
};

export const PREMIUM_THEMES: PremiumTheme[] = [
  {
    id: "ivory-estate",
    number: 1,
    name: "Ivory Estate",
    tagline: "Quiet luxury",
    description: "Ivory paper, deep forest, and antique gold — an editorial foundation look with generous space and refined serif headlines.",
    heroTone: "light",
    swatches: ["#F6F1E6", "#1E4A38", "#C4A35A"],
  },
  {
    id: "midnight-gala",
    number: 2,
    name: "Midnight Gala",
    tagline: "Black-tie philanthropy",
    description: "Ink navy and candlelight gold. A cinematic, high-contrast look for a formal fundraising presence.",
    heroTone: "dark",
    swatches: ["#0B1220", "#D4AF37", "#F4ECD7"],
  },
  {
    id: "savannah-copper",
    number: 3,
    name: "Savannah Copper",
    tagline: "Warm prestige",
    description: "Sand, olive, and copper. A sunlit, high-end African hospitality palette with soft curves and warm type.",
    heroTone: "light",
    swatches: ["#F4EDE3", "#3D4F33", "#B87333"],
  },
  {
    id: "pearl-atelier",
    number: 4,
    name: "Pearl Atelier",
    tagline: "Gallery white",
    description: "Pearl surfaces, emerald ink, and platinum lines. A museum-quiet layout with sharp edges and tall typography.",
    heroTone: "light",
    swatches: ["#FBFCFA", "#0F6B4D", "#8A9A8E"],
  },
  {
    id: "velvet-patron",
    number: 5,
    name: "Velvet Patron",
    tagline: "Heritage burgundy",
    description: "Burgundy, ceremonial gold, and warm ivory. A patron’s-circle look with framed sections and classic book type.",
    heroTone: "light",
    swatches: ["#F8F1E7", "#6B1D2A", "#C9A227"],
  },
];

export const DEFAULT_THEME_ID: ThemeId = "ivory-estate";
export const THEME_STORAGE_KEY = "hacs-premium-theme-preview";

export function isThemeId(value: string | null): value is ThemeId {
  return PREMIUM_THEMES.some((theme) => theme.id === value);
}

export function getTheme(id: ThemeId) {
  return PREMIUM_THEMES.find((theme) => theme.id === id) ?? PREMIUM_THEMES[0];
}
