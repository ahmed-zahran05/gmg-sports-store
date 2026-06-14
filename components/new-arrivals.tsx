import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "./product-card";

export function NewArrivals() {
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="py-20 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-gmg-gold-500 mb-3">Fresh Drops</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">New Arrivals</h2>
            <p className="mt-3 text-white/50 text-base max-w-lg">
              The latest performance gear just dropped. Be the first to train in it.
            </p>
          </div>
          <Link
            href="/products?filter=new"
            className="text-sm font-bold uppercase tracking-widest text-gmg-gold-500 hover:text-gmg-gold-400 transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
