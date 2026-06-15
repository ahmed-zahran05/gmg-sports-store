"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/context/i18n-context";
import { categories } from "@/lib/data";

export function HomeCategories() {
  const { t, lang } = useI18n();

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            {t("categories.title")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t("categories.subtitle")}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="group relative block rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100"
            >
              <Image
                src={cat.imageUrl}
                alt={lang === "ar" ? cat.nameAr : cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/50" />

              {/* Text */}
              <div className="absolute bottom-0 inset-x-0 p-3">
                <p className="text-white font-bold text-sm leading-tight">
                  {lang === "ar" ? cat.nameAr : cat.name}
                </p>
                {cat.count > 0 && (
                  <p className="text-white/60 text-xs mt-0.5">{cat.count} items</p>
                )}
              </div>

              {/* Arrow on hover */}
              <div className="absolute top-3 end-3 w-7 h-7 rounded-full bg-[#F5C400] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-gray-900 rtl-flip" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-xl px-6 py-3 transition-colors"
          >
            {t("categories.viewAll")}
            <ArrowRight className="w-4 h-4 rtl-flip" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
