"use client";

import { useEffect } from "react";

const spotlightSelector =
  'main :is(article[class*="rounded-"][class*="border"], section[class*="rounded-"][class*="border"], [data-spotlight])';

export function SpotlightEffects() {
  useEffect(() => {
    let activeCard: HTMLElement | null = null;
    let frame = 0;
    let pointerTarget: EventTarget | null = null;
    let pointerX = 0;
    let pointerY = 0;

    function updateSpotlight() {
      frame = 0;
      const card =
        pointerTarget instanceof Element
          ? pointerTarget.closest<HTMLElement>(spotlightSelector)
          : null;

      if (activeCard !== card) {
        activeCard?.style.removeProperty("--spotlight-x");
        activeCard?.style.removeProperty("--spotlight-y");
        activeCard = card;
      }

      if (!card) return;

      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--spotlight-x", `${pointerX - bounds.left}px`);
      card.style.setProperty("--spotlight-y", `${pointerY - bounds.top}px`);
    }

    function queueSpotlightUpdate(event: PointerEvent) {
      if (event.pointerType === "touch") return;

      pointerTarget = event.target;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(updateSpotlight);
    }

    document.addEventListener("pointermove", queueSpotlightUpdate, { passive: true });
    return () => {
      document.removeEventListener("pointermove", queueSpotlightUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      activeCard?.style.removeProperty("--spotlight-x");
      activeCard?.style.removeProperty("--spotlight-y");
    };
  }, []);

  return null;
}
