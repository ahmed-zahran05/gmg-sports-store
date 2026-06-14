const reasons = [
  {
    icon: "⚡",
    title: "Performance Engineered",
    description: "Every product is designed with athletes first. From fabric technology to seam placement, performance is at the core of everything we make.",
  },
  {
    icon: "🏆",
    title: "Champion Proven",
    description: "Trusted by professional athletes and weekend warriors alike. Our gear has crossed finish lines, set PRs, and won championships.",
  },
  {
    icon: "🔬",
    title: "Premium Materials",
    description: "We source only the finest performance fabrics and materials. If it doesn't meet our standards, it doesn't make it into our lineup.",
  },
  {
    icon: "♻️",
    title: "Sustainably Made",
    description: "We care about the planet our athletes train on. Our manufacturing uses sustainable practices and eco-friendly materials wherever possible.",
  },
  {
    icon: "🚚",
    title: "Free Fast Shipping",
    description: "Free shipping on orders over $75. Orders placed before 2 PM ship same day. Because waiting for your gear is the hardest workout.",
  },
  {
    icon: "↩️",
    title: "Easy 30-Day Returns",
    description: "Not the right fit? No problem. Return or exchange anything within 30 days, no questions asked. We want you to love your gear.",
  },
];

export function WhyChooseGMG() {
  return (
    <section className="py-24 bg-gmg-black-900 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(244,208,63,0.05)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-gmg-gold-500 mb-3">Why GMG</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            The GMG Difference
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            We don&apos;t just make athletic apparel. We engineer competitive advantages for athletes who refuse to settle for anything less than their best.
          </p>
        </div>

        {/* Reason grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group relative p-8 rounded-2xl border border-gmg-gold-600/20 bg-black/40 hover:border-gmg-gold-500/40 hover:bg-gmg-gold-500/5 transition-all duration-300"
            >
              <div className="text-3xl mb-4" aria-hidden="true">{reason.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gmg-gold-400 transition-colors">
                {reason.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
