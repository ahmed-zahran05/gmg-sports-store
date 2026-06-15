"use client";

import Link from "next/link";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { useI18n } from "@/context/i18n-context";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export default function WishlistPage() {
  const { t } = useI18n();
  const productIds = useWishlistStore((s) => s.productIds);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const addItem = useCartStore((s) => s.addItem);

  const wishlistProducts = products.filter((p) => productIds.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((p) => addItem(p.id, 1));
  };

  if (productIds.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container-site py-24 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-[#FFF9D0] flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-[#D4A900]" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">{t("wishlist.empty")}</h1>
          <p className="text-gray-500 mb-8">{t("wishlist.emptySub")}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 btn-yellow px-8 py-4 rounded-xl text-base"
          >
            {t("wishlist.explore")}
            <ArrowRight className="w-4 h-4 rtl-flip" aria-hidden="true" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-site py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#D4A900] uppercase tracking-widest mb-1">
                {t("wishlist.saved")}
              </p>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                {t("wishlist.title")}
              </h1>
              <p className="text-gray-500 mt-1">
                {productIds.length} {productIds.length !== 1 ? t("wishlist.items") : t("wishlist.item")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddAllToCart}
                className="btn-yellow px-6 py-2.5 rounded-xl text-sm"
              >
                {t("wishlist.addAllToCart")}
              </button>
              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-bold hover:border-red-400 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                {t("wishlist.clearAll")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← {t("wishlist.continueShopping")}
          </Link>
        </div>
      </div>
    </main>
  );
}
