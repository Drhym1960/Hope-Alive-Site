import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LogoWatermark } from "@/components/LogoWatermark";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import About from "@/pages/About";
import Mission from "@/pages/Mission";
import Goals from "@/pages/Goals";
import Programs from "@/pages/Programs";
import Donate from "@/pages/Donate";
import ThankYou from "@/pages/ThankYou";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Gallery from "@/pages/Gallery";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";

// New pages (Task 4)
import Volunteer from "@/pages/Volunteer";
import PartnerWithUs from "@/pages/PartnerWithUs";
import Transparency from "@/pages/Transparency";
import ChildSafeguarding from "@/pages/ChildSafeguarding";
import EducationSupport from "@/pages/EducationSupport";
import ScholarshipBeneficiaries from "@/pages/ScholarshipBeneficiaries";
import OrphansAndVulnerableChildren from "@/pages/OrphansAndVulnerableChildren";
import StreetChildrenSupport from "@/pages/StreetChildrenSupport";
import SiteMap from "@/pages/SiteMap";

// Blog
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

// Compare pages
import HacsVsCrowdfunding from "@/pages/compare/HacsVsCrowdfunding";
import SponsorVsDonation from "@/pages/compare/SponsorVsDonation";
import VolunteeringVsDonating from "@/pages/compare/VolunteeringVsDonating";
import LocalVsInternational from "@/pages/compare/LocalVsInternational";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      throwOnError: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      {/* Home */}
      <Route path="/" component={() => <Layout><Home /></Layout>} />

      {/* Existing pages */}
      <Route path="/about" component={About} />
      <Route path="/mission" component={Mission} />
      <Route path="/goals" component={Goals} />
      <Route path="/programs" component={Programs} />
      <Route path="/donate/thank-you" component={ThankYou} />
      <Route path="/donate" component={Donate} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />

      {/* New core pages */}
      <Route path="/volunteer" component={Volunteer} />
      <Route path="/partner-with-us" component={PartnerWithUs} />
      <Route path="/transparency" component={Transparency} />
      <Route path="/child-safeguarding" component={ChildSafeguarding} />
      <Route path="/education-support" component={EducationSupport} />
      <Route path="/scholarship-beneficiaries" component={ScholarshipBeneficiaries} />
      <Route path="/children-we-support" component={ScholarshipBeneficiaries} />
      <Route path="/orphans-and-vulnerable-children" component={OrphansAndVulnerableChildren} />
      <Route path="/street-children-support" component={StreetChildrenSupport} />
      <Route path="/site-map" component={SiteMap} />

      {/* Blog */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />

      {/* Compare pages */}
      <Route path="/compare/hacs-foundation-vs-crowdfunding" component={HacsVsCrowdfunding} />
      <Route path="/compare/sponsor-a-child-vs-general-donation" component={SponsorVsDonation} />
      <Route path="/compare/volunteering-vs-donating" component={VolunteeringVsDonating} />
      <Route path="/compare/local-childrens-charity-vs-international-charity" component={LocalVsInternational} />

      {/* Admin */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function dismissBootLoader() {
  const el = document.getElementById("boot-loader");
  if (!el) return;
  el.classList.add("boot-loader-hide");
  window.setTimeout(() => el.remove(), 400);
}

function App() {
  useEffect(() => {
    try {
      window.localStorage.removeItem("hacs-premium-theme-preview");
    } catch {
      /* ignore */
    }
    document.documentElement.removeAttribute("data-theme");
    dismissBootLoader();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LogoWatermark />
        <div className="relative z-10">
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
