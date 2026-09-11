export type ThemeId =
  | "azure-field"
  | "signal-red"
  | "horizon-amber"
  | "parchment-gate"
  | "civic-press";

export type PremiumTheme = {
  id: ThemeId;
  number: number;
  name: string;
  tagline: string;
  inspiredBy: string;
  description: string;
  swatches: string[];
};

export const PREMIUM_THEMES: PremiumTheme[] = [
  {
    id: "azure-field",
    number: 1,
    name: "Azure Field",
    tagline: "Humanitarian blue",
    inspiredBy: "UNICEF",
    description: "Sky cyan, white, and ink. A clean global-child-rights look with bold type and a bright, trustworthy CTA.",
    swatches: ["#F4FBFE", "#00AEEF", "#0B1F2A"],
  },
  {
    id: "signal-red",
    number: 2,
    name: "Signal Red",
    tagline: "Urgent compassion",
    inspiredBy: "Save the Children",
    description: "Signature red on white. High-contrast photography and a strong donate signal, like a leading children’s rights charity.",
    swatches: ["#FFFFFF", "#DA291C", "#111111"],
  },
  {
    id: "horizon-amber",
    number: 3,
    name: "Horizon Amber",
    tagline: "Action and hope",
    inspiredBy: "World Vision",
    description: "Warm orange calls-to-action on deep sky blue and cream. An impact-first, field-work energy.",
    swatches: ["#FFF8F3", "#E85D04", "#0C4972"],
  },
  {
    id: "parchment-gate",
    number: 4,
    name: "Parchment Gate",
    tagline: "Quiet institution",
    inspiredBy: "Gates Foundation",
    description: "Parchment, weathered slate, and black. Spacious, data-calm philanthropy with restrained type.",
    swatches: ["#F5F3ED", "#313A44", "#000000"],
  },
  {
    id: "civic-press",
    number: 5,
    name: "Civic Press",
    tagline: "Editorial dignity",
    inspiredBy: "Ford Foundation",
    description: "Newspaper serifs, terracotta, and sage. A civic, journal-like layout with warm nature colour.",
    swatches: ["#F7F1E8", "#C45C26", "#1A1A1A"],
  },
];

export const DEFAULT_THEME_ID: ThemeId = "azure-field";
export const THEME_STORAGE_KEY = "hacs-round2-theme-preview";

export function isThemeId(value: string | null): value is ThemeId {
  return PREMIUM_THEMES.some((theme) => theme.id === value);
}

export function getTheme(id: ThemeId) {
  return PREMIUM_THEMES.find((theme) => theme.id === id) ?? PREMIUM_THEMES[0];
}
