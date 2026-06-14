"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"][passwordStrength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    window.location.href = "/";
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gmg-gold-500 transition-colors";

  const benefits = [
    "Early access to new collections",
    "Exclusive member-only discounts",
    "Free shipping on first order",
    "Order history & tracking",
    "Personalized recommendations",
  ];

  return (
    <main className="min-h-screen bg-black flex">
      {/* Left: Brand */}
      <div className="hidden lg:flex flex-col justify-between flex-1 relative p-12">
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=1200&fit=crop"
          alt="GMG Sports"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/50 to-black/70" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" />
            </div>
            <span className="font-black tracking-widest text-white">GMG <span className="text-gmg-gold-500">SPORTS</span></span>
          </Link>
        </div>
        <div className="relative z-10">
          <p className="text-3xl font-black text-white mb-6">Join the Community</p>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white/70 text-sm">
                <span className="w-5 h-5 rounded-full bg-gmg-gold-500/20 border border-gmg-gold-500/40 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-gmg-gold-400" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 py-12 lg:max-w-lg">
        <Link href="/" className="flex items-center gap-3 mb-12 w-fit lg:hidden">
          <div className="relative w-10 h-10">
            <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" />
          </div>
          <span className="font-black tracking-widest text-white">GMG <span className="text-gmg-gold-500">SPORTS</span></span>
        </Link>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-black text-white">Create Account</h1>
          <p className="text-white/50">Join over 50,000 athletes already training with GMG.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">First Name</label>
              <input type="text" value={formData.firstName} onChange={(e) => setFormData(p => ({...p, firstName: e.target.value}))} placeholder="John" required className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">Last Name</label>
              <input type="text" value={formData.lastName} onChange={(e) => setFormData(p => ({...p, lastName: e.target.value}))} placeholder="Doe" required className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">Email Address</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} placeholder="you@example.com" required autoComplete="email" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData(p => ({...p, password: e.target.value}))}
                placeholder="Min. 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
                className={`${inputClass} pr-12`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i < passwordStrength ? strengthColor : "bg-white/10"} transition-all`} />
                  ))}
                </div>
                <p className="text-xs text-white/40">{strengthLabel}</p>
              </div>
            )}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.terms}
              onChange={(e) => setFormData(p => ({...p, terms: e.target.checked}))}
              required
              className="w-4 h-4 accent-yellow-400 mt-0.5 flex-shrink-0"
            />
            <span className="text-sm text-white/50 leading-relaxed">
              I agree to the{" "}
              <Link href="#" className="text-gmg-gold-500 hover:text-gmg-gold-400">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="text-gmg-gold-500 hover:text-gmg-gold-400">Privacy Policy</Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-full bg-gmg-gold-500 text-black font-black text-sm uppercase tracking-wider hover:bg-gmg-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Creating Account..." : "Create Free Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-gmg-gold-500 hover:text-gmg-gold-400 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
