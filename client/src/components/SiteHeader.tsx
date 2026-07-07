import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4 xl:px-[53px]">
        <Link href="/" className="shrink-0" data-testid="link-home-logo">
          <img
            className="block h-auto w-[160px] md:w-[200px] xl:w-[240px]"
            alt="Better Farms Foundation"
            src="/figmaAssets/logo-1.svg"
          />
        </Link>
        <nav
          className="hidden items-center gap-4 lg:flex xl:gap-6"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`whitespace-nowrap [font-family:'Inter',Helvetica] text-[13px] font-bold leading-none text-[#5e4540] transition-colors hover:text-[#827b3e] xl:text-[15px] ${
                item.href !== "/" && location === item.href
                  ? "underline underline-offset-4"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            data-testid="button-fund-a-farm-header"
            className="hidden h-auto whitespace-nowrap rounded-lg bg-[#7587ac] px-3 py-2.5 text-white hover:bg-[#6c7ea0] sm:inline-flex md:px-5"
          >
            <Link href="/fund-a-farm">
              <span className="[font-family:'Inter',Helvetica] text-sm font-medium xl:text-base">
                Fund a Farm
              </span>
              <img
                className="ml-1.5 h-5 w-5"
                alt=""
                src="/figmaAssets/keyboard-arrow-right-2.svg"
              />
            </Link>
          </Button>
          <button
            type="button"
            data-testid="button-mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-[#5e4540] lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-[#eee7d8] bg-white px-4 pb-4 pt-2 lg:hidden"
          aria-label="Mobile"
        >
          <Link
            href="/fund-a-farm"
            data-testid="link-mobile-fund-a-farm"
            onClick={() => setMobileOpen(false)}
            className="block py-3 [font-family:'Inter',Helvetica] text-base font-bold text-[#7587ac] transition-colors hover:text-[#827b3e] sm:hidden"
          >
            FUND A FARM
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setMobileOpen(false)}
              className={`block whitespace-nowrap py-3 [font-family:'Inter',Helvetica] text-base font-bold text-[#5e4540] transition-colors hover:text-[#827b3e] ${
                item.href !== "/" && location === item.href
                  ? "underline underline-offset-4"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
