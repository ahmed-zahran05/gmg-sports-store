"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      window.location.href = "/";
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gmg-gold-500 transition-colors";

  return (
    <main className="min-h-screen bg-black flex">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 py-12 lg:max-w-lg lg:ml-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-12 w-fit">
          <div className="relative w-10 h-10">
            <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" />
          </div>
          <span className="font-black tracking-widest text-white">GMG <span className="text-gmg-gold-500">SPORTS</span></span>
        </Link>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-black text-white">Welcome back</h1>
          <p className="text-white/50">Sign in to access your account and order history.</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(p => ({...p, email: e.target.value}))}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData(p => ({...p, password: e.target.value}))}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(e) => setFormData(p => ({...p, remember: e.target.checked}))}
                className="w-4 h-4 accent-yellow-400 rounded"
              />
              <span className="text-sm text-white/50">Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-gmg-gold-500 hover:text-gmg-gold-400 transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-full bg-gmg-gold-500 text-black font-black text-sm uppercase tracking-wider hover:bg-gmg-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-xs text-white/30 bg-black">or continue with</span>
            </div>
          </div>

          {/* Social */}
          <button
            type="button"
            className="w-full py-3.5 rounded-xl border border-white/10 text-white/70 text-sm font-semibold hover:border-white/20 hover:text-white transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-white/40">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-gmg-gold-500 hover:text-gmg-gold-400 font-semibold transition-colors">
            Create one free
          </Link>
        </p>
      </div>

      {/* Right: Brand image */}
      <div className="hidden lg:block flex-1 relative">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=1200&fit=crop"
          alt="GMG Sports athlete"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-4xl font-black text-white leading-tight mb-3">
            Train harder.<br />
            <span className="text-gmg-gold-400">Recover faster.</span>
          </p>
          <p className="text-white/60">Premium athletic apparel engineered for champions.</p>
        </div>
      </div>
    </main>
  );
}
