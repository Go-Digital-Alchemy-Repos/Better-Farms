import { useEffect, useRef } from "react";
import { CompactDonationCard } from "@/components/CompactDonationCard";

type DonationSectionProps = {
  imageSrc: string;
  imageAlt: string;
  headingLevel?: "h1" | "h2";
  sectionClassName?: string;
  imageWrapperClassName?: string;
  imagePositionClassName?: string;
  breatheImage?: boolean;
  headingClassName?: string;
  descriptionClassName?: string;
};

export function DonationSection({
  imageSrc,
  imageAlt,
  headingLevel = "h2",
  sectionClassName = "pt-10",
  imageWrapperClassName = "mt-10",
  imagePositionClassName = "",
  breatheImage = false,
  headingClassName = "text-[44px] md:text-[72px]",
  descriptionClassName = "text-lg md:text-xl",
}: DonationSectionProps): JSX.Element {
  const Heading = headingLevel;
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageFrame = imageFrameRef.current;
    const parallaxLayer = parallaxLayerRef.current;
    if (!imageFrame || !parallaxLayer) return;

    let animationFrame = 0;

    const updateParallax = () => {
      animationFrame = 0;

      const frameRect = imageFrame.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const frameCenter = frameRect.top + frameRect.height / 2;
      const maxOffset = frameRect.height * 0.25;
      const offset = Math.min(
        Math.max((frameCenter - viewportCenter) * 0.2, -maxOffset),
        maxOffset,
      );

      parallaxLayer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.52)`;
    };

    const requestParallaxUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestParallaxUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestParallaxUpdate);

    return () => {
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      data-testid="donation-section"
      className={`relative overflow-hidden ${sectionClassName}`}
    >
      <div className="relative z-10 px-4 md:px-8">
        <Heading
          className={`text-center font-bold leading-[1.05] text-[#5e4540] ${headingClassName}`}
        >
          Fund a Farm Today
        </Heading>
        <p
          className={`mx-auto mt-6 max-w-[724px] text-center [font-family:'Inter',Helvetica] font-normal leading-8 text-[#5e4540] ${descriptionClassName}`}
        >
          <span className="font-bold">
            Your contribution can strengthen a farm for decades.{" "}
          </span>
          <span>
            Put your dollars to work and get proof of what you&apos;ve built.
          </span>
        </p>
        <CompactDonationCard />
        <p
          data-testid="donation-assurance"
          className="relative z-10 mx-auto mt-8 max-w-[875px] text-center [font-family:'Inter',Helvetica] text-sm font-bold leading-6 text-[#2f2820]"
        >
          501(c)(3) nonprofit organization&nbsp;&nbsp;|&nbsp;&nbsp;100% of your
          funds go to farm-level work&nbsp;&nbsp;|&nbsp;&nbsp;ESG impact
          reporting included
        </p>
      </div>
      <div
        ref={imageFrameRef}
        className={`relative overflow-hidden ${imageWrapperClassName}`}
      >
        <div className="absolute inset-x-0 -top-px z-[5] h-[161px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] md:h-[221px]" />
        <div
          ref={parallaxLayerRef}
          className="h-[380px] w-full will-change-transform md:h-[590px]"
        >
          <img
            data-testid="donation-background-image"
            className={`h-full w-full object-cover ${breatheImage ? "hero-image-after-title" : ""} ${imagePositionClassName}`}
            alt={imageAlt}
            src={imageSrc}
          />
        </div>
      </div>
    </section>
  );
}
