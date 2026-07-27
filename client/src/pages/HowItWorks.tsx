import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DonationSection } from "@/components/DonationSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Link } from "wouter";

const foundationCards = [
  {
    title: "Climate Resilience",
    body: "Weather patterns keep shifting, putting harvests at risk. We fund drought-resistant infrastructure, water management systems, and diversified planting to help farms adapt. Operations gain the flexibility to thrive in any conditions.",
    image: "/sourcePhotos/for-farmers/irrigation.webp",
  },
  {
    title: "Sustainable Infrastructure",
    body: "Aging barns, old equipment, and worn fencing slow farms down. Our team funds physical upgrades that improve daily operations and cut long-term costs. Farms run more smoothly and are built for the future.",
    image: "/sourcePhotos/for-farmers/barn.webp",
  },
  {
    title: "Regenerative Practices",
    body: "Healthy soil grows healthy farms, yet years of conventional methods have worn it down. We support cover cropping, agroforestry, composting, and pollinator habitat that bring soil back to life. Land rebuilds, carbon gets stored, and yields improve over time.",
    image: "/sourcePhotos/for-farmers/grass.webp",
  },
  {
    title: "Energy Independence",
    body: "Utility costs eat into already tight margins. We help farms lower expenses through solar, efficient equipment, and other upgrades. Savings stay with the producer, where they make the biggest difference.",
    image: "/sourcePhotos/for-farmers/solar.webp",
  },
  {
    title: "Local Food Systems",
    body: "Small farms grow great food, but often can't reach nearby buyers. We fund processing equipment, cold storage, and distribution hubs that connect fields to tables. Producers expand their reach, and communities get steady access to local food.",
    image: "/sourcePhotos/for-farmers/food-processing.webp",
  },
];

const processSteps = [
  {
    id: "01",
    title: "Application",
    body: "Farmers submit project proposals describing their needs, goals, and expected outcomes for our team to review.",
    icon: "/sourcePhotos/for-farmers/application.svg",
    bg: "bg-[#f3ebd3]",
    text: "text-[#5e4540]",
  },
  {
    id: "02",
    title: "Assessment",
    body: "Our staff visits the farm to evaluate conditions, refine the project scope, and establish measurable targets alongside the farmer.",
    icon: "/sourcePhotos/for-farmers/assessment.svg",
    bg: "bg-[#bc623f]",
    text: "text-white",
  },
  {
    id: "03",
    title: "Funding",
    body: "We assemble capital from corporate donors, foundations, and donor-advised funds to fully fund the project.",
    icon: "/sourcePhotos/for-farmers/leaf.svg",
    bg: "bg-[#e6dfc9]",
    text: "text-[#5e4540]",
  },
  {
    id: "04",
    title: "Execution",
    body: "Professional project managers work alongside farmers to oversee every phase of construction and implementation on-site.",
    icon: "/sourcePhotos/for-farmers/execution.svg",
    bg: "bg-[#7587ac]",
    text: "text-white",
  },
  {
    id: "05",
    title: "Measurement",
    body: "Rigorous data collection begins on day one, continues throughout the project, and beyond completion.",
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
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat" as const,
  backgroundSize: "cover",
  WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 90%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, #000 0%, #000 90%, transparent 100%)",
};

const trackingColumns = [
  {
    title: "Environmental",
    items: [
      "Carbon reduction and sequestration",
      "Water conservation",
      "Soil health",
      "Biodiversity and pollinator habitat",
    ],
  },
  {
    title: "Social",
    items: [
      "Farm jobs created and preserved",
      "Local food access",
      "Producer wellbeing",
      "Next-generation farmer recruitment",
    ],
  },
  {
    title: "Governance",
    items: [
      "Project documentation",
      "Independent verification",
      "Donor and producer accountability",
      "ESG-aligned reporting",
    ],
  },
];

export const HowItWorks = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px] lg:pt-0">
          <div className="hero-panel mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-4 md:px-[42px] md:pb-[42px]">
            <p className="hero-eyebrow text-center text-2xl font-bold text-white md:text-[28px]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              Better Farms Start With a Better Process
            </p>
            <h1 className="hero-title mx-auto text-center font-bold text-white">
              Invest in Farm Projects for Future Generations
            </h1>
            <img
              className="hero-image-after-title w-full rounded-[20px]"
              alt="Apple harvest in an orchard"
              src="/sourcePhotos/how-it-works/orchard.webp"
            />
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-[110px]">
          <p className="mx-auto max-w-[820px] text-center [font-family:'Inter',Helvetica] text-lg font-normal leading-[1.6] tracking-normal text-[#5e4540] md:text-[28px] md:leading-[1.5]">
            Your contribution builds farms ready for whatever comes next.
            Stronger soil, smarter systems, and lasting infrastructure give
            producers what they need to thrive for decades ahead.
          </p>
        </section>

        <section className="pb-14">
          <div className="px-4 md:px-8">
            <h2 className="mx-auto max-w-[640px] text-center text-[36px] font-bold leading-[1.15] tracking-normal text-[#5e4540] md:text-[52px] md:leading-[1.1]">
              The Foundation of a Better Farm
            </h2>
            <p className="mx-auto mt-6 max-w-[770px] text-center [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540] md:text-lg">
              Every farm faces different challenges, but the barriers to success
              fall into predictable categories. We focus our resources on the
              five most critical threats to independent farms.
            </p>
          </div>
          <div className="foundation-layout mt-12 grid gap-10">
            <div className="hidden overflow-hidden rounded-r-2xl md:sticky md:top-28 md:block md:self-start">
              <img
                className="h-[560px] w-full object-cover md:h-[891px]"
                alt="Two farmers inspecting crops together in a field"
                src="/sourcePhotos/how-it-works/farmers-inspecting-field.png"
              />
            </div>
            <div className="flex flex-col gap-8">
              {foundationCards.map((card) => (
                <article
                  key={card.title}
                  data-testid={`card-foundation-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
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
                    <h3 className="text-xl font-bold leading-[1.25] tracking-normal text-[#5e4540] md:text-[24px]">
                      {card.title}
                    </h3>
                    <p className="mt-3 [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540]">
                      {card.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <NewsletterSection
          flushBottom
          imageAlt="Farm with silo"
          imageSrc="/figmaAssets/farm_silo.webp"
        />

        <section className="relative overflow-hidden px-4 pb-0 pt-12 md:px-[29px] md:pb-0 md:pt-16">
          <div className="relative -mx-4 -mt-12 px-4 pt-12 md:-mx-[29px] md:-mt-16 md:px-[29px] md:pt-16">
            <div className="pointer-events-none absolute inset-0 opacity-80" style={topoPatternStyle} />
            <div className="relative z-10 mx-auto max-w-[1100px]">
              <h2 className="max-w-[520px] text-[36px] font-bold leading-[1.15] tracking-normal text-[#5e4540] md:text-[52px] md:leading-[1.1]">
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
                    <h3 className="text-xl font-bold leading-[1.25] tracking-normal md:text-[24px]">
                      {step.id}. {step.title}
                    </h3>
                    <p className="mt-4 [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal">
                      {step.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="relative z-20 -mx-4 mt-14 md:-mx-[29px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[170px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.94)_44%,rgba(255,255,255,0)_100%)] md:h-[230px]" />
            <img
              className="h-[320px] w-full rounded-b-[30px] object-cover md:h-[420px]"
              alt="Farmers shaking hands in a field"
              src="/sourcePhotos/how-it-works/parallax.webp"
            />
          </div>
        </section>

        <section className="relative z-10 mt-[-30px] pb-14">
          <div className="relative w-full overflow-hidden rounded-b-[30px] bg-gradient-to-b from-[#7587ac] to-[#4d5b78] px-6 pb-20 pt-24 md:px-[80px] md:pb-[120px] md:pt-[105px]">
            <div className="pointer-events-none absolute inset-0 opacity-45" style={topoPatternStyle} />
            <div className="relative z-10">
              <h2 className="mx-auto max-w-[720px] text-center text-[36px] font-bold leading-[1.15] tracking-normal text-white md:text-[52px] md:leading-[1.1]">
                Tracking Everything From Carbon to Crop Yield
              </h2>
              <p className="mx-auto mt-8 max-w-[760px] text-center [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-white/90 md:text-lg">
                Traditional nonprofit reporting leaves donors guessing about real
                impact. Better Farms tracks ESG metrics throughout every project
                using a clear methodology.
              </p>
              <div className="tracking-cards-container">
                <div className="tracking-card-connector relative mt-20 h-[82px] w-full" aria-hidden="true">
                  <div className="tracking-card-connector-horizontal absolute top-10 h-px bg-white/60" />
                  <div className="tracking-card-connector-branch absolute bottom-0 top-10 w-px -translate-x-1/2 bg-white/60" />
                  <div className="tracking-card-connector-branch absolute bottom-0 top-0 w-px -translate-x-1/2 bg-white/60" />
                  <div className="tracking-card-connector-branch absolute bottom-0 top-10 w-px translate-x-1/2 bg-white/60" />
                </div>
                <div className="tracking-card-grid">
                  {trackingColumns.map((col) => (
                    <div
                      key={col.title}
                      data-testid={`card-tracking-${col.title.toLowerCase()}`}
                      className="tracking-card rounded-xl bg-[#F3EBD3] shadow-[0_14px_26px_rgba(47,40,32,0.28)]"
                    >
                      <h3 className="tracking-card-title font-bold text-[#5e4540]">
                        {col.title}
                      </h3>
                      <ul className="mt-8">
                        {col.items.map((item) => (
                          <li
                            key={item}
                            className="border-b border-[#5e4540]/50 py-3 [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540] last:border-b-0 md:text-lg"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-0 pt-12 md:pb-0 md:pt-16 lg:pt-20">
          <div className="relative mx-auto max-w-[1400px] md:pt-[66px]">
            <blockquote
              className="relative z-20 mx-auto w-[min(360px,88vw)] text-center text-[#bc623f] md:absolute md:right-[15%] md:top-0 md:mx-0 md:w-[570px] md:-translate-y-[35%]"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              <div className="rotate-[5deg] text-[27px] leading-[1.08] md:text-[32px]">
                <span className="md:hidden">
                  &quot;Farmers don&apos;t need more research papers. They need
                  someone to show up with a plan, the funding, and the know-how
                  to make their operation stronger. That&apos;s the job.&quot;
                </span>
                <span className="hidden md:block">
                  <span className="block">
                    &quot;Farmers don&apos;t need more research
                  </span>
                  <span className="block">
                    papers. They need someone to show up
                  </span>
                  <span className="block">
                    with a plan, the funding, and the know-
                  </span>
                  <span className="block">
                    how to make their operation stronger.
                  </span>
                  <span className="block">That&apos;s the job.&quot;</span>
                </span>
              </div>
              <footer className="mt-5 rotate-0 [font-family:'Inter',Helvetica] text-sm text-[#bc623f] md:text-base">
                — Name
              </footer>
            </blockquote>
            <div
              className="relative z-0 overflow-hidden rounded-[20px]"
              style={{ aspectRatio: "3888 / 1264" }}
            >
              <img
                className="absolute inset-x-0 top-0 block h-auto w-full"
                alt="Livestock grazing on pasture"
                src="/sourcePhotos/how-it-works/grazing-pasture-hq.jpg"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[10%] bg-gradient-to-b from-white via-white/50 to-transparent" />
            </div>
          </div>
        </section>

        <section className="overflow-hidden py-12 md:py-16">
          <div className="edge-image-pair edge-image-pair--large-right grid-cols-1 items-center">
            <div className="w-full max-w-[440px]">
              <h2 className="text-[36px] font-bold leading-[1.15] tracking-normal text-[#5e4540] md:text-[52px] md:leading-[1.1]">
                Feeding Your ESG Goals
              </h2>
              <p className="mt-6 max-w-[440px] [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540]">
                Numbers prove the work, but stories move people. Better Farms
                delivers both. Every project comes with verified impact data
                and the human stories behind it. This gives you reporting that
                satisfies your board and resonates with your stakeholders.
              </p>
              <Button
                asChild
                data-testid="button-fund-a-farm-esg"
                className="mt-8 h-auto rounded-lg bg-[#7587ac] pb-[19px] pl-[18px] pr-[14px] pt-[19px] text-white hover:bg-[#6c7ea0]"
              >
                <Link href="/fund-a-farm">
                  <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                    Fund a Farm
                  </span>
                  <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                </Link>
              </Button>
            </div>
            <img
              className="edge-image-pair-large rounded-[10px]"
              alt="Farmer reviewing data in a wheat field"
              src="/figmaAssets/farmer_wheat_tablet.webp"
            />
          </div>
          <div className="esg-partnership-row mx-auto mt-12 grid max-w-[1100px] items-center gap-10 px-4 md:grid-cols-2 md:px-8">
            <img
              className="order-1 hidden aspect-[50/48] w-full rounded-[10px] object-cover md:block"
              alt="Pig on pasture"
              src="/sourcePhotos/how-it-works/red-pig.webp"
            />
            <div className="esg-partnership-copy order-2">
              <h2 className="text-[36px] font-bold leading-[1.15] tracking-normal text-[#5e4540] md:text-[52px] md:leading-[1.1]">
                Great Partnerships Produce Greater Impact
              </h2>
              <p className="mt-6 max-w-[440px] [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540]">
                Real change happens where boots meet soil. Bring us your
                boldest ideas for agriculture, and we&apos;ll put them to work
                on farms that need them. Every project delivers outcomes you
                can stand behind. Partner with us today, and together we will
                deliver results that matter.
              </p>
              <Button
                asChild
                data-testid="button-start-partnership"
                className="mt-8 h-auto rounded-lg bg-[#7587ac] pb-[19px] pl-[18px] pr-[14px] pt-[19px] text-white hover:bg-[#6c7ea0]"
              >
                <Link href="/contact">
                  <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                    Start a Partnership
                  </span>
                  <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <DonationSection
          sectionClassName="pt-16 md:pt-[78px]"
          imageWrapperClassName="-mt-[114px] md:-mt-[177px]"
          imageAlt="Farmers reviewing a clipboard in a field"
          imageSrc="/sourcePhotos/how-it-works/couple-reviewing-clipboard.jpg"
          headingClassName="[font-family:'Playfair_Display',Helvetica] text-[44px] md:text-[64px]"
          descriptionClassName="text-xl md:text-2xl"
        />
      </main>
      <SiteFooter />
    </div>
  );
};
