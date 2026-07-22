"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

const HeroMediaMotion = dynamic(
  () => import("./HeroMediaMotion").then((module) => module.HeroMediaMotion),
  { ssr: false },
);

function HeroComposite({ priority = false }: { priority?: boolean }) {
  return (
    <div className="hero-composite">
      <div className="hero-composite-background" data-scroll-background>
        <div data-pointer-background>
          <picture className="hero-responsive-image">
            <source media="(max-width: 1280px)" srcSet="/media/hero-background-plate-1280.webp" />
            <Image
              src="/media/hero-background-plate.webp"
              alt=""
              fill
              unoptimized
              priority={priority}
              fetchPriority={priority ? "high" : undefined}
              sizes="100vw"
            />
          </picture>
        </div>
      </div>
      <div className="hero-composite-character" data-scroll-character>
        <div data-pointer-character>
          <div data-character-idle>
            <picture className="hero-responsive-image">
              <source media="(max-width: 1280px)" srcSet="/media/hero-character-1280.webp" />
              <Image
                src="/media/hero-character.webp"
                alt=""
                fill
                unoptimized
                priority={priority}
                fetchPriority={priority ? "high" : undefined}
                sizes="100vw"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroMedia() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPreferences();

  return (
    <div ref={mediaRef} className="hero-media" data-hero-media aria-hidden="true">
      <div className="hero-visual-scene" data-hero-scene>
        <div className="hero-scroll-layer">
          <HeroComposite priority />
        </div>

        <div className="hero-spotlight-reveal" data-hero-spotlight>
          <Image
            src="/media/hero-spotlight-reveal.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
          />
        </div>
        <span className="hero-spotlight-aura" data-hero-spotlight-aura />

        <div className="hero-energy-scroll" data-scroll-energy>
          <div className="hero-energy-ambient" data-energy-ambient>
            <div className="hero-energy-pointer" data-pointer-energy>
              <picture className="hero-responsive-image">
                <source media="(max-width: 1280px)" srcSet="/media/hero-background-plate-1280.webp" />
                <Image
                  className="hero-energy-image"
                  data-energy-image
                  src="/media/hero-background-plate.webp"
                  alt=""
                  fill
                  unoptimized
                  sizes="100vw"
                />
              </picture>
            </div>
          </div>
        </div>

        <div className="hero-red-glow" data-red-glow>
          <span data-pointer-glow />
        </div>
        <span className="hero-cyan-rim" data-cyan-rim />
        <span className="hero-helmet-sweep" data-helmet-sweep />
        <span className="hero-scroll-sweep" data-scroll-sweep />
        <span className="hero-yellow-particle hero-yellow-particle-one" data-yellow-particle />
        <span className="hero-yellow-particle hero-yellow-particle-two" data-yellow-particle />
        <span className="hero-yellow-particle hero-yellow-particle-three" data-yellow-particle />
      </div>
      <span className="hero-media-vignette" />
      {!reducedMotion ? <HeroMediaMotion mediaRef={mediaRef} /> : null}
    </div>
  );
}
