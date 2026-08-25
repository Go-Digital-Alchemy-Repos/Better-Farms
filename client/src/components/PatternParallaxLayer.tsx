import { useEffect, useRef } from "react";

type PatternParallaxLayerProps = {
  className?: string;
};

const parallaxSpeed = 0.25;

export const PatternParallaxLayer = ({
  className = "",
}: PatternParallaxLayerProps): JSX.Element => {
  const frameRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const pattern = patternRef.current;
    if (!frame || !pattern) return;

    let animationFrame = 0;

    const updatePatternPosition = () => {
      const rect = frame.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const frameCenter = rect.top + rect.height / 2;
      const maximumOffset = rect.height * 0.25;
      const offset = Math.max(
        -maximumOffset,
        Math.min(
          maximumOffset,
          (frameCenter - viewportCenter) * parallaxSpeed,
        ),
      );

      pattern.style.transform = `translate3d(0, ${offset}px, 0)`;
      animationFrame = 0;
    };

    const requestPatternUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updatePatternPosition);
      }
    };

    updatePatternPosition();
    window.addEventListener("scroll", requestPatternUpdate, { passive: true });
    window.addEventListener("resize", requestPatternUpdate);

    return () => {
      window.removeEventListener("scroll", requestPatternUpdate);
      window.removeEventListener("resize", requestPatternUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 90%, transparent 100%)",
      }}
    >
      <div
        ref={patternRef}
        className="absolute inset-x-0 -bottom-1/4 -top-1/4 will-change-transform"
        style={{
          backgroundImage: "url('/figmaAssets/pattern.svg')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};
