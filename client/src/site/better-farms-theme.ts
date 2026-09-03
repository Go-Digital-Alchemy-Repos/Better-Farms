export const betterFarmsTheme = {
  id: "better-farms-theme",
  version: "1.0.0",
  tokens: {
    color: {
      page: "#ffffff",
      text: "#5e4540",
      strongText: "#2f2820",
      action: "#bc623f",
      actionHover: "#ab5838",
      selected: "#434343",
      border: "#bcb9b9",
    },
    typography: {
      body: "Inter, Helvetica, sans-serif",
      display: "Playfair Display, Georgia, serif",
    },
    radius: {
      control: "0.625rem",
      card: "0.75rem",
    },
  },
  recipes: {
    page: "min-h-screen w-full overflow-x-clip bg-white",
    heroSection: "relative overflow-hidden pt-10 md:pt-[123px]",
    heroContent: "px-4 md:px-8",
    heroHeading:
      "text-center text-[44px] font-bold leading-[1.05] text-[#5e4540] md:text-[72px] lg:text-[88px] xl:text-[100px]",
    heroIntroduction:
      "mx-auto mt-6 max-w-[724px] text-center [font-family:'Inter',Helvetica] text-lg font-normal leading-8 text-[#5e4540] md:text-xl",
    donationCard:
      "relative z-10 mx-auto mt-12 max-w-[860px] rounded-xl bg-white shadow-[0px_4px_10px_#00000040]",
    donationCardContent:
      "flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-center md:gap-4 md:px-[40px] md:py-[34px]",
    donationOption:
      "flex h-[58px] min-w-[110px] items-center justify-center rounded-[10px] border [font-family:'Inter',Helvetica] text-[26px] font-bold leading-[normal]",
    donationOptionSelected: "border-[#d7d7d7] bg-[#434343] text-white",
    donationOptionIdle: "border-[#bcb9b9] bg-white text-[#434343]",
    donationAction:
      "h-[58px] rounded-lg bg-[#bc623f] px-[24px] text-white hover:bg-[#ab5838]",
    impactStatement:
      "relative z-10 mx-auto mt-8 max-w-[875px] text-center [font-family:'Inter',Helvetica] text-sm font-bold leading-6 text-[#2f2820]",
    heroImage: "h-[460px] w-full object-cover object-bottom md:h-[520px]",
  },
} as const;

export type BetterFarmsTheme = typeof betterFarmsTheme;
