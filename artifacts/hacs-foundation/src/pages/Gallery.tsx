import Layout from "@/components/Layout";
import { useListGallery } from "@workspace/api-client-react";
import { getListGalleryQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";

const placeholderImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80", caption: "Children at morning assembly", category: "Daily Life" },
  { id: 2, url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", caption: "Education for every child", category: "Education" },
  { id: 3, url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80", caption: "Community gathering", category: "Community" },
  { id: 4, url: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=600&q=80", caption: "Meal time at the foundation", category: "Feeding Program" },
  { id: 5, url: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=600&q=80", caption: "Children in class", category: "Education" },
  { id: 6, url: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=600&q=80", caption: "Health check day", category: "Healthcare" },
];

export default function Gallery() {
  const { data, isLoading } = useListGallery({ query: { queryKey: getListGalleryQueryKey() } });
  const images = data?.images?.length ? data.images : placeholderImages;

  return (
    <Layout>
      <div className="pt-16">
        <section className="hero-gradient py-24 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4">Our Story in Pictures</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Gallery & Impact</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              A glimpse into the lives we are touching every day — children laughing, learning, growing, and thriving.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/3] bg-muted rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {images.map((img) => (
                  <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <img
                      src={img.url}
                      alt={img.caption || "HACS Foundation"}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {img.caption && (
                      <div className="bg-card border border-border px-4 py-3">
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
