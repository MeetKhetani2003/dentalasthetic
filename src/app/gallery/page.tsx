import type { Metadata } from "next";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { AppointmentBanner, Eyebrow } from "@/components/luxury-ui";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore DermaDent Aesthetics clinic interiors, treatment suites, technology and luxury patient experience.",
};

export default function GalleryPage() {
  return (
    <main>
      <section className="gallery-hero">
        <div className="gallery-hero__image" data-parallax="8" />
        <div className="gallery-hero__copy">
          <p className="eyebrow">Gallery</p>
          <h1>Rooms designed to lower the pulse before science begins.</h1>
        </div>
      </section>

      <section className="gallery-intro section-pad">
        <div data-reveal>
          <Eyebrow>Inside DermaDent</Eyebrow>
          <h2>Ivory light, calibrated devices and the stillness of a private residence.</h2>
        </div>
        <p data-reveal>
          The clinic experience is part of the treatment. We shaped every room around privacy, comfort and visual calm—because precision feels better when the environment is serene.
        </p>
      </section>

      <section className="gallery-masonry-section section-pad">
        <GalleryLightbox />
      </section>

      <AppointmentBanner compact />
    </main>
  );
}
