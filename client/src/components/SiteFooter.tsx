import { Link } from "wouter";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { navItems } from "@/components/SiteHeader";
import { useNewsletterSignup } from "@/hooks/use-newsletter-signup";

const legalDocuments = [
  {
    label: "Privacy Policy",
    title: "Privacy Policy",
    description:
      "How Better Farms Foundation collects, uses, and protects information shared through this website.",
    updated: "July 17, 2026",
    sections: [
      {
        heading: "Information We Collect",
        body: "We may collect information you choose to provide, including your name, email address, donation details, newsletter preferences, and messages submitted through forms. We may also collect basic technical information such as browser type, device information, pages viewed, and general usage data to help us improve the website.",
      },
      {
        heading: "How We Use Information",
        body: "We use information to process donations, respond to inquiries, send requested updates, operate and improve our website, protect against misuse, and maintain records required for nonprofit operations. We do not sell personal information.",
      },
      {
        heading: "Donations and Service Providers",
        body: "Donation and payment information may be processed by trusted third-party providers. Those providers use information according to their own security and privacy practices. Better Farms Foundation only shares information as needed to provide services, comply with law, or protect the organization and the people we serve.",
      },
      {
        heading: "Your Choices",
        body: "You may unsubscribe from email updates using the link in our messages or contact us to request that we update or remove information where applicable. Some records may be retained when required for legal, accounting, fraud prevention, or legitimate operational purposes.",
      },
      {
        heading: "Security",
        body: "We use reasonable administrative, technical, and organizational safeguards designed to protect information. No website or transmission method is completely secure, but we work to handle information responsibly.",
      },
    ],
  },
  {
    label: "Terms of Use",
    title: "Terms of Use",
    description:
      "The basic rules for using the Better Farms Foundation website and digital materials.",
    updated: "July 17, 2026",
    sections: [
      {
        heading: "Website Use",
        body: "By using this website, you agree to use it only for lawful purposes and in a way that does not interfere with the site, its security, or other visitors. You may not attempt to gain unauthorized access to systems, submit harmful code, or misuse forms and donation tools.",
      },
      {
        heading: "Content",
        body: "Text, images, logos, graphics, and other materials on this website are owned by or licensed to Better Farms Foundation unless otherwise noted. You may view and share links to our public pages, but you may not copy, modify, or reuse materials for commercial purposes without permission.",
      },
      {
        heading: "Donations",
        body: "Donation amounts, program descriptions, and impact statements are provided in good faith. We aim to direct funds toward the farm-level work described on this site while preserving the flexibility needed to manage nonprofit operations, project needs, compliance, and changing conditions.",
      },
      {
        heading: "Third-Party Services",
        body: "This website may rely on third-party services for payments, analytics, email, hosting, or other operations. We are not responsible for third-party websites or services that are outside our control.",
      },
      {
        heading: "No Warranty",
        body: "The website is provided as available. We work to keep information accurate and current, but we do not guarantee that all content will be complete, uninterrupted, error-free, or suitable for every purpose.",
      },
    ],
  },
  {
    label: "Accessibility",
    title: "Accessibility Statement",
    description:
      "Our commitment to making the Better Farms Foundation website usable for as many people as possible.",
    updated: "July 17, 2026",
    sections: [
      {
        heading: "Our Commitment",
        body: "Better Farms Foundation is committed to providing a website that is accessible to people with diverse abilities, technologies, and browsing needs. We aim to follow widely accepted accessibility practices, including clear structure, readable contrast, keyboard access, descriptive text, and responsive layouts.",
      },
      {
        heading: "Ongoing Improvements",
        body: "Accessibility is an ongoing effort. As we update content, images, forms, and interactive features, we work to identify and improve barriers that may affect visitors using assistive technologies.",
      },
      {
        heading: "Supported Features",
        body: "The site is designed to support semantic headings, keyboard navigation, visible focus states, descriptive alternative text where appropriate, and form labels or accessible names for key interactions.",
      },
      {
        heading: "Feedback",
        body: "If you experience difficulty using this website, please contact us through the Contact page and include the page address, the issue you encountered, and the technology or browser you were using. We will review the issue and work toward a practical resolution.",
      },
    ],
  },
];

const socialIcons = [
  { label: "YouTube", Icon: FaYoutube },
  { label: "LinkedIn", Icon: FaLinkedin },
  { label: "Instagram", Icon: FaInstagram },
  { label: "Facebook", Icon: FaFacebook },
  { label: "X", Icon: FaXTwitter },
  { label: "TikTok", Icon: FaTiktok },
];

export const SiteFooter = (): JSX.Element => {
  const handleNewsletterSignup = useNewsletterSignup();

  return (
    <footer className="overflow-hidden bg-[#5e4540] px-4 py-10 md:px-8 xl:h-[461px] xl:py-1">
      <div className="relative mx-auto max-w-[1440px] xl:h-full">
        <div className="site-footer-layout grid gap-10 xl:translate-y-[48px] xl:grid-cols-[365px_minmax(0,1fr)_430px] xl:items-start xl:gap-0 xl:px-[102px]">
          <div className="site-footer-brand space-y-4">
            <Link
              href="/"
              aria-label="Go to the Better Farms Foundation homepage"
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#5e4540]"
            >
              <img
                className="h-auto w-[240px] md:w-[300px] xl:w-[365px]"
                alt="Better Farms Foundation"
                src="/sourcePhotos/brand/footer-logo.svg"
              />
            </Link>
            <div
              className="flex h-7 w-fit items-center gap-3 text-white"
              aria-label="Social media"
            >
              {socialIcons.map(({ label, Icon }) => (
                <span
                  key={label}
                  role="img"
                  aria-label={label}
                  className="inline-flex h-7 w-6 items-center justify-center transition-colors duration-300 ease-out hover:text-[#827b3e]"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>
          <nav className="site-footer-nav flex flex-col items-start gap-4 pt-1 xl:justify-self-center" aria-label="Footer">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-testid={`link-footer-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex min-h-11 items-center [font-family:'Inter',Helvetica] text-base font-medium leading-[normal] text-white transition-colors hover:text-[#827b3e] xl:min-h-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="site-footer-newsletter min-w-0">
            <h2 className="text-left text-[30px] font-bold leading-[1.05] text-white xl:text-center xl:text-[40px]">
              Sign up for Our Newsletter, See What&apos;s Growing
            </h2>
            <form className="mt-6 space-y-4" onSubmit={handleNewsletterSignup}>
              <Input
                name="name"
                aria-label="Full name"
                required
                placeholder="Full Name"
                data-testid="input-footer-name"
                className="h-11 rounded-lg border-0 bg-white px-4 [font-family:'Inter',Helvetica] text-sm font-medium text-[#5e4540]"
              />
              <div className="grid grid-cols-[1fr_122px] gap-[5px]">
                <Input
                  name="email"
                  type="email"
                  aria-label="Email address"
                  required
                  placeholder="Type Your Email..."
                  data-testid="input-footer-email"
                  className="h-11 rounded-lg border-0 bg-white px-4 [font-family:'Inter',Helvetica] text-sm font-medium text-[#5e4540]"
                />
                <Button
                  type="submit"
                  arrowMotion
                  data-testid="button-footer-subscribe"
                  className="h-11 rounded-lg bg-[#7587ac] px-4 py-0 text-[#e6dfc9] hover:bg-[#6c7ea0]"
                >
                  <span className="[font-family:'Inter',Helvetica] text-sm font-medium">
                    Subscribe
                  </span>
                  <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-5 xl:mt-0">
          <img
            className="h-auto w-full max-w-[1423px] xl:h-[190px]"
            alt="Better farms"
            src="/figmaAssets/better-farms.svg"
          />
        </div>
        <div className="mt-2.5 flex flex-col gap-4 border-t border-white/0 pt-1 xl:absolute xl:inset-x-0 xl:bottom-1 xl:mt-0 xl:flex-row xl:items-center xl:justify-between xl:px-[102px]">
          <div className="flex flex-col items-start gap-1 [font-family:'Montserrat',Helvetica] text-xs font-normal leading-[normal] text-white xl:flex-row xl:items-center xl:gap-4">
            <span>© 2026 Better Farms Foundation</span>
            <div className="flex items-center whitespace-nowrap">
              {legalDocuments.map((document, index) => (
                <span key={document.label}>
                  {index > 0 && <span className="mx-[6px]">|</span>}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex min-h-6 items-center underline underline-offset-2 transition-colors hover:text-[#e6dfc9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#5e4540]"
                      >
                        {document.label}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[88vh] max-w-[760px] overflow-hidden rounded-[20px] border-0 bg-[#f8f4e8] p-0 text-[#5e4540] shadow-2xl">
                      <div className="border-b border-[#5e4540]/15 bg-white px-6 py-5 md:px-8">
                        <DialogHeader className="space-y-4 text-left">
                          <img
                            className="h-auto w-[220px]"
                            alt="Better Farms Foundation"
                            src="/sourcePhotos/brand/logo.svg"
                          />
                          <div>
                            <DialogTitle className="[font-family:'Playfair_Display',Helvetica] text-[34px] font-bold leading-[1.05] text-[#5e4540] md:text-[44px]">
                              {document.title}
                            </DialogTitle>
                            <DialogDescription className="mt-3 max-w-[580px] [font-family:'Inter',Helvetica] text-sm leading-6 text-[#5e4540]/80">
                              {document.description}
                            </DialogDescription>
                          </div>
                        </DialogHeader>
                      </div>
                      <div className="max-h-[56vh] overflow-y-auto px-6 py-6 md:px-8">
                        <p className="[font-family:'Inter',Helvetica] text-xs font-semibold uppercase tracking-[0.12em] text-[#827b3e]">
                          Last updated {document.updated}
                        </p>
                        <div className="mt-5 space-y-6">
                          {document.sections.map((section) => (
                            <section key={section.heading}>
                              <h3 className="[font-family:'Playfair_Display',Helvetica] text-[24px] font-bold leading-tight text-[#5e4540]">
                                {section.heading}
                              </h3>
                              <p className="mt-2 [font-family:'Inter',Helvetica] text-sm leading-7 text-[#5e4540] md:text-base">
                                {section.body}
                              </p>
                            </section>
                          ))}
                        </div>
                        <div className="mt-8 rounded-xl bg-[#e6dfc9] p-5 [font-family:'Inter',Helvetica] text-sm leading-6 text-[#5e4540]">
                          For questions about this document, please reach out through
                          the Better Farms Foundation Contact page.
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="[font-family:'Montserrat',Helvetica] text-xs font-normal leading-[normal] text-white">
              Made by
            </span>
            <img className="h-[21px] w-auto" alt="Digital Alchemy" src="/figmaAssets/da-logo.svg" />
          </div>
        </div>
      </div>
    </footer>
  );
};
