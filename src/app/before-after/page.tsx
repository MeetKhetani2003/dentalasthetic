import type { Metadata } from "next";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { AppointmentBanner, Eyebrow } from "@/components/luxury-ui";
import { getTransformations } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Before & After Transformations",
  description: "Interactive DermaDent Aesthetics transformation stories with timelines, highlights and before-after comparisons.",
};

export default async function BeforeAfterPage() {
  const transformations = await getTransformations();

  return (
    <main>
      <section className="page-hero page-hero--transformations">
        <div>
          <p className="eyebrow">Before & after</p>
          <h1>Transformations with context, not spectacle.</h1>
        </div>
        <p>
          Each story is shown as a timeline of decisions, not a miracle claim. Results vary, but the design intent remains consistent: refinement, safety and dignity.
        </p>
      </section>

      <section className="transformation-stories section-pad">
        {transformations.map((story: any, index: number) => (
          <article key={story.title || index} className={`transformation-story transformation-story--${index % 2 === 0 ? "left" : "right"}`}>
            <BeforeAfterSlider before={story.before} after={story.after} title={story.title} />
            <div className="transformation-story__copy" data-reveal>
              <Eyebrow>{story.concern}</Eyebrow>
              <h2>{story.title}</h2>
              <p>{story.result}</p>
              <dl>
                <div><dt>Timeline</dt><dd>{story.timeline}</dd></div>
                <div><dt>Protocol</dt><dd>Analysis · treatment · recovery · refinement</dd></div>
                <div><dt>Highlight</dt><dd>Natural change without visual excess</dd></div>
              </dl>
            </div>
          </article>
        ))}
      </section>

      <section className="result-principles section-pad">
        <div data-reveal>
          <Eyebrow>Result principles</Eyebrow>
          <h2>How we define a beautiful outcome.</h2>
        </div>
        <div className="principle-panels">
          <article data-reveal><span>01</span><h3>Identity remains intact</h3><p>You should still look like yourself—rested, clearer and more harmonious.</p></article>
          <article data-reveal><span>02</span><h3>Skin is respected</h3><p>Barrier repair and pigment safety shape the protocol, especially for Indian skin tones.</p></article>
          <article data-reveal><span>03</span><h3>Timelines are honest</h3><p>We favour progressive, sustainable change over rushed transformations.</p></article>
        </div>
      </section>

      <AppointmentBanner compact />
    </main>
  );
}
