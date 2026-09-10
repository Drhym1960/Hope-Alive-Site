import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/donate", label: "Donate" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/45 backdrop-blur-md",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="group">
            <Logo size={52} wordmarkHiddenOnMobile />
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-secondary",
                  location === link.href || (link.href !== "/" && location.startsWith(link.href))
                    ? "text-primary"
                    : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              className="ml-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold hover:bg-secondary/90 transition-all shadow-md donate-btn-pulse"
            >
              Donate Now
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md transition-colors text-foreground hover:bg-muted"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn("block w-full h-0.5 transition-all bg-foreground", open && "rotate-45 translate-y-2")} />
              <span className={cn("block w-full h-0.5 transition-all bg-foreground", open && "opacity-0")} />
              <span className={cn("block w-full h-0.5 transition-all bg-foreground", open && "-rotate-45 -translate-y-2.5")} />
            </div>
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-white border-t border-border shadow-lg rounded-b-xl">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    location === link.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/donate"
                className="block mt-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold text-center"
              >
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo size={52} inverted />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4 max-w-sm">
              Dedicated to supporting orphans and vulnerable children in Nigeria with love, care, education, and hope. Every child deserves a chance.
            </p>
            <div className="italic text-secondary font-serif">"Giving Love a Chance"</div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-secondary mb-4">About & Mission</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/mission", label: "Our Mission" },
                { href: "/goals", label: "Goals & Objectives" },
                { href: "/programs", label: "Our Programs" },
                { href: "/transparency", label: "Transparency" },
                { href: "/child-safeguarding", label: "Child Safeguarding" },
                { href: "/gallery", label: "Gallery" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-secondary mb-4">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/donate", label: "Donate" },
                { href: "/volunteer", label: "Volunteer" },
                { href: "/partner-with-us", label: "Partner With Us" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
                { href: "/blog", label: "Blog" },
                { href: "/site-map", label: "Site Map" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-secondary mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="leading-relaxed">
                Office No 5, Udoo Plaza, Opp NKST Church, Ama Terwase Agbadu Road, Makurdi, Benue State, Nigeria
              </li>
              <li>
                <a href="tel:08036238076" className="hover:text-secondary transition-colors">08036238076</a>
              </li>
              <li>
                <a href="tel:09016662836" className="hover:text-secondary transition-colors">09016662836</a>
              </li>
              <li>
                <a href="mailto:hacsfoundation10@gmail.com" className="hover:text-secondary transition-colors break-all">
                  hacsfoundation10@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.hacsfoundation.com" className="hover:text-secondary transition-colors">
                  www.hacsfoundation.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} Hope Alive Children Spring Foundation. All rights reserved.</p>
            <Link href="/about#certificates" className="text-secondary/90 hover:text-secondary transition-colors">
              Registered charitable organisation in Nigeria
            </Link>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-secondary transition-colors">Terms of Use</Link>
            <Link href="/child-safeguarding" className="hover:text-secondary transition-colors">Safeguarding</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
