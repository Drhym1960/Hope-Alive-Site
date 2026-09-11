import type { ComponentType } from "react";
import Seo from "@/components/Seo";
import { useLanding } from "@/components/LandingProvider";
import {
  DawnVerseLanding,
  GoldPromiseLanding,
  HouseLetterLanding,
  ScriptSunriseLanding,
  QuietRecordLanding,
} from "@/components/LandingPages";
import type { LandingId } from "@/lib/landings";

const landingBodies: Record<LandingId, ComponentType> = {
  "dawn-verse": DawnVerseLanding,
  "gold-promise": GoldPromiseLanding,
  "house-letter": HouseLetterLanding,
  "script-sunrise": ScriptSunriseLanding,
  "quiet-record": QuietRecordLanding,
};

export default function Home() {
  const { landingId } = useLanding();
  const LandingBody = landingBodies[landingId];

  return (
    <div>
      <Seo
        title="Giving Love a Chance to Orphaned & Vulnerable Children"
        description="Hope Alive Children Spring Foundation (HACS Foundation) gives love, care, education support, and hope to orphaned and vulnerable children in Benue State, Nigeria. Donate today and change a child's life."
        path="/"
        keywords="HACS Foundation, Hope Alive Children Spring Foundation, children foundation Nigeria, orphaned children support Nigeria, vulnerable children charity Nigeria, donate to children Nigeria, NGO for children Nigeria, child welfare foundation Benue State, orphanage support Benue State, sponsor a child Nigeria"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://www.hacsfoundation.com/#webpage",
          "url": "https://www.hacsfoundation.com/",
          "name": "HACS Foundation | Giving Love a Chance to Orphaned & Vulnerable Children in Nigeria",
          "description": "Hope Alive Children Spring Foundation gives love, care, education, and hope to orphaned and vulnerable children in Benue State, Nigeria.",
          "isPartOf": { "@id": "https://www.hacsfoundation.com/#website" },
          "about": { "@id": "https://www.hacsfoundation.com/#organization" },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hacsfoundation.com/" }]
          }
        }}
      />
      <LandingBody />
    </div>
  );
}
