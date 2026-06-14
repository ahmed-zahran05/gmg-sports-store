const testimonials = [
  {
    quote: 'GMG Sports elevated my entire training wardrobe. The quality is exceptional and the performance is night and day compared to what I was using before.',
    name: 'Alex Johnson',
    role: 'Professional Marathon Runner',
    rating: 5,
    initials: 'AJ',
  },
  {
    quote: 'Every piece is engineered with precision. The moisture-wicking fabric on the Champion Tee kept me completely dry during my toughest track sessions.',
    name: 'Sarah Chen',
    role: 'Track & Field Coach',
    rating: 5,
    initials: 'SC',
  },
  {
    quote: 'This is the gear that separates amateurs from champions. GMG Sports understands what serious athletes need, and delivers it at a fair price.',
    name: 'Marcus Reid',
    role: 'Fitness Competitor',
    rating: 5,
    initials: 'MR',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(244,208,63,0.04)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-gmg-gold-500 mb-3">Athlete Stories</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Trusted by Champions
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="relative p-8 rounded-2xl border border-gmg-gold-600/20 bg-gmg-black-900/60 hover:border-gmg-gold-500/40 transition-all duration-300"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-gmg-gold-500 text-sm">&#9733;</span>
                ))}
              </div>

              <p className="text-white/70 leading-relaxed text-base mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gmg-gold-500/20 border border-gmg-gold-500/30 flex items-center justify-center text-gmg-gold-400 font-bold text-sm flex-shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gmg-gold-600 uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
