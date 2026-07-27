import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DonationSection } from "@/components/DonationSection";
import { Link } from "wouter";

const projectCards = [
  {
    title: "Climate Resilience",
    body: "Unpredictable weather puts every season at risk. Our team helps you plant hardier crops, strengthen water management, and diversify against the unexpected. A farm that adapts is a farm that lasts.",
    image: "/sourcePhotos/for-farmers/irrigation.webp",
  },
  {
    title: "Sustainable Infrastructure",
    body: "That aging barn or outdated setup is quietly draining your bottom line. We bring in professionals to design and manage upgrades built around how you actually work. Solid infrastructure pays for itself season after season.",
    image: "/sourcePhotos/for-farmers/barn.webp",
  },
  {
    title: "Regenerative Practices",
    body: "Years of conventional farming wear down even the best land. Cover crops, rotational grazing, and composting systems can bring it back. Healthier soil means stronger yields and carbon capture you can measure.",
    image: "/sourcePhotos/for-farmers/grass.webp",
  },
  {
    title: "Energy Independence",
    body: "Utility bills keep climbing, and margins keep tightening. We design solar, wind, or biodigestion systems tailored to your operation. Generate your own power and avoid volatile energy markets.",
    image: "/sourcePhotos/for-farmers/solar.webp",
  },
  {
    title: "Local Food Systems",
    body: "Growing great food only matters if buyers can get it. Cold storage, processing capacity, and distribution connections put your harvest within reach of local markets. Shorter supply chains mean more revenue for you and fresher food for your community.",
    image: "/sourcePhotos/for-farmers/food-processing.webp",
  },
];

const processSteps = [
  {
    id: "01",
    title: "Application",
    body: "Submit a project proposal describing your operation, the challenge you're facing, and the outcomes you're hoping to achieve.",
    icon: "/sourcePhotos/for-farmers/application.svg",
    bg: "bg-[#f3ebd3]",
    text: "text-[#5e4540]",
  },
  {
    id: "02",
    title: "Assessment",
    body: "Our team visits your farm to assess conditions, refine the project scope, and set measurable targets together.",
    icon: "/sourcePhotos/for-farmers/assessment.svg",
    bg: "bg-[#bc623f]",
    text: "text-white",
  },
  {
    id: "03",
    title: "Funding",
    body: "Better Farms assembles the capital needed to fully resource your project. You never have to chase donors or write grant applications.",
    icon: "/sourcePhotos/for-farmers/leaf.svg",
    bg: "bg-[#e6dfc9]",
    text: "text-[#5e4540]",
  },
  {
    id: "04",
    title: "Execution",
    body: "Professional project managers work alongside you to oversee every phase of construction and implementation on your farm.",
    icon: "/sourcePhotos/for-farmers/execution.svg",
    bg: "bg-[#7587ac]",
    text: "text-white",
  },
  {
    id: "05",
    title: "Measurement",
    body: "Rigorous data collection begins on day one and continues throughout the project to document the real impact on your operation.",
    icon: "/sourcePhotos/for-farmers/measurement.svg",
    bg: "bg-[#f3ebd3]",
    text: "text-[#5e4540]",
  },
  {
    id: "06",
    title: "Impact Report",
    body: "Donors receive detailed impact reports featuring ESG metrics, carbon accounting, and verified operational outcomes.",
    icon: "/sourcePhotos/for-farmers/impact-report-icon.png",
    bg: "bg-[#5e4540]",
    text: "text-white",
  },
];

const topoPatternStyle = {
  backgroundImage: "url('/figmaAssets/pattern.svg')",
  backgroundPosition: "center top",
  backgroundRepeat: "no-repeat" as const,
  backgroundSize: "cover",
  WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 90%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, #000 0%, #000 90%, transparent 100%)",
};

export const ForFarmers = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px] lg:pt-0">
          <div className="hero-panel mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-4 md:px-[42px] md:pb-[42px]">
            <p className="hero-eyebrow text-center text-2xl font-bold text-white md:text-[28px]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              Better Farms Start Here
            </p>
            <h1 className="hero-title mx-auto text-center font-bold text-white">
              The Farm You&apos;ve Been Wanting to Build
            </h1>
            <img
              className="hero-image-after-title w-full rounded-[20px]"
              alt="Red barn farm with silo and cornfields"
              src="/figmaAssets/red_barn_farm.webp"
            />
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-[100px]">
          <p className="mx-auto max-w-[760px] text-center [font-family:'Inter',Helvetica] text-lg leading-8 text-[#5e4540] md:text-[28px] md:leading-10">
            <span className="font-bold">
              Every farmer has a project that could change everything.{" "}
            </span>
            A new barn. Better water systems. Cleaner energy. Healthier soil.
            Tell us what matters most, and let&apos;s see what we can build
            together.
          </p>
        </section>

        <section className="bg-gradient-to-b from-[#7587ac] to-[#4d5b78] py-12 md:pb-[105px] md:pt-20">
          <div className="px-4 md:px-8">
            <h2 className="mx-auto max-w-[640px] text-center text-[38px] font-bold leading-[1.1] text-white md:text-[52px]">
              The Farm Projects We Fund
            </h2>
          </div>
          <div className="foundation-layout mt-12 grid gap-10 md:items-start">
            <div className="hidden overflow-hidden rounded-r-2xl md:sticky md:top-28 md:block md:self-start">
              <img
                className="h-[560px] w-full object-cover object-bottom md:h-[891px]"
                alt="Family walking through a livestock barn"
                src="/sourcePhotos/for-farmers/walking-barn.webp"
              />
            </div>
            <div className="flex flex-col gap-12">
              {projectCards.map((card) => (
                <article
                  key={card.title}
                  data-testid={`card-project-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-2xl bg-[#faf5e4] p-6"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      className="h-[190px] w-full object-cover"
                      alt={card.title}
                      src={card.image}
                    />
                  </div>
                  <div className="pt-6">
                    <h3 className="text-[26px] font-bold text-[#5e4540]">
                      {card.title}
                    </h3>
                    <p className="mt-3 [font-family:'Inter',Helvetica] text-base leading-6 text-[#5e4540]">
                      {card.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-4 py-12 md:px-8 md:pb-0 md:pt-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-80" style={topoPatternStyle} />
          <div className="relative z-10 mx-auto max-w-[1100px]">
            <h2 className="max-w-[520px] text-[38px] font-bold leading-[1.1] text-[#5e4540] md:text-[52px]">
              The 6-Step Process for Better Farms
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {processSteps.map((step) => (
                <article
                  key={step.id}
                  data-testid={`card-step-${step.id}`}
                  className={`rounded-2xl p-7 ${step.bg} ${step.text}`}
                >
                  <img
                    className="mb-7 h-16 w-20 object-contain object-left"
                    alt=""
                    aria-hidden="true"
                    src={step.icon}
                  />
                  <h3 className="text-[24px] font-bold">
                    {step.id}. {step.title}
                  </h3>
                  <p className="mt-4 [font-family:'Inter',Helvetica] text-[15px] leading-6">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button
                asChild
                data-testid="button-apply-now"
                className="h-auto rounded-lg bg-[#7587ac] px-[24px] py-[15px] text-white hover:bg-[#6c7ea0]"
              >
                <Link href="/contact">
                  <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                    Apply Now
                  </span>
                  <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative z-0 hidden overflow-hidden rounded-b-[20px] md:-mx-8 md:-mt-6 md:block md:w-[calc(100%+4rem)]">
            <img
              className="h-[520px] w-full object-cover"
              alt="Farmers shaking hands in a field"
              src="/sourcePhotos/for-farmers/parallax.webp"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[180px] bg-gradient-to-b from-white via-white/70 to-transparent" />
          </div>
        </section>

        <section className="overflow-hidden py-10 md:pb-12 md:pt-[140px]">
          <div className="edge-image-pair edge-image-pair--large-right grid-cols-1 items-start">
            <img
              className="edge-image-pair-small rounded-lg grayscale"
              alt="Chickens in a coop"
              src="/sourcePhotos/for-farmers/chickens.webp"
            />
            <img
              className="edge-image-pair-large rounded-lg"
              alt="Cow closeup in pasture"
              src="/sourcePhotos/for-farmers/cow.webp"
            />
          </div>
        </section>

        <DonationSection
          sectionClassName="pt-10 md:pt-12"
          imageWrapperClassName="-mt-[114px] md:-mt-[177px]"
          imageAlt="Chickens in tall grass at sunset"
          imageSrc="/sourcePhotos/for-farmers/hero.webp"
        />
      </main>
      <SiteFooter />
    </div>
  );
};
