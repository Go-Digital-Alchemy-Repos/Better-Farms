import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
const NotFound = lazy(() => import("@/pages/not-found"));
const HomepageWhite = lazy(() =>
  import("@/pages/HomepageWhite").then((module) => ({ default: module.HomepageWhite })),
);
const HowItWorks = lazy(() =>
  import("@/pages/HowItWorks").then((module) => ({ default: module.HowItWorks })),
);
const AboutUs = lazy(() =>
  import("@/pages/AboutUs").then((module) => ({ default: module.AboutUs })),
);
const Contact = lazy(() =>
  import("@/pages/Contact").then((module) => ({ default: module.Contact })),
);
const ForFarmers = lazy(() =>
  import("@/pages/ForFarmers").then((module) => ({ default: module.ForFarmers })),
);
const FundAFarm = lazy(() =>
  import("@/pages/FundAFarm").then((module) => ({ default: module.FundAFarm })),
);
const GetInvolved = lazy(() =>
  import("@/pages/GetInvolved").then((module) => ({ default: module.GetInvolved })),
);

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
    <Suspense fallback={<div className="min-h-screen bg-white" aria-label="Loading page" />}>
      <Switch>
        <Route path="/" component={HomepageWhite} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/about" component={AboutUs} />
        <Route path="/contact" component={Contact} />
        <Route path="/for-farmers" component={ForFarmers} />
        <Route path="/fund-a-farm" component={FundAFarm} />
        <Route path="/get-involved" component={GetInvolved} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
