"use client";

import { useState } from "react";
import { gallery } from "@/lib/dermadent-data";

export function GalleryLightbox() {
  const [active, setActive] = useState<(typeof gallery)[number] | null>(null);

  return (
    <>
      <div className="masonry-gallery">
        {gallery.map((item, index) => (
          <button
            key={item.src}
            className={`masonry-gallery__item masonry-gallery__item--${item.size}`}
            onClick={() => setActive(item)}
            data-reveal
            style={{ transitionDelay: `${index * 40}ms` }}
            type="button"
          >
            <img src={item.src} alt={item.title} />
            <span>{item.category}</span>
            <strong>{item.title}</strong>
          </button>
        ))}
      </div>

      {active ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
          <button type="button" aria-label="Close gallery image" onClick={() => setActive(null)}>×</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={active.src} alt={active.title} />
            <figcaption>
              <span>{active.category}</span>
              <strong>{active.title}</strong>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
