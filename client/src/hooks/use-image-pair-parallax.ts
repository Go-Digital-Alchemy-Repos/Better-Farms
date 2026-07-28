import { useEffect, type RefObject } from "react";

export const useImagePairParallax = (
  pairRef: RefObject<HTMLElement>,
  smallImageRef: RefObject<HTMLElement>,
): void => {
  useEffect(() => {
    const pair = pairRef.current;
    const smallImage = smallImageRef.current;
    if (!pair || !smallImage) return;

    let animationFrame = 0;
    let currentOffset = 0;
    let targetOffset = 0;
    let lastFrameTime = 0;

    const calculateTargetOffset = () => {
      if (window.innerWidth < 1024) {
        currentOffset = 0;
        targetOffset = 0;
        smallImage.style.removeProperty("transform");
        return 0;
      }

      const largeImage = pair.querySelector<HTMLElement>(
        '[data-parallax-image-role="large"]',
      );
      if (!largeImage) return currentOffset;

      const pairRect = pair.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const largeHeight = largeImage.offsetHeight;
      const smallHeight = smallImage.offsetHeight;
      const progress = Math.min(
        Math.max(
          (viewportHeight - pairRect.top) / (viewportHeight + largeHeight),
          0,
        ),
        1,
      );
      const exitOffset = Math.max(0, largeHeight - smallHeight);

      return exitOffset * progress;
    };

    const animateToTarget = (time: number) => {
      const deltaTime = lastFrameTime ? Math.min(time - lastFrameTime, 64) : 16;
      lastFrameTime = time;
      const ease = 1 - Math.exp(-deltaTime / 220);

      currentOffset += (targetOffset - currentOffset) * ease;
      smallImage.style.transform = `translate3d(0, ${currentOffset}px, 0)`;

      if (Math.abs(targetOffset - currentOffset) > 0.1) {
        animationFrame = window.requestAnimationFrame(animateToTarget);
      } else {
        currentOffset = targetOffset;
        smallImage.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
        animationFrame = 0;
        lastFrameTime = 0;
      }
    };

    const updateParallaxTarget = (snap = false) => {
      targetOffset = calculateTargetOffset();

      if (window.innerWidth < 1024) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        lastFrameTime = 0;
        return;
      }

      if (snap) {
        currentOffset = targetOffset;
        smallImage.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
        return;
      }

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateToTarget);
      }
    };

    const handleScroll = () => updateParallaxTarget();
    const handleResize = () => updateParallaxTarget(true);

    updateParallaxTarget(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [pairRef, smallImageRef]);
};
