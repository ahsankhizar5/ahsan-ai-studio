"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import type { CSSProperties } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

const AboutPortraitMotion = dynamic(
  () => import("./AboutPortraitMotion").then((module) => module.AboutPortraitMotion),
  { ssr: false },
);

type AboutPortraitProps = {
  name: string;
  location: string;
};

function PortraitImage({ alt = "" }: { alt?: string }) {
  return (
    <picture className="about-responsive-image">
      <Image
        src="/media/about-ai-model-bloom-cutout.webp"
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 767px) calc(100vw - 2.5rem), 42vw"
        loading="lazy"
      />
    </picture>
  );
}

const portraitParticles = [
  [9, 13, "red"], [21, 8, "yellow"], [31, 18, "cyan"], [15, 31, "cyan"],
  [39, 35, "red"], [7, 48, "yellow"], [29, 54, "red"], [18, 67, "cyan"],
  [41, 73, "yellow"], [10, 84, "red"], [35, 91, "cyan"],
] as const;

export function AboutPortrait({ name, location }: AboutPortraitProps) {
  const portraitRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotionPreferences();

  return (
    <figure ref={portraitRef} className="about-portrait-art" data-about-portrait>
      <div className="about-portrait-stage" data-portrait-stage>
        <span className="about-portrait-backdrop" aria-hidden="true" />
        <div className="about-portrait-base">
          <PortraitImage alt="Ahsan Khizar, shown as a human and applied-AI systems builder" />
        </div>

        <div className="about-portrait-half about-portrait-human" data-human-assembly>
          <div data-human-pointer>
            <PortraitImage />
          </div>
        </div>

        <div className="about-portrait-half about-portrait-ai" data-ai-assembly>
          <div data-ai-pointer>
            <PortraitImage />
          </div>
        </div>

        <div className="about-portrait-fragment about-fragment-cyan" data-fragment-assembly>
          <div data-cyan-pointer>
            <PortraitImage />
          </div>
        </div>
        <div className="about-portrait-fragment about-fragment-red" data-fragment-assembly>
          <div data-red-pointer>
            <PortraitImage />
          </div>
        </div>
        <div className="about-portrait-fragment about-fragment-yellow" data-fragment-assembly>
          <div data-yellow-pointer>
            <PortraitImage />
          </div>
        </div>

        <span className="about-portrait-light" aria-hidden="true" />
        <span className="about-portrait-sweep" data-portrait-sweep aria-hidden="true" />
        <span className="about-portrait-seam" aria-hidden="true" />
        <div className="about-portrait-particles" aria-hidden="true">
          {portraitParticles.map(([x, y, color], index) => (
            <span
              data-portrait-particle
              data-color={color}
              key={`${x}-${y}`}
              style={{ "--particle-x": `${x}%`, "--particle-y": `${y}%`, "--particle-index": index } as CSSProperties}
            />
          ))}
        </div>
      </div>

      <figcaption>
        <strong>{name}</strong>
        <span>{location}</span>
        <span>Applied AI systems</span>
      </figcaption>
      {!reducedMotion ? <AboutPortraitMotion portraitRef={portraitRef} /> : null}
    </figure>
  );
}
