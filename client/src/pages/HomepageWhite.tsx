import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import {
  TeamMemberDialog,
  type TeamMember,
  placeholderBio,
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

export const HomepageWhite = (): JSX.Element => {
  const pageRef = useRef<HTMLDivElement>(null);
  const parallaxPairRef = useRef<HTMLDivElement>(null);
  const parallaxSmallImageRef = useRef<HTMLDivElement>(null);
  const [openChallenge, setOpenChallenge] = useState("01");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useScrollReveal(pageRef);

  useEffect(() => {
    const pair = parallaxPairRef.current;
    const smallImage = parallaxSmallImageRef.current;
    if (!pair || !smallImage) return;

    let animationFrame = 0;

    const updateParallax = () => {
      animationFrame = 0;

      if (window.innerWidth < 1024) {
        smallImage.style.removeProperty("transform");
        return;
      }

      const largeImage = pair.querySelector<HTMLElement>(
        ".edge-image-pair-large",
      );
      if (!largeImage) return;

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
      const entryOffset = 48;
      const exitOffset = Math.max(entryOffset, largeHeight - smallHeight);
      const easedProgress = progress * progress * (3 - 2 * progress);
      const offset =
        entryOffset + (exitOffset - entryOffset) * easedProgress;

      smallImage.style.transform = `translate3d(0, ${offset}px, 0)`;
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

  const impactStats = [
    {
      label: "The average age of American farmers today.",
      value: "58",
    },
    {
      label: "Farms lost in the U.S. in just seven years.",
      value: "160K+",
    },
    {
      label: "Disaster losses farmers absorbed without insurance since 2022.",
      value: "$26B",
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
      image: "/figmaAssets/rectangle-88.webp",
      overlay: "rgba(117, 135, 172, 0.30)",
      name: "Full Name",
      credential: "One-line credential",
      bio: placeholderBio,
    },
    {
      image: "/figmaAssets/rectangle-80.webp",
      overlay: "rgba(130, 123, 62, 0.36)",
      name: "Full Name",
      credential: "One-line credential",
      bio: placeholderBio,
    },
    {
      image: "/figmaAssets/rectangle-87.webp",
      overlay: "rgba(188, 98, 63, 0.32)",
      name: "Full Name",
      credential: "One-line credential",
      bio: placeholderBio,
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px] md:pt-4 lg:pt-0">
          <div
            data-scroll-reveal-background
            data-scroll-reveal-sequence
            className="hero-panel mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-4 md:px-[42px] md:pb-[42px]"
          >
            <img
              data-scroll-reveal
              className="hero-eyebrow-mark mx-auto h-[72px] w-[72px] md:h-[106px] md:w-[106px]"
              alt="Group"
              src="/sourcePhotos/homepage/logo-icon.svg"
            />
            <h1
              data-scroll-reveal
              className="hero-title mx-auto text-center [font-family:'Playfair_Display',Helvetica] font-bold text-white"
            >
              We&apos;re Funding the Farms That Keep America Fed
            </h1>
            <div
              data-scroll-reveal
              className="hero-image-frame w-full overflow-hidden rounded-[20px]"
            >
              <img
                className="hero-image-after-title h-full w-full object-cover"
                alt="Aerial view of farmland"
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
              src="/sourcePhotos/homepage/grayscale-cow.webp"
            />
            <div
              data-scroll-reveal-background
              className="flex flex-1 flex-col justify-center gap-4 bg-[#7587ac] px-6 py-8 md:px-[52px] md:py-8"
            >
              {impactStats.map((stat) => (
                <div
                  data-scroll-reveal
                  data-scroll-reveal-gap="300"
                  key={stat.value}
                  className="flex min-h-[62px] items-center justify-between gap-6 rounded-full border border-white/70 bg-white/10 px-6 py-3"
                >
                  <p className="max-w-[340px] [font-family:'Inter',Helvetica] text-sm font-medium leading-[1.6] tracking-normal text-white md:text-base">
                    {stat.label}
                  </p>
                  <AnimatedStatValue
                    value={stat.value}
                    className="[font-family:'Inter',Helvetica] text-[32px] font-bold leading-[1.15] tracking-normal text-white md:text-[40px]"
                  />
                </div>
              ))}

              <p
                data-scroll-reveal
                className="pt-1 text-center [font-family:'Inter',Helvetica] text-sm font-medium leading-[1.6] tracking-normal text-[#2f3a56] md:text-base"
              >
                Sources: <span className="underline">2022 Census of Agriculture</span>,{" "}
                <span className="underline">USDA</span>,{" "}
                <span className="underline">Farm Bureau</span>
              </p>
            </div>
          </div>
        </section>
        <section className="border-t-[3px] border-white">
          <img
            data-scroll-reveal
            className="h-auto w-full"
            alt="Rectangle"
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
                    data-scroll-reveal-gap="300"
                    key={item.id}
                    value={item.id}
                    className={`border-none ${isOpen ? "mb-8" : ""}`}
                  >
                    <AccordionTrigger
                      className={`border border-[#5e4540] px-5 py-5 hover:no-underline md:px-[27px] md:py-[19px] [&>svg]:hidden ${
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
                          className={`[font-family:'Inter',Helvetica] text-xl font-medium leading-[1.25] tracking-normal md:text-[24px] ${
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
          <div className="mx-auto mt-12 flex max-w-[1103px] flex-col gap-7">
            {workCards.map((card) => (
              <Card
                data-scroll-reveal
                key={card.title}
                className={`overflow-hidden rounded-[20px] border-0 shadow-none md:h-[420px] lg:h-[380px] ${card.bg}`}
              >
                <CardContent className="h-full p-0">
                  <div className="grid h-full items-stretch gap-0 md:grid-cols-2">
                    {!card.reverse && (
                      <img
                        className="h-[240px] w-full object-cover md:h-full md:min-h-0"
                        alt="Img"
                        src={card.image}
                      />
                    )}

                    <div
                      className="flex h-full flex-col items-start justify-center gap-5 p-6 text-left md:min-h-0 md:p-10 lg:px-[54px]"
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
                        alt="Img"
                        src={card.image}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div data-scroll-reveal className="mt-9 flex justify-center">
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
        <div data-scroll-reveal>
          <NewsletterSection
            imageAlt="Rectangle"
            imageSrc="/figmaAssets/rectangle-90.webp"
            overlayColor="#827B3E"
          />
        </div>
        <section className="overflow-hidden py-12 md:pb-[160px] md:pt-[128px]">
          <div
            ref={parallaxPairRef}
            data-scroll-reveal-sequence
            className="edge-image-pair edge-image-pair--images edge-image-pair--large-right grid-cols-1 items-start"
          >
            <img
              data-scroll-reveal
              data-scroll-reveal-gap="180"
              className="edge-image-pair-large rounded-lg lg:col-start-2 lg:row-start-1"
              alt="Farmer carrying freshly harvested vegetables"
              src="/sourcePhotos/homepage/vegetable-crate.webp"
            />
            <div
              ref={parallaxSmallImageRef}
              className="edge-image-pair-small will-change-transform lg:col-start-1 lg:row-start-1"
            >
              <img
                data-scroll-reveal
                className="h-full w-full rounded-lg object-cover"
                alt="Rows of crops stretching toward the horizon"
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
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    className={`w-full object-cover grayscale transition-transform duration-300 ease-out group-hover:scale-[1.08] ${index === 1 ? "h-[375px]" : "h-[303px]"}`}
                    alt="Rectangle"
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
                  <p className="[font-family:'Inter',Helvetica] text-base font-normal leading-[1.6] tracking-normal text-[#5e4540]">
                    {member.credential}
                  </p>
                </div>
              </article>
            ))}
              </div>
              <div data-scroll-reveal className="mt-12 flex justify-center">
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
                  alt="Keyboard arrow right"
                  src="/figmaAssets/keyboard-arrow-right-2.svg"
                />
              </Link>
            </Button>
              </div>
            </div>
          </div>
        </section>
        <div data-scroll-reveal>
          <DonationSection
            sectionClassName="pt-16 md:pt-[78px]"
            imageWrapperClassName="-mt-[114px] md:-mt-[177px]"
            imageAlt="Rectangle"
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
