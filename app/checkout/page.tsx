"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Shield, Lock, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useI18n } from "@/context/i18n-context";
import { products } from "@/lib/data";

type CheckoutStep = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const { t, lang } = useI18n();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber] = useState(
    () => `GMG-${Math.floor(100000 + Math.random() * 900000)}`
  );

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

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#F5C400] transition-colors";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";

  const stepsList: { id: CheckoutStep; label: string; num: number }[] = [
    { id: "shipping", label: t("checkout.shipping"), num: 1 },
    { id: "payment", label: t("checkout.payment"), num: 2 },
    { id: "review", label: t("checkout.review"), num: 3 },
  ];

  const currentStepIdx = stepsList.findIndex((s) => s.id === step);

  // Empty cart
  if (items.length === 0 && !orderComplete) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4" aria-hidden="true">🛒</p>
          <h1 className="text-2xl font-black text-gray-900 mb-2">{t("checkout.emptyTitle")}</h1>
          <p className="text-gray-500 mb-6">{t("checkout.emptySub")}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 btn-yellow px-8 py-4 rounded-xl"
          >
            {t("checkout.browse")}
          </Link>
        </div>
      </main>
    );
  }

  // Order confirmed
  if (orderComplete) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container-site max-w-2xl py-24 text-center">
          <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" aria-hidden="true" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">{t("checkout.orderConfirmed")}</h1>
          <p className="text-gray-500 mb-2">
            {t("checkout.thankYou")} {shipping.firstName}!
          </p>
          <p className="text-[#F5C400] font-bold text-lg mb-8">
            {t("checkout.orderNumber")}{orderNumber}
          </p>

          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-start mb-8 space-y-3">
            <p className="font-black text-gray-900 mb-4 text-lg">{t("cart.orderSummary")}</p>
            {[
              { label: t("checkout.orderTotal"), val: `$${total.toFixed(2)}`, bold: true },
              { label: t("checkout.deliveryEmail"), val: shipping.email },
              { label: t("checkout.shippingCity"), val: `${shipping.city}, ${shipping.state}` },
              { label: t("checkout.estimatedDelivery"), val: t("checkout.days"), highlight: true },
            ].map(({ label, val, bold, highlight }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-500">{label}</span>
                <span className={bold ? "font-black text-gray-900" : highlight ? "text-[#D4A900] font-semibold" : "text-gray-700"}>
                  {val}
                </span>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-sm mb-8">
            {t("checkout.confirmationNote")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="flex-1 py-4 rounded-xl btn-yellow text-center text-sm font-black"
            >
              {t("checkout.continueShopping")}
            </Link>
            <Link
              href="/"
              className="flex-1 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-400 transition-colors text-center"
            >
              {t("checkout.backHome")}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-5">
        <div className="container-site max-w-5xl">
          <div className="flex items-center justify-between">
            <Link
              href="/cart"
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rtl-flip" aria-hidden="true" />
              {t("checkout.backToCart")}
            </Link>
            <h1 className="text-xl font-black text-gray-900">{t("checkout.title")}</h1>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              {t("checkout.secure")}
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-0 mt-6">
            {stepsList.map((s, idx) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
                      step === s.id
                        ? "bg-[#F5C400] border-[#F5C400] text-gray-900"
                        : currentStepIdx > idx
                        ? "bg-green-50 border-green-400 text-green-600"
                        : "bg-white border-gray-200 text-gray-400"
                    }`}
                  >
                    {currentStepIdx > idx ? "✓" : s.num}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      step === s.id ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < stepsList.length - 1 && (
                  <div
                    className={`w-16 sm:w-24 h-px mx-2 mb-5 ${
                      currentStepIdx > idx ? "bg-green-300" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site max-w-5xl py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Left: Form */}
          <div>
            {/* Shipping */}
            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card">
                  <h2 className="text-xl font-black text-gray-900 mb-6">{t("checkout.shippingInfo")}</h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{t("checkout.firstName")} *</label>
                        <input type="text" value={shipping.firstName} onChange={(e) => setShipping((p) => ({ ...p, firstName: e.target.value }))} placeholder="John" required className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>{t("checkout.lastName")} *</label>
                        <input type="text" value={shipping.lastName} onChange={(e) => setShipping((p) => ({ ...p, lastName: e.target.value }))} placeholder="Doe" required className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>{t("checkout.email")} *</label>
                      <input type="email" value={shipping.email} onChange={(e) => setShipping((p) => ({ ...p, email: e.target.value }))} placeholder="john@example.com" required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{t("checkout.phone")}</label>
                      <input type="tel" value={shipping.phone} onChange={(e) => setShipping((p) => ({ ...p, phone: e.target.value }))} placeholder="+1 (555) 000-0000" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{t("checkout.address")} *</label>
                      <input type="text" value={shipping.address} onChange={(e) => setShipping((p) => ({ ...p, address: e.target.value }))} placeholder="123 Main Street" required className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{t("checkout.city")} *</label>
                        <input type="text" value={shipping.city} onChange={(e) => setShipping((p) => ({ ...p, city: e.target.value }))} placeholder="New York" required className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>{t("checkout.state")} *</label>
                        <input type="text" value={shipping.state} onChange={(e) => setShipping((p) => ({ ...p, state: e.target.value }))} placeholder="NY" required className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{t("checkout.postalCode")} *</label>
                        <input type="text" value={shipping.postalCode} onChange={(e) => setShipping((p) => ({ ...p, postalCode: e.target.value }))} placeholder="10001" required className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>{t("checkout.country")}</label>
                        <select value={shipping.country} onChange={(e) => setShipping((p) => ({ ...p, country: e.target.value }))} className={inputClass}>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AE">UAE</option>
                          <option value="SA">Saudi Arabia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 btn-yellow rounded-xl text-sm uppercase tracking-wider font-black">
                  {t("checkout.continueToPay")} →
                </button>
              </form>
            )}

            {/* Payment */}
            {step === "payment" && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-black text-gray-900">{t("checkout.paymentDetails")}</h2>
                    <div className="flex items-center gap-1 text-gray-400 text-xs ms-auto">
                      <Shield className="w-3.5 h-3.5 text-[#D4A900]" aria-hidden="true" />
                      {t("checkout.ssl")}
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <label className={labelClass}>{t("checkout.cardNumber")} *</label>
                      <input
                        type="text"
                        value={payment.cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                          const formatted = v.replace(/(.{4})/g, "$1 ").trim();
                          setPayment((p) => ({ ...p, cardNumber: formatted }));
                        }}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        required
                        className={inputClass}
                      />
                      <p className="text-xs text-gray-400 mt-1">{t("checkout.testCard")}</p>
                    </div>
                    <div>
                      <label className={labelClass}>{t("checkout.cardName")} *</label>
                      <input type="text" value={payment.cardName} onChange={(e) => setPayment((p) => ({ ...p, cardName: e.target.value }))} placeholder="John Doe" required className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{t("checkout.expiry")} *</label>
                        <input
                          type="text"
                          value={payment.expiry}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                            const formatted = v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
                            setPayment((p) => ({ ...p, expiry: formatted }));
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>{t("checkout.cvv")} *</label>
                        <input
                          type="text"
                          value={payment.cvv}
                          onChange={(e) => setPayment((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
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
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-400 transition-colors"
                  >
                    {t("checkout.back")}
                  </button>
                  <button type="submit" className="flex-1 py-4 btn-yellow rounded-xl text-sm uppercase tracking-wider font-black">
                    {t("checkout.reviewOrder2")} →
                  </button>
                </div>
              </form>
            )}

            {/* Review */}
            {step === "review" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card space-y-5">
                  <h2 className="text-xl font-black text-gray-900">{t("checkout.reviewOrder")}</h2>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t("checkout.shippingTo")}</p>
                      <button onClick={() => setStep("shipping")} className="text-xs text-gray-400 hover:text-gray-700 underline">{t("checkout.edit")}</button>
                    </div>
                    <p className="text-sm text-gray-700">{shipping.firstName} {shipping.lastName}</p>
                    <p className="text-sm text-gray-500">{shipping.address}</p>
                    <p className="text-sm text-gray-500">{shipping.city}, {shipping.state} {shipping.postalCode}</p>
                    <p className="text-sm text-gray-500">{shipping.email}</p>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t("checkout.payment")}</p>
                      <button onClick={() => setStep("payment")} className="text-xs text-gray-400 hover:text-gray-700 underline">{t("checkout.edit")}</button>
                    </div>
                    <p className="text-sm text-gray-700">•••• {payment.cardNumber.slice(-4) || "****"}</p>
                    <p className="text-sm text-gray-500">{payment.cardName}</p>
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Items</p>
                    {items.map((item) => {
                      const p = products.find((pr) => pr.id === item.productId);
                      if (!p) return null;
                      return (
                        <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                          <span className="text-gray-600 truncate max-w-[240px]">
                            {p.name}
                            {item.size ? ` (${item.size}${item.color ? `, ${item.color}` : ""})` : ""} ×{item.quantity}
                          </span>
                          <span className="font-semibold text-gray-900">
                            ${(p.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("payment")}
                    className="px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-400 transition-colors"
                  >
                    {t("checkout.back")}
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-4 btn-yellow rounded-xl text-sm uppercase tracking-wider font-black disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? t("checkout.processing") : `${t("checkout.placeOrder")} · $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="sticky top-24 bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
            <h3 className="font-black text-gray-900">{lang === "ar" ? "طلبك" : "Your Order"}</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => {
                const p = products.find((pr) => pr.id === item.productId);
                if (!p) return null;
                return (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-xs text-gray-500">
                    <span className="max-w-[180px] truncate">{p.name} ×{item.quantity}</span>
                    <span className="font-semibold text-gray-900">${(p.price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>{t("cart.subtotal")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>{t("cart.shipping")}</span>
                <span className={shippingCost === 0 ? "text-green-600 font-semibold" : ""}>
                  {shippingCost === 0 ? t("cart.shippingFree") : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>{t("cart.tax")}</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-base pt-2 border-t border-gray-200">
                <span className="text-gray-900">{t("cart.total")}</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
