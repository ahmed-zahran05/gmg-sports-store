import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <form className="flex w-full max-w-xl items-center gap-3 rounded-2xl border-2 border-gmg-gold-600/30 bg-gmg-black-800 px-4 py-3 shadow-card sm:px-5 hover:border-gmg-gold-500/50 transition-all">
      <Search className="h-5 w-5 text-gmg-gold-600" />
      <input
        type="search"
        placeholder="Search premium gear and collections"
        className="w-full bg-transparent text-sm text-gmg-white-100 outline-none placeholder:text-gmg-white-400"
        aria-label="Search products"
      />
      <button type="submit" className="rounded-xl bg-gmg-gold-500 px-4 py-2 text-sm font-medium text-gmg-black-900 transition hover:bg-gmg-gold-400 hover:shadow-premium">
        Search
      </button>
    </form>
  );
}
