"use client";

import { useState } from "react";

export function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [position, setPosition] = useState(52);

  return (
    <div className="before-after-slider" data-reveal>
      <img src={before} alt={`${title} before`} className="before-after-slider__image" />
      <div className="before-after-slider__after" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <img src={after} alt={`${title} after`} className="before-after-slider__image" />
      </div>
      <div className="before-after-slider__line" style={{ left: `${position}%` }} aria-hidden="true">
        <span>Drag</span>
      </div>
      <input
        type="range"
        min="8"
        max="92"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`Compare before and after for ${title}`}
      />
      <div className="before-after-slider__labels" aria-hidden="true">
        <span>Before</span>
        <span>After</span>
      </div>
    </div>
  );
}
