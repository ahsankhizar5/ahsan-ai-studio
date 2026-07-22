"use client";

import Image from "next/image";
import { useState } from "react";

type VideoService = {
  name: string;
  description: string;
};

const serviceVisuals = [
  {
    src: "/hero-system-story-1728.webp",
    alt: "A cinematic production environment connecting an AI system to a finished screen",
    position: "center",
  },
  {
    src: "/og.png",
    alt: "Ahsan Khizar visual system in red, citrus, cyan, black, and white",
    position: "center",
  },
  {
    src: "/hero.png",
    alt: "Helmeted AI creator surrounded by red, cyan, and golden energy trails",
    position: "78% center",
  },
  {
    src: "/media/hero-background-plate.webp",
    alt: "Layered red, cyan, and golden signal paths on a dark background",
    position: "center",
  },
  {
    src: "/media/hero-spotlight-reveal.webp",
    alt: "Brightened cinematic AI production portrait",
    position: "78% center",
  },
] as const;

export function VideoServiceShowcase({ services }: { services: readonly VideoService[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="video-service-showcase" data-video-service-showcase>
      <div className="video-service-preview" data-video-service-preview aria-live="polite">
        {services.map((service, index) => {
          const visual = serviceVisuals[index % serviceVisuals.length];
          const active = index === activeIndex;

          return (
            <figure
              className="video-service-slide"
              data-active={active}
              aria-hidden={!active}
              key={service.name}
            >
              <Image
                src={visual.src}
                alt={active ? visual.alt : ""}
                fill
                unoptimized
                sizes="(max-width: 899px) calc(100vw - 2.5rem), 54vw"
                style={{ objectPosition: visual.position }}
              />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{service.name}</strong>
                <p>{service.description}</p>
              </figcaption>
            </figure>
          );
        })}
        <span className="video-service-scan" aria-hidden="true" data-video-service-scan />
      </div>

      <ol className="video-service-list" data-reveal-group>
        {services.map((service, index) => (
          <li key={service.name}>
            <button
              type="button"
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onPointerEnter={() => setActiveIndex(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{service.name}</strong>
              <i aria-hidden="true">↗</i>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
