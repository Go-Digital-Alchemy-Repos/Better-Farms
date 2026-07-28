import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedStatValueProps = {
  className?: string;
  value: string;
};

const counterDurationMs = 2000;

const getRandomValue = (
  target: number,
  progress: number,
  previousValue?: number,
): number => {
  const digits = Math.max(String(Math.abs(target)).length, 1);
  const minimum = digits === 1 ? 1 : 10 ** (digits - 1);
  const maximum = 10 ** digits - 1;
  const easedProgress = 1 - Math.pow(1 - progress, 3);
  const spread = Math.max(
    1,
    Math.round((maximum - minimum) * Math.pow(1 - easedProgress, 1.25)),
  );
  const lowerBound = Math.max(minimum, target - spread);
  const upperBound = Math.min(maximum, target + spread);

  let nextValue = target;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    nextValue =
      lowerBound + Math.floor(Math.random() * (upperBound - lowerBound + 1));
    if (nextValue !== target && nextValue !== previousValue) {
      break;
    }
  }

  if (nextValue === target) {
    return target < upperBound ? target + 1 : target - 1;
  }

  return nextValue;
};

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
  const [currentValue, setCurrentValue] = useState(() =>
    getRandomValue(parsedValue.target, 0),
  );

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
        let nextShuffleTime = startTime;
        let displayedValue = getRandomValue(parsedValue.target, 0);

        setCurrentValue(displayedValue);

        const updateCounter = (currentTime: number) => {
          const progress = Math.min(
            (currentTime - startTime) / counterDurationMs,
            1,
          );

          if (progress >= 1) {
            setCurrentValue(parsedValue.target);
            return;
          }

          if (currentTime >= nextShuffleTime) {
            displayedValue = getRandomValue(
              parsedValue.target,
              progress,
              displayedValue,
            );
            setCurrentValue(displayedValue);

            const easedProgress = 1 - Math.pow(1 - progress, 3);
            nextShuffleTime =
              currentTime + 45 + 260 * Math.pow(easedProgress, 2);
          }

          animationFrame = window.requestAnimationFrame(updateCounter);
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
