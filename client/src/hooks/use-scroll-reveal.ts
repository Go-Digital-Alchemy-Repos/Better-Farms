import { useLayoutEffect, type RefObject } from "react";

const revealSelector = "[data-scroll-reveal]";
const sequenceSelector = "[data-scroll-reveal-sequence]";
const sequenceDelayMs = 140;

export const useScrollReveal = (rootRef: RefObject<HTMLElement>): void => {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(revealSelector),
    );

    elements.forEach((element) => {
      element.classList.add("scroll-reveal-pending");
    });

    root
      .querySelectorAll<HTMLElement>(sequenceSelector)
      .forEach((sequence) => {
        const sequenceElements = Array.from(
          sequence.querySelectorAll<HTMLElement>(revealSelector),
        ).filter(
          (element) => element.closest(sequenceSelector) === sequence,
        );

        sequenceElements.forEach((element, index) => {
          element.style.setProperty(
            "--scroll-reveal-delay",
            `${index * sequenceDelayMs}ms`,
          );
        });
      });

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("scroll-reveal-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("scroll-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [rootRef]);
};
