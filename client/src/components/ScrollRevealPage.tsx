import { useRef, type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type ScrollRevealPageProps = {
  children: ReactNode;
  className?: string;
};

export const ScrollRevealPage = ({
  children,
  className,
}: ScrollRevealPageProps): JSX.Element => {
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} data-scroll-reveal-auto className={className}>
      {children}
    </div>
  );
};
