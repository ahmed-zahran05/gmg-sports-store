import { brands } from "@/lib/data";

export function FeaturedBrands() {
  return (
    <section className="py-16 bg-black border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Trusted Alongside</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="text-xl sm:text-2xl font-black tracking-wider text-white/20 hover:text-white/50 transition-colors duration-200 cursor-default select-none"
            >
              {brand.displayName}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
