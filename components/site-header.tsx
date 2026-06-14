"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useAuth } from "@/context/auth-context";

const navLinks = [
  {
    label: "Shop",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Running", href: "/products?category=Running" },
      { label: "Training", href: "/products?category=Training" },
      { label: "Essentials", href: "/products?category=Essentials" },
      { label: "New Arrivals", href: "/products?filter=new" },
      { label: "Best Sellers", href: "/products?filter=bestsellers" },
    ],
  },
  { label: "Running", href: "/products?category=Running" },
  { label: "Training", href: "/products?category=Training" },
  { label: "Essentials", href: "/products?category=Essentials" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const cartItems = useCartStore((s) => s.items);
  const wishlistIds = useWishlistStore((s) => s.productIds);
  const { user, signOut } = useAuth();

  const cartCount = cartItems.reduce((n, i) => n + i.quantity, 0);
  const wishlistCount = wishlistIds.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.5)] border-b border-gmg-gold-600/20"
            : "bg-black/80 backdrop-blur-md border-b border-white/5"
        }`}
      >
        {/* Top announcement bar */}
        <div className="bg-gmg-gold-500 text-gmg-black-900 text-center text-xs font-semibold tracking-widest py-2 px-4">
          FREE SHIPPING ON ORDERS OVER $75 &nbsp;·&nbsp; USE CODE <span className="underline">GMG10</span> FOR 10% OFF
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/gmg-logo.png"
                alt="GMG Sports"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-200"
                priority
              />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-widest text-white hidden sm:block">
              GMG <span className="text-gmg-gold-500">SPORTS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setShopDropdown(true)}
                  onMouseLeave={() => setShopDropdown(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white/80 hover:text-gmg-gold-400 transition-colors rounded-lg hover:bg-white/5">
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${shopDropdown ? "rotate-180" : ""}`} />
                  </button>
                  {shopDropdown && (
                    <div className="absolute top-full left-0 pt-2 w-52 z-50">
                      <div className="bg-gmg-black-800 border border-gmg-gold-600/30 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center px-5 py-3 text-sm text-white/80 hover:text-gmg-gold-400 hover:bg-gmg-gold-500/10 transition-colors font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-gmg-gold-400 transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="p-2 rounded-lg text-white/70 hover:text-gmg-gold-400 hover:bg-white/5 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist (${wishlistCount})`}
              className="relative p-2 rounded-lg text-white/70 hover:text-gmg-gold-400 hover:bg-white/5 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-gmg-gold-500 text-gmg-black-900 text-[10px] font-bold rounded-full">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label={`Cart (${cartCount})`}
              className="relative p-2 rounded-lg text-white/70 hover:text-gmg-gold-400 hover:bg-white/5 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-gmg-gold-500 text-gmg-black-900 text-[10px] font-bold rounded-full">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Auth Links */}
            <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-gmg-gold-400 transition-colors px-2 py-1"
                  >
                    <User className="w-4 h-4" />
                    {user.user_metadata?.first_name ?? user.email?.split("@")[0]}
                  </Link>
                  <button
                    onClick={signOut}
                    className="text-sm font-bold border border-gmg-gold-600/30 text-gmg-gold-500 px-4 py-2 rounded-full hover:bg-gmg-gold-500/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm font-semibold text-white/70 hover:text-gmg-gold-400 transition-colors px-2 py-1"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-sm font-bold bg-gmg-gold-500 text-gmg-black-900 px-4 py-2 rounded-full hover:bg-gmg-gold-400 transition-colors"
                  >
                    Join
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-gmg-gold-400 hover:bg-white/5 transition-colors ml-1"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar (expandable) */}
        {searchOpen && (
          <div className="border-t border-white/5 bg-black/95 px-4 py-3 sm:px-6">
            <div className="mx-auto max-w-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const val = (e.currentTarget.elements.namedItem("q") as HTMLInputElement)?.value;
                  if (val) window.location.href = `/products?search=${encodeURIComponent(val)}`;
                  setSearchOpen(false);
                }}
                className="flex items-center gap-3 bg-gmg-black-800 border border-gmg-gold-600/30 rounded-xl px-4 py-3"
              >
                <Search className="w-4 h-4 text-gmg-gold-500 flex-shrink-0" />
                <input
                  name="q"
                  autoFocus
                  placeholder="Search for products, categories..."
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-white/40 focus:outline-none"
                />
                <button type="submit" className="text-xs font-bold text-gmg-gold-500 uppercase tracking-wider">
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-gmg-black-900 border-l border-gmg-gold-600/20 flex flex-col overflow-y-auto">
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gmg-gold-600/20">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" />
                </div>
                <span className="font-black tracking-widest text-white">GMG <span className="text-gmg-gold-500">SPORTS</span></span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-6 py-6 space-y-1">
              <p className="text-xs uppercase tracking-widest text-gmg-gold-600 font-bold mb-4">Navigation</p>
              {[
                { label: "All Products", href: "/products" },
                { label: "Running", href: "/products?category=Running" },
                { label: "Training", href: "/products?category=Training" },
                { label: "Essentials", href: "/products?category=Essentials" },
                { label: "New Arrivals", href: "/products?filter=new" },
                { label: "Best Sellers", href: "/products?filter=bestsellers" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-white/80 hover:text-gmg-gold-400 hover:bg-gmg-gold-500/10 font-semibold transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-gmg-gold-600/20 space-y-1">
                <p className="text-xs uppercase tracking-widest text-gmg-gold-600 font-bold mb-4">Account</p>
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-4 py-3.5 rounded-xl text-white/80 hover:text-gmg-gold-400 hover:bg-gmg-gold-500/10 font-semibold transition-colors text-sm">
                  <span className="flex items-center gap-3"><Heart className="w-4 h-4" /> Wishlist</span>
                  {wishlistCount > 0 && <span className="bg-gmg-gold-500 text-gmg-black-900 text-xs font-bold px-2 py-0.5 rounded-full">{wishlistCount}</span>}
                </Link>
                <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-4 py-3.5 rounded-xl text-white/80 hover:text-gmg-gold-400 hover:bg-gmg-gold-500/10 font-semibold transition-colors text-sm">
                  <span className="flex items-center gap-3"><ShoppingBag className="w-4 h-4" /> Cart</span>
                  {cartCount > 0 && <span className="bg-gmg-gold-500 text-gmg-black-900 text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
                </Link>
              </div>
            </nav>

            {/* Bottom auth */}
            <div className="px-6 py-6 border-t border-gmg-gold-600/20 space-y-3">
              {user ? (
                <>
                  <p className="text-xs text-white/30 text-center truncate">{user.email}</p>
                  <button
                    onClick={signOut}
                    className="flex items-center justify-center w-full py-3 rounded-full border-2 border-gmg-gold-500 text-gmg-gold-400 font-bold text-sm hover:bg-gmg-gold-500/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full py-3 rounded-full border-2 border-gmg-gold-500 text-gmg-gold-400 font-bold text-sm hover:bg-gmg-gold-500/10 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full py-3 rounded-full bg-gmg-gold-500 text-gmg-black-900 font-bold text-sm hover:bg-gmg-gold-400 transition-colors"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
