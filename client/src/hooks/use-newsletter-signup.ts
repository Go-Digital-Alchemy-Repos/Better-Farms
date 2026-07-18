import type { FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";

export function useNewsletterSignup() {
  const { toast } = useToast();

  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;

    toast({
      title: "Newsletter signup is coming soon",
      description:
        "Please use the Contact page to request updates while we finish connecting the mailing list.",
    });
  };
}
