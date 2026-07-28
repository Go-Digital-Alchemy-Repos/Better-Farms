import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSignup } from "@/hooks/use-newsletter-signup";

interface NewsletterSectionProps {
  flushBottom?: boolean;
  imageAlt: string;
  imageSrc: string;
  overlayColor?: string;
}

export const NewsletterSection = ({
  flushBottom = false,
  imageAlt,
  imageSrc,
  overlayColor = "#783f30",
}: NewsletterSectionProps): JSX.Element => {
  const handleNewsletterSignup = useNewsletterSignup();

  return (
    <section className={`px-4 pt-10 md:px-[29px] ${flushBottom ? "pb-0" : "pb-10"}`}>
      <div className="relative mx-auto max-w-[1386px] overflow-hidden rounded-[20px]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          alt={imageAlt}
          src={imageSrc}
        />
        <div
          className="absolute inset-0 opacity-[0.85] mix-blend-multiply"
          style={{ backgroundColor: overlayColor }}
        />
        <div className="relative z-10 grid gap-10 px-6 py-6 lg:grid-cols-[1fr_460px] lg:items-center lg:px-[60px] lg:py-[69px]">
          <div>
            <h2 className="max-w-[480px] text-[38px] font-bold leading-[1.15] tracking-normal text-white md:text-[52px] md:leading-[1.1]">
              Sign up for Our Newsletter &amp; See What&apos;s Growing
            </h2>
            <p className="mt-6 max-w-[420px] [font-family:'Inter',Helvetica] text-base leading-[1.6] tracking-normal text-white">
              We cover projects, farmers, policy shifts, and the latest thinking
              on building a more resilient food system.
            </p>
          </div>
          <form
            className="flex w-full flex-col gap-4 self-center"
            onSubmit={handleNewsletterSignup}
          >
            <Input
              name="name"
              aria-label="Full name"
              required
              placeholder="Full Name"
              data-testid="input-newsletter-name"
              className="h-[52px] rounded-lg border-0 bg-white px-5 [font-family:'Inter',Helvetica] text-base font-medium text-[#5e4540]"
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_140px]">
              <Input
                name="email"
                type="email"
                aria-label="Email address"
                required
                placeholder="Enter email"
                data-testid="input-newsletter-email"
                className="h-[52px] rounded-lg border-0 bg-white px-5 [font-family:'Inter',Helvetica] text-base font-medium text-[#5e4540]"
              />
              <Button
                type="submit"
                data-testid="button-newsletter-subscribe"
                className="h-auto rounded-lg bg-[#7587ac] px-[18px] py-[15px] text-white hover:bg-[#6c7ea0]"
              >
                <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                  Subscribe
                </span>
                <img
                  className="ml-2 h-5 w-5"
                  alt=""
                  src="/figmaAssets/keyboard-arrow-right-2.svg"
                />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
