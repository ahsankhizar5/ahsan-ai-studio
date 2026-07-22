"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

const SiteMotion = dynamic(
  () => import("./SiteMotion").then((module) => module.SiteMotion),
  { ssr: false },
);

export function MotionController({ page }: { page: "home" | "about" | "contact" }) {
  const { reducedMotion } = useMotionPreferences();

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduced" : "full";
  }, [reducedMotion]);

  return reducedMotion ? null : <SiteMotion page={page} />;
}
