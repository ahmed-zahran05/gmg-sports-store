"use client";

import Link from "next/link";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const addItem = useCartStore((s) => s.addItem);

  const wishlistProducts = products.filter((p) => productIds.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((p) => addItem(p.id, 1));
  };

  if (productIds.length === 0) {
    return (
      <main className="min-h-screen bg-black">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-gmg-gold-500/10 border border-gmg-gold-500/20 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gmg-gold-500" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Your Wishlist is Empty</h1>
          <p className="text-white/50 mb-8 text-base">
            Save your favorite products and come back to them anytime. Click the heart icon on any product to add it here.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gmg-gold-500 text-black font-bold rounded-full hover:bg-gmg-gold-400 transition-colors"
          >
            Explore Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-gmg-black-900 border-b border-gmg-gold-600/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] font-bold text-gmg-gold-500 mb-2">Saved</p>
              <h1 className="text-4xl font-black text-white tracking-tight">Your Wishlist</h1>
              <p className="text-white/40 mt-1">{productIds.length} item{productIds.length !== 1 ? "s" : ""} saved</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddAllToCart}
                className="px-6 py-2.5 rounded-full bg-gmg-gold-500 text-black font-bold text-sm hover:bg-gmg-gold-400 transition-colors"
              >
                Add All to Cart
              </button>
              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-red-500/30 text-red-400 text-sm font-bold hover:border-red-500/60 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/products" className="inline-flex items-center gap-2 text-gmg-gold-500 hover:text-gmg-gold-400 font-bold transition-colors">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
