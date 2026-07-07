import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { HomepageWhite } from "@/pages/HomepageWhite";
import { HowItWorks } from "@/pages/HowItWorks";
import { AboutUs } from "@/pages/AboutUs";
import { Contact } from "@/pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomepageWhite} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/about" component={AboutUs} />
      <Route path="/contact" component={Contact} />
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
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
