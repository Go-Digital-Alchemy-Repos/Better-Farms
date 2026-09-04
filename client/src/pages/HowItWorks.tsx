import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CompactDonationCard } from "@/components/CompactDonationCard";
import { Link } from "wouter";
import { useNewsletterSignup } from "@/hooks/use-newsletter-signup";

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
    icon: "/sourcePhotos/about/principles/results.svg",
    bg: "bg-[#5e4540]",
    text: "text-white",
  },
];

const topoPatternStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg width='720' height='460' viewBox='0 0 720 460' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%235e4540' stroke-opacity='.1' stroke-width='1.8'%3E%3Cpath d='M-70 96c75-41 151-42 228-4 64 31 120 34 168 10 68-34 137-27 207 21 60 41 134 44 224 7'/%3E%3Cpath d='M-64 126c78-37 151-36 221 4 62 36 118 39 169 9 70-42 142-35 216 20 57 43 126 48 206 16'/%3E%3Cpath d='M-58 158c78-33 149-28 213 13 62 40 121 42 176 4 68-47 144-38 226 24 53 40 117 46 193 20'/%3E%3Cpath d='M-52 192c74-30 143-24 207 20 66 45 131 43 196-7 58-45 131-34 219 33 50 37 108 43 174 20'/%3E%3Cpath d='M-46 228c77-29 149-20 216 28 60 43 121 39 184-11 60-48 134-35 221 39 45 38 98 44 160 20'/%3E%3Cpath d='M-39 266c83-31 161-22 233 29 56 40 112 36 169-13 60-52 137-39 230 41 39 34 86 40 141 19'/%3E%3Cpath d='M-31 304c84-30 162-20 236 30 57 38 110 33 161-14 62-57 143-42 241 46 35 31 76 36 124 18'/%3E%3Cpath d='M33 80c21-35 54-54 98-56 52-3 95 20 130 67 38 51 85 66 140 45 64-24 126-12 186 37 43 35 96 47 158 35'/%3E%3Cpath d='M38 47c37-32 82-46 136-42 51 4 93 31 127 80 31 45 72 57 123 35 64-28 129-18 194 31 37 28 80 40 130 36'/%3E%3Cpath d='M106 372c48-40 99-47 153-20 55 28 102 22 142-16 51-48 105-54 163-18 62 39 123 38 184-2'/%3E%3Cpath d='M84 414c60-48 121-54 183-18 50 30 94 24 132-16 52-56 111-62 176-19 56 37 112 35 169-5'/%3E%3C/g%3E%3C/svg%3E\")",
  backgroundSize: "720px 460px",
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
  const { handleSubmit: handleNewsletterSignup, isSubmitting: isNewsletterSubmitting } =
    useNewsletterSignup();
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
            <div className="hidden overflow-hidden rounded-none md:sticky md:top-28 md:block md:self-start">
              <img
                className="h-auto w-full object-cover"
                alt="Farmers reviewing plans in a wheat field"
                src="/figmaAssets/farmer_wheat_tablet.webp"
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
            <div className="relative z-10 grid gap-10 px-6 py-12 lg:grid-cols-[1fr_460px] lg:items-center md:px-[60px] md:py-[64px]">
              <div>
                <h2 className="max-w-[480px] text-[38px] font-bold leading-[1.1] text-white md:text-[52px]">
                  Sign up for Our Newsletter &amp; See What&apos;s Growing
                </h2>
                <p className="mt-6 max-w-[420px] [font-family:'Inter',Helvetica] text-base leading-6 text-white">
                  We cover projects, farmers, policy shifts, and the latest
                  thinking on building a more resilient food system.
                </p>
              </div>
              <form className="flex w-full flex-col gap-4 self-center" onSubmit={handleNewsletterSignup}>
                <Input
                  name="name"
                  aria-label="Full name"
                  required
                  placeholder="Full Name"
                  data-testid="input-newsletter-name"
                  className="h-[52px] rounded-lg border-0 bg-white px-5 [font-family:'Inter',Helvetica] text-base font-medium text-[#5e4540]"
                />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_140px]">
                  <Input
                    name="email"
                    type="email"
                    aria-label="Email address"
                    required
                    placeholder="Enter email"
                    data-testid="input-newsletter-email"
                    className="h-[52px] rounded-lg border-0 bg-white px-5 [font-family:'Inter',Helvetica] text-base font-medium text-[#5e4540]"
                  />
                  <Button
                    type="submit"
                    disabled={isNewsletterSubmitting}
                    data-testid="button-newsletter-subscribe"
                    className="h-auto rounded-lg bg-[#7587ac] px-[18px] py-[15px] text-white hover:bg-[#6c7ea0]"
                  >
                    <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                      {isNewsletterSubmitting ? "Subscribing…" : "Subscribe"}
                    </span>
                    <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-4 py-12 md:px-8 md:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-80" style={topoPatternStyle} />
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
          </div>
          <div className="relative mt-14 z-20">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[170px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.94)_44%,rgba(255,255,255,0)_100%)] md:h-[230px]" />
            <img
              className="h-[320px] w-full rounded-b-[30px] object-cover md:h-[420px]"
              alt="Farmers shaking hands in a field"
              src="/sourcePhotos/how-it-works/parallax.webp"
            />
          </div>
        </section>

        <section className="relative z-10 mt-[-30px] px-4 pb-14 md:px-[29px]">
          <div className="relative mx-auto max-w-[1386px] overflow-hidden rounded-b-[30px] bg-gradient-to-b from-[#7587ac] to-[#4d5b78] px-6 pb-20 pt-24 md:px-[80px] md:pb-[120px] md:pt-[105px]">
            <div className="pointer-events-none absolute inset-0 opacity-45" style={topoPatternStyle} />
            <div className="relative z-10">
              <h2 className="mx-auto max-w-[720px] text-center text-[38px] font-bold leading-[1.1] text-white md:text-[56px]">
                Tracking Everything From Carbon to Crop Yield
              </h2>
              <p className="mx-auto mt-8 max-w-[760px] text-center [font-family:'Inter',Helvetica] text-base leading-8 text-white/90 md:text-lg">
                Traditional nonprofit reporting leaves donors guessing about real
                impact. Better Farms tracks ESG metrics throughout every project
                using a clear methodology.
              </p>
              <div className="relative mx-auto mt-20 hidden h-[82px] max-w-[760px] md:block" aria-hidden="true">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/60" />
                <div className="absolute left-[15%] right-[15%] top-10 h-px bg-white/60" />
                <div className="absolute left-[15%] top-10 h-[62px] w-px bg-white/60" />
                <div className="absolute right-[15%] top-10 h-[62px] w-px bg-white/60" />
              </div>
              <div className="mt-12 grid gap-6 md:mt-0 md:grid-cols-3 md:gap-8">
                {trackingColumns.map((col) => (
                  <div
                    key={col.title}
                    data-testid={`card-tracking-${col.title.toLowerCase()}`}
                    className="rounded-xl bg-[#faf5e4] p-8 shadow-[0_14px_26px_rgba(47,40,32,0.28)] md:min-h-[330px] md:p-10"
                  >
                    <h3 className="text-[30px] font-bold text-[#5e4540] md:text-[36px]">
                      {col.title}
                    </h3>
                    <ul className="mt-8">
                      {col.items.map((item) => (
                        <li
                          key={item}
                          className="border-b border-[#5e4540]/50 py-3 [font-family:'Inter',Helvetica] text-base leading-6 text-[#5e4540] last:border-b-0 md:text-lg"
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
        </section>

        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="relative mx-auto max-w-[1100px] pt-[120px] md:pt-[165px]">
            <blockquote
              className="absolute left-1/2 top-0 z-20 w-[min(720px,90vw)] -translate-x-1/2 -rotate-3 text-center text-[27px] leading-[1.12] text-[#bc623f] md:text-[38px]"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              &quot;Farmers don&apos;t need more research papers. They need someone
              to show up with a plan, the funding, and the know-how to make
              their operation stronger. That&apos;s the job.&quot;
              <footer className="mt-5 rotate-3 [font-family:'Inter',Helvetica] text-sm text-[#bc623f] md:text-base">
                — Name
              </footer>
            </blockquote>
            <img
              className="h-[360px] w-full rounded-2xl object-cover md:h-[500px]"
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
                asChild
                data-testid="button-fund-a-farm-esg"
                className="mt-8 h-auto rounded-lg bg-[#7587ac] px-[18px] py-[15px] text-white hover:bg-[#6c7ea0]"
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
              className="h-[420px] w-full rounded-[10px] object-cover"
              alt="Farmer reviewing data in a wheat field"
              src="/sourcePhotos/how-it-works/farmer-clipboard.webp"
            />
          </div>
          <div className="mx-auto mt-12 grid max-w-[1100px] items-center gap-10 md:grid-cols-2">
            <img
              className="order-1 h-[400px] w-full rounded-[10px] object-cover"
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
                asChild
                data-testid="button-start-partnership"
                className="mt-8 h-auto rounded-lg bg-[#7587ac] px-[18px] py-[15px] text-white hover:bg-[#6c7ea0]"
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
              alt="Tractor spraying crops in a field"
              src="/sourcePhotos/homepage/tractor-spraying.webp"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
