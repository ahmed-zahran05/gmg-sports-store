"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";

const CATEGORIES = ["All", "Running", "Training", "Essentials"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") ?? "All";
  const urlFilter = searchParams.get("filter");
  const urlSearch = searchParams.get("search") ?? "";

  const [category, setCategory] = useState<string>(urlCategory);
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState(urlSearch);

  useEffect(() => { setCategory(urlCategory); }, [urlCategory]);
  useEffect(() => { setSearch(urlSearch); }, [urlSearch]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "All") list = list.filter((p) => p.category === category);
    if (urlFilter === "new") list = list.filter((p) => p.isNew);
    if (urlFilter === "bestsellers") list = list.filter((p) => p.isBestSeller);
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (inStockOnly) list = list.filter((p) => p.availability === "In stock");
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case "price-asc": return list.sort((a, b) => a.price - b.price);
      case "price-desc": return list.sort((a, b) => b.price - a.price);
      case "rating": return list.sort((a, b) => b.rating - a.rating);
      case "reviews": return list.sort((a, b) => b.reviewCount - a.reviewCount);
      default: return list;
    }
  }, [category, urlFilter, search, sort, priceRange, inStockOnly]);

  return (
    <main className="min-h-screen bg-black">
      {/* Page header */}
      <div className="bg-gmg-black-900 border-b border-gmg-gold-600/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/40 mb-4">
            <Link href="/" className="hover:text-gmg-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Products</span>
            {urlFilter && <><span>/</span><span className="text-gmg-gold-500 capitalize">{urlFilter === "bestsellers" ? "Best Sellers" : "New Arrivals"}</span></>}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            {urlFilter === "new" ? "New Arrivals" : urlFilter === "bestsellers" ? "Best Sellers" : "All Products"}
          </h1>
          <p className="mt-3 text-white/50">{filtered.length} products{category !== "All" ? ` in ${category}` : ""}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gmg-black-800 border border-gmg-gold-600/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gmg-gold-500 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gmg-black-800 border border-gmg-gold-600/20 text-white text-sm focus:outline-none focus:border-gmg-gold-500 appearance-none cursor-pointer min-w-[180px]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
              showFilters ? "border-gmg-gold-500 bg-gmg-gold-500/10 text-gmg-gold-400" : "border-gmg-gold-600/20 bg-gmg-black-800 text-white/70 hover:border-gmg-gold-500/50 hover:text-white"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                category === cat
                  ? "bg-gmg-gold-500 text-black"
                  : "bg-gmg-black-800 border border-gmg-gold-600/20 text-white/60 hover:border-gmg-gold-500/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mb-8 p-6 rounded-2xl bg-gmg-black-900 border border-gmg-gold-600/20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-gmg-gold-500 font-bold mb-3">Price Range</p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={priceRange[0]}
                  min={0}
                  max={priceRange[1]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-20 px-3 py-2 rounded-lg bg-gmg-black-800 border border-gmg-gold-600/20 text-white text-sm focus:outline-none focus:border-gmg-gold-500"
                />
                <span className="text-white/40">—</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  min={priceRange[0]}
                  max={500}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-20 px-3 py-2 rounded-lg bg-gmg-black-800 border border-gmg-gold-600/20 text-white text-sm focus:outline-none focus:border-gmg-gold-500"
                />
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gmg-gold-500 font-bold mb-3">Availability</p>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-yellow-400"
                />
                <span className="text-sm text-white/70">In Stock Only</span>
              </label>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => { setPriceRange([0, 300]); setInStockOnly(false); setCategory("All"); setSearch(""); }}
                className="text-sm text-white/40 hover:text-white transition-colors underline underline-offset-2"
              >
                Reset all filters
              </button>
            </div>
          </div>
        )}

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4" aria-hidden="true">🔍</p>
            <h2 className="text-2xl font-bold text-white mb-2">No products found</h2>
            <p className="text-white/40 mb-6">Try adjusting your filters or search term</p>
            <button
              onClick={() => { setCategory("All"); setSearch(""); setPriceRange([0, 300]); setInStockOnly(false); }}
              className="px-6 py-3 bg-gmg-gold-500 text-black font-bold rounded-full text-sm hover:bg-gmg-gold-400 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
