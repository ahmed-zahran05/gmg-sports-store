"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCartStore } from "@/stores/cartStore";
import { products } from "@/lib/data";
import { Button } from "@/components/button";

export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-gmg-gold-600/20 bg-gmg-black-800 p-6">
        <p className="text-white/50 text-center">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gmg-gold-600/20 bg-gmg-black-800 p-6">
      <h3 className="text-lg font-bold text-white">Cart Summary</h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center justify-between rounded-lg bg-gmg-black-900 border border-gmg-gold-600/20 p-4">
              <div>
                <p className="font-semibold text-white text-sm">{product.name}</p>
                <p className="text-xs text-white/40">Qty: {item.quantity}</p>
              </div>
              <span className="text-gmg-gold-400 font-semibold">${(product.price * item.quantity).toFixed(2)}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-6 space-y-3 border-t border-gmg-gold-600/20 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Subtotal</span>
          <span className="text-lg text-gmg-gold-400 font-bold">${total.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between pb-3 border-b border-gmg-gold-600/20">
          <span className="text-sm text-white/60">Shipping</span>
          <span className="text-gmg-gold-500 font-semibold">FREE on $75+</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">Total</span>
          <span className="text-2xl font-black text-gmg-gold-400">${total.toFixed(2)}</span>
        </div>
      </div>
      <Link href="/checkout" className="w-full block mt-6">
        <Button className="w-full" size="lg">Proceed to Checkout</Button>
      </Link>
    </div>
  );
}
