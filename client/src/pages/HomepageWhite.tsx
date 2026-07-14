import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const HomepageWhite = (): JSX.Element => {
  const [selectedDonation, setSelectedDonation] = useState("$100");
  const [donationFrequency, setDonationFrequency] = useState("One-Time");
  const [customAmount, setCustomAmount] = useState("");
  const [openChallenge, setOpenChallenge] = useState("01");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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
      image: "/figmaAssets/1ddb56c4332c19e514b07403985f5daf-3.png",
      bg: "bg-[#e6dfc9]",
      titleColor: "text-[#5e4540]",
      bodyColor: "text-[#5e4540]",
      reverse: false,
    },
    {
      title: "Proof, Not Just Updates",
      description:
        "Every project is tracked closely and reported back with clear data. Funders walk away with ESG-ready metrics that show real impact.",
      image: "/figmaAssets/1ddb56c4332c19e514b07403985f5daf-3-1.png",
      bg: "bg-[#7587ac]",
      titleColor: "text-white",
      bodyColor: "text-white",
      reverse: true,
    },
    {
      title: "Funding That Multiplies",
      description:
        "Contributions from corporations, foundations, and donor-advised funds are pooled into a single effort. Each dollar stretches further, and one farm project can draw from several sources.",
      image: "/figmaAssets/1ddb56c4332c19e514b07403985f5daf-3-2.png",
      bg: "bg-[#f3ebd3]",
      titleColor: "text-[#5e4540]",
      bodyColor: "text-[#5e4540]",
      reverse: false,
    },
  ];

  const teamCards: (TeamMember & { overlay: string })[] = [
    {
      image: "/figmaAssets/rectangle-88.png",
      overlay: "bg-[#7587ac]/30",
      name: "Full Name",
      credential: "One-line credential",
      bio: placeholderBio,
    },
    {
      image: "/figmaAssets/rectangle-80.png",
      overlay: "bg-[#827b3e]/30",
      name: "Full Name",
      credential: "One-line credential",
      bio: placeholderBio,
    },
    {
      image: "/figmaAssets/rectangle-87.png",
      overlay: "bg-[#bc623f]/30",
      name: "Full Name",
      credential: "One-line credential",
      bio: placeholderBio,
    },
  ];

  const donationOptions = ["$1,000", "$500", "$250", "$100", "$50", "$25"];

  return (
    <div className="min-h-screen w-full bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px] md:pt-6">
          <div className="mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-6 pt-8 md:px-[42px] md:pb-8 md:pt-[58px]">
            <img
              className="mx-auto mb-4 h-[72px] w-[72px] md:mb-6 md:h-[106px] md:w-[106px]"
              alt="Group"
              src="/figmaAssets/group-2.png"
            />
            <h1 className="mx-auto max-w-[1102px] text-center [font-family:'Playfair_Display',Helvetica] text-[42px] font-bold leading-[1.05] text-white md:text-[72px] lg:text-[110px]">
              We&apos;re Funding the Farms That Keep America Fed
            </h1>
            <img
              className="mt-6 h-auto w-full rounded-[20px] object-cover"
              alt="Rectangle"
              src="/figmaAssets/rectangle-59.png"
            />
          </div>
        </section>
        <section className="px-4 py-10 md:px-8 md:py-[140px]">
          <div className="mx-auto max-w-[893px] text-center [font-family:'Inter',Helvetica] text-xl font-normal leading-8 text-[#5e4540] md:text-[32px] md:leading-10">
            <span className="font-bold">
              Better Farms Foundation bridges the gap{" "}
            </span>
            <span>
              between donors who want to make a real impact and the farmers who
              need it most. We manage every project on the ground, handling
              everything from planning to execution.
            </span>
          </div>
        </section>
        <section className="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2">
          <div className="bg-[#bc623f] px-6 py-10 md:min-h-[720px] md:px-[94px] md:py-[154px]">
            <div className="max-w-[565px]">
              <h2 className="max-w-[561px] [font-family:'Playfair_Display',Helvetica] text-[38px] font-bold leading-[1.05] text-white md:text-[64px]">
                Building Better Farms From the Ground Up
              </h2>
              <p className="mt-8 max-w-[519px] [font-family:'Inter',Helvetica] text-lg font-normal leading-8 text-white">
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
                type="button"
                className="mt-8 h-auto rounded-lg bg-white px-[18px] py-[19px] text-[#5e4540] hover:bg-white/90"
              >
                <span className="[font-family:'Inter',Helvetica] text-lg font-medium">
                  Fund A Farm
                </span>
                <img
                  className="ml-2 h-6 w-6"
                  alt="Keyboard arrow right"
                  src="/figmaAssets/keyboard-arrow-right-2.svg"
                />
              </Button>
            </div>
          </div>
          <div className="flex flex-col bg-[#7587ac]">
            <img
              className="h-[240px] w-full object-cover grayscale md:h-[48%] md:min-h-[300px]"
              alt="Cattle in a barn"
              src="/figmaAssets/rectangle-45.png"
            />
            <div className="flex flex-1 flex-col justify-center gap-4 px-6 py-8 md:px-[52px] md:py-8">
              {impactStats.map((stat) => (
                <div
                  key={stat.value}
                  className="flex min-h-[62px] items-center justify-between gap-6 rounded-2xl border border-white/70 bg-white/10 px-6 py-3"
                >
                  <p className="max-w-[340px] [font-family:'Inter',Helvetica] text-sm font-medium leading-[normal] text-white md:text-base">
                    {stat.label}
                  </p>
                  <p className="[font-family:'Inter',Helvetica] text-3xl font-bold leading-[normal] text-white md:text-[40px]">
                    {stat.value}
                  </p>
                </div>
              ))}

              <p className="pt-1 text-center [font-family:'Inter',Helvetica] text-xs font-medium leading-[normal] text-[#2f3a56] md:text-sm">
                Sources: <span className="underline">2022 Census of Agriculture</span>,{" "}
                <span className="underline">USDA</span>,{" "}
                <span className="underline">Farm Bureau</span>
              </p>
            </div>
          </div>
        </section>
        <section>
          <img
            className="h-auto w-full"
            alt="Rectangle"
            src="/figmaAssets/rectangle-44.png"
          />
        </section>
        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[730px]">
            <h2 className="text-center [font-family:'Playfair_Display',Helvetica] text-[38px] font-bold leading-[1.05] text-[#5e4540] md:text-[64px]">
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
                          className={`[font-family:'Inter',Helvetica] text-xl font-medium leading-[normal] md:text-[28px] ${
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
                      <p className="max-w-[700px] [font-family:'Inter',Helvetica] text-base font-normal leading-7 text-[#5e4540]">
                        {item.content}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </section>
        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[861px]">
            <h2 className="text-center [font-family:'Playfair_Display',Helvetica] text-[38px] font-bold leading-[1.05] text-[#5e4540] md:text-7xl">
              We Work Like Farmers, Report Like Scientists
            </h2>
          </div>
          <div className="mx-auto mt-12 flex max-w-[1103px] flex-col gap-7">
            {workCards.map((card) => (
              <Card
                key={card.title}
                className={`overflow-hidden rounded-[20px] border-0 shadow-none ${card.bg}`}
              >
                <CardContent className="p-0">
                  <div
                    className={`grid items-center gap-0 md:min-h-[432px] md:grid-cols-[470px_1fr] ${
                      card.reverse ? "md:grid-cols-[1fr_470px]" : ""
                    }`}
                  >
                    {!card.reverse && (
                      <img
                        className="h-full w-full object-cover md:min-h-[432px]"
                        alt="Img"
                        src={card.image}
                      />
                    )}

                    <div
                      className={`flex flex-col items-start gap-6 p-6 md:p-10 ${card.reverse ? "md:pl-16" : ""}`}
                    >
                      <h3
                        className={`font-h3 text-[length:var(--h3-font-size)] font-[number:var(--h3-font-weight)] leading-[var(--h3-line-height)] tracking-[var(--h3-letter-spacing)] [font-style:var(--h3-font-style)] ${card.titleColor}`}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`[font-family:'Inter',Helvetica] text-xl font-normal leading-7 ${card.bodyColor}`}
                      >
                        {card.description}
                      </p>
                    </div>
                    {card.reverse && (
                      <img
                        className="h-full w-full object-cover md:min-h-[432px]"
                        alt="Img"
                        src={card.image}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="px-4 py-12 md:px-[39px] md:py-16">
          <div className="relative mx-auto max-w-[1372px] overflow-hidden rounded-lg">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              alt="Rectangle"
              src="/figmaAssets/rectangle-90.png"
            />
            <div className="absolute inset-0 bg-[#4a4526] opacity-80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 grid gap-10 px-6 py-10 md:grid-cols-[1fr_500px] md:px-[83px] md:py-[91px]">
              <div>
                <h2 className="max-w-[642px] [font-family:'Playfair_Display',Helvetica] text-[38px] font-bold leading-[1.05] text-white md:text-[64px]">
                  Sign up for Our Newsletter &amp; See What&apos;s Growing
                </h2>
                <p className="mt-8 max-w-[529px] [font-family:'Inter',Helvetica] text-lg font-normal leading-7 text-white">
                  We cover projects, farmers, policy shifts, and the latest
                  thinking on building a more resilient food system.
                </p>
              </div>
              <form className="flex flex-col gap-4 self-center">
                <Input
                  placeholder="Full Name"
                  className="h-[60px] rounded-lg border-0 bg-white px-[26px] [font-family:'Inter',Helvetica] text-lg font-medium text-[#5e4540]"
                />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_143px]">
                  <Input
                    type="email"
                    placeholder="Enter email"
                    className="h-[60px] rounded-lg border-0 bg-white px-[26px] [font-family:'Inter',Helvetica] text-lg font-medium text-[#5e4540]"
                  />
                  <Button
                    type="button"
                    className="h-[60px] rounded-lg bg-[#bc623f] px-[18px] py-0 text-white hover:bg-[#ab5838]"
                  >
                    <span className="[font-family:'Inter',Helvetica] text-lg font-medium">
                      Subscribe
                    </span>
                    <img
                      className="ml-2 h-6 w-6"
                      alt="Keyboard arrow right"
                      src="/figmaAssets/keyboard-arrow-right-2.svg"
                    />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto flex max-w-[1317px] flex-col items-start justify-between gap-8 md:flex-row md:gap-[308px]">
            <img
              className="h-auto w-full max-w-[406px] rounded-lg object-cover"
              alt="Rectangle"
              src="/figmaAssets/rectangle-55.png"
            />
            <img
              className="h-auto w-full max-w-[603px] rounded-[8px_0px_0px_8px] object-cover"
              alt="Rectangle"
              src="/figmaAssets/rectangle-56.png"
            />
          </div>
          <h2 className="mt-12 text-center [font-family:'Playfair_Display',Helvetica] text-[38px] font-bold leading-[1.05] text-[#5e4540] md:text-[64px]">
            Voices From the Field
          </h2>
          <div className="mx-auto mt-12 max-w-[944px] overflow-hidden">
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
                  <div className="flex h-full items-center rounded-lg bg-[#bc623f] px-6 py-10 md:px-[91px] md:py-[66px]">
                    <blockquote className="w-full text-center [font-family:'Playfair_Display',Helvetica] text-[26px] leading-[1.15] text-white md:text-[40px]">
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
                        className="[font-family:'Inter',Helvetica] text-xl font-normal text-white"
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
                className={`h-[9px] w-[9px] rounded-full transition-colors duration-300 ${
                  activeTestimonial === index
                    ? "bg-[#bc623f]"
                    : "bg-[#5e4540] hover:bg-[#827b3e]"
                }`}
              />
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-[844px]">
            <h2 className="text-center [font-family:'Playfair_Display',Helvetica] text-[38px] font-bold leading-[1.05] text-[#5e4540] md:text-[64px]">
              Led by the People Who Built Organic Agriculture
            </h2>
          </div>
          <p className="mx-auto mt-8 max-w-[846px] text-center [font-family:'Inter',Helvetica] text-lg font-normal leading-7 text-[#5e4540]">
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
                onClick={() => setSelectedMember(member)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedMember(member);
                  }
                }}
                className="flex cursor-pointer flex-col"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    className={`w-full object-cover grayscale ${index === 2 ? "h-[303px]" : "h-[375px]"}`}
                    alt="Rectangle"
                    src={member.image}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl mix-blend-multiply ${member.overlay.replace("/30", "/40")}`}
                  />
                </div>
                <div className="pt-4">
                  <h3 className="[font-family:'Inter',Helvetica] text-lg font-bold leading-7 text-[#5e4540]">
                    {member.name}
                  </h3>
                  <p className="[font-family:'Inter',Helvetica] text-lg font-normal leading-7 text-[#5e4540]">
                    {member.credential}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button
              asChild
              data-testid="button-meet-the-team"
              className="h-auto rounded-lg bg-[#7587ac] px-[18px] py-[19px] text-white hover:bg-[#6c7ea0]"
            >
              <Link href="/about#team">
                <span className="[font-family:'Inter',Helvetica] text-lg font-medium">
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
        </section>
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-10 h-[245px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)]" />
          <img
            className="h-auto w-full"
            alt="Rectangle"
            src="/figmaAssets/rectangle-114.png"
          />
          <div className="absolute inset-x-0 top-0 z-20 px-4 pt-16 md:px-8 md:pt-[240px]">
            <div className="mx-auto max-w-[875px]">
              <h2 className="text-center [font-family:'Playfair_Display',Helvetica] text-[44px] font-bold leading-[1.05] text-[#5e4540] md:text-[84px]">
                Fund a Farm Today
              </h2>
              <p className="mx-auto mt-6 max-w-[724px] text-center [font-family:'Inter',Helvetica] text-xl font-normal leading-8 text-[#5e4540] md:text-2xl">
                <span className="font-bold">
                  Your contribution can strengthen a farm for decades.{" "}
                </span>
                <span>
                  Put your dollars to work and get proof of what you&apos;ve
                  built.
                </span>
              </p>
              <div className="mx-auto mt-10 max-w-[997px] rounded-xl bg-white/80 shadow-[0px_4px_10px_#00000040] backdrop-blur-[30px]">
                <div className="flex flex-col gap-6 p-6 md:px-[55px] md:py-[36px]">
                  <p className="text-center [font-family:'Inter',Helvetica] text-lg font-bold text-[#5e4540]">
                    Every Investment Builds Something Real
                  </p>
                  <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    <span className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#5e4540]">
                      Choose Amount
                    </span>
                    <div
                      role="group"
                      aria-label="Donation frequency"
                      className="flex overflow-hidden rounded-[10px] border border-[#bcb9b9]"
                    >
                      {["One-Time", "Monthly"].map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          aria-pressed={donationFrequency === freq}
                          onClick={() => setDonationFrequency(freq)}
                          className={`px-5 py-2 [font-family:'Inter',Helvetica] text-sm font-semibold ${
                            donationFrequency === freq
                              ? "bg-[#434343] text-white"
                              : "bg-white text-[#434343]"
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div
                    role="group"
                    aria-label="Donation amount"
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
                  >
                    {donationOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selectedDonation === option}
                        onClick={() => {
                          setSelectedDonation(option);
                          setCustomAmount("");
                        }}
                        className={`flex h-[58px] items-center justify-center rounded-[10px] border [font-family:'Inter',Helvetica] text-xl font-bold leading-[normal] md:text-2xl ${
                          selectedDonation === option
                            ? "border-[#d7d7d7] bg-[#434343] text-white"
                            : "border-[#bcb9b9] bg-white text-[#434343]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex h-[58px] flex-1 items-center gap-2 rounded-[10px] border border-[#bcb9b9] bg-white px-[18px] md:max-w-[280px]">
                      <span className="[font-family:'Inter',Helvetica] text-2xl font-bold leading-[normal] text-[#5e4540]">
                        $
                      </span>
                      <input
                        id="donation-other-amount"
                        type="text"
                        inputMode="numeric"
                        aria-label="Other donation amount"
                        placeholder="Other Amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          if (e.target.value) setSelectedDonation("");
                        }}
                        className="w-full bg-transparent [font-family:'Inter',Helvetica] text-lg font-medium text-[#5e4540] outline-none placeholder:text-[#a9a29a]"
                      />
                    </div>
                    <Button
                      type="button"
                      className="h-auto rounded-lg bg-[#bc623f] px-[18px] py-[19px] text-white hover:bg-[#ab5838]"
                    >
                      <span className="[font-family:'Inter',Helvetica] text-lg font-medium">
                        Fund a Farm
                      </span>
                      <img
                        className="ml-2 h-6 w-6"
                        alt="Keyboard arrow right"
                        src="/figmaAssets/keyboard-arrow-right-2.svg"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <p className="mx-auto mt-4 max-w-[875px] text-center [font-family:'Inter',Helvetica] text-base font-bold leading-6 text-[#2f2820]">
                501(c)(3) nonprofit
                organization&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; 100% of your
                funds go to farm-level work&nbsp;&nbsp; |&nbsp;&nbsp; ESG impact
                reporting included
              </p>
            </div>
          </div>
        </section>
      </main>
      <TeamMemberDialog
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
      <SiteFooter />
    </div>
  );
};
