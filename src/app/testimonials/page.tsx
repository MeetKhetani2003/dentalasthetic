import type { Metadata } from "next";
import { AppointmentBanner, Eyebrow } from "@/components/luxury-ui";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { getTestimonials } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Patient Stories & Google Verified Reviews",
  description: "Editorial patient testimonials and verified Google review stories from DermaDent Aesthetics.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <main>
      <section className="stories-hero">
        <div>
          <p className="eyebrow">Google Verified Patient Stories</p>
          <h1>Confidence, whispered rather than announced.</h1>
        </div>
        <div className="stories-hero__rating" data-reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "center", marginBottom: "0.3rem" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <strong>4.9</strong>
          </div>
          <span>Google Review Rating</span>
          <p>Based on verified clinical experiences and concierge feedback.</p>
        </div>
      </section>

      {/* Featured Carousel Section */}
      <section className="section-pad" style={{ background: "var(--ivory, #f7f5f0)", paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div className="section-heading text-center" style={{ marginBottom: "2rem" }}>
          <Eyebrow>Featured Reviews</Eyebrow>
          <h2 style={{ fontSize: "2.2rem" }}>Interactive Patient Carousel</h2>
        </div>
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      {/* All Verified Reviews Grid */}
      <section className="floating-reviews section-pad">
        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <Eyebrow>All Patient Stories</Eyebrow>
          <h2>Verified Experiences</h2>
        </div>
        {testimonials.map((testimonial: any, index: number) => (
          <article key={testimonial.name || index} className={`floating-review floating-review--${(index % 3) + 1}`} data-reveal style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#1a73e8" }}>Google Verified Review</span>
            </div>
            <img src={testimonial.portrait} alt={testimonial.name} />
            <div>
              <span style={{ color: "#f4b400" }}>★★★★★ · {testimonial.rating}</span>
              <p>“{testimonial.quote}”</p>
              <strong>{testimonial.name}</strong>
              <em>{testimonial.detail}</em>
            </div>
          </article>
        ))}
      </section>

      <section className="review-principles section-pad">
        <div data-reveal>
          <Eyebrow>Why patients return</Eyebrow>
          <h2>The experience is as considered as the result.</h2>
        </div>
        <div className="review-columns">
          <p data-reveal>Appointments are intentionally paced, with privacy and minimal waiting.</p>
          <p data-reveal>Treatment plans are explained clearly, including downtime, risk and alternatives.</p>
          <p data-reveal>Follow-up is built into the journey so outcomes can settle beautifully.</p>
        </div>
      </section>

      <AppointmentBanner compact />
    </main>
  );
}
