import { useState, type FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  newsletterSubmissionSchema,
  PlatformFormSubmissionError,
  submitPlatformForm,
} from "@/site/platform-forms";

export function useNewsletterSignup() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = newsletterSubmissionSchema.safeParse({ email: formData.get("email") });
    if (!parsed.success) return;

    setIsSubmitting(true);
    try {
      const message = await submitPlatformForm(
        "/api/forms/newsletter-signup/submit",
        parsed.data,
      );
      toast({ title: "Subscription confirmed", description: message });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription not completed",
        description:
          error instanceof PlatformFormSubmissionError
            ? error.message
            : "We could not subscribe you right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
}
