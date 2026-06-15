"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/context/i18n-context";

export function HomeHero() {
  const { t, lang } = useI18n();

  return (
    <section className="bg-white overflow-hidden">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 lg:py-24">
          {/* Left: Content */}
          <div className="order-2 lg:order-1 text-center lg:text-start">
            <span className="inline-block badge-yellow mb-6">{t("hero.eyebrow")}</span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              {lang === "ar" ? (
                <>
                  ارتقِ{" "}
                  <span className="relative inline-block">
                    بأدائك
                    <span
                      className="absolute inset-x-0 bottom-1 h-3 bg-[#F5C400] -z-10 opacity-60 rounded"
                      aria-hidden="true"
                    />
                  </span>
                  {" "}الرياضي
                </>
              ) : (
                <>
                  Elevate Your{" "}
                  <span className="relative inline-block">
                    Performance
                    <span
                      className="absolute inset-x-0 bottom-1 h-3 bg-[#F5C400] -z-10 opacity-60 rounded"
                      aria-hidden="true"
                    />
                  </span>
                </>
              )}
            </h1>

            <p className="text-gray-500 text-lg lg:text-xl max-w-md mx-auto lg:mx-0 mb-8">
              {t("hero.subheadline")}
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                href="/products"
                className="btn-yellow px-7 py-3.5 rounded-xl text-base inline-flex items-center gap-2"
              >
                {t("hero.shopNow")}
                <ArrowRight className="w-4 h-4 rtl-flip" aria-hidden="true" />
              </Link>
              <Link
                href="/products?filter=new"
                className="btn-outline px-7 py-3.5 rounded-xl text-base"
              >
                {t("hero.newArrivals")}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start mt-12 pt-8 border-t border-gray-100">
              {[
                { value: t("hero.stat1Value"), label: t("hero.stat1Label") },
                { value: t("hero.stat2Value"), label: t("hero.stat2Label") },
                { value: t("hero.stat3Value"), label: t("hero.stat3Label") },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2 relative flex justify-center">
            <div className="relative w-full max-w-sm lg:max-w-none">
              {/* Yellow glow shape */}
              <div
                className="absolute -top-8 -end-8 w-64 h-64 bg-[#F5C400] rounded-full opacity-15 blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <Image
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&h=1100&fit=crop"
                  alt="GMG Sports athlete training"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating social proof card */}
              <div className="absolute -bottom-4 -start-4 bg-white rounded-2xl shadow-card-hover p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F5C400] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl" aria-hidden="true">🏆</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    {lang === "ar" ? "موثوق من قبل" : "Trusted by"}
                  </p>
                  <p className="text-sm font-black text-gray-900">
                    {t("hero.stat1Value")} {t("hero.stat1Label")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
