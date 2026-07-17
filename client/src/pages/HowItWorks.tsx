import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CompactDonationCard } from "@/components/CompactDonationCard";

const foundationCards = [
  {
    title: "Climate Resilience",
    body: "Weather patterns keep shifting, putting harvests at risk. We fund drought-resistant infrastructure, water management systems, and diversified planting to help farms adapt. Operations gain the flexibility to thrive in any conditions.",
    image: "/figmaAssets/drip_irrigation.webp",
  },
  {
    title: "Sustainable Infrastructure",
    body: "Aging barns, old equipment, and worn fencing slow farms down. Our team funds physical upgrades that improve daily operations and cut long-term costs. Farms run more smoothly and are built for the future.",
    image: "/figmaAssets/barn_infrastructure.webp",
  },
  {
    title: "Regenerative Practices",
    body: "Healthy soil grows healthy farms, yet years of conventional methods have worn it down. We support cover cropping, agroforestry, composting, and pollinator habitat that bring soil back to life. Land rebuilds, carbon gets stored, and yields improve over time.",
    image: "/figmaAssets/regenerative_practices.webp",
  },
  {
    title: "Energy Independence",
    body: "Utility costs eat into already tight margins. We help farms lower expenses through solar, efficient equipment, and other upgrades. Savings stay with the producer, where they make the biggest difference.",
    image: "/figmaAssets/solar_farm.webp",
  },
  {
    title: "Local Food Systems",
    body: "Small farms grow great food, but often can't reach nearby buyers. We fund processing equipment, cold storage, and distribution hubs that connect fields to tables. Producers expand their reach, and communities get steady access to local food.",
    image: "/figmaAssets/food_processing.webp",
  },
];

const processSteps = [
  {
    id: "01",
    title: "Application",
    body: "Farmers submit project proposals describing their needs, goals, and expected outcomes for our team to review.",
    bg: "bg-[#f3ebd3]",
    text: "text-[#5e4540]",
  },
  {
    id: "02",
    title: "Assessment",
    body: "Our staff visits the farm to evaluate conditions, refine the project scope, and establish measurable targets alongside the farmer.",
    bg: "bg-[#bc623f]",
    text: "text-white",
  },
  {
    id: "03",
    title: "Funding",
    body: "We assemble capital from corporate donors, foundations, and donor-advised funds to fully fund the project.",
    bg: "bg-[#e6dfc9]",
    text: "text-[#5e4540]",
  },
  {
    id: "04",
    title: "Execution",
    body: "Professional project managers work alongside farmers to oversee every phase of construction and implementation on-site.",
    bg: "bg-[#7587ac]",
    text: "text-white",
  },
  {
    id: "05",
    title: "Measurement",
    body: "Rigorous data collection begins on day one, continues throughout the project, and beyond completion.",
    bg: "bg-[#f3ebd3]",
    text: "text-[#5e4540]",
  },
  {
    id: "06",
    title: "Reporting",
    body: "Donors receive detailed impact reports featuring ESG metrics, carbon accounting, and verified operational outcomes.",
    bg: "bg-[#5e4540]",
    text: "text-white",
  },
];

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
        <section className="px-4 pt-4 md:px-[29px]">
          <div className="mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-6 pt-10 md:px-[42px] md:pb-10 md:pt-[70px]">
            <p className="text-center text-2xl font-bold text-white md:text-[28px]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              Better Farms Start With a Better Process
            </p>
            <h1 className="mx-auto mt-4 max-w-[900px] text-center text-[42px] font-bold leading-[1.1] text-white md:text-[64px] lg:text-[72px] xl:text-[76px]">
              Invest in Farm Projects for Future Generations
            </h1>
            <img
              className="mt-8 h-auto max-h-[520px] w-full rounded-[20px] object-cover"
              alt="Apple harvest in an orchard"
              src="/sourcePhotos/how-it-works/orchard.webp"
            />
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-[110px]">
          <p className="mx-auto max-w-[820px] text-center [font-family:'Inter',Helvetica] text-xl font-normal leading-8 text-[#5e4540] md:text-[28px] md:leading-10">
            Your contribution builds farms ready for whatever comes next.
            Stronger soil, smarter systems, and lasting infrastructure give
            producers what they need to thrive for decades ahead.
          </p>
        </section>

        <section className="px-4 pb-14 md:px-8">
          <h2 className="mx-auto max-w-[640px] text-center text-[38px] font-bold leading-[1.1] text-[#5e4540] md:text-[56px]">
            The Foundation of a Better Farm
          </h2>
          <p className="mx-auto mt-6 max-w-[770px] text-center [font-family:'Inter',Helvetica] text-base leading-7 text-[#5e4540]">
            Every farm faces different challenges, but the barriers to success
            fall into predictable categories. We focus our resources on the
            five most critical threats to independent farms.
          </p>
          <div className="mx-auto mt-12 grid max-w-[1200px] gap-10 md:grid-cols-[1fr_420px]">
            <div className="overflow-hidden rounded-none md:sticky md:top-28 md:self-start">
              <img
                className="h-[420px] w-full object-cover md:h-[640px]"
                alt="Farmers inspecting crops at sunset"
                src="/sourcePhotos/how-it-works/couple-clipboard.webp"
              />
            </div>
            <div className="flex flex-col gap-8">
              {foundationCards.map((card) => (
                <article
                  key={card.title}
                  data-testid={`card-foundation-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-2xl bg-[#faf5e4] p-6"
                >
                  <img
                    className="h-[190px] w-full rounded-lg object-cover"
                    alt={card.title}
                    src={card.image}
                  />
                  <h3 className="mt-6 text-[26px] font-bold text-[#5e4540]">
                    {card.title}
                  </h3>
                  <p className="mt-3 [font-family:'Inter',Helvetica] text-base leading-6 text-[#5e4540]">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 md:px-[29px]">
          <div className="relative mx-auto max-w-[1386px] overflow-hidden rounded-[20px]">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              alt="Farm with silo"
              src="/figmaAssets/farm_silo.webp"
            />
            <div className="absolute inset-0 bg-[#8a4a35]/80" />
            <div className="relative z-10 grid gap-10 px-6 py-12 md:grid-cols-[1fr_460px] md:items-center md:px-[60px] md:py-[64px]">
              <div>
                <h2 className="max-w-[480px] text-[38px] font-bold leading-[1.1] text-white md:text-[52px]">
                  Sign up for Our Newsletter &amp; See What&apos;s Growing
                </h2>
                <p className="mt-6 max-w-[420px] [font-family:'Inter',Helvetica] text-base leading-6 text-white">
                  We cover projects, farmers, policy shifts, and the latest
                  thinking on building a more resilient food system.
                </p>
              </div>
              <form className="flex flex-col gap-4 self-center">
                <Input
                  placeholder="Full Name"
                  data-testid="input-newsletter-name"
                  className="h-[52px] rounded-lg border-0 bg-white px-5 [font-family:'Inter',Helvetica] text-base font-medium text-[#5e4540]"
                />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_140px]">
                  <Input
                    type="email"
                    placeholder="Enter email"
                    data-testid="input-newsletter-email"
                    className="h-[52px] rounded-lg border-0 bg-white px-5 [font-family:'Inter',Helvetica] text-base font-medium text-[#5e4540]"
                  />
                  <Button
                    type="button"
                    data-testid="button-newsletter-subscribe"
                    className="h-auto rounded-lg bg-[#7587ac] px-[18px] py-[15px] text-white hover:bg-[#6c7ea0]"
                  >
                    <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                      Subscribe
                    </span>
                    <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-16">
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
          </div>
          <img
            className="mt-14 h-[320px] w-full object-cover md:h-[420px]"
            alt="Farmers shaking hands in a field"
            src="/sourcePhotos/how-it-works/parallax.webp"
          />
        </section>

        <section className="px-4 pb-14 md:px-[29px]">
          <div className="mx-auto max-w-[1386px] rounded-[30px] bg-gradient-to-b from-[#6e7f9e] to-[#4d5b78] px-6 py-14 md:px-[80px] md:py-[90px]">
            <h2 className="mx-auto max-w-[640px] text-center text-[38px] font-bold leading-[1.1] text-white md:text-[52px]">
              Tracking Everything From Carbon to Crop Yield
            </h2>
            <p className="mx-auto mt-6 max-w-[640px] text-center [font-family:'Inter',Helvetica] text-base leading-7 text-white/90">
              Traditional nonprofit reporting leaves donors guessing about real
              impact. Better Farms tracks ESG metrics throughout every project
              using a clear methodology.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {trackingColumns.map((col) => (
                <div
                  key={col.title}
                  data-testid={`card-tracking-${col.title.toLowerCase()}`}
                  className="rounded-xl bg-[#faf5e4] p-7"
                >
                  <h3 className="text-[26px] font-bold text-[#5e4540]">
                    {col.title}
                  </h3>
                  <ul className="mt-5">
                    {col.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-[#5e4540]/50 py-3 [font-family:'Inter',Helvetica] text-[15px] text-[#5e4540] last:border-b-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 md:px-8">
          <div className="mx-auto max-w-[1100px]">
            <blockquote className="mx-auto max-w-[720px] text-center text-[24px] italic leading-[1.4] text-[#bc623f] md:text-[30px]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              &quot;We&apos;re not going to come back with just feel-good
              photos of farmers with cows. We&apos;re going to come back with
              technical rigor—data that helps donors with their own reporting
              and proves what actually happened on the ground.&quot;
              <footer className="mt-4 [font-family:'Inter',Helvetica] text-base not-italic text-[#5e4540]">
                — Name
              </footer>
            </blockquote>
            <img
              className="mt-10 h-[280px] w-full rounded-2xl object-cover md:h-[360px]"
              alt="Livestock grazing on pasture"
              src="/figmaAssets/grazing_pasture.webp"
            />
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-[1100px] items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-[38px] font-bold leading-[1.1] text-[#5e4540] md:text-[48px]">
                Feeding Your ESG Goals
              </h2>
              <p className="mt-6 max-w-[440px] [font-family:'Inter',Helvetica] text-base leading-6 text-[#5e4540]">
                Numbers prove the work, but stories move people. Better Farms
                delivers both. Every project comes with verified impact data
                and the human stories behind it. This gives you reporting that
                satisfies your board and resonates with your stakeholders.
              </p>
              <Button
                type="button"
                data-testid="button-fund-a-farm-esg"
                className="mt-8 h-auto rounded-lg bg-[#7587ac] px-[18px] py-[15px] text-white hover:bg-[#6c7ea0]"
              >
                <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                  Fund a Farm
                </span>
                <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
              </Button>
            </div>
            <img
              className="h-[420px] w-full rounded-none object-cover"
              alt="Farmer reviewing data in a wheat field"
              src="/sourcePhotos/how-it-works/farmer-clipboard.webp"
            />
          </div>
          <div className="mx-auto mt-12 grid max-w-[1100px] items-center gap-10 md:grid-cols-2">
            <img
              className="order-1 h-[400px] w-full rounded-none object-cover"
              alt="Pig on pasture"
              src="/sourcePhotos/how-it-works/red-pig.webp"
            />
            <div className="order-2">
              <h2 className="text-[38px] font-bold leading-[1.1] text-[#5e4540] md:text-[48px]">
                Great Partnerships Produce Greater Impact
              </h2>
              <p className="mt-6 max-w-[440px] [font-family:'Inter',Helvetica] text-base leading-6 text-[#5e4540]">
                Real change happens where boots meet soil. Bring us your
                boldest ideas for agriculture, and we&apos;ll put them to work
                on farms that need them. Every project delivers outcomes you
                can stand behind. Partner with us today, and together we will
                deliver results that matter.
              </p>
              <Button
                type="button"
                data-testid="button-start-partnership"
                className="mt-8 h-auto rounded-lg bg-[#7587ac] px-[18px] py-[15px] text-white hover:bg-[#6c7ea0]"
              >
                <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                  Start a Partnership
                </span>
                <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
              </Button>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden pt-10">
          <div className="px-4 md:px-8">
            <h2 className="text-center text-[44px] font-bold leading-[1.05] text-[#5e4540] md:text-[72px]">
              Fund a Farm Today
            </h2>
            <p className="mx-auto mt-6 max-w-[724px] text-center [font-family:'Inter',Helvetica] text-lg font-normal leading-8 text-[#5e4540] md:text-xl">
              <span className="font-bold">
                Your contribution can strengthen a farm for decades.{" "}
              </span>
              <span>
                Put your dollars to work and get proof of what you&apos;ve built.
              </span>
            </p>
            <CompactDonationCard />
            <p className="mx-auto mt-6 max-w-[875px] text-center [font-family:'Inter',Helvetica] text-sm font-bold leading-6 text-[#2f2820]">
              501(c)(3) nonprofit organization&nbsp;&nbsp;|&nbsp;&nbsp;100% of
              your funds go to farm-level work&nbsp;&nbsp;|&nbsp;&nbsp;ESG
              impact reporting included
            </p>
          </div>
          <div className="relative mt-10">
            <div className="absolute inset-x-0 top-0 z-[5] h-[160px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] md:h-[220px]" />
            <img
              className="h-[380px] w-full object-cover md:h-[480px]"
              alt="Farmers reviewing plans in a field"
              src="/figmaAssets/rectangle-114.webp"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
