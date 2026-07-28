import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DonationSection } from "@/components/DonationSection";
import { NewsletterSection } from "@/components/NewsletterSection";

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
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px] lg:pt-0">
        <div className="hero-panel mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-4 md:px-[42px] md:pb-[42px]">
            <p className="hero-eyebrow text-center text-xl font-bold text-white [font-family:'Playfair_Display',Georgia,serif] md:text-[28px]">
              Better Farms Start With the Right Support
            </p>
            <h1 className="hero-title mx-auto text-center font-bold text-white">
              Help Independent <span className="whitespace-nowrap">Farms Thrive</span>
            </h1>
            <div className="hero-image-frame w-full overflow-hidden rounded-[20px]">
              <img
                className="hero-image-after-title h-full w-full object-cover"
                alt="Chickens roaming outside a mobile coop"
                src="/sourcePhotos/get-involved/chickens-roaming.webp"
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-[104px]">
          <p className="desktop-text-balance mx-auto max-w-[1000px] text-center [font-family:'Inter',Helvetica] text-lg leading-[1.6] tracking-normal text-[#5e4540] md:text-[28px] md:leading-[1.5]">
            Funding a stronger food system starts with choosing how you want to
            contribute. We built four pathways so every donor can get involved
            in the way that works best for them. Explore them below and put
            your money to work.
          </p>
        </section>

        <section className="px-4 pb-10 md:px-8 lg:pl-[max(32px,calc((100%-1100px)/2))] lg:pr-0">
          <h2 className="mb-12 max-w-[720px] text-left text-[36px] font-bold leading-[1.15] tracking-normal text-[#5e4540] md:text-[52px] md:leading-[1.1] lg:hidden">
            Choose the Path That Fits Your Organization
          </h2>
          <div className="get-involved-pathways-layout grid gap-12 lg:grid-cols-[minmax(406px,1fr)_minmax(406px,721px)] lg:pt-[108px]">
            <div className="get-involved-pathways-copy flex w-full flex-col gap-24 md:gap-0">
              {pathways.map((pathway, index) => (
                <div
                  key={pathway.id}
                  data-testid={`section-pathway-${pathway.id}`}
                  className={index === 0 ? "" : "md:mt-20"}
                >
                  <h2 className="text-[32px] font-bold leading-[1.15] tracking-normal text-[#5e4540] md:text-[40px]">
                    {pathway.title}
                  </h2>
                  <p className="mt-6 [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540]">
                    <span className="font-bold">Who it&apos;s for: </span>
                    {pathway.whoItsFor}
                  </p>
                  <p className="mt-6 [font-family:'Inter',Helvetica] text-base font-bold leading-[1.6] tracking-normal text-[#5e4540]">
                    What you get:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-6 [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540]">
                    {pathway.whatYouGet.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  {pathway.extraLabel && (
                    <>
                      <p className="mt-6 [font-family:'Inter',Helvetica] text-base font-bold leading-[1.6] tracking-normal text-[#5e4540]">
                        {pathway.extraLabel}
                      </p>
                      {pathway.extraBullets ? (
                        <ul className="mt-1 list-disc space-y-1 pl-6 [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540]">
                          {pathway.extraLines.map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="mt-1 [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540]">
                          {pathway.extraLines.map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {pathway.note && (
                    <p className="mt-6 [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540]">
                      <span className="font-bold">{pathway.note.label}</span>
                      {pathway.note.text}
                    </p>
                  )}
                  <Button
                    asChild={pathway.id === "individual" || pathway.id === "corporate" || pathway.id === "foundation" || pathway.id === "daf"}
                    arrowMotion
                    data-testid={`button-cta-${pathway.id}`}
                    className="mt-8 h-auto rounded-lg bg-[#7587ac] pb-[19px] pl-[18px] pr-[14px] pt-[19px] text-white hover:bg-[#6c7ea0]"
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
            <div className="get-involved-pathways-image hidden w-full max-w-[721px] justify-self-end lg:sticky lg:top-28 lg:block lg:self-start">
              <img
                className="edge-image-pair-large rounded-l-[14px] rounded-r-none"
                alt="Farmer harvesting fresh vegetables into a wooden crate"
                src="/sourcePhotos/get-involved/vegetable-crate.webp"
              />
            </div>
          </div>
        </section>

        <NewsletterSection
          imageAlt="Cornfield with farm buildings at dusk"
          imageSrc="/figmaAssets/cornfield_farm.webp"
        />

        <section className="px-4 py-12 md:px-8 md:py-16">
          <h2 className="desktop-text-balance mx-auto max-w-[560px] text-center text-[36px] font-bold leading-[1.15] tracking-normal text-[#5e4540] md:text-[52px] md:leading-[1.1]">
            Why Partner With Better Farms
          </h2>
          <div className="mx-auto mt-[60px] grid max-w-[1100px] gap-x-16 gap-y-12 md:grid-cols-2">
            {partnerBenefits.map((benefit, index) => (
              <div
                key={index}
                data-testid={`card-benefit-${index}`}
                className="flex gap-6 border-b border-[#d9d4c8] pb-10"
              >
                <img className="h-12 w-12 shrink-0 object-contain" src={benefit.icon} alt="" />
                <div>
                  <h3 className="text-xl font-bold leading-[1.25] tracking-normal text-[#5e4540] md:text-[24px]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-[#5e4540]">
                    {benefit.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden py-10 md:py-16">
          <div className="edge-image-pair edge-image-pair--images edge-image-pair--large-left grid-cols-1 items-start">
            <img
              className="edge-image-pair-large rounded-lg object-top"
              alt="Goats gathered in a pasture"
              src="/sourcePhotos/get-involved/goats-flipped.jpg"
            />
            <img
              className="edge-image-pair-small rounded-lg"
              alt="Fresh apples in a bushel"
              src="/sourcePhotos/get-involved/apples.webp"
            />
          </div>
        </section>

        <DonationSection
          sectionClassName="pt-16 md:pt-[78px]"
          imageWrapperClassName="-mt-[114px] md:-mt-[177px]"
          imageAlt="Cattle grazing in a wide pasture"
          imageSrc="/sourcePhotos/get-involved/cows-grazing.webp"
        />
      </main>
      <SiteFooter />
    </div>
  );
};
