import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_26%),_linear-gradient(180deg,_rgba(15,23,42,0.92),_rgba(15,23,42,0.99))] p-10 shadow-soft sm:p-16">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle,_rgba(168,85,247,0.18),_transparent_28%)] blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <Badge>Launch a storefront with confidence</Badge>
          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">Modern commerce experiences for premium brands.</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">Create beautiful product pages, storefront search, and cart workflow powered by Supabase, Cloudinary, and a performant React architecture.</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg">Browse products</Button>
            <Button variant="secondary" size="lg">View catalog</Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-soft backdrop-blur-xl">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-3 rounded-[24px] bg-slate-950/90 p-5 transition hover:-translate-y-1 hover:bg-slate-900/95">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Launch speed</p>
              <p className="text-2xl font-semibold text-white">Prefilled templates and product workflows.</p>
            </div>
            <div className="space-y-3 rounded-[24px] bg-slate-950/90 p-5 transition hover:-translate-y-1 hover:bg-slate-900/95">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Conversion</p>
              <p className="text-2xl font-semibold text-white">Fast product browsing with refined interactions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
