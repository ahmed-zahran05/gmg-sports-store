"use client";

import { ProductCard } from "@/components/product-card";
import { useWishlistStore } from "@/stores/wishlistStore";
import { products } from "@/lib/data";

export function WishlistSummary() {
  const productIds = useWishlistStore((state) => state.productIds);
  const wishlistItems = products.filter((product) => productIds.includes(product.id));

  if (wishlistItems.length === 0) {
    return (
      <div className="col-span-full">
        <p className="text-gmg-white-300 text-center text-lg">No favorites yet. Add products to your wishlist.</p>
      </div>
    );
  }

  return (
    <>
      {wishlistItems.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
