"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, use } from "react";
import { Heart, ShoppingBag, Star, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/data";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useI18n } from "@/context/i18n-context";
import { ProductCard } from "@/components/product-card";

export default function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params);
  const { t, lang } = useI18n();
  const product = products.find((p) => p.id === productId);

  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

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

  const hasDiscount = Boolean(product.compareAtPrice);
  const discountPct = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    if (availableSizes.length > 0 && !selectedSize) {
      setValidationError(t("product.selectSizeError"));
      return;
    }
    if (availableColors.length > 0 && !selectedColor) {
      setValidationError(t("product.selectColorError"));
      return;
    }
    setValidationError("");
    addItem(product.id, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-site py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-900 transition-colors">
              {lang === "ar" ? "المنتجات" : "Products"}
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-gray-900 transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-700 truncate max-w-48">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* ── Image Gallery ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 group">
              <Image
                src={product.images[selectedImage] ?? product.imageUrl}
                alt={`${product.name} - image ${selectedImage + 1}`}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length)
                    }
                    className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 rtl-flip" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((i) => (i + 1) % product.images.length)
                    }
                    className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 rtl-flip" />
                  </button>
                </>
              )}
              {/* Badges */}
              <div className="absolute top-4 start-4 flex flex-col gap-2">
                {product.isNew && <span className="badge-yellow">{t("featured.new")}</span>}
                {hasDiscount && <span className="badge-red">-{discountPct}%</span>}
                {product.isBestSeller && <span className="badge-yellow">{t("featured.bestSeller")}</span>}
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
                      selectedImage === idx
                        ? "border-[#F5C400]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="space-y-6">
            {/* Brand / Name */}
            <div>
              {product.brand && (
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {product.brand}
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              {product.sku && (
                <p className="text-xs text-gray-400 mt-1">{t("product.sku")}: {product.sku}</p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(product.rating) ? "star-filled" : "star-empty"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewCount} {t("product.reviews")})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 py-4 border-y border-gray-100">
              <span className="text-4xl font-black text-gray-900">${product.price}</span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-400 line-through">${product.compareAtPrice}</span>
                  <span className="badge-red">
                    {lang === "ar" ? "وفر" : "Save"} ${product.compareAtPrice! - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Color selector */}
            {availableColors.length > 0 && (
              <div>
                <p className="text-sm font-bold text-gray-900 mb-3">
                  {t("product.color")}:{" "}
                  <span className="text-[#F5C400]">{selectedColor || (lang === "ar" ? "اختر اللون" : "Select a color")}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => { setSelectedColor(color); setValidationError(""); }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                        selectedColor === color
                          ? "border-[#F5C400] bg-[#FFF9D0] text-gray-900"
                          : "border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {availableSizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-gray-900">
                    {t("product.size")}:{" "}
                    <span className="text-[#F5C400]">{selectedSize || (lang === "ar" ? "اختر المقاس" : "Select a size")}</span>
                  </p>
                  <button className="text-xs text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-2">
                    {t("product.sizeGuide")}
                  </button>
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
                        className={`min-w-[52px] px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                          outOfStock
                            ? "border-gray-100 text-gray-300 cursor-not-allowed line-through"
                            : selectedSize === size
                            ? "border-[#F5C400] bg-[#FFF9D0] text-gray-900"
                            : "border-gray-200 text-gray-700 hover:border-gray-400"
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
              <p className="text-sm font-bold text-gray-900">{t("product.quantity")}:</p>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors font-bold text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center text-gray-900 font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Validation error */}
            {validationError && (
              <p className="text-sm text-red-600 font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {validationError}
              </p>
            )}

            {/* CTAs */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isVariantOutOfStock}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-200 ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : isVariantOutOfStock
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#F5C400] text-gray-900 hover:bg-[#D4A900] active:scale-95"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {addedToCart
                  ? t("product.added")
                  : isVariantOutOfStock
                  ? t("product.outOfStock")
                  : t("product.addToCart")}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={isInWishlist ? t("featured.wishlistRemove") : t("featured.wishlistAdd")}
                className={`w-14 flex items-center justify-center rounded-xl border-2 transition-all duration-200 ${
                  isInWishlist
                    ? "border-[#F5C400] bg-[#FFF9D0] text-gray-900"
                    : "border-gray-200 text-gray-400 hover:border-[#F5C400] hover:text-gray-900"
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current text-[#F5C400]" : ""}`} />
              </button>
            </div>

            {/* Post-add shortcuts */}
            {addedToCart && (
              <div className="flex gap-3">
                <Link href="/cart" className="flex-1 text-center py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-400 transition-colors">
                  {t("product.viewCart")}
                </Link>
                <Link href="/checkout" className="flex-1 text-center py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors">
                  {t("product.checkout")}
                </Link>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-5 border-t border-gray-100">
              {[
                { icon: Truck, label: t("product.freeShipping"), sub: t("product.freeShippingSub") },
                { icon: RotateCcw, label: t("product.returns"), sub: t("product.returnsSub") },
                { icon: Shield, label: t("product.secure"), sub: t("product.secureSub") },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-1.5">
                    <Icon className="w-4 h-4 text-gray-500" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">{label}</p>
                  <p className="text-[10px] text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-16">
          <div className="border-b border-gray-100 flex gap-0">
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#F5C400] text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab === "description"
                  ? t("product.description")
                  : tab === "specs"
                  ? t("product.specifications")
                  : `${t("product.reviews")} (${product.reviews.length})`}
              </button>
            ))}
          </div>

          <div className="pt-8">
            {activeTab === "description" && (
              <div className="max-w-2xl">
                <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-2xl">
                <ul className="space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#FFF9D0] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#D4A900] text-xs font-bold">✓</span>
                      </span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-6 bg-gray-50 rounded-2xl space-y-3">
                  <p className="font-bold text-gray-900 mb-4">{t("product.shipping")}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {lang === "ar"
                      ? "شحن مجاني على الطلبات فوق 75$. استلام في 3-5 أيام عمل. إرجاع مجاني خلال 30 يوماً."
                      : "Free standard shipping on all orders over $75. Delivered in 3-5 business days. Free returns within 30 days."}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-4xl font-black text-gray-900">{product.rating}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? "star-filled" : "star-empty"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">{product.reviewCount} {t("product.reviews")}</p>
                  </div>
                  <button className="btn-outline px-5 py-2.5 rounded-xl text-sm">
                    {t("product.writeReview")}
                  </button>
                </div>

                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <article key={review.id} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <p className="font-bold text-gray-900">{review.author}</p>
                            {review.verified && (
                              <span className="text-[10px] uppercase tracking-wider text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">
                                ✓ {t("product.verifiedPurchase")}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "star-filled" : "star-empty"}`} />
                            ))}
                          </div>
                        </div>
                        <time className="text-xs text-gray-400 flex-shrink-0">
                          {new Date(review.date).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1.5">{review.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{review.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                {t("product.related")}
              </h2>
              <Link
                href={`/products?category=${product.category}`}
                className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
              >
                {t("product.viewAllCategory")} →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
