"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Lock } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useI18n } from "@/context/i18n-context";
import { products } from "@/lib/data";

export default function CartPage() {
  const { t, lang } = useI18n();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const shippingCost = subtotal >= 75 ? 0 : 7.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;
  const totalQty = items.reduce((n, i) => n + i.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container-site py-24 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-[#FFF9D0] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-[#D4A900]" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">{t("cart.empty")}</h1>
          <p className="text-gray-500 mb-8">{t("cart.emptySub")}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 btn-yellow px-8 py-4 rounded-xl text-base"
          >
            {t("cart.continueShopping")}
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
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">{t("cart.title")}</h1>
          <p className="text-gray-500 mt-1">
            {totalQty} {totalQty !== 1 ? t("cart.items") : t("cart.item")}
          </p>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* Cart items */}
          <div className="space-y-4">
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              const lineTotal = product.price * item.quantity;

              return (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-5 p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 shadow-card transition-all"
                >
                  {/* Image */}
                  <Link
                    href={`/products/${product.id}`}
                    className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50"
                  >
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="96px" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                          {product.brand ?? product.category}
                        </p>
                        <Link
                          href={`/products/${product.id}`}
                          className="font-bold text-gray-900 hover:text-gray-700 transition-colors leading-tight text-sm sm:text-base"
                        >
                          {product.name}
                        </Link>
                        <div className="flex flex-wrap gap-3 mt-1.5">
                          {item.size && (
                            <span className="text-xs text-gray-400">
                              {t("cart.size")}: <span className="text-gray-600">{item.size}</span>
                            </span>
                          )}
                          {item.color && (
                            <span className="text-xs text-gray-400">
                              Color: <span className="text-gray-600">{item.color}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        aria-label={t("cart.remove")}
                        className="p-1.5 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity + Price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1, item.size, item.color)
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-gray-900 font-bold text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1, item.size, item.color)
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-gray-900">${lineTotal.toFixed(2)}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">
                            ${product.price} {t("cart.each")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
              >
                ← {t("cart.continueShopping")}
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="sticky top-24 bg-gray-50 rounded-2xl p-6 space-y-5 border border-gray-100">
            <h2 className="text-xl font-black text-gray-900">{t("cart.orderSummary")}</h2>

            <div className="space-y-3 pb-4 border-b border-gray-200 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  {t("cart.subtotal")} ({totalQty} {totalQty !== 1 ? t("cart.items") : t("cart.item")})
                </span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t("cart.shipping")}</span>
                {shippingCost === 0 ? (
                  <span className="text-green-600 font-semibold">{t("cart.shippingFree")}</span>
                ) : (
                  <span className="font-semibold text-gray-900">${shippingCost.toFixed(2)}</span>
                )}
              </div>
              {shippingCost > 0 && (
                <p className="text-xs text-[#D4A900]">
                  {t("cart.freeShippingHint")} ${(75 - subtotal).toFixed(2)} {t("cart.freeShippingHint2")}
                </p>
              )}
              <div className="flex justify-between text-gray-600">
                <span>{t("cart.tax")}</span>
                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-black">
              <span className="text-gray-900">{t("cart.total")}</span>
              <span className="text-gray-900">${total.toFixed(2)}</span>
            </div>

            {/* Promo code */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t("cart.coupon")}
                className="flex-1 input-base text-sm py-2.5"
              />
              <button className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:border-gray-400 transition-colors">
                {t("cart.apply")}
              </button>
            </div>

            <Link
              href="/checkout"
              className="flex items-center justify-center gap-3 w-full py-4 btn-yellow rounded-xl text-sm uppercase tracking-wider font-black"
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              {t("cart.checkout")}
            </Link>

            <div className="text-center space-y-1.5 text-xs text-gray-400">
              <p className="flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" aria-hidden="true" />
                {t("cart.secure")}
              </p>
              <p>{t("cart.freeReturns")}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
