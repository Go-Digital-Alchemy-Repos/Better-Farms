import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const principles = [
  {
    title: "Results",
    body: "We fund projects through to completion. Donors see finished work and measurable change on the farm.",
  },
  {
    title: "Execution",
    body: "Agricultural experts oversee each build. Projects get done right and hold up under real farm conditions.",
  },
  {
    title: "Transparency",
    body: "We track every dollar and document every outcome. Donors receive clear reports that show the full picture.",
  },
  {
    title: "Multiplied Impact",
    body: "We combine contributions from corporations, foundations, and donor-advised funds. Farmers get fully funded projects, and every dollar goes further.",
  },
  {
    title: "Farmer-Centered",
    body: "Farmers shape each project from day one. Producers know what their land needs, and we build around that.",
  },
];

const othersDo = [
  "Fund research and studies",
  "Rely on volunteer networks",
  "Provide feel-good impact photos",
  "Depend on shifting government grants",
  "Work in Isolation",
  "Talk about problems",
];

const weDo = [
  "Fund direct farm projects",
  "Deploy professional staff",
  "Deliver technical ESG reporting",
  "Maintain independence from political cycle",
  "Aggregate funding from multiple sources",
  "Solve problems",
];

const boardMembers = [
  { image: "/figmaAssets/portrait_woman_farmer.jpg", name: "Full Name", credential: "One-line credential" },
  { image: "/figmaAssets/portrait_elderly_woman.jpg", name: "Full Name", credential: "One-line credential" },
  { image: "/figmaAssets/portrait_man_farmer.jpg", name: "Full Name", credential: "One-line credential" },
];

export const AboutUs = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px]">
          <div className="mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-8 pt-10 md:px-[42px] md:pb-12 md:pt-[70px]">
            <h1 className="mx-auto max-w-[900px] text-center text-[42px] font-bold leading-[1.1] text-white md:text-[72px]">
              Better Farms Start With Better Partners
            </h1>
            <img
              className="mt-8 h-auto max-h-[560px] w-full rounded-[20px] object-cover"
              alt="Sheep feeding at a wooden trough"
              src="/figmaAssets/sheep_feeding.jpg"
            />
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-[100px]">
          <h2 className="mx-auto max-w-[720px] text-center text-[36px] font-bold leading-[1.15] text-[#5e4540] md:text-[52px]">
            Our team has spent careers inside American agriculture.
          </h2>
          <p className="mx-auto mt-8 max-w-[760px] text-center [font-family:'Inter',Helvetica] text-base leading-7 text-[#5e4540]">
            We&apos;ve served on federal advisory boards, built companies in
            organic farming, and helped shape the standards this industry runs
            on. That work gave us a clear view of what farmers are up against
            and what actually helps them succeed. The Better Farms Foundation
            is our answer. We identify the problem on the farm, design the
            solution, and fund the work to get it done.
          </p>
        </section>

        <section className="px-4 pb-6 md:px-8">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 md:grid-cols-[1fr_460px]">
            <img
              className="h-[380px] w-full rounded-2xl object-cover md:h-[520px]"
              alt="Farmer pitching hay in a dairy barn"
              src="/figmaAssets/farmer_hay_barn.jpg"
            />
            <img
              className="h-[260px] w-full rounded-2xl object-cover md:h-[340px]"
              alt="Goats grazing on green pasture"
              src="/figmaAssets/goats_grazing.jpg"
            />
          </div>
        </section>

        <section className="px-4 py-14 md:px-8 md:py-20">
          <blockquote
            className="mx-auto max-w-[640px] text-center text-[26px] leading-[1.5] text-[#5e4540] md:text-[32px]"
            style={{ fontFamily: '"Dancing Script", cursive' }}
            data-testid="text-quote"
          >
            &quot;Farmers don&apos;t need more research papers. They need
            someone to show up with a plan, the funding, and the know-how to
            make their operation stronger. That&apos;s the job.&quot;
            <footer className="mt-4 [font-family:'Inter',Helvetica] text-base text-[#5e4540]">
              — Name
            </footer>
          </blockquote>
        </section>

        <section>
          <img
            className="h-[300px] w-full object-cover md:h-[420px]"
            alt="Rolling hills and farmland"
            src="/figmaAssets/hills_valley.jpg"
          />
          <div className="bg-gradient-to-b from-[#7587ac] to-[#4d5b78] px-4 pb-16 pt-14 md:rounded-b-[30px] md:px-8 md:pb-24 md:pt-20">
            <div className="mx-auto max-w-[1000px]">
              <h2 className="mx-auto max-w-[560px] text-center text-[38px] font-bold leading-[1.15] text-white md:text-[52px]">
                The Principles Behind Every Project
              </h2>
              <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
                {principles.map((p) => (
                  <div
                    key={p.title}
                    data-testid={`item-principle-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="border-b border-white/40 pb-8"
                  >
                    <h3 className="text-[26px] font-bold text-white">{p.title}</h3>
                    <p className="mt-3 [font-family:'Inter',Helvetica] text-[15px] leading-6 text-white/90">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-24">
          <h2 className="mx-auto max-w-[640px] text-center text-[38px] font-bold leading-[1.15] text-[#5e4540] md:text-[52px]">
            Measuring Impact in Outcomes, Not Intentions
          </h2>
          <div className="mx-auto mt-14 grid max-w-[1000px] gap-8 md:grid-cols-2 md:gap-0">
            <div className="rounded-2xl bg-[#efe7cf] p-8 shadow-[0px_4px_14px_#00000022] md:-rotate-1 md:translate-y-[-10px]">
              <h3 className="[font-family:'Inter',Helvetica] text-[24px] font-bold text-[#3a332b]">
                What Others Do
              </h3>
              <ul className="mt-6">
                {othersDo.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 border-b border-[#3a332b]/40 py-3 [font-family:'Inter',Helvetica] text-base text-[#3a332b]"
                  >
                    <span aria-hidden="true" className="text-lg font-bold">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[#faf5e4] p-8 shadow-[0px_4px_14px_#00000022] md:rotate-1 md:translate-y-[30px]">
              <h3 className="[font-family:'Inter',Helvetica] text-[24px] font-bold text-[#3a332b]">
                What We Do
              </h3>
              <ul className="mt-6">
                {weDo.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 border-b border-[#3a332b]/40 py-3 [font-family:'Inter',Helvetica] text-base text-[#3a332b]"
                  >
                    <span aria-hidden="true" className="text-lg font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 md:px-[29px]">
          <div className="relative mx-auto max-w-[1386px] overflow-hidden rounded-[20px]">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              alt="Cornfield with farm buildings"
              src="/figmaAssets/cornfield_farm.jpg"
            />
            <div className="absolute inset-0 bg-[#5c5426]/70" />
            <div className="relative z-10 grid gap-10 px-6 py-12 md:grid-cols-[1fr_460px] md:items-center md:px-[60px] md:py-[80px]">
              <div>
                <h2 className="max-w-[480px] text-[38px] font-bold leading-[1.1] text-white md:text-[52px]">
                  Sign up for Our Newsletter, See What&apos;s Growing
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
                    placeholder="Type Your Email..."
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

        <section className="px-4 py-16 md:px-8 md:py-24">
          <h2 className="mx-auto max-w-[720px] text-center text-[38px] font-bold leading-[1.15] text-[#5e4540] md:text-[52px]">
            Meet the Industry Leaders Who Launched Better Farms
          </h2>
          <p className="mx-auto mt-8 max-w-[760px] text-center [font-family:'Inter',Helvetica] text-base leading-7 text-[#5e4540]">
            Our board members helped create organic certification, served under
            presidential administrations, and built some of the largest
            operations in sustainable agriculture. They have the relationships,
            credibility, and track record to make Better Farms a great success.
          </p>
          <div className="mx-auto mt-14 grid max-w-[1100px] gap-10 md:grid-cols-3">
            {boardMembers.map((member, index) => (
              <div
                key={index}
                data-testid={`card-board-member-${index}`}
                className={index === 1 ? "md:mt-16" : ""}
              >
                <img
                  className="h-[360px] w-full rounded-2xl object-cover grayscale-[60%] sepia-[20%]"
                  alt={member.name}
                  src={member.image}
                />
                <p className="mt-4 [font-family:'Inter',Helvetica] text-base font-bold text-[#5e4540]">
                  {member.name}
                </p>
                <p className="mt-1 [font-family:'Inter',Helvetica] text-base text-[#5e4540]">
                  {member.credential}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-14 md:px-8 md:py-20">
          <h2 className="mx-auto max-w-[720px] text-center text-[40px] font-bold leading-[1.1] text-[#5e4540] md:text-[56px]">
            Ready to See How It Works?
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-center [font-family:'Inter',Helvetica] text-base leading-7 text-[#5e4540]">
            Better Farms projects follow a clear process from funding to
            fieldwork to final reporting. See how we turn your investment into
            measurable results on a real farm.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              asChild
              className="h-auto rounded-lg bg-[#7587ac] px-[24px] py-[15px] text-white hover:bg-[#6c7ea0]"
            >
              <Link href="/how-it-works" data-testid="link-meet-the-team">
                <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                  Meet The Team
                </span>
                <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
              </Link>
            </Button>
          </div>
        </section>

        <img
          className="h-[360px] w-full object-cover md:h-[460px]"
          alt="Rancher with cattle at sunset"
          src="/figmaAssets/cattle_rancher_field.jpg"
        />
      </main>
      <SiteFooter />
    </div>
  );
};
