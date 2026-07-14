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
    <div className="min-h-screen w-full bg-white">
      <SiteHeader />
      <main>
        <section className="mx-auto grid w-full max-w-[1600px] gap-10 px-4 py-10 md:grid-cols-2 md:gap-12 md:px-[70px] md:py-[40px]">
          <div>
            <h1 className="max-w-[420px] text-[38px] font-bold leading-[1.15] text-[#5e4540] md:text-[44px]">
              Take the First Step Towards Better Farms
            </h1>
            <p className="mt-6 max-w-[360px] [font-family:'Inter',Helvetica] text-base leading-6 text-[#5e4540]">
              Every partnership, project, and breakthrough starts with a simple
              conversation. Fill out the form below. Our team will be in touch.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 max-w-[430px]">
                <p className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#3a332b]">
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
                            className="h-[46px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
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
                              className="h-[46px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
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
                              className="h-[46px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
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
                      <FormLabel className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#3a332b]">
                        I am a:
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger
                            data-testid="select-role"
                            className="h-[46px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
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
                      <FormLabel className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#3a332b]">
                        How did you hear about Better Farms?
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger
                            data-testid="select-referral"
                            className="h-[46px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
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
                      <FormLabel className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#3a332b]">
                        Leave us a message*
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Leave a message"
                          data-testid="input-message"
                          className="min-h-[120px] rounded-lg border-[#bcb9b9] [font-family:'Inter',Helvetica] text-sm text-[#3a332b]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  data-testid="button-send-message"
                  className="mt-8 h-auto rounded-lg bg-[#bc623f] px-[20px] py-[14px] text-white hover:bg-[#ab5838]"
                >
                  <span className="[font-family:'Inter',Helvetica] text-base font-medium">
                    Send Message
                  </span>
                  <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
                </Button>
              </form>
            </Form>
          </div>
          <div>
            <img
              className="h-[420px] w-full object-cover md:sticky md:top-28 md:h-[620px]"
              alt="Two farmers inspecting crops at dusk"
              src="/figmaAssets/contact_farmers_field.jpg"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
