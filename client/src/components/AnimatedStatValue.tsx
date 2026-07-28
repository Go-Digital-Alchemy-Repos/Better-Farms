import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type AnimatedStatValueProps = {
  className?: string;
  value: string;
};

const reelStopIndex = 34;
const reelSlowdownIndex = 31;

const buildReel = (targetDigit: number): number[] => {
  const digits: number[] = [];

  for (let index = 0; index < reelStopIndex; index += 1) {
    let digit = Math.floor(Math.random() * 10);

    if (digit === digits.at(-1)) {
      digit = (digit + 1 + Math.floor(Math.random() * 8)) % 10;
    }

    digits.push(digit);
  }

  digits.push(targetDigit);
  return digits;
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
      targetDigits: match?.[2] ?? "0",
      suffix: match?.[3] ?? "",
    };
  }, [value]);
  const reels = useMemo(
    () =>
      parsedValue.targetDigits
        .split("")
        .map((digit) => buildReel(Number(digit))),
    [parsedValue.targetDigits],
  );
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let startTimer = 0;
    let observer: IntersectionObserver | null = null;
    let hasStarted = false;

    const startReels = () => {
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
        setIsSpinning(true);
      }, revealDelay);
    };

    if (!("IntersectionObserver" in window)) {
      startReels();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;

          startReels();
          observer?.disconnect();
        },
        { threshold: 0.2 },
      );

      observer.observe(element);
    }

    return () => {
      observer?.disconnect();
      window.clearTimeout(startTimer);
    };
  }, [parsedValue]);

  const reelStyle = {
    "--slot-cruise-offset": `-${reelSlowdownIndex}em`,
    "--slot-final-offset": `-${reelStopIndex}em`,
  } as CSSProperties;

  return (
    <div
      ref={elementRef}
      aria-label={value}
      className={`tabular-nums ${className}`}
    >
      <span aria-hidden="true" className="slot-machine-value">
        <span>{parsedValue.prefix}</span>
        {reels.map((reel, reelIndex) => (
          <span className="slot-reel" key={reelIndex}>
            <span
              className={`slot-reel-track ${
                isSpinning ? "slot-reel-track--spinning" : ""
              }`}
              style={reelStyle}
            >
              {reel.map((digit, digitIndex) => (
                <span
                  className="slot-reel-digit"
                  key={`${digitIndex}-${digit}`}
                >
                  {digit}
                </span>
              ))}
            </span>
          </span>
        ))}
        <span>{parsedValue.suffix}</span>
      </span>
    </div>
  );
};
