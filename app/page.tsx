import { CopyEmail } from "./components/CopyEmail";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import {
  engineeringProjects,
  experience,
  process,
  profile,
  recognition,
  technicalCapabilities,
  videoServices,
} from "./data/profile";

const capabilityGroups = [
  { name: "Languages", items: technicalCapabilities.languages },
  { name: "AI and machine learning", items: technicalCapabilities.aiMl },
  { name: "Backend and product", items: technicalCapabilities.backendProduct },
  { name: "Delivery tools", items: technicalCapabilities.tools },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: profile.name,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressCountry: profile.location },
      sameAs: [profile.links.linkedin, profile.links.github],
    },
    {
      "@type": "ProfessionalService",
      name: `${profile.name} professional services`,
      email: `mailto:${profile.email}`,
      areaServed: profile.location,
      sameAs: [profile.links.linkedin, profile.links.github],
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader activePage="home" />

      <main id="main-content" data-motion-page="home">
        <section className="hero-v2" aria-labelledby="hero-title">
          <div className="hero-v2-copy">
            <p className="eyebrow" data-hero-reveal>
              AI engineer / AI video producer
            </p>
            <h1 id="hero-title" data-hero-reveal>
              Ahsan <span>Khizar</span>
            </h1>
            <p className="hero-thesis" data-hero-reveal>
              I build AI that works. <span>And video that gets watched.</span>
            </p>
            <div className="hero-actions" data-hero-reveal>
              <a className="button button-primary" href="#contact">
                Start a project <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="#work">
                Explore engineering work <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero-practices" aria-label="Professional practices" data-hero-reveal>
            <div className="practice-field practice-engineering">
              <span className="field-label">Primary practice</span>
              <strong>AI engineering</strong>
              <span>Products / Agents / Automation</span>
            </div>
            <div className="practice-field practice-video">
              <span className="field-label">Supporting practice</span>
              <strong>AI video</strong>
              <span>Explainers / Ads / Product stories</span>
            </div>
            <div className="hero-proof glass-proof" aria-label="Professional context">
              <span>Software engineering</span>
              <span>Applied AI</span>
              <span>Product systems</span>
              <span>{profile.location} / Remote</span>
            </div>
          </div>
        </section>

        <section className="capabilities section-shell" aria-labelledby="capabilities-title">
          <div className="section-lead">
            <p className="eyebrow">Engineering capability index</p>
            <h2 id="capabilities-title">From model behavior to product behavior.</h2>
            <p>
              Applied AI is only useful when the surrounding system is clear, testable, and ready for
              real workflows.
            </p>
          </div>
          <ol className="indexed-list capability-index">
            {capabilityGroups.map((group, index) => (
              <li key={group.name}>
                <span className="row-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{group.name}</h3>
                <p>{group.items.join(" · ")}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="work" className="work" data-project-stage aria-labelledby="work-title">
          <div className="work-intro section-shell">
            <p className="eyebrow">Selected engineering work</p>
            <h2 id="work-title">Engineering that survives contact with reality.</h2>
            <p>Four systems. Each grounded in a real technical problem and a concrete contribution.</p>
          </div>
          <div className="project-stage" aria-label="Selected engineering projects">
            {engineeringProjects.map((project, index) => (
              <article
                className={`project-panel project-panel-${(index % 3) + 1}`}
                data-project-panel
                key={project.name}
              >
                <span className="project-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="project-content">
                  <p className="project-category">{project.category}</p>
                  <h3>{project.name}</h3>
                  <div className="project-detail">
                    <div>
                      <span className="detail-label">System</span>
                      <p>{project.description}</p>
                    </div>
                    <div>
                      <span className="detail-label">Contribution</span>
                      <p>{project.contribution}</p>
                    </div>
                  </div>
                  <div className="project-footer">
                    <p aria-label="Technology stack">{project.stack.join(" · ")}</p>
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noreferrer">
                        View {project.name} source on GitHub <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="services section-shell" aria-labelledby="services-title">
          <div className="section-lead services-lead">
            <p className="eyebrow">Supporting practice / AI video production</p>
            <h2 id="services-title">Turn the idea into something people will watch.</h2>
            <p>
              Message clarity, platform fit, pacing, and repeatable production—not just a generated clip.
            </p>
          </div>
          <div className="service-rows" data-reveal-group>
            {videoServices.map((service, index) => (
              <article key={service.name}>
                <span className="row-index" aria-hidden="true">
                  V{String(index + 1).padStart(2, "0")}
                </span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="experience section-shell" aria-labelledby="experience-title">
          <div className="section-lead experience-lead">
            <p className="eyebrow">Experience and recognition</p>
            <h2 id="experience-title">Proof from the work.</h2>
            <a className="text-link" href="/about">
              Read the full story <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="proof-list">
            {experience.map((item, index) => (
              <article key={`${item.organization}-${item.role}`}>
                <span className="row-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.role}</h3>
                  <p className="proof-meta">
                    {item.organization} / {item.period}
                  </p>
                </div>
                <p>{item.summary}</p>
              </article>
            ))}
            {recognition.map((item, index) => (
              <article className="recognition-row" key={item}>
                <span className="row-index" aria-hidden="true">
                  {String(experience.length + index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item}</h3>
                  <p className="proof-meta">Recognition</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="process-v2 section-shell" aria-labelledby="process-title">
          <div className="section-lead process-lead">
            <p className="eyebrow">Shared working process</p>
            <h2 id="process-title">One method. Different outputs.</h2>
          </div>
          <ol className="process-steps">
            {process.map((step, index) => (
              <li key={step.name}>
                <span className="process-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.name}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="about-preview"
          className="about-preview section-shell"
          data-portrait-reveal
          aria-labelledby="about-preview-title"
        >
          <figure className="portrait-frame">
            {/* The task requires the approved, pre-optimized portrait with explicit dimensions. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ahsan-khizar.png"
              width={960}
              height={1131}
              sizes="(min-width: 1024px) 46vw, 100vw"
              loading="lazy"
              decoding="async"
              alt="Portrait of Ahsan Khizar"
            />
            <figcaption className="portrait-caption">
              <strong>{profile.name}</strong>
              <span>{profile.location}</span>
              <span>Applied AI systems</span>
            </figcaption>
          </figure>
          <div className="about-preview-copy">
            <p className="eyebrow">About Ahsan</p>
            <h2 id="about-preview-title">
              Technical enough to build it. Creative enough to make it land.
            </h2>
            <p>
              A final-year Software Engineering student who builds deployable AI systems and
              complements that work with AI video production.
            </p>
            <a className="button button-light" href="/about">
              About Ahsan <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section id="contact" className="contact-v2 section-shell" aria-labelledby="contact-title">
          <p className="eyebrow">Project inquiry</p>
          <h2 id="contact-title">Build the system. Create the cut.</h2>
          <p>Tell me what needs to work, who needs to see it, and what a strong result looks like.</p>
          <div className="contact-actions">
            <a
              className="contact-email"
              href={`mailto:${profile.email}?subject=Project%20inquiry`}
            >
              Start a project <span aria-hidden="true">↗</span>
            </a>
            <CopyEmail email={profile.email} />
          </div>
        </section>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
