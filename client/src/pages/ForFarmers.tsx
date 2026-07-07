import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const projectCards = [
  {
    title: "Climate Resilience",
    body: "Weather patterns keep shifting, putting harvests at risk. We fund drought-resistant infrastructure, water management systems, and diversified planting to help farms adapt. Operations gain the flexibility to thrive in any conditions.",
    image: "/figmaAssets/drip_irrigation.jpg",
  },
  {
    title: "Sustainable Infrastructure",
    body: "Aging barns, old equipment, and worn fencing slow farms down. Our team funds physical upgrades that improve daily operations and cut long-term costs. Farms run more smoothly and are built for the future.",
    image: "/figmaAssets/barn_infrastructure.jpg",
  },
  {
    title: "Regenerative Practices",
    body: "Healthy soil grows healthy farms, yet years of conventional methods have worn it down. We support cover cropping, agroforestry, composting, and pollinator habitat that bring soil back to life. Land rebuilds, carbon gets stored, and yields improve over time.",
    image: "/figmaAssets/regenerative_practices.jpg",
  },
  {
    title: "Energy Independence",
    body: "Utility costs eat into already tight margins. We help farms lower expenses through solar, efficient equipment, and other upgrades. Savings stay with the producer, where they make the biggest difference.",
    image: "/figmaAssets/solar_farm.jpg",
  },
  {
    title: "Local Food Systems",
    body: "Small farms grow great food, but often can't reach nearby buyers. We fund processing equipment, cold storage, and distribution hubs that connect fields to tables. Producers expand their reach, and communities get steady access to local food.",
    image: "/figmaAssets/food_processing.jpg",
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
    title: "Impact Report",
    body: "Donors receive detailed impact reports featuring ESG metrics, carbon accounting, and verified operational outcomes.",
    bg: "bg-[#5e4540]",
    text: "text-white",
  },
];

const donationOptions = ["$25", "$30", "$100"];

export const ForFarmers = (): JSX.Element => {
  const [selectedDonation, setSelectedDonation] = useState("$30");

  return (
    <div className="min-h-screen w-full bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px]">
          <div className="mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-6 pt-10 md:px-[42px] md:pb-10 md:pt-[70px]">
            <p className="text-center text-2xl font-bold text-white md:text-[28px]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              Better Farms Starts Here
            </p>
            <h1 className="mx-auto mt-4 max-w-[900px] text-center text-[42px] font-bold leading-[1.1] text-white md:text-[76px]">
              The Farm You&apos;ve Been Wanting to Build
            </h1>
            <img
              className="mt-8 h-auto max-h-[520px] w-full rounded-[20px] object-cover"
              alt="Red barn farm with silo and cornfields"
              src="/figmaAssets/red_barn_farm.jpg"
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

        <section className="bg-gradient-to-b from-[#7587ac] to-[#4d5b78] px-4 py-14 md:px-8 md:py-20">
          <h2 className="mx-auto max-w-[640px] text-center text-[38px] font-bold leading-[1.1] text-white md:text-[52px]">
            The Farm Projects We Fund
          </h2>
          <div className="mx-auto mt-12 grid max-w-[1200px] gap-10 md:grid-cols-[1fr_420px]">
            <div className="overflow-hidden rounded-2xl md:sticky md:top-28 md:self-start">
              <img
                className="h-[420px] w-full object-cover md:h-[640px]"
                alt="Family walking through a livestock barn"
                src="/figmaAssets/family_barn_walk.jpg"
              />
            </div>
            <div className="flex flex-col gap-8">
              {projectCards.map((card) => (
                <article
                  key={card.title}
                  data-testid={`card-project-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
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

        <section className="px-4 py-14 md:px-8 md:py-20">
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
            className="mx-auto mt-14 h-[320px] w-full max-w-[1440px] object-cover md:h-[420px]"
            alt="Farmers shaking hands in a field"
            src="/figmaAssets/handshake_field.jpg"
          />
        </section>

        <section className="px-4 py-10 md:px-8">
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-2">
            <img
              className="h-[340px] w-full rounded-2xl object-cover grayscale"
              alt="Chickens in a coop"
              src="/figmaAssets/chickens_coop.jpg"
            />
            <img
              className="h-[340px] w-full rounded-2xl object-cover md:mt-20"
              alt="Cow closeup in pasture"
              src="/figmaAssets/cow_closeup.jpg"
            />
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
            <div className="mx-auto mt-10 max-w-[997px] rounded-xl bg-white shadow-[0px_4px_10px_#00000040]">
              <div className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:px-[55px] md:py-[30px]">
                <div className="flex flex-wrap gap-3">
                  {donationOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      data-testid={`button-donation-${option.replace("$", "")}`}
                      onClick={() => setSelectedDonation(option)}
                      className={`flex h-[58px] min-w-[120px] items-center justify-center rounded-[10px] border [font-family:'Inter',Helvetica] text-[26px] font-bold leading-[normal] ${
                        selectedDonation === option
                          ? "border-[#d7d7d7] bg-[#434343] text-white"
                          : "border-[#bcb9b9] bg-white text-[#434343]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="[font-family:'Inter',Helvetica] text-sm font-semibold leading-[normal] text-[#5e4540]">
                    Enter Donation
                  </span>
                  <div className="flex h-[58px] w-[130px] items-center rounded-[10px] border border-[#bcb9b9] bg-white px-[18px]">
                    <span className="[font-family:'Inter',Helvetica] text-[26px] font-bold leading-[normal] text-[#5e4540]">
                      $
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  data-testid="button-donate-now"
                  className="h-[58px] rounded-lg bg-[#bc623f] px-[24px] text-white hover:bg-[#ab5838]"
                >
                  <span className="[font-family:'Inter',Helvetica] text-lg font-medium">
                    Donate Now
                  </span>
                  <img className="ml-2 h-6 w-6" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                </Button>
              </div>
            </div>
            <p className="mx-auto mt-6 max-w-[875px] text-center [font-family:'Inter',Helvetica] text-sm font-bold leading-6 text-[#2f2820]">
              501(c)(3) nonprofit organization&nbsp;&nbsp;|&nbsp;&nbsp;100% of
              your funds go to farm-level work&nbsp;&nbsp;|&nbsp;&nbsp;ESG
              impact reporting included
            </p>
          </div>
          <img
            className="mt-10 h-[380px] w-full object-cover md:h-[480px]"
            alt="Chickens in tall grass at sunset"
            src="/figmaAssets/chickens_grass.jpg"
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
