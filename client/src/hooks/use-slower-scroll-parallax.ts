import { useEffect, type RefObject } from "react";

export const useSlowerScrollParallax = (
  frameRef: RefObject<HTMLElement>,
  movingElementRef: RefObject<HTMLElement>,
  slowdown: number,
  maximumOffset: number,
  easeOutDurationMs = 0,
): void => {
  useEffect(() => {
    const frame = frameRef.current;
    const movingElement = movingElementRef.current;
    if (!frame || !movingElement) return;

    let animationFrame = 0;
    let transitionFrame = 0;
    const originalTransition = movingElement.style.transition;

    const updatePosition = () => {
      const rect = frame.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const frameCenter = rect.top + rect.height / 2;
      const offset = Math.max(
        -maximumOffset,
        Math.min(
          maximumOffset,
          (viewportCenter - frameCenter) * slowdown,
        ),
      );

      movingElement.style.transform = `translate3d(0, ${offset}px, 0)`;
      animationFrame = 0;
    };

    const requestPositionUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updatePosition);
      }
    };

    if (easeOutDurationMs > 0) {
      movingElement.style.transition = "none";
    }

    updatePosition();

    if (easeOutDurationMs > 0) {
      transitionFrame = window.requestAnimationFrame(() => {
        movingElement.style.transition =
          `transform ${easeOutDurationMs}ms ease-out`;
      });
    }

    window.addEventListener("scroll", requestPositionUpdate, { passive: true });
    window.addEventListener("resize", requestPositionUpdate);

    return () => {
      window.removeEventListener("scroll", requestPositionUpdate);
      window.removeEventListener("resize", requestPositionUpdate);
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(transitionFrame);
      movingElement.style.transition = originalTransition;
    };
  }, [
    easeOutDurationMs,
    frameRef,
    movingElementRef,
    maximumOffset,
    slowdown,
  ]);
};
