"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gmg-gold-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-gmg-black-700">Stay Connected</p>
            <h2 className="text-4xl sm:text-5xl font-black text-gmg-black-900 tracking-tight leading-tight">
              Join the GMG<br />Athlete Community
            </h2>
            <p className="text-gmg-black-700 text-base leading-relaxed max-w-lg">
              Get early access to new drops, exclusive training content, and insider offers from GMG Sports. No spam — just performance.
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-semibold text-gmg-black-700">
              <span className="flex items-center gap-2">✓ Early access to new releases</span>
              <span className="flex items-center gap-2">✓ Exclusive member discounts</span>
              <span className="flex items-center gap-2">✓ Training tips from pros</span>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-black/10 text-center">
              <div className="text-4xl mb-3">✓</div>
              <p className="text-xl font-black text-gmg-black-900 mb-1">You&apos;re in!</p>
              <p className="text-gmg-black-700 text-sm">Thanks for joining the GMG community. Check your inbox for a welcome email.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs text-gmg-black-600 underline hover:text-gmg-black-900 transition-colors"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  aria-label="Email address"
                  className="flex-1 rounded-full px-6 py-4 bg-black/10 text-gmg-black-900 placeholder:text-gmg-black-600 font-semibold text-sm focus:outline-none focus:bg-black/20 transition-colors border border-transparent focus:border-black/20"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-gmg-black-900 text-gmg-gold-500 font-bold text-sm uppercase tracking-wider hover:bg-gmg-black-700 transition-colors flex-shrink-0"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gmg-black-600 px-2">
                By subscribing you agree to receive marketing emails. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
