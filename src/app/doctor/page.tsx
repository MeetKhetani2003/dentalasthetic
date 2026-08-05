import type { Metadata } from "next";
import { AppointmentBanner, Eyebrow, LuxuryButton } from "@/components/luxury-ui";
import { getDoctors } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet the Experts",
  description: "Editorial profiles of our specialists at DermaDent Aesthetics.",
};

export default async function DoctorPage() {
  const doctors = await getDoctors();

  return (
    <main>
      <section className="page-hero section-pad" style={{ background: '#ebe3d6', textAlign: 'center' }}>
        <div data-reveal>
          <Eyebrow>The experts</Eyebrow>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', fontFamily: 'var(--display)' }}>Meet Our Specialists</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--muted)', maxWidth: '40rem', margin: '0 auto' }}>
            Medical precision with couture restraint. Discover the minds behind DermaDent Aesthetics.
          </p>
        </div>
      </section>

      {doctors.map((doctor: any, idx: number) => (
        <div key={idx} style={{ marginBottom: '6rem' }}>
          <section className="doctor-editorial-hero" style={{ minHeight: 'auto', paddingTop: '6rem', paddingBottom: '6rem', background: idx % 2 === 0 ? 'var(--white)' : '#f6f1e8' }}>
            <div className="doctor-editorial-hero__image" style={{ order: idx % 2 !== 0 ? 2 : 1 }}>
              <img src={doctor.portrait} alt={doctor.name} data-parallax="6" />
            </div>
            <div className="doctor-editorial-hero__copy" style={{ order: idx % 2 !== 0 ? 1 : 2, textAlign: 'left', alignItems: 'flex-start' }}>
              <Eyebrow>{doctor.title}</Eyebrow>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontFamily: 'var(--display)' }}>{doctor.name}</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '2rem' }}>{doctor.biography}</p>
              <div className="doctor-signature" style={{ alignSelf: 'flex-start', transform: 'rotate(-3deg)' }}>{doctor.signature}</div>
            </div>
          </section>

          <section className="credentials-atelier section-pad">
            <div className="credentials-atelier__panel" data-reveal>
              <Eyebrow>Certificates & Expertise</Eyebrow>
              <h2>Internationally informed. India-specific in practice.</h2>
              <ul>
                {doctor.credentials?.map((credential: string) => <li key={credential}>{credential}</li>)}
              </ul>
            </div>
            <div className="credentials-atelier__awards" data-reveal>
              <Eyebrow>Achievements & Focus</Eyebrow>
              {doctor.achievements?.map((achievement: string, index: number) => (
                <article key={achievement}>
                  <span>0{index + 1}</span>
                  <p>{achievement}</p>
                </article>
              ))}
            </div>
          </section>

          {doctor.timeline && doctor.timeline.length > 0 && (
            <section className="research-timeline section-pad" style={{ background: idx % 2 === 0 ? 'var(--white)' : '#f6f1e8' }}>
              <div className="timeline-sticky" data-reveal>
                <Eyebrow>Career Timeline</Eyebrow>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>A journey of continuous excellence.</h2>
                <LuxuryButton href="/appointment" variant="gold">Consult with {doctor.name}</LuxuryButton>
              </div>
              <div className="timeline-steps timeline-steps--large">
                {doctor.timeline?.map((item: any) => (
                  <article key={item.year} data-reveal>
                    <span style={{ fontSize: '1.5rem', color: 'var(--gold)', display: 'block', marginBottom: '1rem' }}>{item.year}</span>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      ))}

      <section className="doctor-philosophy-film section-pad" style={{ background: 'var(--teal-deep)', color: 'white' }}>
        <div className="film-card" data-reveal>
          <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1500&q=85" alt="Consultation" style={{ borderRadius: '1rem' }} />
          <span style={{ display: 'block', marginTop: '1rem', color: 'rgba(255,255,255,0.7)' }}>Private consultation film · 02:18</span>
        </div>
        <blockquote data-reveal style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--gold)', margin: 0, paddingLeft: '4rem' }}>
          “I do not chase trends. I study proportion, biology, culture and the patient’s own rhythm—then I remove what distracts from their natural elegance.”
        </blockquote>
      </section>

      <AppointmentBanner compact />
    </main>
  );
}
