import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export const navItems = [
  { label: "ABOUT US", href: "/about" },
  { label: "HOW IT WORKS", href: "/how-it-works" },
  { label: "GET INVOLVED", href: "/get-involved" },
  { label: "FOR FARMERS", href: "/for-farmers" },
  { label: "CONTACT", href: "/contact" },
];

export const SiteHeader = (): JSX.Element => {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-8 px-4 py-3 md:px-[53px] md:py-[19px]">
        <Link href="/" className="shrink-0" data-testid="link-home-logo">
          <img
            className="block h-auto w-[180px] md:w-[270px]"
            alt="Better Farms Foundation"
            src="/figmaAssets/logo-1.svg"
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`[font-family:'Inter',Helvetica] text-lg font-bold leading-[26px] text-[#5e4540] transition-opacity hover:opacity-80 ${
                item.href !== "/" && location === item.href ? "underline underline-offset-4" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          asChild
          data-testid="button-fund-a-farm-header"
          className="h-auto rounded-lg bg-[#7587ac] px-4 py-3 text-white hover:bg-[#6c7ea0] md:px-6"
        >
          <Link href="/fund-a-farm">
            <span className="[font-family:'Inter',Helvetica] text-sm font-medium md:text-lg">
              Fund a Farm
            </span>
            <img
              className="ml-2 h-6 w-6"
              alt=""
              src="/figmaAssets/keyboard-arrow-right-2.svg"
            />
          </Link>
        </Button>
      </div>
    </header>
  );
};
