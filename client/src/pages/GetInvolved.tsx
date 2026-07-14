import { useState } from "react";
import { Link } from "wouter";
import {
  Sprout,
  Bird,
  Sun,
  BookOpen,
  FlaskConical,
  TreeDeciduous,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const donationOptions = ["$1,000", "$500", "$250", "$100", "$50", "$25"];

const pathways = [
  {
    id: "corporate",
    title: "Corporate Partnership",
    whoItsFor:
      "Companies with sustainability commitments, food and agriculture businesses, and corporations seeking meaningful ESG impact.",
    whatYouGet: [
      "Projects aligned with your strategic priorities",
      "Impact reporting formatted for ESG requirements",
      "Biogenic carbon insetting data for Scope 3 reporting",
      "Recognition in Better Farms communications",
      "Site visits and employee engagement opportunities",
    ],
    extraLabel: "Investment levels:",
    extraLines: [
      "Limestone: $25,000\u2013$50,000",
      "Bedrock: $50,000\u2013$100,000",
      "Keystone: $100,000+",
    ],
    extraBullets: false,
    note: null,
    cta: "Start a Corporate Partnership",
  },
  {
    id: "foundation",
    title: "Foundation Grants",
    whoItsFor:
      "Private, community, and family foundations focused on agriculture, environment, rural development, or food security.",
    whatYouGet: [
      "Custom proposals tailored to your foundation's priorities",
      "Impact measurement aligned with your reporting requirements",
      "Amplified results through multi-source funding aggregation",
      "Collaboration with our board on project selection",
      "Site visits and direct farmer engagement",
    ],
    extraLabel: null,
    extraLines: [],
    extraBullets: false,
    note: {
      label: "Community foundations:",
      text: " We help engage your donor-advised funds in local agricultural resilience projects. Contact us to explore collaboration in your region.",
    },
    cta: "Request a Foundation Proposal",
  },
  {
    id: "daf",
    title: "Donor-Advised Funds",
    whoItsFor:
      "Individuals who manage giving through a DAF and want to provide direct grants toward tangible agricultural impact.",
    whatYouGet: [
      "Simple grant recommendation process",
      "EIN and documentation provided for your fund administrator",
      "Full impact reporting on how your grant was deployed",
      "Quarterly updates on project milestones and outcomes",
      "Same accountability and transparency as all Better Farms partners",
    ],
    extraLabel: "Suggested giving levels:",
    extraLines: [
      "Spring: Up to $1,000",
      "Summer: $1,000\u2013$5,000",
      "Autumn: $5,000\u2013$10,000",
      "Perennial: $10,000+",
    ],
    extraBullets: true,
    note: null,
    cta: "Get DAF Contribution Details",
  },
  {
    id: "individual",
    title: "Individual Giving",
    whoItsFor:
      "People who care about where their food comes from and want to help American farms survive for the next generation.",
    whatYouGet: [
      "Tax-deductible donation with full documentation",
      "Quarterly updates showing how your gift was used",
      "Invitations to donor events and farm visits",
      "Impact reporting that shows exactly what you helped build",
      "The knowledge that your money became something real",
    ],
    extraLabel: "Suggested giving levels:",
    extraLines: [
      "Seed: Up to $1,000",
      "Sprout: $1,000\u2013$5,000",
      "Bloom: $5,000\u2013$10,000",
      "Harvest: $10,000+",
    ],
    extraBullets: true,
    note: null,
    cta: "Fund a Farm",
  },
];

const partnerBenefits = [
  {
    icon: Sprout,
    title: "Multiplied Funding",
    text: "Join a curated pipeline of ready-to-fund projects. Contribute at any scale, skip the diligence burden, and deploy capital faster than building from scratch.",
  },
  {
    icon: Bird,
    title: "Direct Farm Impact",
    text: "Choose the projects that align with your mission. Every opportunity comes with a clear scope, budget, and expected outcomes before you commit.",
  },
  {
    icon: Sun,
    title: "Professional Management",
    text: "We handle contracts, timelines, and quality control, so partners never carry the operational risk of project delivery.",
  },
  {
    icon: BookOpen,
    title: "Verified Reporting",
    text: "Take the data and story back to your stakeholders. Get branded impact reports, case studies, and media assets for communications.",
  },
  {
    icon: FlaskConical,
    title: "ESG Integration",
    text: "Strengthen your environmental commitments with audit-ready numbers. Biogenic carbon insetting data feeds directly into Scope 3 reporting and sustainability disclosures.",
  },
  {
    icon: TreeDeciduous,
    title: "Proven Leadership",
    text: "Gain access to the founders, pioneers, and policy voices who shaped sustainable agriculture.",
  },
];

export const GetInvolved = (): JSX.Element => {
  const [selectedDonation, setSelectedDonation] = useState("$100");
  const [donationFrequency, setDonationFrequency] = useState("One-Time");
  const [customAmount, setCustomAmount] = useState("");

  return (
    <div className="min-h-screen w-full bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px]">
          <div className="mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-6 pt-10 md:px-[60px] md:pt-14">
            <p className="text-center text-xl font-bold text-white md:text-[28px]">
              Better Farms Start With the Right Support
            </p>
            <h1 className="mx-auto mt-4 max-w-[900px] text-center text-[44px] font-bold leading-[1.05] text-white md:text-[80px]">
              Help Independent Farms Thrive
            </h1>
            <img
              className="mt-12 h-[320px] w-full rounded-t-[20px] object-cover md:h-[480px]"
              alt="Chickens roaming outside a mobile coop"
              src="/figmaAssets/chickens_pasture_coop.jpg"
            />
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-16">
          <p className="mx-auto max-w-[760px] text-center [font-family:'Inter',Helvetica] text-lg leading-8 text-[#2f2820] md:text-xl">
            Funding a stronger food system starts with choosing how you want to
            contribute. We built four pathways so every donor can get involved
            in the way that works best for them. Explore them below and put
            your money to work.
          </p>
        </section>

        <section className="px-4 pb-10 md:px-8">
          <h2 className="mx-auto mb-12 max-w-[720px] text-center text-[38px] font-bold leading-[1.15] text-[#5e4540] md:text-[52px]">
            Choose the Path That Fits Your Organization
          </h2>
          <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1fr_440px]">
            <div className="flex flex-col gap-16">
              {pathways.map((pathway) => (
                <div key={pathway.id} data-testid={`section-pathway-${pathway.id}`}>
                  <h2 className="text-[32px] font-bold leading-[1.1] text-[#5e4540] md:text-[40px]">
                    {pathway.title}
                  </h2>
                  <p className="mt-6 [font-family:'Inter',Helvetica] text-base leading-7 text-[#2f2820]">
                    <span className="font-bold">Who it&apos;s for: </span>
                    {pathway.whoItsFor}
                  </p>
                  <p className="mt-6 [font-family:'Inter',Helvetica] text-base font-bold leading-7 text-[#2f2820]">
                    What you get:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-6 [font-family:'Inter',Helvetica] text-base leading-7 text-[#2f2820]">
                    {pathway.whatYouGet.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  {pathway.extraLabel && (
                    <>
                      <p className="mt-6 [font-family:'Inter',Helvetica] text-base font-bold leading-7 text-[#2f2820]">
                        {pathway.extraLabel}
                      </p>
                      {pathway.extraBullets ? (
                        <ul className="mt-1 list-disc space-y-1 pl-6 [font-family:'Inter',Helvetica] text-base leading-7 text-[#2f2820]">
                          {pathway.extraLines.map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="mt-1 [font-family:'Inter',Helvetica] text-base leading-7 text-[#2f2820]">
                          {pathway.extraLines.map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {pathway.note && (
                    <p className="mt-6 [font-family:'Inter',Helvetica] text-base leading-7 text-[#2f2820]">
                      <span className="font-bold">{pathway.note.label}</span>
                      {pathway.note.text}
                    </p>
                  )}
                  <Button
                    asChild={pathway.id === "individual" || pathway.id === "corporate" || pathway.id === "foundation" || pathway.id === "daf"}
                    data-testid={`button-cta-${pathway.id}`}
                    className="mt-8 h-auto rounded-lg bg-[#7587ac] px-5 py-3 text-white hover:bg-[#6c7ea0]"
                  >
                    <Link href={pathway.id === "individual" ? "/fund-a-farm" : "/contact"}>
                      <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                        {pathway.cta}
                      </span>
                      <img
                        className="ml-2 h-5 w-5"
                        alt=""
                        src="/figmaAssets/keyboard-arrow-right-2.svg"
                      />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
            <div className="hidden flex-col gap-10 md:flex">
              <img
                className="h-[520px] w-full rounded-[14px] object-cover"
                alt="Farmer harvesting fresh vegetables into a wooden crate"
                src="/figmaAssets/veggie_harvest_crate.jpg"
              />
              <img
                className="mt-24 h-[420px] w-full rounded-[14px] object-cover"
                alt="Sheep gathered in a pasture"
                src="/figmaAssets/sheep_flock.jpg"
              />
              <img
                className="mt-24 h-[330px] w-full rounded-[14px] object-cover"
                alt="Bucket of freshly picked peaches"
                src="/figmaAssets/peaches_bucket.jpg"
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-10 md:px-[29px]">
          <div className="relative mx-auto max-w-[1386px] overflow-hidden rounded-[20px]">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              alt="Cornfield with farm buildings at dusk"
              src="/figmaAssets/cornfield_farm.jpg"
            />
            <div className="absolute inset-0 bg-[#8a4f37]/70" />
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
          <h2 className="mx-auto max-w-[560px] text-center text-[38px] font-bold leading-[1.15] text-[#5e4540] md:text-[52px]">
            Why Partner With Better Farms
          </h2>
          <div className="mx-auto mt-12 grid max-w-[1100px] gap-x-16 gap-y-12 md:grid-cols-2">
            {partnerBenefits.map((benefit, index) => (
              <div
                key={index}
                data-testid={`card-benefit-${index}`}
                className="flex gap-6 border-b border-[#d9d4c8] pb-10"
              >
                <benefit.icon
                  className="h-12 w-12 shrink-0 text-[#7587ac]"
                  strokeWidth={1.25}
                />
                <div>
                  <h3 className="text-2xl font-bold text-[#5e4540] md:text-[28px]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 [font-family:'Inter',Helvetica] text-sm leading-6 text-[#2f2820]">
                    {benefit.text}
                  </p>
                </div>
              </div>
            ))}
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
                        data-testid={`button-frequency-${freq.toLowerCase()}`}
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
                      data-testid={`button-donation-${option.replace(/[$,]/g, "")}`}
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
                      type="text"
                      inputMode="numeric"
                      aria-label="Other donation amount"
                      placeholder="Other Amount"
                      data-testid="input-custom-donation"
                      value={customAmount}
                      onChange={(e) => {
                        const numeric = e.target.value.replace(/\D/g, "");
                        setCustomAmount(numeric);
                        if (numeric.length > 0) setSelectedDonation("");
                      }}
                      className="w-full bg-transparent [font-family:'Inter',Helvetica] text-lg font-medium text-[#5e4540] outline-none placeholder:text-[#a9a29a]"
                    />
                  </div>
                  <Button
                    type="button"
                    data-testid="button-donate-now"
                    className="h-[58px] rounded-lg bg-[#bc623f] px-[24px] text-white hover:bg-[#ab5838]"
                  >
                    <span className="[font-family:'Inter',Helvetica] text-lg font-medium">
                      Fund a Farm
                    </span>
                    <img className="ml-2 h-6 w-6" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                  </Button>
                </div>
              </div>
            </div>
            <p className="relative z-10 mx-auto mt-8 max-w-[875px] text-center [font-family:'Inter',Helvetica] text-sm font-bold leading-6 text-[#2f2820]">
              501(c)(3) nonprofit organization&nbsp;&nbsp;|&nbsp;&nbsp;100% of
              your funds go to farm-level work&nbsp;&nbsp;|&nbsp;&nbsp;ESG
              impact reporting included
            </p>
          </div>
          <img
            className="mt-10 h-[380px] w-full object-cover md:h-[480px]"
            alt="Cattle grazing in a wide pasture"
            src="/figmaAssets/cattle_herd_pano.jpg"
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
