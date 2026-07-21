import { CopyEmail } from "./components/CopyEmail";
import { HomepageHero } from "./components/HomepageHero";
import { MotionController } from "./components/MotionController";
import { ProjectStage } from "./components/ProjectStage";
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

const featuredProjectNames = [
  "DocuSync",
  "PIGEON Reproduction",
  "Audio Deepfake Detection System",
  "Customer Behavior Profiling",
] as const;

const featuredProjects = featuredProjectNames
  .map((name) => engineeringProjects.find((project) => project.name === name))
  .filter(
    (project): project is (typeof engineeringProjects)[number] => Boolean(project),
  );

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
        <HomepageHero email={profile.email} location={profile.location} />

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

        <ProjectStage projects={featuredProjects} />

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
          aria-labelledby="about-preview-title"
        >
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
