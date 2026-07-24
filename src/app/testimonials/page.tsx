import type { Metadata } from "next";
import { AppointmentBanner, Eyebrow } from "@/components/luxury-ui";
import { testimonials } from "@/lib/dermadent-data";

export const metadata: Metadata = {
  title: "Patient Stories",
  description: "Editorial patient testimonials and review stories from DermaDent Aesthetics.",
};

export default function TestimonialsPage() {
  return (
    <main>
      <section className="stories-hero">
        <div>
          <p className="eyebrow">Patient stories</p>
          <h1>Confidence, whispered rather than announced.</h1>
        </div>
        <div className="stories-hero__rating" data-reveal>
          <strong>4.9</strong>
          <span>Google review average</span>
          <p>Based on verified clinical experiences and concierge feedback.</p>
        </div>
      </section>

      <section className="story-feature section-pad">
        <article className="story-feature__quote" data-reveal>
          <span aria-hidden="true">“</span>
          <p>{testimonials[1]?.quote}</p>
          <strong>{testimonials[1]?.name}</strong>
        </article>
        <div className="story-feature__film" data-reveal>
          <img src={testimonials[1]?.portrait} alt={testimonials[1]?.name} />
          <button type="button" aria-label="Play video testimonial">▶</button>
          <span>Video story · Event glow protocol</span>
        </div>
      </section>

      <section className="floating-reviews section-pad">
        {testimonials.map((testimonial, index) => (
          <article key={testimonial.name} className={`floating-review floating-review--${index + 1}`} data-reveal>
            <img src={testimonial.portrait} alt={testimonial.name} />
            <div>
              <span>★★★★★ · {testimonial.rating}</span>
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
