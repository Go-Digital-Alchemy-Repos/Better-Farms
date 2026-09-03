import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteShell } from "@/components/SiteShell";
import { Link } from "wouter";
import { betterFarmsTheme } from "@/site/better-farms-theme";
import {
  defaultFundAFarmContent,
  type FundAFarmContent,
} from "@/site/fund-a-farm-content";

const donationOptions = ["$25", "$30", "$100"];

interface FundAFarmProps {
  content?: FundAFarmContent;
}

export const FundAFarmPage = ({
  content = defaultFundAFarmContent,
}: FundAFarmProps): JSX.Element => {
  const [selectedDonation, setSelectedDonation] = useState("$30");
  const [customAmount, setCustomAmount] = useState("");

  return (
    <SiteShell>
      <section className={betterFarmsTheme.recipes.heroSection}>
        <div className={betterFarmsTheme.recipes.heroContent}>
          <h1 className={betterFarmsTheme.recipes.heroHeading}>
            {content.heading}
          </h1>
          <p className={betterFarmsTheme.recipes.heroIntroduction}>
            <span className="font-bold">{content.introductionLead} </span>
            <span>{content.introductionBody}</span>
          </p>
          <div className={betterFarmsTheme.recipes.donationCard}>
            <div className={betterFarmsTheme.recipes.donationCardContent}>
              <div className="flex flex-wrap gap-3">
                {donationOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selectedDonation === option}
                    data-testid={`button-donation-${option.replace("$", "")}`}
                    onClick={() => {
                      setSelectedDonation(option);
                      setCustomAmount("");
                    }}
                    className={`${betterFarmsTheme.recipes.donationOption} ${
                      selectedDonation === option
                        ? betterFarmsTheme.recipes.donationOptionSelected
                        : betterFarmsTheme.recipes.donationOptionIdle
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
                <div className="flex h-[58px] w-[130px] items-center rounded-[10px] border border-[#bcb9b9] bg-white px-[14px]">
                  <span className="[font-family:'Inter',Helvetica] text-[26px] font-bold leading-[normal] text-[#5e4540]">
                    $
                  </span>
                  <Input
                    aria-label="Custom donation amount"
                    value={customAmount}
                    onChange={(e) => {
                      const numeric = e.target.value.replace(/\D/g, "");
                      setCustomAmount(numeric);
                      if (numeric.length > 0) {
                        setSelectedDonation("");
                      } else {
                        setSelectedDonation("$30");
                      }
                    }}
                    inputMode="numeric"
                    data-testid="input-custom-donation"
                    className="h-full border-0 p-0 pl-2 text-[22px] font-bold text-[#5e4540] shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <Button
                asChild
                data-testid="button-donate-now"
                className={betterFarmsTheme.recipes.donationAction}
              >
                {content.cta.target.startsWith("https://") ? (
                  <a href={content.cta.target}>
                    <CtaContent label={content.cta.label} />
                  </a>
                ) : (
                  <Link href={content.cta.target}>
                    <CtaContent label={content.cta.label} />
                  </Link>
                )}
              </Button>
            </div>
          </div>
          <p className={betterFarmsTheme.recipes.impactStatement}>
            {content.impactStatement}
          </p>
        </div>
        <div className="relative -mt-16 md:-mt-[158px]">
          <div className="absolute inset-x-0 top-0 z-[5] h-[180px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] md:h-[240px]" />
          <img
            className={betterFarmsTheme.recipes.heroImage}
            alt={content.heroImage.alt}
            src={content.heroImage.src}
          />
        </div>
      </section>
    </SiteShell>
  );
};

export const FundAFarm = (): JSX.Element => <FundAFarmPage />;

function CtaContent({ label }: { label: string }): JSX.Element {
  return (
    <>
      <span className="[font-family:'Inter',Helvetica] text-lg font-medium">
        {label}
      </span>
      <img
        className="ml-2 h-6 w-6"
        alt=""
        src="/figmaAssets/keyboard-arrow-right-2.svg"
      />
    </>
  );
}
