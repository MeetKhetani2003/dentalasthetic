"use client";

import { useEffect, useState } from "react";

export type TestimonialItem = {
  _id?: string;
  quote: string;
  name: string;
  detail: string;
  rating: string;
  portrait: string;
  isGoogleVerified?: boolean;
};

export function TestimonialCarousel({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = testimonials && testimonials.length > 0 ? testimonials : [];

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  if (!items || items.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const current = items[currentIndex];

  return (
    <div
      className="testimonial-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "relative",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "var(--card-bg, #ffffff)",
          borderRadius: "1.2rem",
          padding: "2.5rem",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(197, 160, 89, 0.2)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s ease",
        }}
      >
        {/* Google Verified Review Badge Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {/* Google Icon SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#202124",
                letterSpacing: "0.3px",
              }}
            >
              Google Verified Review
            </span>
            <span
              style={{
                background: "#e8f0fe",
                color: "#1a73e8",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "0.2rem 0.5rem",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.2rem",
              }}
            >
              ✓ Verified
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ color: "#f4b400", fontSize: "1.1rem", letterSpacing: "2px" }}>★★★★★</span>
            <strong style={{ fontSize: "0.95rem", color: "#202124" }}>{current.rating || "5.0"}</strong>
          </div>
        </div>

        {/* Testimonial Quote */}
        <p
          style={{
            fontSize: "1.25rem",
            lineHeight: 1.6,
            color: "var(--foreground, #1a202c)",
            fontStyle: "italic",
            marginBottom: "2rem",
            minHeight: "80px",
          }}
        >
          “{current.quote}”
        </p>

        {/* Patient Profile */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              src={current.portrait}
              alt={current.name}
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--gold, #c5a059)",
              }}
            />
            <div>
              <strong style={{ display: "block", fontSize: "1.15rem", color: "var(--foreground, #000)" }}>
                {current.name}
              </strong>
              <span style={{ fontSize: "0.85rem", color: "var(--muted, #666)" }}>
                {current.detail}
              </span>
            </div>
          </div>

          {/* Slide Numbers */}
          <span style={{ fontSize: "0.85rem", color: "var(--muted, #999)", fontWeight: 500 }}>
            0{currentIndex + 1} / 0{items.length}
          </span>
        </div>
      </div>

      {/* Controls: Prev / Next Buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            style={{
              position: "absolute",
              top: "50%",
              left: "-20px",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#111c24",
              color: "#c5a059",
              border: "1px solid #c5a059",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 10,
              transition: "all 0.2s ease",
            }}
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            style={{
              position: "absolute",
              top: "50%",
              right: "-20px",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#111c24",
              color: "#c5a059",
              border: "1px solid #c5a059",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 10,
              transition: "all 0.2s ease",
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Indicators / Pagination Dots */}
      {items.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.2rem" }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: currentIndex === idx ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: currentIndex === idx ? "#c5a059" : "rgba(197, 160, 89, 0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
