"use client";

import { useI18n } from "@/context/i18n-context";
import { brands } from "@/lib/data";

export function HomeBrands() {
  const { t } = useI18n();

  const brandList = [...brands, ...brands];

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container-site mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
          {t("brands.title")}
        </h2>
        <p className="text-gray-500">{t("brands.subtitle")}</p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute start-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #ffffff, transparent)",
          }}
          aria-hidden="true"
        />
        {/* Right fade */}
        <div
          className="absolute end-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #ffffff, transparent)",
          }}
          aria-hidden="true"
        />

        <div className="flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {brandList.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="inline-flex items-center mx-8 sm:mx-12 flex-shrink-0"
              >
                <span className="text-2xl sm:text-3xl font-black text-gray-200 hover:text-gray-400 transition-colors cursor-default tracking-tight select-none">
                  {brand.displayName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
