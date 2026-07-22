import { HeroMedia } from "./HeroMedia";

type HomepageHeroProps = {
  email: string;
  location: string;
};

const capabilities = [
  ["Applied AI", "Models · evaluation · orchestration"],
  ["Product systems", "APIs · backend · automation"],
  ["Communication", "Demos · explainers · launch content"],
] as const;

export function HomepageHero({ email, location }: HomepageHeroProps) {
  const firstLine = "I transform complex AI ideas into".split(" ");
  const secondLine = "powerful products people understand and trust.".split(" ");

  return (
    <section className="cinematic-hero" aria-labelledby="hero-title">
      <div className="cinematic-hero-sticky" data-hero-sticky>
        <HeroMedia />

        <div className="cinematic-hero-copy" data-home-hero-copy>
          <h1
            id="hero-title"
            aria-label="I transform complex AI ideas into powerful products people understand and trust."
            data-split-heading
          >
            <span className="hero-title-line-wrap">
              <span className="hero-title-line" aria-hidden="true">
                {firstLine.map((word) => (
                  <span className="hero-title-word" data-hero-word key={word}>
                    {word}
                  </span>
                ))}
              </span>
            </span>{" "}
            <span className="hero-title-line-wrap">
              <span className="hero-title-line hero-title-line-accent" aria-hidden="true">
                {secondLine.map((word) => (
                  <span className="hero-title-word" data-hero-word key={word}>
                    {word}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <p className="cinematic-hero-support">
            From the system behind the product to the demos and launch content that explain it, I lead
            the work as one connected build.
          </p>

          <div className="cinematic-hero-actions">
            <a
              className="hero-button hero-button-primary"
              href={`mailto:${email}?subject=AI%20product%20project`}
            >
              Discuss your project <span aria-hidden="true">↗</span>
            </a>
            <a className="hero-button hero-button-secondary" href="#work">
              View selected work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <span className="hero-scroll-progress" aria-hidden="true">
          <span data-hero-scroll-progress />
        </span>

        <div className="hero-capability-rail" aria-label="Practice summary">
          {capabilities.map(([name, detail]) => (
            <div key={name}>
              <strong>{name}</strong>
              <span>{detail}</span>
            </div>
          ))}
          <div>
            <strong>{location}</strong>
            <span>Available for remote projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}
