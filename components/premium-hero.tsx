import Image from "next/image";
import Link from "next/link";

export function PremiumHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1800&h=1000&fit=crop&q=90"
          alt="GMG Sports athlete"
          fill
          priority
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Decorative gold line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gmg-gold-500 to-transparent opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl space-y-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gmg-gold-500" />
            <p className="text-xs sm:text-sm uppercase tracking-[0.4em] font-bold text-gmg-gold-500">
              Performance Excellence
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight">
            <span className="block text-white">Built for</span>
            <span className="block gradient-text">Champions</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl">
            Premium athletic apparel engineered for peak performance. From training to competition, GMG Sports delivers the edge champions demand.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gmg-gold-500 text-black font-bold text-sm uppercase tracking-wider rounded-full hover:bg-gmg-gold-400 transition-all duration-200 hover:shadow-[0_0_30px_rgba(244,208,63,0.4)] active:scale-95"
            >
              Shop Collection
              <span className="text-base">→</span>
            </Link>
            <Link
              href="/products?filter=new"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wider rounded-full hover:border-gmg-gold-500 hover:text-gmg-gold-400 transition-all duration-200"
            >
              New Arrivals
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
            {[
              { value: "50K+", label: "Happy Athletes" },
              { value: "4.8★", label: "Average Rating" },
              { value: "30", label: "Day Returns" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl sm:text-3xl font-black text-gmg-gold-400">{value}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <p className="text-[10px] uppercase tracking-widest text-white">Scroll</p>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
