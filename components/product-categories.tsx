import Link from "next/link";

const categories = [
  { label: "Running", description: "Lightweight performance gear for distance and speed.", href: "/categories/running" },
  { label: "Training", description: "Engineered for strength, agility, and intense workouts.", href: "/categories/training" },
  { label: "Essentials", description: "Premium basics designed for everyday athletic wear.", href: "/categories/essentials" }
];

export function ProductCategories() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] font-bold text-gmg-gold-500 mb-3">Collections</p>
        <h3 className="text-4xl md:text-5xl font-bold text-gmg-white-50">Shop by Performance</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.label} href={category.href} className="group rounded-2xl border-2 border-gmg-gold-600/30 bg-gmg-black-800 p-8 transition hover:border-gmg-gold-500 hover:bg-gmg-black-700">
            <p className="text-sm uppercase tracking-[0.3em] font-bold text-gmg-gold-500 group-hover:text-gmg-gold-400 transition-colors">{category.label}</p>
            <p className="mt-4 text-xl font-bold text-gmg-white-50">{category.description}</p>
            <p className="mt-4 text-sm text-gmg-gold-600 opacity-0 group-hover:opacity-100 transition-opacity">Explore →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
