import type { Metadata } from "next";
import { AppointmentForm } from "@/components/appointment-form";
import { Eyebrow } from "@/components/luxury-ui";
import { clinic } from "@/lib/dermadent-data";

export const metadata: Metadata = {
  title: "Book a Private Consultation",
  description: "Request a private consultation at DermaDent Aesthetics for dermatology, laser, hair restoration or dental aesthetics.",
};

export default function AppointmentPage() {
  return (
    <main>
      <section className="booking-hero">
        <div className="booking-hero__art" data-parallax="7">
          <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1500&q=85" alt="Private consultation suite" />
        </div>
        <div className="booking-hero__copy">
          <p className="eyebrow">Book appointment</p>
          <h1>A consultation experience designed before the treatment begins.</h1>
          <p>
            Tell us where you would like to begin—skin, laser, smile, hair or a milestone event. Our concierge will coordinate a discreet appointment with the right specialist pathway.
          </p>
        </div>
      </section>

      <section className="booking-experience section-pad">
        <div className="concierge-panel" data-reveal>
          <Eyebrow>Concierge notes</Eyebrow>
          <h2>What happens next?</h2>
          <ol>
            <li>We review your request and preferred timing.</li>
            <li>A concierge call confirms medical focus and visit duration.</li>
            <li>Your consultation includes diagnosis, visual planning and an authored protocol.</li>
          </ol>
          <div className="contact-card">
            <span>{clinic.hours}</span>
            <strong>{clinic.phone}</strong>
            <em>{clinic.email}</em>
          </div>
        </div>
        <AppointmentForm />
      </section>
    </main>
  );
}
