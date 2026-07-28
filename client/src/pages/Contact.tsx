import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollRevealPage } from "@/components/ScrollRevealPage";

const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  organization: z.string().optional(),
  role: z.string().optional(),
  referral: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactForm = z.infer<typeof contactSchema>;

const roleOptions = ["Farmer", "Donor", "Corporate Partner", "Foundation", "Other"];
const referralOptions = ["Search", "Social Media", "Word of Mouth", "Event", "Other"];

export const Contact = (): JSX.Element => {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
      role: "",
      referral: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    toast({
      title: "Message sent",
      description: "Thanks for reaching out. Our team will be in touch soon.",
    });
    form.reset();
  };

  return (
    <ScrollRevealPage className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader />
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 py-10 md:px-[29px] lg:pt-0 min-[1400px]:grid-cols-[560px_minmax(0,1fr)] min-[1400px]:gap-[86px] min-[1400px]:pb-[67px]">
          <div>
            <h1 className="typography-exempt max-w-[520px] text-[38px] font-bold leading-[1.08] text-[#5e4540] min-[1400px]:mt-5 md:text-[48px]">
              Take the First Step Towards Better Farms
            </h1>
            <p className="mt-10 max-w-[520px] [font-family:'Inter',Helvetica] text-base leading-6 text-[#5e4540] md:text-lg md:leading-[1.5]">
              Every partnership, project, and breakthrough starts with a simple
              conversation. Fill out the form below. Our team will be in touch.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 max-w-[552px]">
                <p className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#5e4540]">
                  Personal Information
                </p>
                <div className="mt-3 space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Full Name*"
                            data-testid="input-full-name"
                            className="h-[54px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email*"
                              data-testid="input-email"
                              className="h-[54px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Organization"
                              data-testid="input-organization"
                              className="h-[54px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#5e4540]">
                        I am a:
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger
                            data-testid="select-role"
                            className="h-[54px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referral"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#5e4540]">
                        How did you hear about Better Farms?
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger
                            data-testid="select-referral"
                            className="h-[54px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {referralOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#5e4540]">
                        Leave us a message*
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Leave a message"
                          data-testid="input-message"
                          className="min-h-[160px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  arrowMotion
                  data-testid="button-send-message"
                  className="mt-8 h-auto rounded-lg bg-[#bc623f] pb-[19px] pl-[18px] pr-[14px] pt-[19px] text-white hover:bg-[#ab5838]"
                >
                  <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                    Send Message
                  </span>
                  <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                </Button>
              </form>
            </Form>
          </div>
          <div className="hidden overflow-hidden rounded-lg rounded-b-[20px] md:block">
            <img
              className="hero-image-after-title h-[520px] w-full rounded-lg rounded-b-[20px] object-cover min-[1400px]:h-[900px]"
              alt="Two farmers inspecting crops at dusk"
              src="/sourcePhotos/contact/farmers.webp"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </ScrollRevealPage>
  );
};
