"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-12 justify-center">
          <div className="relative w-10 h-10">
            <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" />
          </div>
          <span className="font-black tracking-widest text-white">GMG <span className="text-gmg-gold-500">SPORTS</span></span>
        </Link>

        <div className="p-8 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20">
          {submitted ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-gmg-gold-500/10 border border-gmg-gold-500/30 flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-gmg-gold-500" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white mb-2">Check Your Email</h1>
                <p className="text-white/50 text-sm leading-relaxed">
                  We sent a password reset link to{" "}
                  <span className="text-gmg-gold-400 font-semibold">{email}</span>.
                  Check your inbox and click the link to reset your password.
                </p>
              </div>
              <p className="text-xs text-white/30">
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button onClick={() => setSubmitted(false)} className="text-gmg-gold-500 hover:text-gmg-gold-400 underline">
                  try again
                </button>
              </p>
              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full border border-gmg-gold-600/20 text-white/60 text-sm font-bold hover:border-gmg-gold-500 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-black text-white mb-2">Reset Password</h1>
                <p className="text-white/50 text-sm leading-relaxed">
                  Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gmg-gold-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-full bg-gmg-gold-500 text-black font-black text-sm uppercase tracking-wider hover:bg-gmg-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 mt-6 text-sm text-white/40 hover:text-gmg-gold-400 transition-colors font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
