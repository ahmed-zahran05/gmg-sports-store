"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, Menu, X, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useAuth } from "@/context/auth-context";
import { useI18n } from "@/context/i18n-context";

export function SiteHeader() {
  const { t, lang, setLang, isRTL } = useI18n();
  const { user, signOut } = useAuth();
  const cartItems = useCartStore((s) => s.items);
  const wishlistIds = useWishlistStore((s) => s.productIds);
  const cartCount = cartItems.reduce((n, i) => n + i.quantity, 0);
  const wishlistCount = wishlistIds.length;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.men"), href: "/products?category=Training" },
    { label: t("nav.women"), href: "/products?category=Running" },
    { label: t("nav.accessories"), href: "/products?category=Essentials" },
    { label: t("nav.brands"), href: "/products" },
    { label: t("nav.sale"), href: "/products?filter=bestsellers" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchVal.trim())}`;
      setSearchOpen(false);
      setSearchVal("");
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.08)]" : "border-b border-gray-100"
        }`}
      >
        {/* Announcement bar */}
        <div className="bg-gray-900 text-white text-center text-xs font-medium py-2 px-4 tracking-wide">
          {lang === "ar"
            ? "شحن مجاني على الطلبات فوق 75$ · استخدم كود GMG10 للحصول على خصم 10%"
            : "FREE SHIPPING ON ORDERS OVER $75 · USE CODE GMG10 FOR 10% OFF"}
        </div>

        <div className="container-site">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={() => setMobileOpen(false)}>
              <div className="relative w-9 h-9 sm:w-10 sm:h-10">
                <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" priority />
              </div>
              <span className="font-black text-gray-900 tracking-tight text-lg hidden sm:block">
                GMG <span className="text-[#F5C400]">SPORTS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors ${
                    link.label === t("nav.sale") ? "text-red-600 hover:text-red-700" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label={t("nav.search")}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label={t("nav.wishlist")}
                className="relative p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#F5C400] text-gray-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label={t("nav.cart")}
                className="relative p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#F5C400] text-gray-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Language switcher */}
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-lg transition-colors"
                aria-label="Switch language"
              >
                <span>{lang === "en" ? "🇸🇦" : "🇬🇧"}</span>
                {t("nav.language")}
              </button>

              {/* Auth */}
              <div className="hidden sm:flex items-center gap-2 ms-1 ps-2 border-s border-gray-200">
                {user ? (
                  <div className="flex items-center gap-1">
                    <Link
                      href="/account"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      {user.user_metadata?.first_name ?? user.email?.split("@")[0]}
                    </Link>
                    <button
                      onClick={signOut}
                      className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {t("nav.signOut")}
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {t("nav.login")}
                    </Link>
                    <Link
                      href="/auth/register"
                      className="px-4 py-1.5 text-sm font-bold bg-[#F5C400] text-gray-900 rounded-lg hover:bg-[#D4A900] transition-colors"
                    >
                      {lang === "ar" ? "سجل" : "Join"}
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors ms-1"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  autoFocus
                  type="search"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder={t("nav.search")}
                  className="w-full ps-11 pe-24 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#F5C400] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute end-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#F5C400] text-gray-900 text-xs font-bold rounded-lg hover:bg-[#D4A900] transition-colors"
                >
                  {t("nav.searchBtn")}
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div
            className={`absolute top-0 bottom-0 w-80 max-w-[90vw] bg-white flex flex-col shadow-2xl ${
              isRTL ? "left-0" : "right-0"
            }`}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <Image src="/gmg-logo.png" alt="GMG Sports" fill className="object-contain" />
                </div>
                <span className="font-black text-gray-900">GMG <span className="text-[#F5C400]">SPORTS</span></span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 text-gray-500 hover:text-gray-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 py-4 space-y-0.5 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50 ${
                    link.label === t("nav.sale") ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-100 space-y-0.5">
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <span className="flex items-center gap-2"><Heart className="w-4 h-4" />{t("nav.wishlist")}</span>
                  {wishlistCount > 0 && <span className="text-xs font-bold bg-[#F5C400] text-gray-900 px-2 py-0.5 rounded-full">{wishlistCount}</span>}
                </Link>
                <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <span className="flex items-center gap-2"><ShoppingBag className="w-4 h-4" />{t("nav.cart")}</span>
                  {cartCount > 0 && <span className="text-xs font-bold bg-[#F5C400] text-gray-900 px-2 py-0.5 rounded-full">{cartCount}</span>}
                </Link>
                <button
                  onClick={() => { setLang(lang === "en" ? "ar" : "en"); setMobileOpen(false); }}
                  className="flex w-full items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span>{lang === "en" ? "🇸🇦" : "🇬🇧"}</span>
                  {t("nav.language")}
                </button>
              </div>
            </nav>

            {/* Auth footer */}
            <div className="px-4 py-4 border-t border-gray-100 space-y-2">
              {user ? (
                <>
                  <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <User className="w-4 h-4" />{user.user_metadata?.first_name ?? user.email?.split("@")[0]}
                  </Link>
                  <button onClick={signOut} className="w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 text-start">
                    {t("nav.signOut")}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    {t("nav.login")}
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full py-3 rounded-xl bg-[#F5C400] text-gray-900 text-sm font-bold hover:bg-[#D4A900] transition-colors">
                    {lang === "ar" ? "إنشاء حساب" : "Create Account"}
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
