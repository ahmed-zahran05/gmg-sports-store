"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/context/i18n-context";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export function HomeFeatured() {
  const { t } = useI18n();
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              {t("featured.title")}
            </h2>
            <p className="text-gray-500 max-w-xl">{t("featured.subtitle")}</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 flex-shrink-0 border border-gray-200 hover:border-gray-400 rounded-xl px-5 py-2.5 transition-colors"
          >
            {t("featured.viewAll")}
            <ArrowRight className="w-4 h-4 rtl-flip" aria-hidden="true" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-xl px-6 py-3 transition-colors"
          >
            {t("featured.viewAll")}
            <ArrowRight className="w-4 h-4 rtl-flip" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
