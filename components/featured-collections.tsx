import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export function FeaturedCollections() {
  return (
    <section className="py-20 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-gmg-gold-500 mb-3">Collections</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Shop by Category</h2>
          </div>
          <Link href="/products" className="text-sm font-bold uppercase tracking-widest text-gmg-gold-500 hover:text-gmg-gold-400 transition-colors">
            View All →
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.name}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-auto sm:h-80"
            >
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gmg-gold-500/0 group-hover:bg-gmg-gold-500/10 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-widest text-gmg-gold-400 mb-1 font-semibold">{cat.count} Products</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-1 group-hover:text-gmg-gold-400 transition-colors">{cat.name}</h3>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{cat.description}</p>
              </div>

              {/* Arrow */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-gmg-gold-500 group-hover:text-black transition-all duration-300">
                →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
