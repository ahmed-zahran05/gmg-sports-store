"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Check, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/i18n-context";

export default function RegisterPage() {
  const { t } = useI18n();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  });

  const passwordStrength = (() => {
    const p = formData.password;
    if (p.length === 0) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthLabel = ["", t("auth.weakPassword"), t("auth.fairPassword"), t("auth.goodPassword"), t("auth.strongPassword")][passwordStrength];
  const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400"][passwordStrength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setRegistered(true);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#F5C400] transition-colors";

  const benefits = t("auth.benefits") as unknown as string[] | undefined;
  const benefitList = Array.isArray(benefits)
    ? benefits
    : [
        "Early access to new collections",
        "Exclusive member-only discounts",
        "Free shipping on your first order",
        "Order history & tracking",
        "Personalized recommendations",
      ];

  return (
    <main className="min-h-screen bg-white flex">
      {/* Left: Brand image */}
      <div className="hidden lg:flex flex-col justify-between flex-1 relative p-12">
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=1200&fit=crop"
          alt="GMG Sports"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-gray-900/20" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9">
              <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" />
            </div>
            <span className="font-black text-white text-lg">
              GMG <span className="text-[#F5C400]">SPORTS</span>
            </span>
          </Link>
        </div>
        <div className="relative z-10">
          <p className="text-3xl font-black text-white mb-6">{t("auth.joinCommunity")}</p>
          <ul className="space-y-3">
            {benefitList.map((b, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                <span className="w-5 h-5 rounded-full bg-[#F5C400]/20 border border-[#F5C400]/40 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#F5C400]" aria-hidden="true" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-12 lg:max-w-[520px]">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-10 w-fit lg:hidden">
          <div className="relative w-9 h-9">
            <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" />
          </div>
          <span className="font-black text-gray-900 text-lg">
            GMG <span className="text-[#F5C400]">SPORTS</span>
          </span>
        </Link>

        {registered ? (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 rounded-full bg-[#FFF9D0] border border-[#F5C400]/30 flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-[#D4A900]" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 mb-2">{t("auth.emailConfirmTitle")}</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t("auth.emailConfirmSub")}{" "}
                <span className="text-[#D4A900] font-semibold">{formData.email}</span>
                .{" "}{t("auth.emailConfirmSub2")}
              </p>
            </div>
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 text-sm font-bold hover:border-gray-400 transition-colors"
            >
              {t("auth.backToLogin")}
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-black text-gray-900 mb-1">{t("auth.registerTitle")}</h1>
              <p className="text-gray-500">{t("auth.registerSub")}</p>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">{t("auth.firstName")}</label>
                  <input type="text" value={formData.firstName} onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))} placeholder="John" required className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">{t("auth.lastName")}</label>
                  <input type="text" value={formData.lastName} onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))} placeholder="Doe" required className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">{t("auth.email")}</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} placeholder="you@example.com" required autoComplete="email" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">{t("auth.password")}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                    placeholder={t("auth.minPassword")}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className={`${inputClass} pe-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            i < passwordStrength ? strengthColor : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{strengthLabel}</p>
                  </div>
                )}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.terms}
                  onChange={(e) => setFormData((p) => ({ ...p, terms: e.target.checked }))}
                  required
                  className="w-4 h-4 accent-[#F5C400] mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-gray-500 leading-relaxed">
                  {t("auth.terms")}{" "}
                  <Link href="#" className="text-[#D4A900] hover:text-[#F5C400]">{t("auth.termsLink")}</Link>
                  {" "}{t("auth.andThe")}{" "}
                  <Link href="#" className="text-[#D4A900] hover:text-[#F5C400]">{t("auth.privacyLink")}</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl btn-yellow text-sm uppercase tracking-wider font-black disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? t("auth.signingUp") : t("auth.signUp")}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-400">
              {t("auth.hasAccount")}{" "}
              <Link href="/auth/login" className="text-[#D4A900] hover:text-[#F5C400] font-semibold transition-colors">
                {t("auth.signInHere")}
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
