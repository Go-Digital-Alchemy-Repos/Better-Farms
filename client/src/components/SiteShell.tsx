import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { betterFarmsTheme } from "@/site/better-farms-theme";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps): JSX.Element {
  return (
    <div
      className={betterFarmsTheme.recipes.page}
      data-theme-adapter={betterFarmsTheme.id}
    >
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
