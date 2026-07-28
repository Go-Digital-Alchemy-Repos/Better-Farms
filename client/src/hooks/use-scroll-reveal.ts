import { useLayoutEffect, type RefObject } from "react";

const revealSelector = "[data-scroll-reveal]";
const backgroundSelector = "[data-scroll-reveal-background]";
const sequenceSelector = "[data-scroll-reveal-sequence]";
const sequenceDelayMs = 140;
const sequenceTargetSelector = `${revealSelector}, ${backgroundSelector}`;

const hasVisibleBackground = (backgroundColor: string): boolean =>
  backgroundColor !== "transparent" &&
  backgroundColor !== "rgba(0, 0, 0, 0)";

export const useScrollReveal = (rootRef: RefObject<HTMLElement>): void => {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(revealSelector),
    );
    const backgroundElements = Array.from(
      root.querySelectorAll<HTMLElement>(backgroundSelector),
    );

    elements.forEach((element) => {
      if (
        hasVisibleBackground(window.getComputedStyle(element).backgroundColor)
      ) {
        backgroundElements.push(element);
      }
    });

    const uniqueBackgroundElements = Array.from(new Set(backgroundElements));
    const observedElements = Array.from(
      new Set([...elements, ...uniqueBackgroundElements]),
    );

    elements.forEach((element) => {
      element.classList.add("scroll-reveal-pending");
    });

    uniqueBackgroundElements.forEach((element) => {
      const backgroundColor =
        window.getComputedStyle(element).backgroundColor;
      if (!hasVisibleBackground(backgroundColor)) return;

      element.style.setProperty(
        "--scroll-reveal-background",
        backgroundColor,
      );
      element.classList.add("scroll-reveal-background-pending");
    });

    root
      .querySelectorAll<HTMLElement>(sequenceSelector)
      .forEach((sequence) => {
        const sequenceElements = [
          ...(sequence.matches(sequenceTargetSelector) ? [sequence] : []),
          ...Array.from(
            sequence.querySelectorAll<HTMLElement>(sequenceTargetSelector),
          ),
        ].filter(
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
      observedElements.forEach((element) => {
        if (element.matches(revealSelector)) {
          element.classList.add("scroll-reveal-visible");
        }
        if (element.classList.contains("scroll-reveal-background-pending")) {
          element.classList.add("scroll-reveal-background-visible");
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target.matches(revealSelector)) {
            entry.target.classList.add("scroll-reveal-visible");
          }
          if (
            entry.target.classList.contains(
              "scroll-reveal-background-pending",
            )
          ) {
            entry.target.classList.add(
              "scroll-reveal-background-visible",
            );
          }
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    observedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [rootRef]);
};
