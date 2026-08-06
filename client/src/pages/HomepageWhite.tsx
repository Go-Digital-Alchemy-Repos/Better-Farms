import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import {
  TeamMemberDialog,
  type TeamMember,
} from "@/components/TeamMemberDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DonationSection } from "@/components/DonationSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedStatValue } from "@/components/AnimatedStatValue";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { johnFoster, stevenWray, tracyFavre } from "@/data/team";

export const HomepageWhite = (): JSX.Element => {
  const pageRef = useRef<HTMLDivElement>(null);
  const parallaxPairRef = useRef<HTMLDivElement>(null);
  const parallaxSmallImageRef = useRef<HTMLDivElement>(null);
  const fieldParallaxImageRef = useRef<HTMLImageElement>(null);
  const workCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [openChallenge, setOpenChallenge] = useState("01");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useScrollReveal(pageRef);

  useEffect(() => {
    const pair = parallaxPairRef.current;
    const smallImage = parallaxSmallImageRef.current;
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
        ".edge-image-pair-large",
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
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const image = fieldParallaxImageRef.current;
    const frame = image?.parentElement;
    if (!image || !frame) return;

    let animationFrame = 0;

    const updateParallax = () => {
      animationFrame = 0;

      const frameRect = frame.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const frameCenter = frameRect.top + frameRect.height / 2;
      const maxOffset = frameRect.height * 0.09;
      const offset = Math.min(
        Math.max((viewportCenter - frameCenter) * 0.1, -maxOffset),
        maxOffset,
      );

      image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.2)`;
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

  useEffect(() => {
    let animationFrame = 0;

    const setCardProgress = (
      cardFrame: HTMLDivElement,
      cardProgress: number,
      copyProgress: number,
    ) => {
      const easedCardProgress =
        cardProgress * cardProgress * (3 - 2 * cardProgress);
      const easedCopyProgress =
        copyProgress * copyProgress * (3 - 2 * copyProgress);
      const card = cardFrame.querySelector<HTMLElement>(
        "[data-work-card-surface]",
      );
      const copy = cardFrame.querySelector<HTMLElement>("[data-work-card-copy]");

      if (card) {
        card.style.opacity = `${cardProgress}`;
        card.style.transform = `scale(${0.84 + easedCardProgress * 0.16})`;
      }

      if (copy) {
        copy.style.opacity = `${copyProgress}`;
        copy.style.transform = `translate3d(0, ${
          36 * (1 - easedCopyProgress)
        }px, 0)`;
      }
    };

    const updateCardProgress = () => {
      animationFrame = 0;

      workCardRefs.current.forEach((cardFrame) => {
        if (!cardFrame) return;

        const cardRect = cardFrame.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const revealStart = viewportHeight * 0.96;
        const revealDistance = Math.max(viewportHeight * 0.58, 280);
        const cardProgress = Math.min(
          Math.max((revealStart - cardRect.top) / revealDistance, 0),
          1,
        );
        const copyProgress = Math.min(
          Math.max((cardProgress - 0.22) / 0.68, 0),
          1,
        );

        setCardProgress(cardFrame, cardProgress, copyProgress);
      });
    };

    const requestCardUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateCardProgress);
    };

    updateCardProgress();
    window.addEventListener("scroll", requestCardUpdate, { passive: true });
    window.addEventListener("resize", requestCardUpdate);
    window.addEventListener("load", requestCardUpdate);

    return () => {
      window.removeEventListener("scroll", requestCardUpdate);
      window.removeEventListener("resize", requestCardUpdate);
      window.removeEventListener("load", requestCardUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const testimonials = [
    {
      quote:
        '"We knew what we needed to do to make our operation more resilient, but we couldn\'t get the financing. Better Farms didn\'t just write a check—they helped us design the project, manage the installation, and now we have data showing exactly how much our water usage has dropped. For the first time in years, I\'m not worried about the next drought."',
      attribution: "— Tristan Ludlow, SpringRight Farms, North Carolina",
    },
    {
      quote:
        '"Our transition to organic felt impossible until Better Farms stepped in. They walked our fields with us, built a plan we could actually follow, and stayed involved through certification. Two seasons later our soil is healthier and our margins are stronger than they\'ve ever been."',
      attribution: "— Placeholder Name, Placeholder Farm, Iowa",
    },
    {
      quote:
        '"As a first-generation farmer, I didn\'t have family land or family knowledge to lean on. Better Farms connected me with mentors, funded our irrigation upgrade, and treated our small operation like it mattered. That belief changed everything for us."',
      attribution: "— Placeholder Name, Placeholder Ranch, Montana",
    },
  ];

  useEffect(() => {
    const autoplayInterval = window.setInterval(() => {
      setActiveTestimonial(
        (currentTestimonial) =>
          (currentTestimonial + 1) % testimonials.length,
      );
    }, 8000);

    return () => window.clearInterval(autoplayInterval);
  }, []);

  const impactStats = [
    {
      label: "Average age of U.S. farm producers in 2022.",
      value: "58",
      sourceName: "2022 Census of Agriculture",
      sourceUrl: "https://data.nass.usda.gov/Newsroom/2024/02-13-2024.php",
    },
    {
      label: "U.S. farms lost between 2017 and 2024.",
      value: "160K+",
      sourceName: "USDA Economic Research Service",
      sourceUrl: "https://ers.usda.gov/data-products/charts-of-note/111304",
    },
    {
      label:
        "Crop losses left uncovered by insurance and prior disaster aid, 2022–2024.",
      value: "$26B",
      sourceName: "American Farm Bureau Federation",
      sourceUrl:
        "https://www.fb.org/market-intel/hurricanes-heat-and-hardship-counting-2024s-crop-losses",
    },
  ];

  const challenges = [
    {
      id: "01",
      title: "Credit and Insurance Gaps",
      content:
        "Large operations get crop insurance that covers their risk. Smaller farms, especially organic producers, don't get the same protection. When disaster strikes, they're on their own.",
    },
    {
      id: "02",
      title: "Rising Costs, Shrinking Margins",
      content:
        "Building a laying hen barn or constructing a greenhouse costs nearly double what it did five years ago. Feed, labor, and equipment keep climbing, but prices haven't kept pace.",
    },
    {
      id: "03",
      title: "Policy Whiplash",
      content:
        "Independent farms are built on long horizons. Restoring soil, raising a herd, or establishing a market takes years. Agricultural policy plays a vital role in that work. Farmers do best when programs match the pace of nature. Greater continuity in policy would help growers plan with confidence and keep family farms thriving.",
    },
    {
      id: "04",
      title: "Climate Uncertainty",
      content:
        "Weather patterns that farmers relied on for generations no longer hold. Droughts hit harder. Storms arrive at the wrong times. Adapting requires capital that most small operations don't have.",
    },
    {
      id: "05",
      title: "A Generation Walking Away",
      content:
        "The average farmer is nearing retirement, and their kids have seen the struggle up close. Many are selling land to developers rather than passing it on. Once that ground is paved, it never grows food again.",
    },
  ];

  const workCards = [
    {
      title: "On-the-Ground Work",
      description:
        "Our team partners with farmers to build infrastructure and put sustainable practices into action. Projects get finished. Farms get stronger.",
      image: "/sourcePhotos/homepage/farmer-and-child.webp",
      bg: "bg-[#e6dfc9]",
      titleColor: "text-[#5e4540]",
      bodyColor: "text-[#5e4540]",
      reverse: false,
    },
    {
      title: "Proof, Not Just Updates",
      description:
        "Every project is tracked closely and reported back with clear data. Funders walk away with ESG-ready metrics that show real impact.",
      image: "/sourcePhotos/homepage/computer.webp",
      bg: "bg-[#7587ac]",
      titleColor: "text-white",
      bodyColor: "text-white",
      reverse: true,
    },
    {
      title: "Funding That Multiplies",
      description:
        "Contributions from corporations, foundations, and donor-advised funds are pooled into a single effort. Each dollar stretches further, and one farm project can draw from several sources.",
      image: "/sourcePhotos/homepage/hand.webp",
      bg: "bg-[#f3ebd3]",
      titleColor: "text-[#5e4540]",
      bodyColor: "text-[#5e4540]",
      reverse: false,
    },
  ];

  const teamCards: (TeamMember & { overlay: string })[] = [
    {
      ...stevenWray,
      overlay: "rgba(117, 135, 172, 0.30)",
    },
    {
      ...johnFoster,
      overlay: "rgba(130, 123, 62, 0.36)",
    },
    {
      ...tracyFavre,
      overlay: "rgba(188, 98, 63, 0.32)",
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px] md:pt-4 lg:pt-0">
          <div
            className="hero-load-sequence hero-panel mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-4 md:px-[42px] md:pb-[42px]"
          >
            <img
              className="hero-load-content hero-load-content--1 hero-eyebrow-mark mx-auto h-[72px] w-[72px] md:h-[106px] md:w-[106px]"
              alt=""
              aria-hidden="true"
              decoding="async"
              width="107"
              height="107"
              src="/sourcePhotos/homepage/logo-icon.svg"
            />
            <h1
              className="hero-load-content hero-load-content--2 hero-title mx-auto text-center [font-family:'Playfair_Display',Helvetica] font-bold text-white"
            >
              We&apos;re Funding the Farms That Keep America Fed
            </h1>
            <div
              className="hero-load-image hero-image-frame w-full overflow-hidden rounded-[20px]"
            >
              <img
                className="hero-image-after-title h-full w-full object-cover"
                alt="Aerial view of farmland"
                decoding="async"
                fetchPriority="high"
                width="1314"
                height="608"
                srcSet="/sourcePhotos/homepage/farm-aerial-768.jpg 768w, /sourcePhotos/homepage/farm-aerial.webp 1314w"
                sizes="(max-width: 768px) calc(100vw - 32px), 1302px"
                src="/sourcePhotos/homepage/farm-aerial.webp"
              />
            </div>
          </div>
        </section>
        <section className="px-4 py-10 md:px-8 md:py-[120px]">
          <div
            data-scroll-reveal
            className="desktop-text-balance mx-auto max-w-[893px] text-center [font-family:'Inter',Helvetica] text-lg font-normal leading-[1.6] tracking-normal text-[#5e4540] md:text-[28px] md:leading-[1.5]"
          >
            <span className="font-bold">
              Better Farms Foundation bridges the gap{" "}
            </span>
            <span>
              between donors who want to make a real impact and the farmers who
              need it most. We manage every project on the ground, handling
              everything from{" "}
              <span className="whitespace-nowrap">planning to execution.</span>
            </span>
          </div>
        </section>
        <section
          data-scroll-reveal-sequence
          className="grid w-full grid-cols-1 gap-[3px] overflow-hidden bg-white min-[921px]:grid-cols-2"
        >
          <div
            data-scroll-reveal-background
            className="bg-[#bc623f] px-6 py-10 md:min-h-[612px] md:px-[94px] md:py-[100px]"
          >
            <div className="max-w-[565px]">
              <h2
                data-scroll-reveal
                className="max-w-[561px] [font-family:'Playfair_Display',Helvetica] text-[38px] font-bold leading-[1.15] tracking-normal text-white md:text-[64px] md:leading-[1.08]"
              >
                Building Better Farms From the Ground Up
              </h2>
              <p
                data-scroll-reveal
                className="mt-8 max-w-[519px] [font-family:'Inter',Helvetica] text-lg font-normal leading-[1.6] tracking-normal text-white"
              >
                <span className="font-bold leading-9">
                  The majority of the U.S. food supply is grown by independent
                  family farms.
                </span>
                <span>
                  {" "}
                  But these farms are vanishing at an alarming rate. Better
                  Farms funds and manages projects with hands-on expertise to
                  strengthen these operations from the ground up. The results
                  are better farms, healthier land, and a food supply you can
                  count on.
                </span>
              </p>
              <Button
                data-scroll-reveal
                asChild
                arrowMotion
                className="mt-8 h-auto rounded-lg bg-white pb-[19px] pl-[18px] pr-[14px] pt-[19px] text-[#5e4540] hover:bg-white/90 hover:text-[#5e4540]"
              >
                <Link href="/fund-a-farm">
                  <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                    Fund A Farm
                  </span>
                  <ChevronRight
                    className="ml-2 h-6 w-6 text-[#5e4540]"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-[3px] bg-white">
            <img
              data-scroll-reveal
              className="h-[240px] w-full object-cover object-left grayscale md:h-[48%] md:min-h-[300px]"
              alt="Cattle in a barn"
              loading="lazy"
              decoding="async"
              src="/sourcePhotos/homepage/grayscale-cow.webp"
            />
            <div
              data-scroll-reveal-background
              className="flex flex-1 flex-col justify-center gap-4 bg-[#7587ac] px-6 py-8 md:px-[52px] md:py-8"
            >
              {impactStats.map((stat) => (
                <a
                  data-scroll-reveal
                  data-scroll-reveal-gap="300"
                  key={stat.value}
                  href={stat.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${stat.label} ${stat.value}. View source: ${stat.sourceName}`}
                  className="flex min-h-[62px] items-center justify-between gap-6 rounded-full border border-white/70 bg-white/10 px-6 py-3 transition-colors duration-300 ease-out hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#7587ac]"
                >
                  <p className="max-w-[340px] [font-family:'Inter',Helvetica] text-sm font-medium leading-[1.6] tracking-normal text-white md:text-base">
                    {stat.label}
                  </p>
                  <AnimatedStatValue
                    value={stat.value}
                    className="[font-family:'Inter',Helvetica] text-[32px] font-bold leading-[1.15] tracking-normal text-white md:text-[40px]"
                  />
                </a>
              ))}

              <p
                data-scroll-reveal
                className="pt-1 text-center [font-family:'Inter',Helvetica] text-sm font-medium leading-[1.6] tracking-normal text-[#2f3a56] md:text-base"
              >
                Sources:{" "}
                {impactStats.map((stat, index) => (
                  <span key={stat.sourceName}>
                    {index > 0 && ", "}
                    <a
                      className="underline underline-offset-2 hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      href={stat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {stat.sourceName}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>
        <section
          data-scroll-reveal
          className="relative aspect-[1442/520] overflow-hidden rounded-b-[40px] border-t-[3px] border-white md:rounded-b-[64px]"
        >
          <img
            ref={fieldParallaxImageRef}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            alt="Agricultural specialists walking through a wheat field"
            loading="lazy"
            decoding="async"
            src="/figmaAssets/rectangle-44.webp"
          />
        </section>
        <section
          data-scroll-reveal-sequence
          className="px-4 py-12 md:px-8 md:py-16"
        >
          <div data-scroll-reveal className="mx-auto max-w-[730px]">
            <h2 className="desktop-text-balance text-center [font-family:'Playfair_Display',Helvetica] text-[38px] font-bold leading-[1.15] tracking-normal text-[#5e4540] md:text-[64px] md:leading-[1.08]">
              What Independent Farmers Are Up Against
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-[1099px]">
            <Accordion
              type="single"
              collapsible
              value={openChallenge}
              onValueChange={setOpenChallenge}
              className="space-y-0"
            >
              {challenges.map((item) => {
                const isOpen = openChallenge === item.id;
                return (
                  <AccordionItem
                    data-scroll-reveal
                    key={item.id}
                    value={item.id}
                    className={`border-none ${isOpen ? "mb-8" : ""}`}
                  >
                    <AccordionTrigger
                      className={`group border border-[#5e4540] px-5 py-5 hover:no-underline md:px-[27px] md:py-[19px] [&>svg]:hidden ${
                        isOpen
                          ? "bg-[#8396be] text-white"
                          : "-mt-px bg-white/90 text-[#5e4540]"
                      }`}
                    >
                      <div className="flex flex-1 items-center gap-5 text-left">
                        <span
                          className={`w-[32px] shrink-0 [font-family:'Inter',Helvetica] text-xs font-medium leading-7 ${
                            isOpen ? "text-white" : "text-[#5e4540]"
                          }`}
                        >
                          {item.id}.
                        </span>
                        <span
                          className={`h-[52px] w-px shrink-0 ${
                            isOpen ? "bg-white/80" : "bg-[#5e4540]/50"
                          }`}
                        />
                        <span
                          className={`transition-transform duration-300 ease-out group-hover:translate-x-3 [font-family:'Inter',Helvetica] text-xl font-medium leading-[1.25] tracking-normal md:text-[24px] ${
                            isOpen ? "text-white" : "text-[#5e4540]"
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 pl-4 text-3xl font-light leading-none ${
                          isOpen ? "text-white" : "text-[#5e4540]"
                        }`}
                      >
                        {isOpen ? "\u2212" : "+"}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-8 pt-8 md:px-[125px]">
                      <p className="max-w-[700px] [font-family:'Inter',Helvetica] text-[1.125rem] font-normal leading-[1.6] tracking-normal text-[#5e4540]">
                        {item.content}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </section>
        <section
          data-scroll-reveal-sequence
          className="px-4 py-12 md:px-8 md:py-16"
        >
          <div data-scroll-reveal className="mx-auto max-w-[861px]">
            <h2 className="desktop-text-balance text-center [font-family:'Playfair_Display',Helvetica] text-[38px] font-bold leading-[1.15] tracking-normal text-[#5e4540] md:text-[64px] md:leading-[1.08]">
              We Work Like Farmers, Report Like Scientists
            </h2>
          </div>
          <div
            data-scroll-reveal-skip
            className="mx-auto mt-12 flex max-w-[1103px] flex-col gap-7"
          >
            {workCards.map((card, index) => (
              <div
                ref={(cardElement) => {
                  workCardRefs.current[index] = cardElement;
                }}
                key={card.title}
                className="md:h-[420px] lg:h-[380px]"
              >
                <Card
                  data-work-card-surface
                  className={`work-card-scroll-progress h-full overflow-hidden rounded-[20px] border-0 shadow-none ${card.bg}`}
                >
                  <CardContent className="h-full p-0">
                    <div className="grid h-full items-stretch gap-0 md:grid-cols-2">
                      {!card.reverse && (
                        <img
                          className="h-[240px] w-full object-cover md:h-full md:min-h-0"
                          alt={card.title}
                          loading="lazy"
                          decoding="async"
                          src={card.image}
                        />
                      )}

                      <div
                        data-work-card-copy
                        className="work-card-scroll-copy flex h-full flex-col items-start justify-center gap-5 p-6 text-left md:min-h-0 md:p-10 lg:px-[54px]"
                      >
                        <h3
                          className={`[font-family:'Playfair_Display',Helvetica] text-[32px] font-bold leading-[1.15] tracking-normal md:text-[40px] ${card.titleColor}`}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={`[font-family:'Inter',Helvetica] text-base font-normal leading-[1.6] tracking-normal md:text-lg ${card.bodyColor}`}
                        >
                          {card.description}
                        </p>
                      </div>
                      {card.reverse && (
                        <img
                          className="h-[240px] w-full object-cover md:h-full md:min-h-0"
                          alt={card.title}
                          loading="lazy"
                          decoding="async"
                          src={card.image}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div
            data-scroll-reveal
            data-scroll-reveal-sequence
            className="mt-9 flex justify-center"
          >
            <Button
              asChild
              arrowMotion
              className="h-auto rounded-lg bg-[#7587ac] pb-[19px] pl-[18px] pr-[14px] pt-[19px] text-white hover:bg-[#6c7ea0]"
            >
              <Link href="/fund-a-farm">
                <span>Fund A Farm</span>
                <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
              </Link>
            </Button>
          </div>
        </section>
        <NewsletterSection
          imageAlt="Cornfield with farm buildings"
          imageSrc="/figmaAssets/cornfield_farm.webp"
          overlayColor="#827B3E"
        />
        <section className="overflow-hidden py-12 md:pb-[160px] md:pt-[128px]">
          <div
            ref={parallaxPairRef}
            data-scroll-reveal-anchor
            className="edge-image-pair edge-image-pair--images edge-image-pair--large-right grid-cols-1 items-start"
          >
            <img
              data-scroll-reveal
              data-scroll-reveal-baseline
              className="image-pair-large-reveal edge-image-pair-large rounded-lg lg:col-start-2 lg:row-start-1"
              alt="Farmer carrying freshly harvested vegetables"
              loading="lazy"
              decoding="async"
              src="/sourcePhotos/homepage/vegetable-crate.webp"
            />
            <div
              ref={parallaxSmallImageRef}
              className="edge-image-pair-small will-change-transform lg:col-start-1 lg:row-start-1"
            >
              <img
                className="h-full w-full rounded-lg object-cover"
                alt="Rows of crops stretching toward the horizon"
                loading="lazy"
                decoding="async"
                src="/sourcePhotos/homepage/crops.webp"
              />
            </div>
          </div>
          <div data-scroll-reveal-sequence className="px-4 md:px-8">
            <div
              data-scroll-reveal
              className="mx-auto mt-12 max-w-[790px] overflow-hidden md:mt-[128px]"
            >
            <div
              className="flex transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 px-1"
                  aria-hidden={activeTestimonial !== index}
                >
                  <div className="flex h-full items-center rounded-lg bg-[#bc623f] px-6 py-10 md:px-[70px] md:py-12">
                    <blockquote className="w-full text-center [font-family:'Playfair_Display',Helvetica] text-[26px] leading-[1.18] text-white md:text-[28px]">
                      <span
                        className="[font-family:'Playfair_Display',Helvetica] italic font-bold"
                        data-testid={`text-testimonial-quote-${index}`}
                      >
                        {testimonial.quote}
                      </span>
                      <span className="[font-family:'Inter',Helvetica] text-xl md:text-[32px]">
                        <br />
                        <br />
                      </span>
                      <footer
                        className="[font-family:'Inter',Helvetica] text-base font-normal text-white"
                        data-testid={`text-testimonial-attribution-${index}`}
                      >
                        {testimonial.attribution}
                      </footer>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
            </div>
            <div className="mx-auto mt-8 flex w-fit items-center gap-[9px]">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                data-testid={`button-testimonial-dot-${index}`}
                onClick={() => setActiveTestimonial(index)}
                className="group flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5e4540] focus-visible:ring-offset-2"
              >
                <span
                  aria-hidden="true"
                  className={`h-[9px] w-[9px] rounded-full transition-colors duration-300 ${
                    activeTestimonial === index
                      ? "bg-[#bc623f]"
                      : "bg-[#5e4540] group-hover:bg-[#827b3e]"
                  }`}
                />
              </button>
            ))}
            </div>
            <div data-scroll-reveal-sequence>
              <div
                data-scroll-reveal
                className="mx-auto mt-16 max-w-[844px] md:mt-24"
              >
                <h2 className="desktop-text-balance text-center [font-family:'Playfair_Display',Helvetica] text-[38px] font-bold leading-[1.15] tracking-normal text-[#5e4540] md:text-[52px] md:leading-[1.1]">
                Led by the People Who Built Organic Agriculture
              </h2>
              </div>
              <p
                data-scroll-reveal
                className="desktop-text-balance mx-auto mt-8 max-w-[846px] text-center [font-family:'Inter',Helvetica] text-lg font-normal leading-[1.6] tracking-normal text-[#5e4540]"
              >
              The people running Better Farms helped define organic standards,
              build national brands, and advise the USDA. They&apos;re putting
              that expertise to work for the farms that need it most.
              </p>
              <div className="mx-auto mt-12 grid max-w-[1077px] gap-6 md:grid-cols-3">
            {teamCards.map((member, index) => (
              <article
                key={`${member.name}-${index}`}
                role="button"
                tabIndex={0}
                data-testid={`card-team-member-${index}`}
                data-scroll-reveal
                onClick={() => setSelectedMember(member)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedMember(member);
                  }
                }}
                className="group flex cursor-pointer flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto">
                  <img
                    className={`h-full w-full object-cover grayscale transition-transform duration-300 ease-out group-hover:scale-[1.08] ${index === 1 ? "md:h-[375px]" : "md:h-[303px]"}`}
                    alt={`${member.name} portrait`}
                    loading="lazy"
                    decoding="async"
                    src={member.image}
                  />
                  <div
                    className="absolute inset-0 rounded-2xl mix-blend-multiply"
                    style={{ backgroundColor: member.overlay }}
                  />
                </div>
                <div className="pt-4">
                  <h3 className="[font-family:'Inter',Helvetica] text-base font-bold leading-[1.25] tracking-normal text-[#5e4540] md:text-[24px]">
                    {member.name}
                  </h3>
                  <p className="whitespace-pre-line [font-family:'Inter',Helvetica] text-base font-normal leading-[1.6] tracking-normal text-[#5e4540]">
                    {member.credential}
                  </p>
                </div>
              </article>
            ))}
              </div>
              <div
                data-scroll-reveal
                data-scroll-reveal-sequence
                className="mt-12 flex justify-center"
              >
            <Button
              asChild
              arrowMotion
              data-testid="button-meet-the-team"
              className="h-auto rounded-lg bg-[#7587ac] pb-[19px] pl-[18px] pr-[14px] pt-[19px] text-white hover:bg-[#6c7ea0]"
            >
              <Link href="/about#team">
                <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                  Meet The Team
                </span>
                <img
                  className="ml-2 h-6 w-6"
                  alt=""
                  aria-hidden="true"
                  src="/figmaAssets/keyboard-arrow-right-2.svg"
                />
              </Link>
            </Button>
              </div>
            </div>
          </div>
        </section>
        <div>
          <DonationSection
            sectionClassName="pt-16 md:pt-[78px]"
            imageWrapperClassName="-mt-[114px] md:-mt-[177px]"
            imageAlt="Tractor applying crop protection in a farm field"
            imageSrc="/sourcePhotos/homepage/tractor-spraying.webp"
            headingClassName="[font-family:'Playfair_Display',Helvetica] text-[44px] md:text-[64px]"
            descriptionClassName="text-xl md:text-2xl"
          />
        </div>
      </main>
      <TeamMemberDialog
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
      <SiteFooter />
    </div>
  );
};
