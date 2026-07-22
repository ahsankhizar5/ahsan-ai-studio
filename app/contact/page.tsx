import type { Metadata } from "next";
import { CopyEmail } from "../components/CopyEmail";
import { MotionController } from "../components/MotionController";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { profile } from "../data/profile";

export const metadata: Metadata = {
  title: "Start a project with Ahsan Khizar",
  description: "Share the problem, audience, constraints, and desired outcome for an applied AI product project.",
  alternates: { canonical: "/contact" },
};

const usefulBrief = [
  ["The problem", "What is slow, unclear, risky, or currently impossible?"],
  ["The audience", "Who will use the product or needs to trust its result?"],
  ["The constraints", "Data, timeline, integrations, compliance, or existing systems."],
  ["The outcome", "What should be working, measurable, or easier when we finish?"],
] as const;

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader activePage="contact" />

      <main id="main-content" className="contact-page" data-motion-page="contact">
        <section className="contact-page-hero" aria-labelledby="contact-page-title">
          <div className="contact-page-sequence" data-contact-sequence>
            <p className="contact-page-kicker">Project inquiry / direct to Ahsan</p>
            <h1 id="contact-page-title">
              Bring me the hard part.
              <span>I’ll shape the system.</span>
            </h1>
            <p>
              Share the workflow, audience, constraints, and desired outcome. I’ll identify the
              clearest place to begin—from architecture and prototyping to the product story that
              helps people understand it.
            </p>
            <div className="contact-page-actions">
              <a className="contact-email" href={`mailto:${profile.email}?subject=AI%20product%20project`}>
                Email your project <span aria-hidden="true">↗</span>
              </a>
              <CopyEmail email={profile.email} />
            </div>
          </div>

          <aside className="contact-brief" aria-labelledby="brief-title">
            <h2 id="brief-title">A useful first message includes</h2>
            <ol data-reveal-group>
              {usefulBrief.map(([title, description], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section className="contact-channels" aria-labelledby="contact-channels-title">
          <h2 id="contact-channels-title" data-motion-reveal>Choose the shortest path.</h2>
          <div data-reveal-group>
            <a href={`mailto:${profile.email}`}>
              <span>Email</span>
              <strong>{profile.email}</strong>
              <i aria-hidden="true">↗</i>
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <strong>Professional background</strong>
              <i aria-hidden="true">↗</i>
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <strong>Engineering work</strong>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>

        <section className="contact-close" aria-label="Working standard">
          <p data-motion-reveal>One person. One connected build. One standard from system to story.</p>
        </section>
        <MotionController page="contact" />
      </main>

      <SiteFooter />
    </>
  );
}
