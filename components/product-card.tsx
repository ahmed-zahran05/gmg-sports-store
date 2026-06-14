"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const productIds = useWishlistStore((s) => s.productIds);
  const addItem = useCartStore((s) => s.addItem);

  const isInWishlist = productIds.includes(product.id);
  const hasDiscount = Boolean(product.compareAtPrice);
  const discountPct = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product.id, 1);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gmg-gold-600/20 bg-gmg-black-800 hover:border-gmg-gold-500/40 transition-all duration-300 hover:shadow-elevated flex flex-col">
      {/* Image area */}
      <Link href={`/products/${product.id}`} className="block relative h-64 overflow-hidden bg-gmg-black-900">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full bg-gmg-gold-500 text-gmg-black-900 text-[10px] font-black uppercase tracking-wider">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-wider">
              Best Seller
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-wider">
              -{discountPct}%
            </span>
          )}
        </div>
        {/* Low stock */}
        {product.availability === "Low stock" && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-orange-500/90 text-white text-[10px] font-bold uppercase tracking-wider">
              Low Stock
            </span>
          </div>
        )}
        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
            isInWishlist
              ? "border-gmg-gold-500 bg-gmg-gold-500/20 text-gmg-gold-400"
              : "border-white/20 bg-black/40 text-white/60 hover:border-gmg-gold-500 hover:text-gmg-gold-400 hover:bg-gmg-gold-500/10"
          }`}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? "fill-gmg-gold-400" : ""}`} />
        </button>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Category & Name */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gmg-gold-600 font-bold mb-1">{product.category}</p>
          <Link href={`/products/${product.id}`} className="text-base font-bold text-white hover:text-gmg-gold-400 transition-colors leading-tight line-clamp-2">
            {product.name}
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.round(product.rating) ? "text-gmg-gold-500 fill-gmg-gold-500" : "text-white/20"}`}
              />
            ))}
          </div>
          <span className="text-xs text-white/40">({product.reviewCount})</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-gmg-gold-400">${product.price}</span>
            {hasDiscount && (
              <span className="text-sm text-white/30 line-through">${product.compareAtPrice}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gmg-gold-500/10 border border-gmg-gold-600/30 text-gmg-gold-400 text-xs font-bold uppercase tracking-wider hover:bg-gmg-gold-500 hover:text-black hover:border-gmg-gold-500 transition-all duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
