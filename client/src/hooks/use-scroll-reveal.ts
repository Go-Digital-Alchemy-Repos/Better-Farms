import { useLayoutEffect, type RefObject } from "react";

const revealSelector = "[data-scroll-reveal]";
const backgroundSelector = "[data-scroll-reveal-background]";
const sequenceSelector = "[data-scroll-reveal-sequence]";
const sequenceDelayMs = 140;
const autoSequenceMaximumDelayMs = 560;
const sameRowTolerancePx = 8;
const sequenceTargetSelector = `${revealSelector}, ${backgroundSelector}`;
const autoRevealCandidateSelector = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "blockquote",
  "article",
  "form",
  "figure",
  "picture",
  "img",
  "button",
  "main a",
  "footer nav a",
].join(", ");
const autoBackgroundCandidateSelector = [
  "main section",
  'main [class*="bg-"]',
  "footer",
  'footer [class*="bg-"]',
].join(", ");
const groupedRevealSelector = "article, form, figure, picture, button, a";
const transformControlledImageSelector = [
  ".hero-image-after-title",
  ".will-change-transform",
  '[data-testid="donation-section"] img',
].join(", ");

const hasVisibleBackground = (backgroundColor: string): boolean =>
  backgroundColor !== "transparent" &&
  backgroundColor !== "rgba(0, 0, 0, 0)";

export const useScrollReveal = (rootRef: RefObject<HTMLElement>): void => {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (root.hasAttribute("data-scroll-reveal-auto")) {
      root
        .querySelectorAll<HTMLElement>("main section, footer")
        .forEach((sequence) => {
          sequence.setAttribute("data-scroll-reveal-sequence", "");
          sequence.dataset.scrollRevealAutoSequence = "true";
        });

      root
        .querySelectorAll<HTMLElement>(autoRevealCandidateSelector)
        .forEach((candidate) => {
          if (!candidate.closest("main, footer")) return;

          const groupedParent = candidate.parentElement?.closest(
            groupedRevealSelector,
          );
          if (groupedParent && groupedParent !== candidate) return;

          let revealTarget = candidate;
          if (
            candidate instanceof HTMLImageElement &&
            candidate.matches(transformControlledImageSelector)
          ) {
            revealTarget = candidate.parentElement ?? candidate;
          }

          revealTarget.setAttribute("data-scroll-reveal", "");
        });

      root
        .querySelectorAll<HTMLElement>(autoBackgroundCandidateSelector)
        .forEach((candidate) => {
          if (
            hasVisibleBackground(
              window.getComputedStyle(candidate).backgroundColor,
            )
          ) {
            candidate.setAttribute("data-scroll-reveal-background", "");
          }
        });
    }

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
        ]
          .filter(
            (element) => element.closest(sequenceSelector) === sequence,
          )
          .sort((firstElement, secondElement) => {
            const firstIsVisible = firstElement.getClientRects().length > 0;
            const secondIsVisible = secondElement.getClientRects().length > 0;

            if (firstIsVisible !== secondIsVisible) {
              return firstIsVisible ? -1 : 1;
            }
            if (!firstIsVisible) return 0;

            const firstRect = firstElement.getBoundingClientRect();
            const secondRect = secondElement.getBoundingClientRect();
            const verticalDifference = firstRect.top - secondRect.top;

            if (Math.abs(verticalDifference) > sameRowTolerancePx) {
              return verticalDifference;
            }

            return firstRect.left - secondRect.left;
          });

        let currentDelay = 0;

        sequenceElements.forEach((element) => {
          element.style.setProperty(
            "--scroll-reveal-delay",
            `${currentDelay}ms`,
          );

          const nextDelay =
            currentDelay +
            (Number.parseFloat(element.dataset.scrollRevealGap ?? "") ||
              sequenceDelayMs);

          currentDelay =
            sequence.dataset.scrollRevealAutoSequence === "true"
              ? Math.min(nextDelay, autoSequenceMaximumDelayMs)
              : nextDelay;
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
