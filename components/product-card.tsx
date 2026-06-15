"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useI18n } from "@/context/i18n-context";
import type { Product } from "@/lib/types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const wishlistIds = useWishlistStore((s) => s.productIds);
  const isWishlisted = wishlistIds.includes(product.id);
  const [added, setAdded] = useState(false);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="badge-yellow">{t("featured.new")}</span>
          )}
          {discount > 0 && (
            <span className="badge-red">-{discount}%</span>
          )}
          {product.isBestSeller && !product.isNew && discount === 0 && (
            <span className="badge-yellow">{t("featured.bestSeller")}</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? t("featured.wishlistRemove") : t("featured.wishlistAdd")}
          className={`absolute top-3 end-3 w-8 h-8 rounded-full flex items-center justify-center shadow-soft transition-all duration-200 ${
            isWishlisted
              ? "bg-[#F5C400] text-gray-900 opacity-100"
              : "bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-900"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Add to cart overlay */}
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
              added
                ? "bg-green-500 text-white"
                : "bg-gray-900 text-white hover:bg-[#F5C400] hover:text-gray-900"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {added ? t("featured.added") : t("featured.addToCart")}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-1.5">
        {product.brand && (
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {product.brand}
          </p>
        )}
        <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.round(product.rating) ? "star-filled" : "star-empty"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-base font-bold text-gray-900">${product.price}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.compareAtPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
