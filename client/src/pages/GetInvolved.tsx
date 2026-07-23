import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CompactDonationCard } from "@/components/CompactDonationCard";
import { useNewsletterSignup } from "@/hooks/use-newsletter-signup";

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
    icon: "/sourcePhotos/get-involved/sunflower.svg",
    title: "Multiplied Funding",
    text: "Join a curated pipeline of ready-to-fund projects. Contribute at any scale, skip the diligence burden, and deploy capital faster than building from scratch.",
  },
  {
    icon: "/sourcePhotos/get-involved/chicken.svg",
    title: "Direct Farm Impact",
    text: "Choose the projects that align with your mission. Every opportunity comes with a clear scope, budget, and expected outcomes before you commit.",
  },
  {
    icon: "/sourcePhotos/get-involved/sun.svg",
    title: "Professional Management",
    text: "We handle contracts, timelines, and quality control, so partners never carry the operational risk of project delivery.",
  },
  {
    icon: "/sourcePhotos/get-involved/book.svg",
    title: "Verified Reporting",
    text: "Take the data and story back to your stakeholders. Get branded impact reports, case studies, and media assets for communications.",
  },
  {
    icon: "/sourcePhotos/get-involved/jar.svg",
    title: "ESG Integration",
    text: "Strengthen your environmental commitments with audit-ready numbers. Biogenic carbon insetting data feeds directly into Scope 3 reporting and sustainability disclosures.",
  },
  {
    icon: "/sourcePhotos/get-involved/tree.svg",
    title: "Proven Leadership",
    text: "Gain access to the founders, pioneers, and policy voices who shaped sustainable agriculture.",
  },
];

export const GetInvolved = (): JSX.Element => {
  const handleNewsletterSignup = useNewsletterSignup();
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px]">
        <div className="hero-panel mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-6 pb-6 md:px-[42px] md:pb-[42px]">
            <p className="hero-eyebrow text-center text-xl font-bold text-white [font-family:'Playfair_Display',Georgia,serif] md:text-[28px]">
              Better Farms Start With the Right Support
            </p>
            <h1 className="hero-title mx-auto text-center font-bold text-white">
              Help Independent Farms Thrive
            </h1>
          <img
            className="hero-image-after-title w-full rounded-[20px]"
            alt="Chickens roaming outside a mobile coop"
            src="/sourcePhotos/get-involved/chickens-roaming.webp"
          />
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-[104px]">
          <p className="mx-auto max-w-[760px] text-center [font-family:'Inter',Helvetica] text-lg leading-8 text-[#2f2820] md:text-xl">
            Funding a stronger food system starts with choosing how you want to
            contribute. We built four pathways so every donor can get involved
            in the way that works best for them. Explore them below and put
            your money to work.
          </p>
        </section>

        <section className="px-4 pb-10 md:px-8">
          <h2 className="mx-auto mb-12 max-w-[720px] text-center text-[38px] font-bold leading-[1.15] text-[#5e4540] md:text-[52px] lg:hidden">
            Choose the Path That Fits Your Organization
          </h2>
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_440px] lg:pt-[108px]">
            <div className="flex flex-col gap-24 md:gap-0">
              {pathways.map((pathway, index) => (
                <div
                  key={pathway.id}
                  data-testid={`section-pathway-${pathway.id}`}
                  className={index === 0 ? "" : index === 2 ? "md:mt-[190px]" : "md:mt-20"}
                >
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
            <div className="hidden lg:block">
              <img
                className="h-[520px] w-full rounded-[14px] object-cover"
                alt="Farmer harvesting fresh vegetables into a wooden crate"
                src="/sourcePhotos/get-involved/vegetable-crate.webp"
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-10 md:px-[29px]">
          <div className="relative mx-auto max-w-[1386px] overflow-hidden rounded-[20px]">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              alt="Cornfield with farm buildings at dusk"
              src="/figmaAssets/cornfield_farm.webp"
            />
            <div className="absolute inset-0 bg-[#783f30]/85 mix-blend-multiply" />
            <div className="relative z-10 grid gap-10 px-6 py-12 lg:grid-cols-[1fr_460px] lg:items-center lg:px-[60px] lg:py-[138px]">
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
                <img className="h-12 w-12 shrink-0 object-contain" src={benefit.icon} alt="" />
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

        <section className="px-4 py-10 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-[1fr_1fr] md:items-start md:gap-16">
            <div className="overflow-hidden rounded-2xl">
              <img
                className="h-[330px] w-full object-cover object-top md:h-[430px]"
                alt="Goats gathered in a pasture"
                src="/sourcePhotos/get-involved/goats.webp"
              />
            </div>
            <img
              className="h-[330px] w-full rounded-2xl object-cover md:mt-20 md:h-[390px]"
              alt="Fresh apples in a bushel"
              src="/sourcePhotos/get-involved/apples.webp"
            />
          </div>
        </section>

        <section className="relative overflow-hidden pt-10 md:pt-[270px]">
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
            <p className="relative z-10 mx-auto mt-8 max-w-[875px] text-center [font-family:'Inter',Helvetica] text-sm font-bold leading-6 text-[#2f2820]">
              501(c)(3) nonprofit organization&nbsp;&nbsp;|&nbsp;&nbsp;100% of
              your funds go to farm-level work&nbsp;&nbsp;|&nbsp;&nbsp;ESG
              impact reporting included
            </p>
          </div>
          <div className="relative mt-10">
            <div className="absolute inset-x-0 top-0 z-[5] h-[160px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] md:h-[220px]" />
            <img
              className="h-[380px] w-full object-cover md:h-[590px]"
              alt="Cattle grazing in a wide pasture"
              src="/sourcePhotos/get-involved/cows-grazing.webp"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
