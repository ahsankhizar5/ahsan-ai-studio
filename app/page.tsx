import { CopyEmail } from "./components/CopyEmail";
import { MotionController } from "./components/MotionController";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import {
  certifications,
  engineeringProjects,
  experience,
  process,
  profile,
  recognition,
  technicalCapabilities,
  videoServices,
} from "./data/profile";

const proofSignals = [
  "B.E. Software Engineering · UET Taxila",
  "Applied AI, backend, data, and product engineering",
  certifications[0],
  recognition[0],
] as const;

const featuredProjectNames = [
  "DocuSync",
  "PIGEON Reproduction",
  "Audio Deepfake Detection System",
  "Customer Behavior Profiling",
] as const;

const featuredProjects = featuredProjectNames
  .map((name) => engineeringProjects.find((project) => project.name === name))
  .filter((project): project is (typeof engineeringProjects)[number] => Boolean(project));

const buildLayers = [
  {
    label: "Product core",
    title: "Engineer the intelligence",
    description: "Models, data flows, APIs, agents, evaluation, and the automation around them.",
    detail: technicalCapabilities.aiMl.slice(0, 6).join(" · "),
  },
  {
    label: "Product experience",
    title: "Make it usable",
    description: "Interfaces and backend systems shaped around the people and workflows that depend on them.",
    detail: technicalCapabilities.backendProduct.slice(0, 6).join(" · "),
  },
  {
    label: "Communication layer",
    title: "Make the value clear",
    description: "Product demos and AI-assisted video that help an audience understand what the product changes.",
    detail: videoServices.slice(0, 4).map((service) => service.name).join(" · "),
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: profile.name,
      email: `mailto:${profile.email}`,
      jobTitle: "AI Product Engineer",
      address: { "@type": "PostalAddress", addressCountry: profile.location },
      sameAs: [profile.links.linkedin, profile.links.github],
    },
    {
      "@type": "ProfessionalService",
      name: `${profile.name} · AI product engineering`,
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

      <main id="main-content" className="proof-home" data-motion-page="home">
        <section className="proof-hero" aria-labelledby="hero-title">
          <div className="proof-hero-copy">
            <p className="hero-identity" data-hero-reveal>
              <strong>Ahsan Khizar</strong>
              <span>Independent AI product engineer</span>
            </p>
            <h1 id="hero-title" data-hero-reveal>
              I transform complex AI ideas into <span>powerful products people understand and trust.</span>
            </h1>
            <p className="proof-hero-support" data-hero-reveal>
              From the system behind the product to the demos and launch content that explain it, I lead the
              work as one connected build.
            </p>
            <div className="proof-hero-actions" data-hero-reveal>
              <a
                className="proof-button proof-button-primary"
                href={`mailto:${profile.email}?subject=AI%20product%20project`}
              >
                Discuss your AI product <span aria-hidden="true">↗</span>
              </a>
              <a className="proof-button proof-button-secondary" href="#work">
                See the work <span aria-hidden="true">↓</span>
              </a>
            </div>
            <dl className="hero-proof-index" data-hero-reveal>
              <div>
                <dt>Build</dt>
                <dd>Products · agents · automation</dd>
              </div>
              <div>
                <dt>Explain</dt>
                <dd>Demos · explainers · launch creative</dd>
              </div>
              <div>
                <dt>Standard</dt>
                <dd>One operator · one connected outcome</dd>
              </div>
            </dl>
          </div>

          <aside className="operator-dossier" aria-label="Ahsan Khizar operator profile">
            <div className="dossier-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ahsan-khizar.webp"
                width={960}
                height={1131}
                sizes="(max-width: 767px) 100vw, 38vw"
                fetchPriority="high"
                decoding="async"
                alt="Portrait of Ahsan Khizar"
              />
              <p className="dossier-stamp">Operator dossier · AK / 01</p>
            </div>
            <div className="dossier-data">
              <div className="dossier-heading">
                <span>One accountable operator</span>
                <span className="dossier-status">Available for selected projects</span>
              </div>
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>AI product engineer</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Products, agents, automation</dd>
                </div>
                <div>
                  <dt>Added edge</dt>
                  <dd>AI video for product communication</dd>
                </div>
                <div>
                  <dt>Base</dt>
                  <dd>{profile.location} · Remote</dd>
                </div>
              </dl>
            </div>
          </aside>
        </section>

        <section id="work" className="case-stage" aria-labelledby="work-title">
          <header className="case-stage-heading" data-motion-reveal>
            <p>Selected engineering evidence</p>
            <h2 id="work-title">Work that makes the claim believable.</h2>
            <span>Real systems, concrete contributions, no invented outcomes.</span>
          </header>

          <div className="case-ledger">
            {featuredProjects.map((project, index) => (
              <article className="case-entry" data-project-panel key={project.name}>
                <div className="case-entry-index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{project.category}</small>
                </div>
                <div className="case-entry-title">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="case-system-flow" aria-label={`${project.name} implementation stack`}>
                  {project.stack.slice(0, 4).map((item, stackIndex) => (
                    <span key={item}>
                      {item}
                      {stackIndex < Math.min(project.stack.length, 4) - 1 ? <b aria-hidden="true">→</b> : null}
                    </span>
                  ))}
                </div>
                <div className="case-entry-contribution">
                  <strong>My contribution</strong>
                  <p>{project.contribution}</p>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer">
                      View project source <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span>Project summary available on request</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="credential-strip" aria-label="Selected credentials">
          <strong>Signals behind the work</strong>
          <ul>
            {proofSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </section>

        <section id="services" className="connected-practice" aria-labelledby="services-title">
          <div className="connected-practice-heading" data-motion-reveal>
            <h2 id="services-title">One build, from intelligence to clarity.</h2>
            <p>
              You do not need to coordinate an engineer, a product translator, and a video producer. I
              connect those decisions so the product and the story strengthen each other.
            </p>
          </div>

          <ol className="build-layer-list" data-reveal-group>
            {buildLayers.map((layer, index) => (
              <li key={layer.label} className={index === 2 ? "communication-layer" : undefined}>
                <span>{layer.label}</span>
                <h3>{layer.title}</h3>
                <p>{layer.description}</p>
                <small>{layer.detail}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className="screen-story" aria-labelledby="video-title">
          <div className="screen-story-copy" data-motion-reveal>
            <p>Supporting production capability</p>
            <h2 id="video-title">When the product needs a clear story, the same build continues on screen.</h2>
            <span>
              Avatar-led demonstrations, UGC creative, ads, explainers, localization, and variations—made
              to clarify the value of the product, not compete with it.
            </span>
          </div>
          <div className="screen-story-formats" data-reveal-group>
            {videoServices.map((service) => (
              <article key={service.name}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="trust-record" aria-labelledby="experience-title">
          <header data-motion-reveal>
            <h2 id="experience-title">Experience across software, data, and delivery.</h2>
            <a href="/about">Read the full background <span aria-hidden="true">→</span></a>
          </header>
          <div className="trust-timeline" data-reveal-group>
            {experience.map((item) => (
              <article key={`${item.organization}-${item.role}`}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.role}</h3>
                  <strong>{item.organization} · {item.location}</strong>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
            {recognition.map((item) => (
              <article className="recognition-row" key={item}>
                <span>Recognition</span>
                <div><h3>{item}</h3></div>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="build-process" aria-labelledby="process-title">
          <header data-motion-reveal>
            <h2 id="process-title">A direct path from problem to proof.</h2>
            <p>One shared working method keeps the engineering and communication decisions aligned.</p>
          </header>
          <ol data-process-track>
            {process.map((step, index) => (
              <li key={step.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.name}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="operator-about" aria-labelledby="about-preview-title">
          <div className="operator-about-statement" data-motion-reveal>
            <h2 id="about-preview-title">The person behind the system.</h2>
            <p>
              I am a final-year Software Engineering student focused on turning AI capabilities into
              products that fit real workflows. My work spans the model, backend, automation, product
              surface, and the communication needed to make the result understood.
            </p>
            <a href="/about">Meet Ahsan <span aria-hidden="true">→</span></a>
          </div>
          <dl className="operator-about-facts">
            <div><dt>Education</dt><dd>Software Engineering · UET Taxila</dd></div>
            <div><dt>Working range</dt><dd>AI · backend · data · web · video</dd></div>
            <div><dt>Recognition</dt><dd>{recognition.length} national and global competition signals</dd></div>
            <div><dt>Collaboration</dt><dd>Remote · project-based</dd></div>
          </dl>
        </section>

        <section id="contact" className="proof-contact" aria-labelledby="contact-title">
          <div data-motion-reveal>
            <p>Start with the real problem</p>
            <h2 id="contact-title">What should your AI product make possible?</h2>
            <span>
              Send the workflow, audience, constraints, and desired outcome. I will reply with the right
              starting point.
            </span>
          </div>
          <div className="proof-contact-actions">
            <a href={`mailto:${profile.email}?subject=AI%20product%20project`}>
              Discuss your AI product <span aria-hidden="true">↗</span>
            </a>
            <CopyEmail email={profile.email} />
          </div>
        </section>

        <MotionController page="home" />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
