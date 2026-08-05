import Link from "next/link";
import { AppointmentBanner, Eyebrow, LuxuryButton, TreatmentRibbon } from "@/components/luxury-ui";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { getDoctors, getHomeContent, getTestimonials, getTransformations, getTreatments } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [homeContent, doctors, treatments, transformations, testimonials] = await Promise.all([
    getHomeContent(),
    getDoctors(),
    getTreatments(),
    getTransformations(),
    getTestimonials(),
  ]);

  const defaultHeroBg = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=85";
  const heroBgImage = homeContent.heroImage || defaultHeroBg;

  return (
    <main>
      <section className="hero-cinema" aria-label="DermaDent Aesthetics luxury clinic hero" style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div
          className="hero-cinema__image"
          data-parallax="9"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url("${heroBgImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        />
        <div className="hero-cinema__content" style={{ position: "relative", zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem', padding: '4rem 1rem' }}>
          <div className="hero-cinema__copy" style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className="eyebrow hero-kicker" style={{ color: "#c5a059" }}>{homeContent.heroKicker}</p>
            <h1 style={{ fontSize: '3rem', maxWidth: '800px', color: '#fff' }}>
              {homeContent.heroTitle}
            </h1>
            <p style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)' }}>
              {homeContent.heroSubheading}
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <LuxuryButton href={homeContent.primaryBtnLink || "/appointment"} variant="gold">{homeContent.primaryBtnText || "Book consultation"}</LuxuryButton>
              <LuxuryButton href={homeContent.secondaryBtnLink || "/treatments"} variant="light">{homeContent.secondaryBtnText || "Explore treatments"}</LuxuryButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--white)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>{homeContent.introEyebrow}</Eyebrow>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{homeContent.introHeading}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>
            {homeContent.introDescription}
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--ivory)' }}>
        <div className="section-heading">
          <Eyebrow>{homeContent.philosophyEyebrow}</Eyebrow>
          <h2 style={{ fontSize: '2.5rem' }}>{homeContent.philosophyHeading}</h2>
        </div>
        <div className="grid-layout">
          {homeContent.philosophyCards?.map((card: any, idx: number) => (
            <div key={card.title || idx} className="card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="section-heading text-center">
          <Eyebrow>{homeContent.featuredEyebrow}</Eyebrow>
          <h2 style={{ fontSize: '2.5rem' }}>{homeContent.featuredHeading}</h2>
          <p>{homeContent.featuredSubheading}</p>
        </div>
        <TreatmentRibbon treatments={treatments} limit={4} />
      </section>

      <section className="section-pad" style={{ background: 'var(--teal-deep)', color: 'white' }}>
        <div className="grid-layout" style={{ alignItems: 'center' }}>
          <div className="doctor-glimpse__portrait" data-parallax="6">
            <img src={doctors[0].portrait} alt={doctors[0].name} style={{ borderRadius: '1rem', width: '100%', objectFit: 'cover' }} />
          </div>
          <div className="doctor-glimpse__copy">
            <Eyebrow>The expert</Eyebrow>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{doctors[0].name}</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>{doctors[0].biography}</p>
            <LuxuryButton href="/doctor" variant="gold">Read profiles</LuxuryButton>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="section-heading">
          <Eyebrow>Patient transformations</Eyebrow>
          <h2 style={{ fontSize: '2.5rem' }}>Real Results</h2>
        </div>
        <div className="grid-layout">
          {transformations.map((story: any) => (
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
        <div className="section-heading text-center" style={{ marginBottom: '2.5rem' }}>
          <Eyebrow>Google Verified Reviews</Eyebrow>
          <h2 style={{ fontSize: '2.5rem' }}>Patient Stories & Experiences</h2>
        </div>
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      <AppointmentBanner />
    </main>
  );
}
