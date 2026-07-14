import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { HomepageWhite } from "@/pages/HomepageWhite";
import { HowItWorks } from "@/pages/HowItWorks";
import { AboutUs } from "@/pages/AboutUs";
import { Contact } from "@/pages/Contact";
import { ForFarmers } from "@/pages/ForFarmers";
import { FundAFarm } from "@/pages/FundAFarm";
import { GetInvolved } from "@/pages/GetInvolved";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomepageWhite} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/about" component={AboutUs} />
      <Route path="/contact" component={Contact} />
      <Route path="/for-farmers" component={ForFarmers} />
      <Route path="/fund-a-farm" component={FundAFarm} />
      <Route path="/get-involved" component={GetInvolved} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToTop />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
