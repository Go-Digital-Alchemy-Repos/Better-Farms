import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const donationOptions = ["$25", "$30", "$100"];

export const FundAFarm = (): JSX.Element => {
  const [selectedDonation, setSelectedDonation] = useState("$30");
  const [customAmount, setCustomAmount] = useState("");

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden pt-10 md:pt-[123px]">
          <div className="px-4 md:px-8">
            <h1 className="text-center text-[44px] font-bold leading-[1.05] text-[#5e4540] md:text-[72px] lg:text-[88px] xl:text-[100px]">
              Fund a Farm Today
            </h1>
            <p className="mx-auto mt-6 max-w-[724px] text-center [font-family:'Inter',Helvetica] text-lg font-normal leading-8 text-[#5e4540] md:text-xl">
              <span className="font-bold">
                Your contribution can strengthen a farm for decades.{" "}
              </span>
              <span>
                Put your dollars to work and get proof of what you&apos;ve built.
              </span>
            </p>
            <div className="relative z-10 mx-auto mt-12 max-w-[860px] rounded-xl bg-white shadow-[0px_4px_10px_#00000040]">
              <div className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-center md:gap-4 md:px-[40px] md:py-[34px]">
                <div className="flex flex-wrap gap-3">
                  {donationOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      data-testid={`button-donation-${option.replace("$", "")}`}
                      onClick={() => {
                        setSelectedDonation(option);
                        setCustomAmount("");
                      }}
                      className={`flex h-[58px] min-w-[110px] items-center justify-center rounded-[10px] border [font-family:'Inter',Helvetica] text-[26px] font-bold leading-[normal] ${
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
                  <div className="flex h-[58px] w-[130px] items-center rounded-[10px] border border-[#bcb9b9] bg-white px-[14px]">
                    <span className="[font-family:'Inter',Helvetica] text-[26px] font-bold leading-[normal] text-[#5e4540]">
                      $
                    </span>
                    <Input
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
            <p className="relative z-10 mx-auto mt-8 max-w-[875px] text-center [font-family:'Inter',Helvetica] text-sm font-bold leading-6 text-[#2f2820]">
              501(c)(3) nonprofit organization&nbsp;&nbsp;|&nbsp;&nbsp;100% of
              your funds go to farm-level work&nbsp;&nbsp;|&nbsp;&nbsp;ESG
              impact reporting included
            </p>
          </div>
          <div className="relative -mt-16 md:-mt-[158px]">
            <div className="absolute inset-x-0 top-0 z-[5] h-[180px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] md:h-[240px]" />
            <img
              className="h-[460px] w-full object-cover object-bottom md:h-[520px]"
              alt="Farmers reviewing plans in a field at sunset"
              src="/sourcePhotos/fund-a-farm/field-sunset.webp"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
