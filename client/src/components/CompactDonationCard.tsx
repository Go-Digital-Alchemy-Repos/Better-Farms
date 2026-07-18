import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const amounts = ["$25", "$30", "$100"];

export function CompactDonationCard(): JSX.Element {
  const [selected, setSelected] = useState("$30");
  const [custom, setCustom] = useState("");

  return (
    <div className="mx-auto mt-9 w-full max-w-[1000px] rounded-xl bg-white/90 p-5 shadow-[0_4px_14px_rgba(0,0,0,0.22)] backdrop-blur-md md:px-10 md:py-7">
      <div className="grid gap-3 md:grid-cols-[repeat(3,1fr)_1.25fr_auto] md:items-end">
        {amounts.map((amount) => (
          <button
            key={amount}
            type="button"
            aria-pressed={selected === amount}
            onClick={() => { setSelected(amount); setCustom(""); }}
            className={`h-[58px] rounded-[10px] border [font-family:'Inter',Helvetica] text-2xl font-bold ${selected === amount ? "border-[#434343] bg-[#434343] text-white" : "border-[#bcb9b9] bg-white text-[#434343]"}`}
          >
            {amount}
          </button>
        ))}
        <label className="block text-left [font-family:'Inter',Helvetica] text-xs font-semibold text-[#5e4540]">
          Enter Donation
          <span className="mt-1 flex h-[58px] items-center rounded-[10px] border border-[#bcb9b9] bg-white px-4 text-2xl font-bold">
            $
            <input
              value={custom}
              onChange={(event) => { setCustom(event.target.value.replace(/\D/g, "")); setSelected(""); }}
              inputMode="numeric"
              aria-label="Enter another donation amount"
              className="min-w-0 flex-1 bg-transparent pl-2 text-xl outline-none"
            />
          </span>
        </label>
        <Button asChild className="h-[58px] rounded-lg bg-[#bc623f] px-6 text-white hover:bg-[#ab5838]">
          <Link href="/contact">
            Donate Now
            <img className="ml-2 h-5 w-5" alt="" src="/figmaAssets/keyboard-arrow-right-2.svg" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
