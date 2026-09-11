import type { ComponentType } from "react";
import { useEffect } from "react";
import Seo from "@/components/Seo";
import { usePicture } from "@/components/PictureProvider";
import { PathHeroLanding, GuideCardsLanding } from "@/components/PictureLandings";
import type { PictureId } from "@/lib/pictureLayouts";

const pictureBodies: Record<PictureId, ComponentType> = {
  "path-hero": PathHeroLanding,
  "guide-cards": GuideCardsLanding,
};

export default function Home() {
  const { pictureId } = usePicture();
  const Body = pictureBodies[pictureId];

  useEffect(() => {
    document.documentElement.dataset.home = "true";
    return () => {
      delete document.documentElement.dataset.home;
    };
  }, []);

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
      <Body />
    </div>
  );
}
