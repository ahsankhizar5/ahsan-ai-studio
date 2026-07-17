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
  "Software, data, and web engineering experience",
  certifications[0],
  recognition[0],
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

      <main id="main-content" className="conversion-home" data-motion-page="home">
        <section className="conversion-hero" aria-labelledby="hero-title">
          <div className="conversion-hero-copy">
            <p className="signal-label" data-hero-reveal>
              Ahsan Khizar · AI engineer + AI video producer
            </p>
            <h1 id="hero-title" data-hero-reveal>
              AI systems built to ship. <span>Video built to make the idea land.</span>
            </h1>
            <p className="conversion-hero-support" data-hero-reveal>
              I build AI products, agents, and automations—then help explain and sell the idea through
              sharp AI-assisted demos, explainers, UGC, and ads.
            </p>
            <div className="conversion-actions" data-hero-reveal>
              <a
                className="conversion-button conversion-button-primary"
                href={`mailto:${profile.email}?subject=AI%20engineering%20project`}
              >
                Discuss an AI build <span aria-hidden="true">↗</span>
              </a>
              <a className="conversion-button conversion-button-secondary" href="#work">
                See selected work <span aria-hidden="true">↓</span>
              </a>
            </div>
            <a className="video-brief-link" href="#services">
              Have a video brief instead? Explore the production offer <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="operator-frame" aria-label="Ahsan Khizar, one operator with two capabilities">
            <div className="operator-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ahsan-khizar.png"
                width={960}
                height={1131}
                sizes="(max-width: 760px) 92vw, 42vw"
                fetchPriority="high"
                alt="Portrait of Ahsan Khizar"
              />
              <div className="operator-status glass-proof">
                <span>One operator</span>
                <strong>Two capabilities</strong>
                <small>{profile.location} · Remote</small>
              </div>
            </div>
            <div className="output-rail output-rail-engineering">
              <span aria-hidden="true">01</span>
              <div>
                <strong>Engineered systems</strong>
                <small>Products · Agents · Automation · Applied ML</small>
              </div>
            </div>
            <div className="output-rail output-rail-video">
              <span aria-hidden="true">02</span>
              <div>
                <strong>Produced stories</strong>
                <small>Explainers · UGC · Ads · Product demos</small>
              </div>
            </div>
          </div>
        </section>

        <section className="credibility-rail" aria-label="Selected credentials">
          <p>Evidence before promises</p>
          <ul>
            {proofSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </section>

        <section id="services" className="engagement-section" aria-labelledby="services-title">
          <div className="conversion-section-heading" data-motion-reveal>
            <p className="signal-label">Ways to work together</p>
            <h2 id="services-title">Bring the problem. Leave with something real.</h2>
            <p>
              Choose the track that matches the job. Both are led by the same person and the same
              standard: clear thinking, purposeful execution, and a usable final output.
            </p>
          </div>

          <div className="engagement-paths" data-reveal-group>
            <article className="engagement-path engineering-path">
              <div className="path-heading">
                <span>Primary practice</span>
                <h3>AI engineering</h3>
                <p>For a product, workflow, or model behavior that needs to work beyond a demo.</p>
              </div>
              <dl>
                <div>
                  <dt>Useful for</dt>
                  <dd>AI products, agents, backend automation, applied ML systems</dd>
                </div>
                <div>
                  <dt>Working depth</dt>
                  <dd>{technicalCapabilities.backendProduct.slice(0, 6).join(" · ")}</dd>
                </div>
                <div>
                  <dt>Start with</dt>
                  <dd>The workflow, users, constraints, and what must be dependable</dd>
                </div>
              </dl>
              <a href={`mailto:${profile.email}?subject=AI%20engineering%20project`}>
                Brief an AI build <span aria-hidden="true">↗</span>
              </a>
            </article>

            <article className="engagement-path video-path">
              <div className="path-heading">
                <span>Supporting practice</span>
                <h3>AI video production</h3>
                <p>For a product, campaign, or message that needs to become clear on screen.</p>
              </div>
              <dl>
                <div>
                  <dt>Useful for</dt>
                  <dd>{videoServices.slice(0, 4).map((service) => service.name).join(" · ")}</dd>
                </div>
                <div>
                  <dt>Production focus</dt>
                  <dd>Message, hook, pacing, voice, edit, format, and variation</dd>
                </div>
                <div>
                  <dt>Start with</dt>
                  <dd>The audience, offer, platform, reference, and required deliverables</dd>
                </div>
              </dl>
              <a href={`mailto:${profile.email}?subject=AI%20video%20brief`}>
                Send a video brief <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>
        </section>

        <section id="work" className="evidence-stage" data-project-stage aria-labelledby="work-title">
          <div className="evidence-stage-intro" data-motion-reveal>
            <p className="signal-label">Selected engineering evidence</p>
            <h2 id="work-title">Not a tool list. A record of what I built.</h2>
            <p>
              Each case shows the system, the contribution, and the implementation depth behind it.
            </p>
          </div>

          <div className="evidence-list">
            {engineeringProjects.map((project, index) => (
              <article className="evidence-case" data-project-panel key={project.name}>
                <div className="evidence-case-index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{project.category}</small>
                </div>
                <div className="evidence-case-main">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="evidence-case-contribution">
                  <span>My contribution</span>
                  <p>{project.contribution}</p>
                </div>
                <div className="evidence-case-footer">
                  <p>{project.stack.join(" · ")}</p>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer">
                      View {project.name} source <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span>Project summary available</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="video-capability-section" aria-labelledby="video-capability-title">
          <div className="video-capability-heading" data-motion-reveal>
            <p className="signal-label">AI video, without a second persona</p>
            <h2 id="video-capability-title">When the system needs a story, I can make that too.</h2>
          </div>
          <div className="video-capability-list" data-reveal-group>
            {videoServices.map((service, index) => (
              <article key={service.name}>
                <span>V{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="proof-section" aria-labelledby="experience-title">
          <div className="conversion-section-heading proof-section-heading" data-motion-reveal>
            <p className="signal-label">Experience + recognition</p>
            <h2 id="experience-title">Trust the evidence, not a slogan.</h2>
            <a href="/about">See the full background <span aria-hidden="true">→</span></a>
          </div>
          <div className="proof-timeline" data-reveal-group>
            {experience.map((item) => (
              <article key={`${item.organization}-${item.role}`}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.role}</h3>
                  <p className="proof-organization">{item.organization} · {item.location}</p>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
            {recognition.map((item) => (
              <article className="proof-recognition" key={item}>
                <span>Recognition</span>
                <div><h3>{item}</h3></div>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="delivery-process" aria-labelledby="process-title">
          <div className="conversion-section-heading" data-motion-reveal>
            <p className="signal-label">Working method</p>
            <h2 id="process-title">A clear path from brief to output.</h2>
          </div>
          <ol data-reveal-group>
            {process.map((step, index) => (
              <li key={step.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.name}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="about-preview"
          className="about-conversion"
          data-portrait-reveal
          aria-labelledby="about-preview-title"
        >
          <div className="about-conversion-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ahsan-khizar.png"
              width={960}
              height={1131}
              sizes="(max-width: 760px) 36vw, 18vw"
              loading="lazy"
              decoding="async"
              alt="Ahsan Khizar"
            />
          </div>
          <div className="about-conversion-copy">
            <p className="signal-label">The person behind both outputs</p>
            <h2 id="about-preview-title">Technical enough to build it. Creative enough to make it land.</h2>
            <p>
              I am a final-year Software Engineering student building applied AI systems across model,
              backend, automation, and product layers—with AI video as a focused production capability.
            </p>
            <a href="/about">Read my full story <span aria-hidden="true">→</span></a>
          </div>
          <div className="about-conversion-facts">
            <span>UET Taxila</span>
            <span>{experience.length} professional internships</span>
            <span>{certifications.length} certifications and scholarship signals</span>
          </div>
        </section>

        <section id="contact" className="conversion-contact" data-motion-reveal aria-labelledby="contact-title">
          <p className="signal-label">Start with the real brief</p>
          <h2 id="contact-title">What needs to work—and who needs to care?</h2>
          <p>
            Send the problem, audience, constraints, and desired output. I will reply from there.
          </p>
          <div className="conversion-contact-actions">
            <a href={`mailto:${profile.email}?subject=Project%20inquiry`}>
              Discuss a project <span aria-hidden="true">↗</span>
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
