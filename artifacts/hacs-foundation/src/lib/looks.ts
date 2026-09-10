export type LookId = 1 | 2 | 3 | 4 | 5;
export type HeroTone = "dark" | "light";

export type Look = {
  id: LookId;
  name: string;
  tagline: string;
  tone: HeroTone;
  background: string;
};

export const LOOKS: Look[] = [
  {
    id: 1,
    name: "Sunrise Hope",
    tagline: "Golden African sunrise with a framed photo swipe",
    tone: "dark",
    background: "/looks/sunrise-hope.jpg",
  },
  {
    id: 2,
    name: "Living Garden",
    tagline: "Soft green leaves and a peek-ahead photo strip",
    tone: "light",
    background: "/looks/living-garden.jpg",
  },
  {
    id: 3,
    name: "Warm Earth",
    tagline: "Village gold light and polaroid-style photos",
    tone: "light",
    background: "/looks/warm-earth.jpg",
  },
  {
    id: 4,
    name: "Open Sky",
    tagline: "Airy blue sky with a wide filmstrip of smiles",
    tone: "light",
    background: "/looks/open-sky.jpg",
  },
  {
    id: 5,
    name: "Navy & Gold",
    tagline: "Elegant logo-forward look with a cinematic swipe",
    tone: "dark",
    background: "/looks/navy-gold.jpg",
  },
];

export const LOOK_STORAGE_KEY = "hacs-homepage-look";

export function isLookId(value: unknown): value is LookId {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

export function getLook(id: LookId): Look {
  return LOOKS[id - 1];
}
