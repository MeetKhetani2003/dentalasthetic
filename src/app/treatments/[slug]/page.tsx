import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppointmentBanner, Eyebrow, LuxuryButton, SplitImageComposition } from "@/components/luxury-ui";
import { getTreatmentBySlug, getTreatments, getTestimonials } from "@/lib/cms";

export const dynamic = "force-dynamic";

type TreatmentPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: TreatmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) return {};
  return {
    title: treatment.title,
    description: treatment.description,
    openGraph: {
      title: treatment.title,
      description: treatment.description,
      images: [{ url: treatment.image, width: 1600, height: 1000, alt: treatment.title }],
    },
  };
}

export default async function TreatmentDetailPage({ params }: TreatmentPageProps) {
  const { slug } = await params;
  const [treatment, allTreatments, testimonials] = await Promise.all([
    getTreatmentBySlug(slug),
    getTreatments(),
    getTestimonials(),
  ]);

  if (!treatment) notFound();

  const related = allTreatments.filter((item) => item.slug !== treatment.slug).slice(0, 3);

  return (
    <main>
      <section className="treatment-detail-hero">
        <img src={treatment.image} alt={treatment.title} data-parallax="7" />
        <div className="treatment-detail-hero__copy">
          <p className="eyebrow">{treatment.eyebrow}</p>
          <h1>{treatment.title}</h1>
          <p>{treatment.description}</p>
          <div className="treatment-meta-row">
            <span>{treatment.duration}</span>
            <span>{treatment.recovery}</span>
            <span>{treatment.focus}</span>
          </div>
        </div>
      </section>

      <section className="treatment-overview section-pad">
        <div className="treatment-overview__copy" data-reveal>
          <Eyebrow>Overview</Eyebrow>
          <h2>A protocol designed around your biology, face and calendar.</h2>
          <p>{treatment.description}</p>
          <LuxuryButton href="/appointment" variant="gold">Request this protocol</LuxuryButton>
        </div>
        <SplitImageComposition primary={treatment.secondaryImage || treatment.image} label={treatment.shortTitle} reverse />
      </section>

      {treatment.benefits && treatment.benefits.length > 0 && (
        <section className="benefits-runway section-pad">
          <div className="section-heading section-heading--split">
            <div>
              <Eyebrow>Benefits</Eyebrow>
              <h2 data-reveal>What the treatment is designed to achieve.</h2>
            </div>
            <p data-reveal>Outcomes vary by medical suitability, but every protocol is planned with measured expectations.</p>
          </div>
          <div className="benefit-list">
            {treatment.benefits.map((benefit: string, index: number) => (
              <div key={benefit || index} data-reveal>
                <span>0{index + 1}</span>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {treatment.timeline && treatment.timeline.length > 0 && (
        <section className="procedure-timeline section-pad">
          <div className="timeline-sticky" data-reveal>
            <Eyebrow>Procedure timeline</Eyebrow>
            <h2>From first analysis to final refinement.</h2>
          </div>
          <div className="timeline-steps">
            {treatment.timeline.map((step: any, index: number) => (
              <article key={step.phase || index} data-reveal>
                <span>{step.phase}</span>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="technology-result section-pad">
        <div className="technology-panel" data-reveal>
          <Eyebrow>Technology</Eyebrow>
          <h2>{treatment.technology}</h2>
        </div>
        <div className="result-panel" data-reveal>
          <Eyebrow>Expected results & recovery</Eyebrow>
          <p>{treatment.expectedResults}</p>
          <span>Recovery: {treatment.recovery}</span>
        </div>
      </section>

      <section className="treatment-gallery-strip section-pad" aria-label="Treatment gallery">
        {[treatment.image, treatment.secondaryImage || treatment.image, treatment.portraitImage || treatment.image].map((image, index) => (
          <img key={image + index} src={image} alt={`${treatment.title} visual ${index + 1}`} data-reveal />
        ))}
      </section>

      {treatment.faqs && treatment.faqs.length > 0 && (
        <section className="faq-editorial section-pad">
          <div data-reveal>
            <Eyebrow>FAQs</Eyebrow>
            <h2>Clear answers before you decide.</h2>
          </div>
          <div className="faq-list">
            {treatment.faqs.map((faq: any, index: number) => (
              <details key={faq.question || index} data-reveal>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {testimonials && testimonials.length > 0 && (
        <section className="treatment-testimonial section-pad">
          <blockquote data-reveal>“{testimonials[0]?.quote}”</blockquote>
          <div data-reveal>
            <img src={testimonials[0]?.portrait} alt={testimonials[0]?.name} />
            <span>{testimonials[0]?.name} · Verified patient</span>
          </div>
        </section>
      )}

      <section className="related-treatments section-pad">
        <div className="section-heading section-heading--split">
          <div>
            <Eyebrow>Related treatments</Eyebrow>
            <h2 data-reveal>Complete the architecture.</h2>
          </div>
        </div>
        <div className="related-row">
          {related.map((item) => (
            <a href={`/treatments/${item.slug}`} key={item.slug} data-reveal>
              <img src={item.image} alt={item.title} />
              <span>{item.eyebrow}</span>
              <strong>{item.shortTitle}</strong>
            </a>
          ))}
        </div>
      </section>

      <AppointmentBanner compact />
    </main>
  );
}
