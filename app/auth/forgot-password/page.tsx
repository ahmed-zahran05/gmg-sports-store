"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/i18n-context";

export default function ForgotPasswordPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-12 justify-center">
          <div className="relative w-9 h-9">
            <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" />
          </div>
          <span className="font-black text-gray-900 text-lg">
            GMG <span className="text-[#F5C400]">SPORTS</span>
          </span>
        </Link>

        <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-card">
          {submitted ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#FFF9D0] border border-[#F5C400]/30 flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-[#D4A900]" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 mb-2">{t("auth.checkEmailTitle")}</h1>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t("auth.checkEmailSub")}{" "}
                  <span className="text-[#D4A900] font-semibold">{email}</span>.{" "}
                  {t("auth.checkEmailSub2")}
                </p>
              </div>
              <p className="text-xs text-gray-400">
                {t("auth.didntReceive")}{" "}
                <button onClick={() => setSubmitted(false)} className="text-[#D4A900] hover:text-[#F5C400] underline">
                  {t("auth.tryAgain")}
                </button>
              </p>
              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 text-sm font-bold hover:border-gray-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 rtl-flip" aria-hidden="true" />
                {t("auth.backToLogin")}
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 mb-2">{t("auth.forgotTitle")}</h1>
                <p className="text-gray-500 text-sm leading-relaxed">{t("auth.forgotSub")}</p>
              </div>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                    {t("auth.email")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#F5C400] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl btn-yellow text-sm uppercase tracking-wider font-black disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? t("auth.sending") : t("auth.sendLink")}
                </button>
              </form>

              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400 hover:text-gray-700 transition-colors font-semibold"
              >
                <ArrowLeft className="w-4 h-4 rtl-flip" aria-hidden="true" />
                {t("auth.backToLogin")}
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
