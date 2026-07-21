type ConnectedBuildProps = {
  videoServices: readonly { name: string; description: string }[];
};

const phases = [
  {
    label: "System",
    title: "Engineer the intelligence.",
    copy: "Models, agents, APIs, data flows, evaluation, and dependable automation.",
    footer: "AI engineering",
  },
  {
    label: "Product",
    title: "Make it usable.",
    copy: "Interfaces and backend behavior shaped around real users and real workflows.",
    footer: "Product delivery",
  },
  {
    label: "Story",
    title: "Make the value clear.",
    copy: "Demos, explainers, launch content, and AI video that communicate what the product changes.",
    footer: "Communication layer",
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
          {phases.map((phase) => (
            <li key={phase.label}>
              <span>{phase.label}</span>
              <h3>{phase.title}</h3>
              <p>{phase.copy}</p>
              <small>{phase.footer}</small>
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
        <ol data-reveal-group>
          {videoServices.map((service, index) => (
            <li key={service.name}>
              <strong>{service.name}</strong>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
