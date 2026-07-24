import type { Metadata } from "next";
import { AppointmentBanner, Eyebrow, TreatmentRibbon } from "@/components/luxury-ui";
import { treatments } from "@/lib/dermadent-data";

export const metadata: Metadata = {
  title: "Treatments",
  description: "Explore DermaDent Aesthetics' luxury dermatology, laser, hair restoration and dental treatment protocols.",
};

export default function TreatmentsPage() {
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
        <TreatmentRibbon />
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
              <span>{treatment.icon}</span>
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
