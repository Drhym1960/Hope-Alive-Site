import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { LogoLoader } from "@/components/LogoLoader";
import { useListGallery } from "@workspace/api-client-react";
import { getListGalleryQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";

import img1 from "@assets/file_00000000154c71f8802d096fc6badf85_1776680948852.png";
import img2 from "@assets/file_000000008a3071fda53a3064120eff69_1776680948914.png";
import img3 from "@assets/file_00000000ded871fda53d594c47cbf94d_1776680948937.png";
import img4 from "@assets/file_00000000c7c071fdaf3524db2a32f965_1776680948966.png";
import img6 from "@assets/file_000000006b2871fdb04677d531835d82_1776680949100.png";
import img7 from "@assets/file_0000000088e871f89d623d0d5717e70b_1776680949139.png";
import img8 from "@assets/file_00000000eeb471f887e0f300041016ed_1776680949165.png";
import img9 from "@assets/file_00000000457071f89c08e9b7f1dfab87_1776680949210.png";

const foundationImages = [
  { id: 1, url: img1, caption: "Children with our founder at the foundation banner", category: "Our Family" },
  { id: 2, url: img2, caption: "The children proudly displaying our motto: Giving Love a Chance", category: "Our Identity" },
  { id: 3, url: img3, caption: "Distribution day: gifts for every child", category: "Outreach" },
  { id: 4, url: img4, caption: "Joyful moments with the boys at the foundation", category: "Daily Life" },
  { id: 6, url: img6, caption: "Visiting children in the community", category: "Community Outreach" },
  { id: 7, url: img7, caption: "Children celebrating together", category: "Daily Life" },
  { id: 8, url: img8, caption: "Family bonds built on love and trust", category: "Our Family" },
  { id: 9, url: img9, caption: "A bright smile from one of our girls", category: "Voices of Hope" },
];

export default function Gallery() {
  const { data, isLoading } = useListGallery({
    query: { queryKey: getListGalleryQueryKey(), retry: false },
  });
  const adminImages = data?.images ?? [];
  const allImages = [...foundationImages, ...adminImages];

  return (
    <Layout>
      <Seo
        title="Gallery — Moments of Joy, Care & Hope"
        description="See the real impact of HACS Foundation in photos: joyful children, community outreach, gift distributions, and daily life at Hope Alive Children Spring Foundation in Makurdi, Benue State, Nigeria."
        path="/gallery"
        keywords="HACS Foundation gallery, Hope Alive Children Spring Foundation photos, children Nigeria photos, orphan care images Nigeria, Makurdi foundation pictures, NGO impact photos Nigeria, children charity gallery"
        schema={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "url": "https://www.hacsfoundation.com/gallery",
          "name": "Gallery | Hope Alive Children Spring Foundation",
          "description": "Photo gallery showing the real impact of HACS Foundation — joyful children, outreach programs, and daily life in Makurdi, Nigeria.",
          "isPartOf": { "@id": "https://www.hacsfoundation.com/#website" },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hacsfoundation.com/" },
              { "@type": "ListItem", "position": 2, "name": "Gallery", "item": "https://www.hacsfoundation.com/gallery" }
            ]
          }
        }}
      />
      <div className="pt-16">
        <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">Our Story in Pictures</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">Gallery & Impact</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              A glimpse into the lives we are touching every day: children laughing, learning, growing, and thriving at Hope Alive Children Spring Foundation.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center py-24">
                <LogoLoader size={80} label="Loading gallery" />
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {allImages.map((img) => (
                  <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group bg-card border border-border">
                    <div className="overflow-hidden">
                      <img
                        src={img.url}
                        alt={img.caption || "HACS Foundation"}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    {img.caption && (
                      <div className="px-4 py-3">
                        <p className="text-sm text-foreground font-medium">{img.caption}</p>
                        {img.category && <p className="text-xs text-muted-foreground mt-0.5">{img.category}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-16 text-center">
              <div className="bg-accent border border-border rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">Be Part of the Story</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Every photo above represents a life being transformed. Your support makes these moments possible.
                </p>
                <Link href="/donate" className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
