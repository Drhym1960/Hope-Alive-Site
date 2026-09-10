import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getLook, isLookId, LOOK_STORAGE_KEY, type Look, type LookId } from "@/lib/looks";

type LookContextValue = {
  lookId: LookId;
  look: Look;
  setLookId: (id: LookId) => void;
};

const LookContext = createContext<LookContextValue | null>(null);

export function LookProvider({ children }: { children: React.ReactNode }) {
  const [lookId, setLookIdState] = useState<LookId>(1);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(LOOK_STORAGE_KEY));
      if (isLookId(saved)) setLookIdState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-look", String(lookId));
    try {
      localStorage.setItem(LOOK_STORAGE_KEY, String(lookId));
    } catch {
      /* ignore */
    }
  }, [lookId]);

  const setLookId = useCallback((id: LookId) => setLookIdState(id), []);

  const value = useMemo(
    () => ({ lookId, look: getLook(lookId), setLookId }),
    [lookId, setLookId],
  );

  return <LookContext.Provider value={value}>{children}</LookContext.Provider>;
}

export function useLook() {
  const ctx = useContext(LookContext);
  if (!ctx) throw new Error("useLook must be used within LookProvider");
  return ctx;
}
