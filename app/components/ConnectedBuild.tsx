import Image from "next/image";
import { VideoServiceShowcase } from "./VideoServiceShowcase";

type ConnectedBuildProps = {
  videoServices: readonly { name: string; description: string }[];
};

const phases = [
  {
    label: "System",
    title: "Engineer the intelligence.",
    copy: "Models, agents, APIs, data flows, evaluation, and dependable automation.",
    footer: "AI engineering",
    image: "/media/hero-background-plate.webp",
    imagePosition: "center",
  },
  {
    label: "Product",
    title: "Make it usable.",
    copy: "Interfaces and backend behavior shaped around real users and real workflows.",
    footer: "Product delivery",
    image: "/og.png",
    imagePosition: "center",
  },
  {
    label: "Story",
    title: "Make the value clear.",
    copy: "Demos, explainers, launch content, and AI video that communicate what the product changes.",
    footer: "Communication layer",
    image: "/hero-system-story-1728.webp",
    imagePosition: "center",
  },
] as const;

export function ConnectedBuild({ videoServices }: ConnectedBuildProps) {
  return (
    <>
      <section
        id="practice"
        className="connected-build"
        aria-labelledby="practice-title"
      >
        <h2 id="practice-title" data-motion-reveal>
          The build does not stop at the model. {" "}
          <span>It continues until the value is understood.</span>
        </h2>
        <ol className="connected-build-phases" data-pipeline data-reveal-group>
          {phases.map((phase, index) => (
            <li data-practice-card key={phase.label}>
              <article className="practice-card-surface" tabIndex={0} aria-label={`${phase.label}: ${phase.title}`}>
                <div className="practice-card-image" aria-hidden="true">
                  <Image
                    src={phase.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 799px) calc(100vw - 2.5rem), 33vw"
                    style={{ objectPosition: phase.imagePosition }}
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="practice-card-copy">
                  <span>{phase.label}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.copy}</p>
                  <small>{phase.footer}</small>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="video-layer" aria-labelledby="video-layer-title">
        <div data-motion-reveal>
          <h2 id="video-layer-title">When the product needs a story, I make that too.</h2>
          <p>
            AI video is the communication layer of the same build—made to help customers,
            teams, and audiences understand the product faster.
          </p>
        </div>
        <VideoServiceShowcase services={videoServices} />
      </section>
    </>
  );
}
