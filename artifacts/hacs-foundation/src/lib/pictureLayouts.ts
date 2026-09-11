export type PictureId = "path-hero" | "guide-cards";

export type PictureLayout = {
  id: PictureId;
  number: number;
  name: string;
  tagline: string;
  description: string;
};

export const PICTURE_LAYOUTS: PictureLayout[] = [
  {
    id: "path-hero",
    number: 1,
    name: "Path Hero",
    tagline: "Photo stage, then a people grid",
    description: "A large child photograph fills the hero, with the vows on the picture. Below, children sit in gold-outlined cards — the same way MysticTxt shows people after the big photo.",
  },
  {
    id: "guide-cards",
    number: 2,
    name: "Guide Cards",
    tagline: "Rounded portrait beside the vows",
    description: "A large rounded photo with a white border sits beside the words. Then the same gold-outlined card grid of children on cream.",
  },
];

export const DEFAULT_PICTURE_ID: PictureId = "path-hero";
export const PICTURE_STORAGE_KEY = "hacs-picture-display-preview";

export function isPictureId(value: string | null): value is PictureId {
  return PICTURE_LAYOUTS.some((layout) => layout.id === value);
}

export function getPicture(id: PictureId) {
  return PICTURE_LAYOUTS.find((layout) => layout.id === id) ?? PICTURE_LAYOUTS[0];
}
