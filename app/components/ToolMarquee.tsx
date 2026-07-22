import { marqueeTechnologies, TechnologyLogo, technologyIcon } from "./TechnologyLogo";

const rows = [
  marqueeTechnologies.slice(0, 8),
  [...marqueeTechnologies.slice(7), ...marqueeTechnologies.slice(0, 1)],
] as const;

export function ToolMarquee() {
  return (
    <section className="tool-marquee" aria-labelledby="tools-title" data-tool-marquee>
      <header data-motion-reveal>
        <p>Working stack</p>
        <h2 id="tools-title">The tools change. The standard does not.</h2>
      </header>

      <ul className="visually-hidden">
        {marqueeTechnologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      <div className="tool-marquee-rows" aria-hidden="true">
        {rows.map((row, rowIndex) => (
          <div className="tool-marquee-window" key={rowIndex}>
            <div className="tool-marquee-track" data-tool-track data-direction={rowIndex === 0 ? "forward" : "reverse"}>
              {[...row, ...row].map((technology, index) => {
                const icon = technologyIcon(technology);
                return icon ? (
                  <TechnologyLogo icon={icon} label={technology} key={`${technology}-${index}`} />
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
