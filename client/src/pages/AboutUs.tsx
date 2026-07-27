import { useEffect, useState } from "react";
import {
  TeamMemberDialog,
  type TeamMember,
  placeholderBio,
} from "@/components/TeamMemberDialog";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const principles = [
  {
    title: "Results",
    icon: "/sourcePhotos/about/principles/results.svg",
    body: "We fund projects through to completion. Donors see finished work and measurable change on the farm.",
  },
  {
    title: "Execution",
    icon: "/sourcePhotos/about/principles/execution.svg",
    body: "Agricultural experts oversee each build. Projects get done right and hold up under real farm conditions.",
  },
  {
    title: "Transparency",
    icon: "/sourcePhotos/about/principles/transparency.svg",
    body: "We track every dollar and document every outcome. Donors receive clear reports that show the full picture.",
  },
  {
    title: "Multiplied Impact",
    icon: "/sourcePhotos/about/principles/multiplied-impact.svg",
    body: "We combine contributions from corporations, foundations, and donor-advised funds. Farmers get fully funded projects, and every dollar goes further.",
  },
  {
    title: "Farmer-Centered",
    icon: "/sourcePhotos/about/principles/farmer-centered.svg",
    body: "Farmers shape each project from day one. Producers know what their land needs, and we build around that.",
  },
];

const othersDo = [
  "Fund research and studies",
  "Rely on volunteer networks",
  "Provide feel-good impact photos",
  "Depend on shifting government grants",
  "Work in isolation",
  "Talk about problems",
];

const weDo = [
  "Fund direct farm projects",
  "Deploy professional staff",
  "Deliver technical ESG reporting",
  "Maintain independence from political cycles",
  "Aggregate funding from multiple sources",
  "Solve problems",
];

const topoPatternStyle = {
  backgroundImage: "url('/figmaAssets/topographic-contours.svg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat" as const,
  backgroundSize: "100% 100%",
};

const boardMembers: (TeamMember & { overlay: string })[] = [
  { image: "/figmaAssets/portrait_woman_farmer.webp", overlay: "rgba(117, 135, 172, 0.30)", name: "Full Name", credential: "One-line credential", bio: placeholderBio },
  { image: "/figmaAssets/portrait_elderly_woman.webp", overlay: "rgba(130, 123, 62, 0.36)", name: "Full Name", credential: "One-line credential", bio: placeholderBio },
  { image: "/figmaAssets/portrait_man_farmer.webp", overlay: "rgba(188, 98, 63, 0.32)", name: "Full Name", credential: "One-line credential", bio: placeholderBio },
  { image: "/figmaAssets/portrait_elderly_woman.webp", overlay: "rgba(188, 98, 63, 0.32)", name: "Full Name", credential: "One-line credential", bio: placeholderBio },
  { image: "/figmaAssets/portrait_man_farmer.webp", overlay: "rgba(117, 135, 172, 0.30)", name: "Full Name", credential: "One-line credential", bio: placeholderBio },
  { image: "/figmaAssets/portrait_woman_farmer.webp", overlay: "rgba(130, 123, 62, 0.36)", name: "Full Name", credential: "One-line credential", bio: placeholderBio },
];

export const AboutUs = (): JSX.Element => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (window.location.hash === "#team") {
      requestAnimationFrame(() => {
        document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <section className="px-4 pt-4 md:px-[29px] lg:pt-0">
          <div className="hero-panel mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-4 md:px-[42px] md:pb-[42px]">
            <h1 className="hero-title mx-auto text-center font-bold text-white">
              Better Farms Start With Better Partners
            </h1>
            <img
              className="hero-image-after-title w-full rounded-[20px]"
              alt="Sheep feeding at a wooden trough"
              src="/sourcePhotos/about/sheep-feeding.webp"
            />
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-[142px]">
          <h2 className="mx-auto max-w-[830px] text-center text-[36px] font-bold leading-[1.1] text-[#5e4540] md:text-[50px]">
            Our Team Has Spent Careers Inside American Agriculture.
          </h2>
          <p className="mx-auto mt-8 max-w-[760px] text-center [font-family:'Inter',Helvetica] text-base leading-7 text-[#5e4540]">
            We&apos;ve served on federal advisory boards, built companies in organic farming, and helped shape the standards this industry runs on. That work gave us a clear view of what farmers are up against and what actually helps them succeed. The Better Farms Foundation is our answer. We identify the problem on the farm, design the solution, and fund the work to get it done.
          </p>
        </section>

        <section className="overflow-hidden pb-6">
          <div className="edge-image-pair edge-image-pair--large-left grid-cols-1 items-start">
            <img
              className="edge-image-pair-large rounded-lg"
              alt="Farmer pitching hay in a dairy barn"
              src="/sourcePhotos/about/man-feeding-cows.webp"
            />
            <img
              className="edge-image-pair-small rounded-lg"
              alt="Goats grazing on green pasture"
              src="/sourcePhotos/about/goats-grazing.webp"
            />
          </div>
        </section>

        <section className="relative z-20 px-4 pb-0 pt-12 md:-mb-8 md:px-8 md:pt-16">
          <blockquote
            className="mx-auto max-w-[640px] translate-y-8 text-center text-[26px] leading-[1.5] text-[#5e4540] md:translate-y-16 md:text-[32px]"
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

        <section className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[26%] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.74)_42%,rgba(255,255,255,0)_100%)] md:h-[30%]" />
          <img
            className="h-[300px] w-full object-cover md:h-[420px]"
            alt="Rolling hills and farmland"
            src="/sourcePhotos/about/landscape.webp"
          />
          <div className="bg-gradient-to-b from-[#7587ac] to-[#4d5b78] px-4 py-16 md:rounded-b-[30px] md:px-8">
            <div className="mx-auto max-w-[1000px]">
              <h2 className="mx-auto max-w-[560px] text-center text-[38px] font-bold leading-[1.15] text-white md:text-[50px]">
                The Principles Behind Every Project
              </h2>
              <div className="mt-10 grid gap-x-16 gap-y-8 md:grid-cols-2">
                {principles.map((p) => (
                  <div
                    key={p.title}
                    data-testid={`item-principle-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="border-b border-white/40 pb-6 text-center md:text-left"
                  >
                    <img
                      className="mx-auto mb-3 h-11 w-11 object-contain md:mx-0"
                      src={p.icon}
                      alt=""
                      aria-hidden="true"
                    />
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

        <section className="relative overflow-hidden px-4 py-12 md:px-8 md:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-80" style={topoPatternStyle} />
          <h2 className="relative z-10 mx-auto max-w-[640px] text-center text-[38px] font-bold leading-[1.15] text-[#5e4540] md:text-[50px]">
            Measuring Impact in Outcomes, Not Intentions
          </h2>
          <p className="relative z-10 mx-auto mt-6 max-w-[680px] text-center [font-family:'Inter',Helvetica] text-base leading-7 text-[#5e4540]">
            The difference is simple. We don&apos;t hand over a check and hope
            for the best. Here&apos;s how our approach stands apart.
          </p>
          <div className="relative z-10 mx-auto mt-14 grid max-w-[1000px] gap-8 md:grid-cols-2 md:gap-0">
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

        <NewsletterSection
          imageAlt="Cornfield with farm buildings"
          imageSrc="/figmaAssets/cornfield_farm.webp"
        />

        <section id="team" className="scroll-mt-24 px-4 py-12 md:px-8 md:py-[84px]">
          <h2 className="mx-auto max-w-[720px] text-center text-[38px] font-bold leading-[1.15] text-[#5e4540] md:text-[50px]">
            Meet the Industry Leaders Who Launched Better Farms
          </h2>
          <p className="mx-auto mt-8 max-w-[760px] text-center [font-family:'Inter',Helvetica] text-base leading-7 text-[#5e4540]">
            Our board members helped create organic certification, served under
            presidential administrations, and built some of the largest
            operations in sustainable agriculture. They have the relationships,
            credibility, and track record to make Better Farms a great success.
          </p>
          <div className="mx-auto mt-14 grid max-w-[1100px] gap-x-10 gap-y-14 md:grid-cols-3">
            {boardMembers.map((member, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                data-testid={`card-board-member-${index}`}
                onClick={() => setSelectedMember(member)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedMember(member);
                  }
                }}
                className={`cursor-pointer ${index % 3 === 1 ? "md:mt-12" : ""}`}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    className="h-[330px] w-full object-cover grayscale"
                    alt={member.name}
                    src={member.image}
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{ backgroundColor: member.overlay }}
                  />
                </div>
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

        <section className="px-4 py-12 md:px-8 md:py-16">
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
              <Link href="/how-it-works" data-testid="link-how-it-works">
                <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                  How It Works
                </span>
                <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
              </Link>
            </Button>
          </div>
        </section>

        <div className="relative">
          <div className="absolute inset-x-0 top-0 z-[5] h-[160px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] md:h-[220px]" />
          <img
            className="h-[360px] w-full object-cover md:h-[460px]"
            alt="Rancher with cattle at sunset"
            src="/figmaAssets/cattle_rancher_field.webp"
          />
        </div>
      </main>
      <TeamMemberDialog
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
      <SiteFooter />
    </div>
  );
};
