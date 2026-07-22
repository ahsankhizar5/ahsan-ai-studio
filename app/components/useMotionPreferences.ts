"use client";

import { useEffect, useState } from "react";

type MotionPreferences = {
  finePointer: boolean;
  reducedMotion: boolean;
};

const initialPreferences: MotionPreferences = {
  finePointer: false,
  reducedMotion: true,
};

export function useMotionPreferences() {
  const [preferences, setPreferences] = useState(initialPreferences);

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updatePreferences = () => {
      setPreferences({
        finePointer: pointerQuery.matches,
        reducedMotion: reducedQuery.matches,
      });
    };

    updatePreferences();
    reducedQuery.addEventListener("change", updatePreferences);
    pointerQuery.addEventListener("change", updatePreferences);

    return () => {
      reducedQuery.removeEventListener("change", updatePreferences);
      pointerQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  return preferences;
}
