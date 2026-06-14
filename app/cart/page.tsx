"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { products } from "@/lib/data";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const shipping = subtotal >= 75 ? 0 : 7.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-gmg-gold-500/10 border border-gmg-gold-500/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gmg-gold-500" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Your Cart is Empty</h1>
          <p className="text-white/50 mb-8 text-base">Looks like you haven&apos;t added anything yet. Explore our collection and find your perfect gear.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gmg-gold-500 text-black font-bold rounded-full hover:bg-gmg-gold-400 transition-colors"
          >
            Shop Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-gmg-black-900 border-b border-gmg-gold-600/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-white tracking-tight">Shopping Cart</h1>
          <p className="text-white/40 mt-1">{items.reduce((n, i) => n + i.quantity, 0)} item{items.reduce((n, i) => n + i.quantity, 0) !== 1 ? "s" : ""} in your cart</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* Cart items */}
          <div className="space-y-4">
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              const lineTotal = product.price * item.quantity;

              return (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-5 p-5 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20 hover:border-gmg-gold-500/30 transition-colors"
                >
                  {/* Image */}
                  <Link href={`/products/${product.id}`} className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gmg-black-800">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gmg-gold-600 font-bold">{product.category}</p>
                        <Link href={`/products/${product.id}`} className="font-bold text-white hover:text-gmg-gold-400 transition-colors leading-tight">
                          {product.name}
                        </Link>
                        <div className="flex flex-wrap gap-3 mt-1.5">
                          {item.size && <span className="text-xs text-white/40">Size: <span className="text-white/60">{item.size}</span></span>}
                          {item.color && <span className="text-xs text-white/40">Color: <span className="text-white/60">{item.color}</span></span>}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        aria-label="Remove item"
                        className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gmg-gold-600/20 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size, item.color)}
                          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-gmg-gold-400 hover:bg-gmg-gold-500/10 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-white font-bold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size, item.color)}
                          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-gmg-gold-400 hover:bg-gmg-gold-500/10 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-gmg-gold-400">${lineTotal.toFixed(2)}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-white/30">${product.price} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continue shopping */}
            <div className="pt-4">
              <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gmg-gold-500 hover:text-gmg-gold-400 font-semibold transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="sticky top-24 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20 p-6 space-y-6">
            <h2 className="text-xl font-black text-white">Order Summary</h2>

            <div className="space-y-3 pb-4 border-b border-gmg-gold-600/20 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Subtotal ({items.reduce((n, i) => n + i.quantity, 0)} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="text-gmg-gold-500 font-semibold">FREE</span>
                ) : (
                  <span>${shipping.toFixed(2)}</span>
                )}
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gmg-gold-600">Add ${(75 - subtotal).toFixed(2)} more for free shipping</p>
              )}
              <div className="flex justify-between text-white/60">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-black">
              <span className="text-white">Total</span>
              <span className="text-gmg-gold-400">${total.toFixed(2)}</span>
            </div>

            {/* Promo code */}
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gmg-black-800 border border-gmg-gold-600/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gmg-gold-500"
                />
                <button className="px-4 py-2.5 rounded-xl bg-gmg-gold-500/10 border border-gmg-gold-600/20 text-gmg-gold-400 text-sm font-bold hover:bg-gmg-gold-500/20 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <Link
              href="/checkout"
              className="flex items-center justify-center gap-3 w-full py-4 bg-gmg-gold-500 text-black font-black rounded-full hover:bg-gmg-gold-400 transition-colors text-sm uppercase tracking-wider"
            >
              <ShoppingBag className="w-4 h-4" />
              Proceed to Checkout
            </Link>

            {/* Trust signals */}
            <div className="text-center space-y-1.5 text-xs text-white/30">
              <p>🔒 Secure 256-bit SSL encryption</p>
              <p>Free returns within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
