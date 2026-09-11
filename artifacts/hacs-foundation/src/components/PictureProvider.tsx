import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_PICTURE_ID,
  PICTURE_STORAGE_KEY,
  getPicture,
  isPictureId,
  type PictureId,
  type PictureLayout,
} from "@/lib/pictureLayouts";

type PictureContextValue = {
  pictureId: PictureId;
  picture: PictureLayout;
  setPictureId: (id: PictureId) => void;
};

const PictureContext = createContext<PictureContextValue | null>(null);

export function PictureProvider({ children }: { children: ReactNode }) {
  const [pictureId, setPictureIdState] = useState<PictureId>(() => {
    if (typeof window === "undefined") return DEFAULT_PICTURE_ID;
    const stored = window.localStorage.getItem(PICTURE_STORAGE_KEY);
    return isPictureId(stored) ? stored : DEFAULT_PICTURE_ID;
  });

  useEffect(() => {
    document.documentElement.dataset.picture = pictureId;
    window.localStorage.setItem(PICTURE_STORAGE_KEY, pictureId);
  }, [pictureId]);

  const value = useMemo<PictureContextValue>(
    () => ({
      pictureId,
      picture: getPicture(pictureId),
      setPictureId: setPictureIdState,
    }),
    [pictureId],
  );

  return <PictureContext.Provider value={value}>{children}</PictureContext.Provider>;
}

export function usePicture() {
  const ctx = useContext(PictureContext);
  if (!ctx) throw new Error("usePicture must be used within PictureProvider");
  return ctx;
}

export function usePictureOptional() {
  return useContext(PictureContext);
}
