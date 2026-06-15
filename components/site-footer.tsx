"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { useI18n } from "@/context/i18n-context";

export function SiteFooter() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  const company = [
    { label: t("footer.about"), href: "#" },
    { label: t("footer.careers"), href: "#" },
    { label: t("footer.press"), href: "#" },
    { label: t("footer.blog"), href: "#" },
  ];
  const support = [
    { label: t("footer.contact"), href: "#" },
    { label: t("footer.faq"), href: "#" },
    { label: t("footer.shipping"), href: "#" },
    { label: t("footer.returns"), href: "#" },
    { label: t("footer.sizeGuide"), href: "#" },
  ];
  const cats = [
    { label: t("footer.running"), href: "/products?category=Running" },
    { label: t("footer.training"), href: "/products?category=Training" },
    { label: t("footer.football"), href: "/products" },
    { label: t("footer.basketball"), href: "/products" },
    { label: t("footer.lifestyle"), href: "/products" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container-site py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-9 h-9">
                <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" />
              </div>
              <span className="font-black text-gray-900 tracking-tight">
                GMG <span className="text-[#F5C400]">SPORTS</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{t("footer.tagline")}</p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Facebook, href: "#", label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">{company.map((l) => (<li key={l.label}><Link href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l.label}</Link></li>))}</ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{t("footer.support")}</h4>
            <ul className="space-y-3">{support.map((l) => (<li key={l.label}><Link href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l.label}</Link></li>))}</ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{t("footer.categories")}</h4>
            <ul className="space-y-3">{cats.map((l) => (<li key={l.label}><Link href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l.label}</Link></li>))}</ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {year} GMG Sports. {t("footer.rights")}</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gray-600 transition-colors">{lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">{lang === "ar" ? "شروط الخدمة" : "Terms of Service"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
