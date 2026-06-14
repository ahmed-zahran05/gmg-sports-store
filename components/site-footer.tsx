import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Running", href: "/products?category=Running" },
    { label: "Training", href: "/products?category=Training" },
    { label: "Essentials", href: "/products?category=Essentials" },
    { label: "New Arrivals", href: "/products?filter=new" },
    { label: "Best Sellers", href: "/products?filter=bestsellers" },
  ],
  Support: [
    { label: "Size Guide", href: "#" },
    { label: "Shipping & Returns", href: "#" },
    { label: "Track Order", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  Company: [
    { label: "About GMG", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="bg-black border-t border-gmg-gold-600/20">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-12 h-12">
                <Image
                  src="/gmg-logo.png"
                  alt="GMG Sports"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-lg font-black tracking-widest text-white">GMG <span className="text-gmg-gold-500">SPORTS</span></p>
                <p className="text-xs text-white/40 tracking-widest uppercase">Premium Athletic Apparel</p>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Premium athletic apparel engineered for champions. Built for performance, designed for victory.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:border-gmg-gold-500 hover:text-gmg-gold-500 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><span className="text-gmg-gold-500">✓</span> Free Shipping $75+</span>
              <span className="flex items-center gap-1.5"><span className="text-gmg-gold-500">✓</span> 30-Day Returns</span>
              <span className="flex items-center gap-1.5"><span className="text-gmg-gold-500">✓</span> Secure Checkout</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-gmg-gold-500 mb-5">{section}</p>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/50 hover:text-gmg-gold-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} GMG Sports. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <Link href="#" className="hover:text-gmg-gold-400 transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="#" className="hover:text-gmg-gold-400 transition-colors">Terms</Link>
            <span>·</span>
            <Link href="#" className="hover:text-gmg-gold-400 transition-colors">Cookies</Link>
          </div>
          <p className="text-xs text-white/20">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
