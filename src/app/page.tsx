import Link from "next/link";
import { AppointmentBanner, Eyebrow, LuxuryButton, TreatmentRibbon } from "@/components/luxury-ui";
import { doctor, testimonials, treatments, transformations } from "@/lib/dermadent-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main>
      <section className="hero-cinema" aria-label="DermaDent Aesthetics luxury clinic hero">
        <div className="hero-cinema__image" data-parallax="9" />
        <div className="hero-cinema__content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem' }}>
          <div className="hero-cinema__copy" style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className="eyebrow hero-kicker">India’s premium medical atelier</p>
            <h1 style={{ fontSize: '3rem', maxWidth: '800px' }}>
              Skin, smile and hair refinement for those who prefer quality perfection.
            </h1>
            <p style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)' }}>
              DermaDent Aesthetics blends dermatology, lasers, regenerative hair care and dental design into a calm, deeply personal beauty experience.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <LuxuryButton href="/appointment" variant="gold">Book consultation</LuxuryButton>
              <LuxuryButton href="/treatments" variant="light">Explore treatments</LuxuryButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--white)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>Luxury introduction</Eyebrow>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>A private atelier for clinically precise beauty.</h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>
            We designed DermaDent to feel like entering a serene residence. Every treatment is tailored for Indian skin, facial harmony and long-term confidence.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--ivory)' }}>
        <div className="section-heading">
          <Eyebrow>Clinic philosophy</Eyebrow>
          <h2 style={{ fontSize: '2.5rem' }}>Beauty should be almost imperceptible.</h2>
        </div>
        <div className="grid-layout">
          <div className="card">
            <h3>Barrier-first dermatology</h3>
            <p>Our philosophy is conservative, diagnostic and aesthetic. We study skin behaviour before creating a protocol.</p>
          </div>
          <div className="card">
            <h3>Facial architecture mapping</h3>
            <p>We analyze facial proportion and structural balance for subtle, harmonious results.</p>
          </div>
          <div className="card">
            <h3>Laser parameters for Indian skin</h3>
            <p>Advanced laser technology specifically calibrated for safety and efficacy on melanin-rich skin.</p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="section-heading text-center">
          <Eyebrow>Featured treatments</Eyebrow>
          <h2 style={{ fontSize: '2.5rem' }}>Standardized Excellence</h2>
          <p>Each protocol is designed as a complete journey.</p>
        </div>
        <TreatmentRibbon limit={4} />
      </section>

      <section className="section-pad" style={{ background: 'var(--teal-deep)', color: 'white' }}>
        <div className="grid-layout" style={{ alignItems: 'center' }}>
          <div>
            <img src={doctor.portrait} alt={doctor.name} style={{ borderRadius: '1rem', width: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <Eyebrow>Meet the expert</Eyebrow>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{doctor.name}</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>{doctor.biography}</p>
            <LuxuryButton href="/doctor" variant="gold">Read profile</LuxuryButton>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="section-heading">
          <Eyebrow>Patient transformations</Eyebrow>
          <h2 style={{ fontSize: '2.5rem' }}>Real Results</h2>
        </div>
        <div className="grid-layout">
          {transformations.map((story, index) => (
            <Link key={story.title} href="/before-after" className="card" data-reveal>
              <img src={story.after} alt={story.title} />
              <div style={{ marginTop: '1rem' }}>
                <span className="eyebrow" style={{ marginBottom: '0.5rem', display: 'block' }}>{story.timeline}</span>
                <h3 style={{ fontSize: '1.5rem' }}>{story.title}</h3>
                <p style={{ marginTop: '0.5rem' }}>{story.result}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--ivory)' }}>
        <div className="section-heading">
          <Eyebrow>Testimonials</Eyebrow>
          <h2 style={{ fontSize: '2.5rem' }}>Patient Stories</h2>
        </div>
        <div className="grid-layout">
          {testimonials.map((testimonial, index) => (
            <article key={testimonial.name} className="card" data-reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <img src={testimonial.portrait} alt={testimonial.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '1.2rem' }}>{testimonial.name}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>{testimonial.rating}</span>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', flexGrow: 1 }}>"{testimonial.quote}"</p>
            </article>
          ))}
        </div>
      </section>

      <AppointmentBanner />
    </main>
  );
}

