import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navItems } from "@/components/SiteHeader";

export const SiteFooter = (): JSX.Element => {
  return (
    <footer className="bg-[#5e4540] px-4 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_430px] md:items-start md:px-[102px]">
          <div className="space-y-6">
            <img
              className="h-auto w-[240px] md:w-[365px]"
              alt="Better Farms Foundation"
              src="/figmaAssets/logo.svg"
            />
            <img
              className="h-7 w-[204px]"
              alt="Social media"
              src="/figmaAssets/frame-37278.svg"
            />
          </div>
          <nav className="flex flex-col items-start gap-4 pt-2" aria-label="Footer">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-testid={`link-footer-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="[font-family:'Inter',Helvetica] text-base font-medium leading-[normal] text-white transition-colors hover:text-[#827b3e]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div>
            <h2 className="text-center text-[32px] font-bold leading-[1.05] text-white md:text-[40px]">
              Sign up for Our Newsletter, See What&apos;s Growing
            </h2>
            <form className="mt-6 space-y-4">
              <Input
                placeholder="Full Name"
                data-testid="input-footer-name"
                className="h-[42.93px] rounded-lg border-0 bg-white px-4 [font-family:'Inter',Helvetica] text-sm font-medium text-[#5e4540]"
              />
              <div className="grid grid-cols-[1fr_122px] gap-[5px]">
                <Input
                  placeholder="Type Your Email..."
                  data-testid="input-footer-email"
                  className="h-11 rounded-lg border-0 bg-white px-4 [font-family:'Inter',Helvetica] text-sm font-medium text-[#5e4540]"
                />
                <Button
                  type="button"
                  data-testid="button-footer-subscribe"
                  className="h-auto rounded-lg bg-[#7587ac] px-[18px] py-[19px] text-[#e6dfc9] hover:bg-[#6c7ea0]"
                >
                  <span className="[font-family:'Inter',Helvetica] text-sm font-medium">
                    Subscribe
                  </span>
                  <img className="ml-2 h-6 w-6" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12">
          <img
            className="h-auto w-full max-w-[1423px]"
            alt="Better farms"
            src="/figmaAssets/better-farms.svg"
          />
        </div>
        <div className="mt-6 flex flex-col gap-4 border-t border-white/0 pt-2 md:flex-row md:items-center md:justify-between md:px-[103px]">
          <div className="[font-family:'Montserrat',Helvetica] text-xs font-normal leading-[normal] text-white">
            <span>© 2026 Better Farms Foundation&nbsp;&nbsp;&nbsp;&nbsp; </span>
            <a
              href="https://directory.herplan.org/privacy-policy"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              Privacy Policy
            </a>
            <span> | </span>
            <a
              href="https://directory.herplan.org/terms-conditions"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              Terms of Use
            </a>
            <span> | </span>
            <a
              href="https://herplan.org/accessibility/"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              Accessibility
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="[font-family:'Montserrat',Helvetica] text-xs font-normal leading-[normal] text-white">
              Made by
            </span>
            <img className="h-[21px] w-auto" alt="Digital Alchemy" src="/figmaAssets/da-logo.png" />
          </div>
        </div>
      </div>
    </footer>
  );
};
