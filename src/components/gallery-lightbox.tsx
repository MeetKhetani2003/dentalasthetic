"use client";

import { useEffect, useState } from "react";
import { gallery as defaultGallery } from "@/lib/dermadent-data";

export function GalleryLightbox({ items }: { items?: any[] }) {
  const [galleryItems, setGalleryItems] = useState<any[]>(items || defaultGallery);
  const [active, setActive] = useState<any | null>(null);

  useEffect(() => {
    if (!items) {
      fetch("/api/admin/gallery")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) setGalleryItems(data);
        })
        .catch(() => {});
    } else {
      setGalleryItems(items);
    }
  }, [items]);

  return (
    <>
      <div className="masonry-gallery">
        {galleryItems.map((item, index) => (
          <button
            key={item.src + index}
            className={`masonry-gallery__item masonry-gallery__item--${item.size || "regular"}`}
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
