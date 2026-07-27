import { DonationSection } from "@/components/DonationSection";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const FundAFarm = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <DonationSection
          headingLevel="h1"
          sectionClassName="pt-10 md:pt-[123px] lg:pt-[200px]"
          imageWrapperClassName="-mt-[152px] md:-mt-[236px]"
          imageAlt="Farmers reviewing plans in a field at sunset"
          imageSrc="/sourcePhotos/fund-a-farm/field-sunset.webp"
          imagePositionClassName="object-bottom"
          headingClassName="text-[44px] md:text-[72px] lg:text-[88px] xl:text-[100px]"
        />
      </main>
      <SiteFooter />
    </div>
  );
};
