import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_LANDING_ID,
  LANDING_STORAGE_KEY,
  getLanding,
  isLandingId,
  type LandingId,
  type LandingLayout,
} from "@/lib/landings";

type LandingContextValue = {
  landingId: LandingId;
  landing: LandingLayout;
  setLandingId: (id: LandingId) => void;
};

const LandingContext = createContext<LandingContextValue | null>(null);

export function LandingProvider({ children }: { children: ReactNode }) {
  const [landingId, setLandingIdState] = useState<LandingId>(() => {
    if (typeof window === "undefined") return DEFAULT_LANDING_ID;
    const stored = window.localStorage.getItem(LANDING_STORAGE_KEY);
    const id = isLandingId(stored) ? stored : DEFAULT_LANDING_ID;
    document.documentElement.dataset.landing = id;
    return id;
  });

  useEffect(() => {
    document.documentElement.dataset.landing = landingId;
    window.localStorage.setItem(LANDING_STORAGE_KEY, landingId);
  }, [landingId]);

  const value = useMemo<LandingContextValue>(
    () => ({
      landingId,
      landing: getLanding(landingId),
      setLandingId: setLandingIdState,
    }),
    [landingId],
  );

  return <LandingContext.Provider value={value}>{children}</LandingContext.Provider>;
}

export function useLanding() {
  const ctx = useContext(LandingContext);
  if (!ctx) throw new Error("useLanding must be used within LandingProvider");
  return ctx;
}
