import { Button } from "@/components/button";

export function FooterCTA() {
  return (
    <section className="rounded-3xl border-2 border-gmg-gold-600/40 bg-gradient-to-r from-gmg-black-900 via-gmg-black-800 to-gmg-black-900 p-10 text-center shadow-premium md:p-14">
      <div className="mx-auto max-w-3xl space-y-5">
        <p className="text-sm uppercase tracking-[0.3em] text-gmg-gold-500 font-bold">Performance Matters</p>
        <h2 className="text-4xl font-bold text-gmg-white-50 sm:text-5xl">Join the Champions</h2>
        <p className="mx-auto max-w-2xl text-base leading-7 text-gmg-white-200">Experience premium athletic apparel engineered for champions. Elevate your performance with GMG Sports.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg">Shop Now</Button>
          <Button variant="secondary" size="lg">Learn More</Button>
        </div>
      </div>
    </section>
  );
}
