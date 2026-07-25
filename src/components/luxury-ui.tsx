import Link from "next/link";
import type { ReactNode } from "react";
import { awards, clinic, navLinks, treatments } from "@/lib/dermadent-data";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow" data-reveal>{children}</p>;
}

export function LuxuryButton({ href, children, variant = "dark" }: { href: string; children: ReactNode; variant?: "dark" | "light" | "gold" }) {
  return (
    <Link href={href} className={`luxury-button luxury-button--${variant} magnetic-link`}>
      <span>{children}</span>
      <i aria-hidden="true">↗</i>
    </Link>
  );
}

export function SplitImageComposition({
  primary,
  label,
}: {
  primary: string;
  secondary?: string;
  label: string;
  reverse?: boolean;
}) {
  return (
    <div className="card" data-reveal>
      <img src={primary} alt={label} />
      <h3>{label}</h3>
    </div>
  );
}

export function TreatmentRibbon({ limit }: { limit?: number }) {
  const visibleTreatments = typeof limit === "number" ? treatments.slice(0, limit) : treatments;

  return (
    <div className="grid-layout">
      {visibleTreatments.map((treatment) => (
        <Link
          href={`/treatments/${treatment.slug}`}
          className="card"
          key={treatment.slug}
          data-reveal
        >
          <img src={treatment.image} alt={treatment.title} />
          <span className="eyebrow">{treatment.eyebrow}</span>
          <h3>{treatment.shortTitle}</h3>
          <p>{treatment.description}</p>
        </Link>
      ))}
    </div>
  );
}

export function AppointmentBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`appointment-banner ${compact ? "appointment-banner--compact" : ""}`} data-reveal>
      <div>
        <p className="eyebrow">Private consultation</p>
        <h2>Begin with a quiet, highly personal conversation.</h2>
      </div>
      <p>
        Your first visit is designed like a fitting: diagnostic, unhurried and discreet. We understand your skin, smile, hair and lifestyle before recommending anything.
      </p>
      <LuxuryButton href="/appointment" variant="gold">Reserve an appointment</LuxuryButton>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__marquee" aria-hidden="true">
        <span>DermaDent Aesthetics · Luxury Medical Atelier · Skin · Laser · Hair · Smile ·</span>
      </div>
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <img src="/logo.png" alt="DermaDent Aesthetics Logo" style={{ height: "60px", width: "auto", marginBottom: "1rem", filter: "brightness(0) invert(1)" }} />
          <h2>DermaDent Aesthetics</h2>
          <p>{clinic.tagline}. A calmer standard of clinically exacting beauty in India.</p>
          <form className="newsletter-form">
            <label htmlFor="newsletter">Private notes from the atelier</label>
            <div>
              <input id="newsletter" type="email" placeholder="Email address" aria-label="Email address" />
              <button type="button">Join</button>
            </div>
          </form>
        </div>

        <div>
          <h3>Navigate</h3>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
          <Link href="/appointment">Book Appointment</Link>
        </div>

        <div>
          <h3>Popular Treatments</h3>
          {treatments.slice(0, 5).map((treatment) => (
            <Link key={treatment.slug} href={`/treatments/${treatment.slug}`}>{treatment.shortTitle}</Link>
          ))}
        </div>

        <div>
          <h3>Visit</h3>
          <p>{clinic.address}</p>
          <p>{clinic.hours}</p>
          <p>{clinic.phone}<br />{clinic.email}</p>
          <div className="award-strip">
            {awards.map((award) => <span key={award}>{award}</span>)}
          </div>
        </div>
      </div>
      <div className="map-panel" role="img" aria-label={clinic.mapLabel}>
        <span>{clinic.mapLabel}</span>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} DermaDent Aesthetics</span>
        <span>Designed for calm precision and premium care.</span>
      </div>
    </footer>
  );
}
