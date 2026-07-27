import type { Metadata } from "next";
import { AppointmentBanner, Eyebrow, LuxuryButton } from "@/components/luxury-ui";
import { getDoctor } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet the Expert Doctor",
  description: "Editorial profile of our founder and aesthetic design director at DermaDent Aesthetics.",
};

export default async function DoctorPage() {
  const doctor = await getDoctor();

  return (
    <main>
      <section className="doctor-editorial-hero">
        <div className="doctor-editorial-hero__image">
          <img src={doctor.portrait} alt={doctor.name} data-parallax="6" />
        </div>
        <div className="doctor-editorial-hero__copy">
          <p className="eyebrow">The expert</p>
          <h1>{doctor.name}</h1>
          <p>{doctor.title}</p>
        </div>
        <div className="doctor-editorial-hero__caption">
          <span>Founder</span>
          <strong>Medical precision with couture restraint.</strong>
        </div>
      </section>

      <section className="doctor-biography section-pad">
        <div data-reveal>
          <Eyebrow>Biography</Eyebrow>
          <h2>A doctor, designer and guardian of natural identity.</h2>
        </div>
        <p data-reveal>{doctor.biography}</p>
        <div className="doctor-signature" data-reveal>{doctor.signature}</div>
      </section>

      <section className="credentials-atelier section-pad">
        <div className="credentials-atelier__panel" data-reveal>
          <Eyebrow>Certificates</Eyebrow>
          <h2>Internationally informed. India-specific in practice.</h2>
          <ul>
            {doctor.credentials?.map((credential: string) => <li key={credential}>{credential}</li>)}
          </ul>
        </div>
        <div className="credentials-atelier__awards" data-reveal>
          <Eyebrow>Achievements & awards</Eyebrow>
          {doctor.achievements?.map((achievement: string, index: number) => (
            <article key={achievement}>
              <span>0{index + 1}</span>
              <p>{achievement}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="research-timeline section-pad">
        <div className="timeline-sticky" data-reveal>
          <Eyebrow>Research timeline</Eyebrow>
          <h2>From pigment science to integrated aesthetic design.</h2>
          <LuxuryButton href="/appointment" variant="gold">Consult with {doctor.name}</LuxuryButton>
        </div>
        <div className="timeline-steps timeline-steps--large">
          {doctor.timeline?.map((item: any) => (
            <article key={item.year} data-reveal>
              <span>{item.year}</span>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="doctor-philosophy-film section-pad">
        <div className="film-card" data-reveal>
          <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1500&q=85" alt="Doctor consulting patient" />
          <span>Private consultation film · 02:18</span>
        </div>
        <blockquote data-reveal>
          “I do not chase trends. I study proportion, biology, culture and the patient’s own rhythm—then I remove what distracts from their natural elegance.”
        </blockquote>
      </section>

      <AppointmentBanner compact />
    </main>
  );
}
