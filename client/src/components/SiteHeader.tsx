import { useEffect, useRef, useState } from "react";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen) {
      const drawer = drawerRef.current;
      const trigger = menuButtonRef.current;
      const backdrop = backdropRef.current;
      if (!drawer || !trigger || !backdrop) return;
      const firstLink = drawer.querySelector("a");
      firstLink?.focus();
      // Make background branches inert without disabling the drawer, its close
      // trigger, or the clickable backdrop. Restore their original state on close.
      const protectedElements = [drawer, trigger, backdrop];
      const background: Array<{ element: HTMLElement; inert: boolean }> = [];
      const disableBackground = (parent: HTMLElement) => {
        for (const child of Array.from(parent.children)) {
          if (!(child instanceof HTMLElement)) continue;
          if (protectedElements.includes(child)) continue;
          if (protectedElements.some((element) => child.contains(element))) {
            disableBackground(child);
          } else {
            background.push({ element: child, inert: child.inert });
            child.inert = true;
          }
        }
      };
      disableBackground(document.body);
      const focusable = () => [
        trigger,
        ...Array.from(drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )),
      ].filter((element) => element.getClientRects().length > 0);
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setMobileOpen(false);
          trigger.focus();
        } else if (e.key === "Tab") {
          const elements = focusable();
          const index = elements.indexOf(document.activeElement as HTMLElement);
          if (index < 0 || (e.shiftKey ? index === 0 : index === elements.length - 1)) {
            e.preventDefault();
            (e.shiftKey ? elements.at(-1) : elements[0])?.focus();
          }
        }
      };
      const onFocus = (e: FocusEvent) => {
        if (e.target instanceof Node && e.target !== trigger && !drawer.contains(e.target)) {
          firstLink?.focus();
        }
      };
      const desktop = window.matchMedia("(min-width: 1024px)");
      const onDesktop = () => { if (desktop.matches) setMobileOpen(false); };
      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("focusin", onFocus);
      desktop.addEventListener("change", onDesktop);
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("focusin", onFocus);
        desktop.removeEventListener("change", onDesktop);
        for (const { element, inert } of background) element.inert = inert;
        document.body.style.overflow = "";
      };
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-white">
      <a
        href="#main-content"
        onClick={() => document.getElementById("main-content")?.focus()}
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded focus-visible:bg-white focus-visible:px-4 focus-visible:py-3 focus-visible:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Skip to main content
      </a>
      <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4 lg:py-[6px] xl:px-[37px]">
        <Link href="/" className="shrink-0" data-testid="link-home-logo">
          <img
            className="block h-auto w-[224px] md:w-[200px] xl:w-[240px]"
            alt="Better Farms Foundation"
            src="/sourcePhotos/brand/logo.svg"
          />
        </Link>
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[18px] lg:flex xl:gap-[26px]"
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
            ref={menuButtonRef}
            data-testid="button-mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
            className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-md text-[#5e4540] transition-transform duration-300 active:scale-90 lg:hidden"
          >
            <Menu
              className={`absolute h-6 w-6 transition-all duration-300 ${
                mobileOpen
                  ? "rotate-90 scale-50 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              className={`absolute h-6 w-6 transition-all duration-300 ${
                mobileOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-50 opacity-0"
              }`}
            />
          </button>
        </div>
      </div>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-[#3c3520]/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Slide-out drawer */}
      <nav
        id="mobile-nav"
        ref={drawerRef}
        aria-label="Mobile"
        {...(mobileOpen ? {} : ({ inert: "" } as object))}
        className={`fixed right-0 top-0 z-50 flex h-full w-[300px] max-w-[85vw] flex-col overflow-y-auto bg-[#faf5e4] shadow-[-12px_0_40px_rgba(60,53,32,0.25)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          mobileOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#827b3e] via-[#bc623f] to-[#7587ac]" />
        <div className="flex flex-1 flex-col px-7 pb-8 pt-6">
          <Link
            href="/"
            data-testid="link-mobile-home-logo"
            aria-label="Better Farms Foundation home"
            onClick={() => setMobileOpen(false)}
            style={{ transitionDelay: mobileOpen ? "80ms" : "0ms" }}
            className={`mb-5 mt-7 block w-[240px] max-w-full transition-all duration-500 sm:mt-0 sm:w-[190px] sm:max-w-[calc(100%-2.5rem)] ${
              mobileOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <img
              className="block h-auto w-full"
              alt="Better Farms Foundation"
              src="/sourcePhotos/brand/logo.svg"
            />
          </Link>
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setMobileOpen(false)}
              style={{
                transitionDelay: mobileOpen ? `${120 + index * 60}ms` : "0ms",
              }}
              className={`group flex items-center justify-between border-b border-[#e8dfc6] py-4 [font-family:'Inter',Helvetica] text-base font-bold tracking-wide transition-all duration-500 ${
                mobileOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              } ${
                item.href !== "/" && location === item.href
                  ? "text-[#bc623f]"
                  : "text-[#5e4540] hover:text-[#827b3e]"
              }`}
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                {item.label}
              </span>
              <span
                className={`text-[#bc623f] transition-all duration-300 ${
                  item.href !== "/" && location === item.href
                    ? "opacity-100"
                    : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                →
              </span>
            </Link>
          ))}
          <Link
            href="/fund-a-farm"
            data-testid="link-mobile-fund-a-farm"
            onClick={() => setMobileOpen(false)}
            style={{
              transitionDelay: mobileOpen
                ? `${120 + navItems.length * 60}ms`
                : "0ms",
            }}
            className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#7587ac] px-5 py-3.5 [font-family:'Inter',Helvetica] text-base font-medium text-white transition-all duration-500 hover:bg-[#6c7ea0] ${
              mobileOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            Fund a Farm
            <img
              className="h-5 w-5"
              alt=""
              src="/figmaAssets/keyboard-arrow-right-2.svg"
            />
          </Link>
          <p
            style={{
              transitionDelay: mobileOpen
                ? `${200 + navItems.length * 60}ms`
                : "0ms",
            }}
            className={`mt-auto pt-10 [font-family:'Playfair_Display',serif] text-sm italic text-[#827b3e] transition-all duration-500 ${
              mobileOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            Building resilient food systems
          </p>
        </div>
      </nav>
    </header>
  );
};
