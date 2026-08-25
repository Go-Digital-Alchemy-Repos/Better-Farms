import { useEffect, type RefObject } from "react";

export const useOrderedViewportReveal = (
  rootRef: RefObject<HTMLElement>,
  anchorSelector: string,
  revealSelector: string,
  visibleClass: string,
  delayMs: number,
): void => {
  useEffect(() => {
    const anchors = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>(anchorSelector) ?? [],
    );
    if (!anchors.length) return;

    const eligibleAnchors = new Set<HTMLElement>();
    let nextIndex = 0;
    let sequenceTimer = 0;

    const revealAnchor = (anchor: HTMLElement) => {
      anchor
        .querySelector<HTMLElement>(revealSelector)
        ?.classList.add(visibleClass);
    };

    const revealAll = () => {
      anchors.forEach(revealAnchor);
      nextIndex = anchors.length;
    };

    const revealNextEligible = () => {
      sequenceTimer = 0;
      const nextAnchor = anchors[nextIndex];
      if (!nextAnchor || !eligibleAnchors.has(nextAnchor)) return;

      revealAnchor(nextAnchor);
      nextIndex += 1;
      sequenceTimer = window.setTimeout(revealNextEligible, delayMs);
    };

    const queueEligible = () => {
      if (sequenceTimer || nextIndex >= anchors.length) return;
      sequenceTimer = window.setTimeout(revealNextEligible, 0);
    };

    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) {
            return;
          }

          eligibleAnchors.add(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });

        queueEligible();
      },
      {
        rootMargin: "0px 0px -4% 0px",
        threshold: 0.08,
      },
    );

    anchors.forEach((anchor) => observer.observe(anchor));

    return () => {
      observer.disconnect();
      window.clearTimeout(sequenceTimer);
    };
  }, [
    anchorSelector,
    delayMs,
    revealSelector,
    rootRef,
    visibleClass,
  ]);
};
