import type { Metadata } from "next";
import { AppointmentBanner, Eyebrow, TreatmentRibbon } from "@/components/luxury-ui";
import { getTreatments } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Treatments",
  description: "Explore DermaDent Aesthetics' luxury dermatology, laser, hair restoration and dental treatment protocols.",
};

export default async function TreatmentsPage() {
  const treatments = await getTreatments();

  const neuroTreatments = treatments.filter(t => t.eyebrow.toLowerCase().includes('neuro'));
  const orthoTreatments = treatments.filter(t => t.eyebrow.toLowerCase().includes('ortho'));
  const childTreatments = treatments.filter(t => t.eyebrow.toLowerCase().includes('paediatric') || t.eyebrow.toLowerCase().includes('child'));
  
  const skinTreatments = treatments.filter(t => 
    !t.eyebrow.toLowerCase().includes('neuro') &&
    !t.eyebrow.toLowerCase().includes('ortho') &&
    !t.eyebrow.toLowerCase().includes('paediatric') &&
    !t.eyebrow.toLowerCase().includes('child')
  );

  return (
    <main>
      <section className="page-hero page-hero--treatments">
        <div className="page-hero__texture" />
        <div>
          <p className="eyebrow">Treatment library</p>
          <h1>Medical protocols presented like a luxury editorial.</h1>
        </div>
        <p>
          Every DermaDent treatment is designed as an authored journey. We avoid generic packages and instead build precise combinations around skin behaviour, facial architecture, scalp density and smile proportion.
        </p>
      </section>

      <section className="treatment-manifesto section-pad">
        <div className="manifesto-line" data-reveal>
          <span>Diagnosis</span><i /> <span>Design</span><i /> <span>Precision</span><i /> <span>Recovery</span>
        </div>
        <div className="manifesto-copy" data-reveal>
          <Eyebrow>Our method</Eyebrow>
          <h2>Less menu. More authorship.</h2>
          <p>
            We orchestrate dermatology, lasers, regenerative medicine and dentistry through one visual lens: elegant restraint. The experience is clinical, but the feeling is deeply personal.
          </p>
        </div>
      </section>

      <section className="treatments-catalogue section-pad">
        {neuroTreatments.length > 0 && (
          <div style={{ marginBottom: "6rem" }}>
            <h2 data-reveal style={{ marginBottom: "3rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>Neuro Therapy</h2>
            <TreatmentRibbon treatments={neuroTreatments} />
          </div>
        )}
        
        {orthoTreatments.length > 0 && (
          <div style={{ marginBottom: "6rem" }}>
            <h2 data-reveal style={{ marginBottom: "3rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>Orthopaedic Rehab</h2>
            <TreatmentRibbon treatments={orthoTreatments} />
          </div>
        )}
        
        {childTreatments.length > 0 && (
          <div style={{ marginBottom: "6rem" }}>
            <h2 data-reveal style={{ marginBottom: "3rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>Child Therapy</h2>
            <TreatmentRibbon treatments={childTreatments} />
          </div>
        )}
        
        {skinTreatments.length > 0 && (
          <div>
            <h2 data-reveal style={{ marginBottom: "3rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>Skin & Dental Aesthetics</h2>
            <TreatmentRibbon treatments={skinTreatments} />
          </div>
        )}
      </section>

      <section className="treatment-index section-pad" aria-label="Treatment quick index">
        <div className="section-heading section-heading--split">
          <div>
            <Eyebrow>Quick index</Eyebrow>
            <h2 data-reveal>Choose the concern. We design the path.</h2>
          </div>
          <p data-reveal>Not sure where to begin? Book a consultation and we will map the most efficient protocol.</p>
        </div>
        <div className="concern-map">
          {treatments.map((treatment) => (
            <a key={treatment.slug} href={`/treatments/${treatment.slug}`} data-reveal>
              <span>{treatment.icon || "✦"}</span>
              <strong>{treatment.focus}</strong>
              <em>{treatment.duration} · {treatment.recovery}</em>
            </a>
          ))}
        </div>
      </section>

      <AppointmentBanner compact />
    </main>
  );
}
