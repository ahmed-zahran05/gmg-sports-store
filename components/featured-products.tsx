import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "./product-card";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <section className="py-20 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-gmg-gold-500 mb-3">Premium Selection</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Featured Gear</h2>
          </div>
          <Link href="/products" className="text-sm font-bold uppercase tracking-widest text-gmg-gold-500 hover:text-gmg-gold-400 transition-colors">
            View All →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
