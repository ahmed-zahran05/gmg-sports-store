"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, use } from "react";
import { Heart, ShoppingBag, Star, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/data";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { ProductCard } from "@/components/product-card";

export default function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params);
  const product = products.find((p) => p.id === productId);

  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [validationError, setValidationError] = useState<string>("");

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const wishlistIds = useWishlistStore((s) => s.productIds);
  const isInWishlist = wishlistIds.includes(product.id);

  const availableSizes = [...new Set(product.variants.map((v) => v.size))];
  const availableColors = [...new Set(product.variants.map((v) => v.color))];

  const selectedVariant = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );
  const isVariantOutOfStock = selectedVariant ? selectedVariant.stock === 0 : false;

  const handleAddToCart = () => {
    if (availableSizes.length > 0 && !selectedSize) {
      setValidationError("Please select a size.");
      return;
    }
    if (availableColors.length > 0 && !selectedColor) {
      setValidationError("Please select a color.");
      return;
    }
    setValidationError("");
    addItem(product.id, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const hasDiscount = Boolean(product.compareAtPrice);
  const discountPct = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="bg-gmg-black-900 border-b border-gmg-gold-600/20 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-gmg-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gmg-gold-400 transition-colors">Products</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-gmg-gold-400 transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-white/70 truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gmg-black-900 border border-gmg-gold-600/20">
              <Image
                src={product.images[selectedImage] ?? product.imageUrl}
                alt={`${product.name} - image ${selectedImage + 1}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((i) => (i + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 rounded-full bg-gmg-gold-500 text-black text-xs font-black uppercase tracking-wider">New</span>
                )}
                {product.isBestSeller && (
                  <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-black uppercase tracking-wider">Best Seller</span>
                )}
                {hasDiscount && (
                  <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-black uppercase tracking-wider">-{discountPct}%</span>
                )}
              </div>
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === idx ? "border-gmg-gold-500" : "border-gmg-gold-600/20 hover:border-gmg-gold-500/50"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Name */}
            <div>
              <Link href={`/products?category=${product.category}`} className="text-xs uppercase tracking-[0.3em] text-gmg-gold-600 font-bold hover:text-gmg-gold-400 transition-colors">
                {product.category}
              </Link>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">{product.name}</h1>
              {product.sku && <p className="text-xs text-white/30 mt-1">SKU: {product.sku}</p>}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "text-gmg-gold-500 fill-gmg-gold-500" : "text-white/20"}`} />
                ))}
              </div>
              <span className="text-sm text-white/60">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 py-4 border-y border-gmg-gold-600/20">
              <span className="text-4xl font-black text-gmg-gold-400">${product.price}</span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-white/30 line-through">${product.compareAtPrice}</span>
                  <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-bold">Save ${product.compareAtPrice! - product.price}</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-white/60 leading-relaxed">{product.description}</p>

            {/* Color Selector */}
            {availableColors.length > 0 && (
              <div>
                <p className="text-sm font-bold text-white mb-3">
                  Color: <span className="text-gmg-gold-400">{selectedColor || "Select a color"}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => { setSelectedColor(color); setValidationError(""); }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                        selectedColor === color
                          ? "border-gmg-gold-500 bg-gmg-gold-500/10 text-gmg-gold-400"
                          : "border-gmg-gold-600/20 text-white/60 hover:border-gmg-gold-500/50 hover:text-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {availableSizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-white">
                    Size: <span className="text-gmg-gold-400">{selectedSize || "Select a size"}</span>
                  </p>
                  <button className="text-xs text-white/40 hover:text-gmg-gold-400 transition-colors underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => {
                    const variantForSize = product.variants.find(
                      (v) => v.size === size && (selectedColor ? v.color === selectedColor : true)
                    );
                    const outOfStock = variantForSize ? variantForSize.stock === 0 : false;
                    return (
                      <button
                        key={size}
                        disabled={outOfStock}
                        onClick={() => { setSelectedSize(size); setValidationError(""); }}
                        className={`min-w-[52px] px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                          outOfStock
                            ? "border-white/10 text-white/20 cursor-not-allowed line-through"
                            : selectedSize === size
                            ? "border-gmg-gold-500 bg-gmg-gold-500/10 text-gmg-gold-400"
                            : "border-gmg-gold-600/20 text-white/60 hover:border-gmg-gold-500/50 hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-white">Quantity:</p>
              <div className="flex items-center border border-gmg-gold-600/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-gmg-gold-400 hover:bg-gmg-gold-500/10 transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center text-white font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-gmg-gold-400 hover:bg-gmg-gold-500/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Validation error */}
            {validationError && (
              <p className="text-sm text-red-400 font-semibold bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {validationError}
              </p>
            )}

            {/* Add to Cart & Wishlist */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isVariantOutOfStock}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-200 ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : isVariantOutOfStock
                    ? "bg-white/10 text-white/30 cursor-not-allowed"
                    : "bg-gmg-gold-500 text-black hover:bg-gmg-gold-400 hover:shadow-[0_0_30px_rgba(244,208,63,0.3)] active:scale-95"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {addedToCart ? "Added to Cart!" : isVariantOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                className={`w-14 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  isInWishlist
                    ? "border-gmg-gold-500 bg-gmg-gold-500/10 text-gmg-gold-400"
                    : "border-gmg-gold-600/20 text-white/60 hover:border-gmg-gold-500 hover:text-gmg-gold-400 hover:bg-gmg-gold-500/10"
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? "fill-gmg-gold-400" : ""}`} />
              </button>
            </div>

            {/* Checkout shortcut */}
            {addedToCart && (
              <div className="flex gap-3">
                <Link href="/cart" className="flex-1 text-center py-3 rounded-full border-2 border-gmg-gold-500 text-gmg-gold-400 font-bold text-sm hover:bg-gmg-gold-500/10 transition-colors">
                  View Cart
                </Link>
                <Link href="/checkout" className="flex-1 text-center py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors">
                  Checkout Now
                </Link>
              </div>
            )}

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gmg-gold-600/20">
              {[
                { icon: Truck, label: "Free Shipping", sub: "On orders $75+" },
                { icon: RotateCcw, label: "30-Day Returns", sub: "No questions asked" },
                { icon: Shield, label: "Secure Checkout", sub: "256-bit SSL" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 text-gmg-gold-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">{label}</p>
                  <p className="text-[10px] text-white/40">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="p-8 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20">
            <h2 className="text-xl font-black text-white mb-6">Performance Features</h2>
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-white/70">
                  <span className="w-5 h-5 rounded-full bg-gmg-gold-500/20 border border-gmg-gold-500/30 flex items-center justify-center text-gmg-gold-400 text-xs font-bold flex-shrink-0">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20">
            <h2 className="text-xl font-black text-white mb-6">Shipping & Returns</h2>
            <div className="space-y-4 text-white/60 text-sm leading-relaxed">
              <p>Free standard shipping on all orders over $75. Express and overnight shipping available at checkout.</p>
              <div className="space-y-2">
                <p className="flex items-center gap-2"><span className="text-gmg-gold-500">✓</span> Standard shipping (3-5 days): FREE on $75+, $7.99 otherwise</p>
                <p className="flex items-center gap-2"><span className="text-gmg-gold-500">✓</span> Express shipping (2-3 days): $12.99</p>
                <p className="flex items-center gap-2"><span className="text-gmg-gold-500">✓</span> Overnight shipping (1 day): $24.99</p>
                <p className="flex items-center gap-2"><span className="text-gmg-gold-500">✓</span> 30-day returns on all items, no questions asked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-white">Customer Reviews</h2>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? "text-gmg-gold-500 fill-gmg-gold-500" : "text-white/20"}`} />
                    ))}
                  </div>
                  <span className="text-white/60">{product.rating} out of 5 · {product.reviewCount} reviews</span>
                </div>
              </div>
              <button className="px-5 py-2.5 rounded-full border border-gmg-gold-600/20 text-gmg-gold-400 text-sm font-bold hover:border-gmg-gold-500 hover:bg-gmg-gold-500/10 transition-colors">
                Write a Review
              </button>
            </div>

            <div className="space-y-4">
              {product.reviews.map((review) => (
                <article key={review.id} className="p-6 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-bold text-white">{review.author}</p>
                        {review.verified && (
                          <span className="text-[10px] uppercase tracking-wider text-green-400 font-bold">✓ Verified Purchase</span>
                        )}
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-gmg-gold-500 fill-gmg-gold-500" : "text-white/20"}`} />
                        ))}
                      </div>
                    </div>
                    <time className="text-xs text-white/30">{new Date(review.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                  </div>
                  <h3 className="font-bold text-white mb-2">{review.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{review.body}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-white">You May Also Like</h2>
              <Link href={`/products?category=${product.category}`} className="text-sm font-bold text-gmg-gold-500 hover:text-gmg-gold-400 uppercase tracking-wider transition-colors">
                View All {product.category} →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
