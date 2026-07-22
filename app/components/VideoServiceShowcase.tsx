"use client";

import Image from "next/image";
import { useState } from "react";

type VideoService = {
  name: string;
  description: string;
};

const serviceVisuals = [
  {
    src: "/media/generated/service-avatar-explainers.webp",
    alt: "An avatar presenter being filmed in a cinematic AI production studio",
    position: "center",
  },
  {
    src: "/media/generated/service-ugc-performance.webp",
    alt: "A performance-ad production setup with a phone camera and multiple visual treatments",
    position: "center",
  },
  {
    src: "/media/generated/service-product-demo.webp",
    alt: "A product moving from a physical input through an illuminated digital process to a finished output",
    position: "center",
  },
  {
    src: "/media/generated/service-localized-content.webp",
    alt: "A studio production branching one message into several localized video versions",
    position: "center",
  },
  {
    src: "/media/generated/service-creative-variations.webp",
    alt: "Five distinct cinematic creative variations arranged as illuminated film frames",
    position: "center",
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
