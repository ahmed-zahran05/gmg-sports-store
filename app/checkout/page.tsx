"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Shield, Lock } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { products } from "@/lib/data";

type CheckoutStep = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber] = useState(() => `GMG-${Math.floor(100000 + Math.random() * 900000)}`);

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = items.reduce((sum, item) => {
    const p = products.find((pr) => pr.id === item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);
  const shippingCost = subtotal >= 75 ? 0 : 7.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-gmg-black-900 border border-gmg-gold-600/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gmg-gold-500 transition-colors";
  const labelClass = "block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5";

  // Empty cart
  if (items.length === 0 && !orderComplete) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4" aria-hidden="true">🛒</p>
          <h1 className="text-2xl font-black text-white mb-2">Nothing to Checkout</h1>
          <p className="text-white/40 mb-6">Your cart is empty. Add some gear first!</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-gmg-gold-500 text-black font-bold rounded-full hover:bg-gmg-gold-400 transition-colors">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  // Order confirmed
  if (orderComplete) {
    return (
      <main className="min-h-screen bg-black">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
          <div className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Order Confirmed!</h1>
          <p className="text-white/50 text-base mb-2">Thank you for your purchase, {shipping.firstName}!</p>
          <p className="text-gmg-gold-400 font-bold text-lg mb-8">Order #{orderNumber}</p>

          <div className="p-6 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20 text-left mb-8 space-y-3">
            <p className="font-bold text-white mb-4">Order Summary</p>
            <div className="flex justify-between text-sm text-white/60">
              <span>Order Total</span>
              <span className="text-gmg-gold-400 font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>Delivery Email</span>
              <span>{shipping.email}</span>
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>Shipping to</span>
              <span>{shipping.city}, {shipping.state}</span>
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>Estimated Delivery</span>
              <span className="text-gmg-gold-500">3-5 business days</span>
            </div>
          </div>

          <p className="text-white/40 text-sm mb-8">
            A confirmation email has been sent to <span className="text-gmg-gold-400 font-semibold">{shipping.email}</span>. We&apos;ll notify you when your order ships.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/products" className="flex-1 py-4 rounded-full bg-gmg-gold-500 text-black font-bold text-sm hover:bg-gmg-gold-400 transition-colors">
              Continue Shopping
            </Link>
            <Link href="/" className="flex-1 py-4 rounded-full border-2 border-gmg-gold-500/30 text-gmg-gold-400 font-bold text-sm hover:border-gmg-gold-500 hover:bg-gmg-gold-500/10 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const steps: { id: CheckoutStep; label: string; num: number }[] = [
    { id: "shipping", label: "Shipping", num: 1 },
    { id: "payment", label: "Payment", num: 2 },
    { id: "review", label: "Review", num: 3 },
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gmg-black-900 border-b border-gmg-gold-600/20 py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Link href="/cart" className="text-gmg-gold-500 hover:text-gmg-gold-400 text-sm font-semibold transition-colors">
              ← Back to Cart
            </Link>
            <h1 className="text-2xl font-black text-white">Checkout</h1>
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <Lock className="w-3 h-3" />
              Secure
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-0 mt-6">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
                    step === s.id
                      ? "bg-gmg-gold-500 border-gmg-gold-500 text-black"
                      : steps.indexOf(steps.find(st => st.id === step)!) > idx
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : "bg-transparent border-white/20 text-white/30"
                  }`}>
                    {steps.indexOf(steps.find(st => st.id === step)!) > idx ? "✓" : s.num}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${step === s.id ? "text-gmg-gold-400" : "text-white/30"}`}>
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-16 sm:w-24 h-px mx-2 mb-5 ${steps.indexOf(steps.find(st => st.id === step)!) > idx ? "bg-green-500/40" : "bg-white/10"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Left: Form */}
          <div>
            {/* Shipping form */}
            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="p-6 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20">
                  <h2 className="text-xl font-black text-white mb-6">Shipping Information</h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>First Name *</label>
                        <input type="text" value={shipping.firstName} onChange={(e) => setShipping(p => ({...p, firstName: e.target.value}))} placeholder="John" required className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name *</label>
                        <input type="text" value={shipping.lastName} onChange={(e) => setShipping(p => ({...p, lastName: e.target.value}))} placeholder="Doe" required className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input type="email" value={shipping.email} onChange={(e) => setShipping(p => ({...p, email: e.target.value}))} placeholder="john@example.com" required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input type="tel" value={shipping.phone} onChange={(e) => setShipping(p => ({...p, phone: e.target.value}))} placeholder="+1 (555) 000-0000" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Street Address *</label>
                      <input type="text" value={shipping.address} onChange={(e) => setShipping(p => ({...p, address: e.target.value}))} placeholder="123 Main Street" required className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>City *</label>
                        <input type="text" value={shipping.city} onChange={(e) => setShipping(p => ({...p, city: e.target.value}))} placeholder="New York" required className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>State *</label>
                        <input type="text" value={shipping.state} onChange={(e) => setShipping(p => ({...p, state: e.target.value}))} placeholder="NY" required className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Postal Code *</label>
                        <input type="text" value={shipping.postalCode} onChange={(e) => setShipping(p => ({...p, postalCode: e.target.value}))} placeholder="10001" required className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Country</label>
                        <select value={shipping.country} onChange={(e) => setShipping(p => ({...p, country: e.target.value}))} className={inputClass}>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-gmg-gold-500 text-black font-black rounded-full text-sm uppercase tracking-wider hover:bg-gmg-gold-400 transition-colors">
                  Continue to Payment →
                </button>
              </form>
            )}

            {/* Payment form */}
            {step === "payment" && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="p-6 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-black text-white">Payment Details</h2>
                    <div className="flex items-center gap-1 text-white/40 text-xs ml-auto">
                      <Shield className="w-3.5 h-3.5 text-gmg-gold-500" />
                      <span>256-bit SSL secured</span>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <label className={labelClass}>Card Number *</label>
                      <input
                        type="text"
                        value={payment.cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                          const formatted = v.replace(/(.{4})/g, "$1 ").trim();
                          setPayment(p => ({...p, cardNumber: formatted}));
                        }}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        required
                        className={inputClass}
                      />
                      <p className="text-xs text-white/30 mt-1.5">Test card: 4242 4242 4242 4242</p>
                    </div>
                    <div>
                      <label className={labelClass}>Name on Card *</label>
                      <input type="text" value={payment.cardName} onChange={(e) => setPayment(p => ({...p, cardName: e.target.value}))} placeholder="John Doe" required className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Expiry Date *</label>
                        <input
                          type="text"
                          value={payment.expiry}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                            const formatted = v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
                            setPayment(p => ({...p, expiry: formatted}));
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>CVV *</label>
                        <input
                          type="text"
                          value={payment.cvv}
                          onChange={(e) => setPayment(p => ({...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4)}))}
                          placeholder="123"
                          maxLength={4}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep("shipping")} className="px-6 py-4 rounded-full border border-gmg-gold-600/20 text-white/60 font-bold text-sm hover:border-gmg-gold-500/50 hover:text-white transition-colors">
                    ← Back
                  </button>
                  <button type="submit" className="flex-1 py-4 bg-gmg-gold-500 text-black font-black rounded-full text-sm uppercase tracking-wider hover:bg-gmg-gold-400 transition-colors">
                    Review Order →
                  </button>
                </div>
              </form>
            )}

            {/* Review */}
            {step === "review" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20 space-y-6">
                  <h2 className="text-xl font-black text-white">Review Your Order</h2>

                  {/* Shipping info */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs uppercase tracking-widest text-gmg-gold-500 font-bold">Shipping to</p>
                      <button onClick={() => setStep("shipping")} className="text-xs text-white/40 hover:text-gmg-gold-400 transition-colors underline">Edit</button>
                    </div>
                    <p className="text-white/70 text-sm">{shipping.firstName} {shipping.lastName}</p>
                    <p className="text-white/70 text-sm">{shipping.address}</p>
                    <p className="text-white/70 text-sm">{shipping.city}, {shipping.state} {shipping.postalCode}</p>
                    <p className="text-white/70 text-sm">{shipping.email}</p>
                  </div>

                  {/* Payment info */}
                  <div className="border-t border-gmg-gold-600/20 pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs uppercase tracking-widest text-gmg-gold-500 font-bold">Payment</p>
                      <button onClick={() => setStep("payment")} className="text-xs text-white/40 hover:text-gmg-gold-400 transition-colors underline">Edit</button>
                    </div>
                    <p className="text-white/70 text-sm">Card ending in {payment.cardNumber.slice(-4) || "****"}</p>
                    <p className="text-white/70 text-sm">{payment.cardName}</p>
                  </div>

                  {/* Items */}
                  <div className="border-t border-gmg-gold-600/20 pt-6 space-y-3">
                    <p className="text-xs uppercase tracking-widest text-gmg-gold-500 font-bold">Items</p>
                    {items.map((item) => {
                      const p = products.find((pr) => pr.id === item.productId);
                      if (!p) return null;
                      return (
                        <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                          <span className="text-white/60">{p.name} {item.size ? `(${item.size}${item.color ? `, ${item.color}` : ""})` : ""} ×{item.quantity}</span>
                          <span className="text-white font-semibold">${(p.price * item.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("payment")} className="px-6 py-4 rounded-full border border-gmg-gold-600/20 text-white/60 font-bold text-sm hover:border-gmg-gold-500/50 hover:text-white transition-colors">
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-gmg-gold-500 text-black font-black rounded-full text-sm uppercase tracking-wider hover:bg-gmg-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Processing..." : `Place Order · $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="sticky top-24 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20 p-6 space-y-4">
            <h3 className="font-black text-white">Your Order</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => {
                const p = products.find((pr) => pr.id === item.productId);
                if (!p) return null;
                return (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-xs text-white/60">
                    <span className="max-w-[180px] truncate">{p.name} ×{item.quantity}</span>
                    <span className="font-semibold">${(p.price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gmg-gold-600/20 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-white/50">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? "text-gmg-gold-500" : ""}>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>Tax</span><span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-base pt-2 border-t border-gmg-gold-600/20">
                <span className="text-white">Total</span>
                <span className="text-gmg-gold-400">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
