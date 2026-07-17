import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CompactDonationCard } from "@/components/CompactDonationCard";

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
    bg: "bg-[#f3ebd3]",
    text: "text-[#5e4540]",
  },
  {
    id: "02",
    title: "Assessment",
    body: "Our team visits your farm to assess conditions, refine the project scope, and set measurable targets together.",
    bg: "bg-[#bc623f]",
    text: "text-white",
  },
  {
    id: "03",
    title: "Funding",
    body: "Better Farms assembles the capital needed to fully resource your project. You never have to chase donors or write grant applications.",
    bg: "bg-[#e6dfc9]",
    text: "text-[#5e4540]",
  },
  {
    id: "04",
    title: "Execution",
    body: "Professional project managers work alongside you to oversee every phase of construction and implementation on your farm.",
    bg: "bg-[#7587ac]",
    text: "text-white",
  },
  {
    id: "05",
    title: "Measurement",
    body: "Rigorous data collection begins on day one and continues throughout the project to document the real impact on your operation.",
    bg: "bg-[#f3ebd3]",
    text: "text-[#5e4540]",
  },
];

export const ForFarmers = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px]">
          <div className="mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-6 pt-10 md:px-[42px] md:pb-10 md:pt-[95px]">
            <p className="text-center text-2xl font-bold text-white md:text-[28px]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              Better Farms Start Here
            </p>
            <h1 className="mx-auto mt-6 max-w-[1040px] text-center text-[42px] font-bold leading-[1.05] text-white md:text-[68px] lg:text-[82px] xl:text-[96px]">
              The Farm You&apos;ve Been Wanting to Build
            </h1>
            <img
              className="mt-8 h-auto max-h-[520px] w-full rounded-[20px] object-cover md:mt-[116px]"
              alt="Red barn farm with silo and cornfields"
              src="/figmaAssets/red_barn_farm.webp"
            />
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-[100px]">
          <p className="mx-auto max-w-[760px] text-center [font-family:'Inter',Helvetica] text-lg leading-8 text-[#5e4540] md:text-xl">
            <span className="font-bold">
              Every farmer has a project that could change everything.{" "}
            </span>
            A new barn. Better water systems. Cleaner energy. Healthier soil.
            Tell us what matters most, and let&apos;s see what we can build
            together.
          </p>
        </section>

        <section className="bg-gradient-to-b from-[#7587ac] to-[#4d5b78] px-4 py-12 md:px-8 md:pb-[105px] md:pt-20">
          <h2 className="mx-auto max-w-[640px] text-center text-[38px] font-bold leading-[1.1] text-white md:text-[52px]">
            The Farm Projects We Fund
          </h2>
          <div className="mx-auto mt-12 grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,740px)_420px] md:items-start">
            <div className="overflow-hidden rounded-2xl md:self-start">
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
                  className="rounded-2xl bg-[#faf5e4] p-7"
                >
                  <img
                    className="h-[220px] w-full rounded-lg object-cover"
                    alt={card.title}
                    src={card.image}
                  />
                  <h3 className="mt-6 text-[26px] font-bold text-[#5e4540]">
                    {card.title}
                  </h3>
                  <p className="mt-3 [font-family:'Inter',Helvetica] text-base leading-7 text-[#5e4540]">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:pb-0 md:pt-24">
          <div className="mx-auto max-w-[1100px]">
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
                type="button"
                data-testid="button-apply-now"
                className="h-auto rounded-lg bg-[#7587ac] px-[24px] py-[15px] text-white hover:bg-[#6c7ea0]"
              >
                <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                  Apply Now
                </span>
                <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
              </Button>
            </div>
          </div>
          <img
            className="mt-14 h-[320px] w-full object-cover md:mt-[430px] md:h-[520px]"
            alt="Farmers shaking hands in a field"
            src="/sourcePhotos/for-farmers/parallax.webp"
          />
        </section>

        <section className="px-4 py-10 md:px-8 md:py-[140px]">
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-2">
            <img
              className="h-[340px] w-full rounded-2xl object-cover grayscale"
              alt="Chickens in a coop"
              src="/sourcePhotos/for-farmers/chickens.webp"
            />
            <img
              className="h-[340px] w-full rounded-2xl object-cover md:mt-20"
              alt="Cow closeup in pasture"
              src="/sourcePhotos/for-farmers/cow.webp"
            />
          </div>
        </section>

        <section className="relative overflow-hidden pt-10 md:pt-[110px]">
          <div className="relative z-10 px-4 md:px-8">
            <h2 className="text-center text-[44px] font-bold leading-[1.05] text-[#5e4540] md:text-[72px]">Fund a Farm Today</h2>
            <p className="mx-auto mt-6 max-w-[724px] text-center [font-family:'Inter',Helvetica] text-lg leading-8 text-[#5e4540] md:text-xl">
              <span className="font-bold">Your contribution can strengthen a farm for decades. </span>
              Put your dollars to work and get proof of what you&apos;ve built.
            </p>
            <CompactDonationCard />
            <p className="mx-auto mt-6 max-w-[875px] text-center [font-family:'Inter',Helvetica] text-sm font-bold leading-6 text-[#2f2820]">501(c)(3) nonprofit organization&nbsp;&nbsp;|&nbsp;&nbsp;100% of your funds go to farm-level work&nbsp;&nbsp;|&nbsp;&nbsp;ESG impact reporting included</p>
          </div>
          <div className="relative mt-[-40px]">
            <div className="absolute inset-x-0 top-0 z-[5] h-[180px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)]" />
            <img className="h-[420px] w-full object-cover" alt="Chickens in tall grass at sunset" src="/sourcePhotos/for-farmers/hero.webp" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
