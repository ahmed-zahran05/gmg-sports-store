"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { SlidersHorizontal, Search, X, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products, categories, brands } from "@/lib/data";
import { useI18n } from "@/context/i18n-context";

const SORT_OPTIONS_KEYS = ["featured", "price-asc", "price-desc", "rating", "newest"] as const;

function ProductsContent() {
  const { t, lang } = useI18n();
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") ?? "All";
  const urlFilter = searchParams.get("filter");
  const urlSearch = searchParams.get("search") ?? "";

  const [category, setCategory] = useState<string>(urlCategory);
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState(urlSearch);
  const [showFilters, setShowFilters] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(300);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => { setCategory(urlCategory); }, [urlCategory]);
  useEffect(() => { setSearch(urlSearch); }, [urlSearch]);

  const CATEGORIES_ALL = ["All", ...categories.map((c) => c.id)];
  const BRANDS_ALL = ["All", ...brands.map((b) => b.name)];

  const sortOptions = [
    { label: t("products.sortFeatured"), value: "featured" },
    { label: t("products.sortPriceLow"), value: "price-asc" },
    { label: t("products.sortPriceHigh"), value: "price-desc" },
    { label: t("products.sortRating"), value: "rating" },
    { label: t("products.sortNewest"), value: "newest" },
  ];

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (urlFilter === "new") list = list.filter((p) => p.isNew);
    if (urlFilter === "bestsellers") list = list.filter((p) => p.isBestSeller);
    if (selectedBrand !== "All") list = list.filter((p) => p.brand === selectedBrand);
    if (search) list = list.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );
    if (inStockOnly) list = list.filter((p) => p.availability === "In stock");
    list = list.filter((p) => p.price >= priceMin && p.price <= priceMax);

    switch (sort) {
      case "price-asc": return list.sort((a, b) => a.price - b.price);
      case "price-desc": return list.sort((a, b) => b.price - a.price);
      case "rating": return list.sort((a, b) => b.rating - a.rating);
      case "newest": return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default: return list;
    }
  }, [category, urlFilter, search, sort, priceMin, priceMax, selectedBrand, inStockOnly]);

  const pageTitle = urlFilter === "new"
    ? (lang === "ar" ? "وصل حديثاً" : "New Arrivals")
    : urlFilter === "bestsellers"
    ? (lang === "ar" ? "الأكثر مبيعاً" : "Best Sellers")
    : t("products.title");

  const resetFilters = () => {
    setCategory("All");
    setSearch("");
    setPriceMin(0);
    setPriceMax(300);
    setSelectedBrand("All");
    setInStockOnly(false);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-site py-10">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-900 transition-colors">{lang === "ar" ? "الرئيسية" : "Home"}</Link>
            <span>/</span>
            <span className="text-gray-700">{pageTitle}</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-gray-500 mt-1.5">
                {filtered.length} {t("products.products")}
                {category !== "All" ? ` ${lang === "ar" ? "في" : "in"} ${category}` : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("products.search")}
              className="w-full ps-11 pe-10 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#F5C400] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none ps-4 pe-10 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm focus:outline-none focus:border-[#F5C400] transition-colors cursor-pointer min-w-[180px]"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors sm:hidden ${
              showFilters
                ? "border-[#F5C400] bg-[#FFF9D0] text-gray-900"
                : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t("products.filters")}
          </button>
        </div>

        <div className="flex gap-8 items-start">
          {/* Sidebar Filters (desktop) */}
          <aside className="hidden sm:block w-56 flex-shrink-0 sticky top-24 space-y-6">
            {/* Category */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                {t("products.category")}
              </p>
              <ul className="space-y-1">
                {CATEGORIES_ALL.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setCategory(cat)}
                      className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                        category === cat
                          ? "bg-[#F5C400] text-gray-900 font-semibold"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {cat === "All" ? (lang === "ar" ? "الكل" : "All") : cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                {t("products.brand")}
              </p>
              <ul className="space-y-1">
                {BRANDS_ALL.map((b) => (
                  <li key={b}>
                    <button
                      onClick={() => setSelectedBrand(b)}
                      className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedBrand === b
                          ? "bg-[#F5C400] text-gray-900 font-semibold"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {b === "All" ? (lang === "ar" ? "الكل" : "All") : b}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                {t("products.priceRange")}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>${priceMin}</span>
                <span>—</span>
                <span>${priceMax}</span>
              </div>
              <input
                type="range"
                min={0}
                max={300}
                step={10}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#F5C400]"
              />
            </div>

            {/* In stock */}
            <div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#F5C400]"
                />
                <span className="text-sm text-gray-600">{t("products.inStockOnly")}</span>
              </label>
            </div>

            {/* Reset */}
            <button
              onClick={resetFilters}
              className="text-sm text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
            >
              {t("products.clearFilters")}
            </button>
          </aside>

          {/* Mobile filter panel */}
          {showFilters && (
            <div className="sm:hidden absolute inset-x-4 mt-1 z-30 bg-white border border-gray-200 rounded-2xl shadow-card-hover p-5 space-y-5">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES_ALL.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      category === cat
                        ? "bg-[#F5C400] border-[#F5C400] text-gray-900"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {cat === "All" ? "All" : cat}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="w-4 h-4 accent-[#F5C400]" />
                <span className="text-sm text-gray-600">{t("products.inStockOnly")}</span>
              </label>
              <button onClick={resetFilters} className="text-sm text-gray-400 underline">{t("products.clearFilters")}</button>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1 min-w-0 relative">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-5xl mb-4" aria-hidden="true">🔍</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("products.noResults")}</h2>
                <p className="text-gray-500 mb-6">{t("products.noResultsSub")}</p>
                <button
                  onClick={resetFilters}
                  className="btn-yellow px-6 py-3 rounded-xl text-sm"
                >
                  {t("products.clearFilters")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#F5C400] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
