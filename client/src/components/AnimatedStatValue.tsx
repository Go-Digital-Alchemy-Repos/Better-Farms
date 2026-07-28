import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedStatValueProps = {
  className?: string;
  value: string;
};

const counterDurationMs = 800;

export const AnimatedStatValue = ({
  className = "",
  value,
}: AnimatedStatValueProps): JSX.Element => {
  const elementRef = useRef<HTMLDivElement>(null);
  const parsedValue = useMemo(() => {
    const match = value.match(/^([^0-9]*)(\d+)(.*)$/);

    return {
      prefix: match?.[1] ?? "",
      target: Number(match?.[2] ?? 0),
      suffix: match?.[3] ?? "",
    };
  }, [value]);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrame = 0;
    let startTimer = 0;
    let hasStarted = false;

    const startCounter = () => {
      if (hasStarted) return;
      hasStarted = true;

      const revealElement = element.closest<HTMLElement>(
        "[data-scroll-reveal]",
      );
      const revealDelay = revealElement
        ? Number.parseFloat(
            window
              .getComputedStyle(revealElement)
              .getPropertyValue("--scroll-reveal-delay"),
          ) || 0
        : 0;

      startTimer = window.setTimeout(() => {
        const startTime = window.performance.now();

        const updateCounter = (currentTime: number) => {
          const progress = Math.min(
            (currentTime - startTime) / counterDurationMs,
            1,
          );
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setCurrentValue(
            Math.round(parsedValue.target * easedProgress),
          );

          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(updateCounter);
          }
        };

        animationFrame = window.requestAnimationFrame(updateCounter);
      }, revealDelay);
    };

    if (!("IntersectionObserver" in window)) {
      startCounter();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;

          startCounter();
          observer.disconnect();
        },
        { threshold: 0.2 },
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
        window.clearTimeout(startTimer);
        window.cancelAnimationFrame(animationFrame);
      };
    }

    return () => {
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [parsedValue]);

  return (
    <div
      ref={elementRef}
      aria-label={value}
      className={`tabular-nums ${className}`}
    >
      <span aria-hidden="true">
        {parsedValue.prefix}
        {currentValue}
        {parsedValue.suffix}
      </span>
    </div>
  );
};
