const leaders = [
  {
    src: "/leadership/governor-hyacinth-alia.jpg",
    name: "Rev. Fr. Dr. Hyacinth Iormem Alia",
    honorific: "His Excellency",
    title: "Executive Governor of Benue State",
    alt: "Official portrait of His Excellency Rev. Fr. Dr. Hyacinth Iormem Alia, Executive Governor of Benue State",
  },
  {
    src: "/leadership/ceo-david-audu.jpg",
    name: "Mr. David Audu",
    honorific: "Chairman / CEO",
    title: "Hope Alive Children Spring Foundation",
    alt: "Portrait of Mr. David Audu, Chairman and CEO of Hope Alive Children Spring Foundation",
  },
];

export function LeadershipSection() {
  return (
    <section className="py-16 sm:py-20 bg-background" aria-labelledby="leadership-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-secondary">
            Leadership
          </p>
          <h2 id="leadership-heading" className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Serving the Children of Benue
          </h2>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We honour His Excellency the Governor of Benue State, and we are led by our Chairman and CEO in Makurdi.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 items-start">
          {leaders.map((leader) => (
            <figure
              key={leader.name}
              className="bg-card border border-border rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={leader.src}
                alt={leader.alt}
                className="w-full h-auto rounded-2xl object-contain bg-white ring-1 ring-black/5"
              />
              <figcaption className="mt-4 text-center px-2">
                <p className="text-secondary text-xs font-semibold uppercase tracking-widest mb-1">
                  {leader.honorific}
                </p>
                <p className="font-serif text-xl font-bold text-foreground leading-snug">
                  {leader.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{leader.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
