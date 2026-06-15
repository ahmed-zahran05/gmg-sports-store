"use client";

import Link from "next/link";
import { useState } from "react";
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, Edit2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useI18n } from "@/context/i18n-context";
import { useWishlistStore } from "@/stores/wishlistStore";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

type Tab = "profile" | "orders" | "wishlist" | "addresses" | "settings";

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const { t, lang, setLang } = useI18n();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profileSaved, setProfileSaved] = useState(false);
  const [profile, setProfile] = useState({
    firstName: user?.user_metadata?.first_name ?? "",
    lastName: user?.user_metadata?.last_name ?? "",
    email: user?.email ?? "",
    phone: "",
  });

  const wishlistIds = useWishlistStore((s) => s.productIds);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  if (!user) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <User className="w-8 h-8 text-gray-400" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">{t("account.loginRequired")}</h1>
          <p className="text-gray-500 mb-6">{t("account.loginRequired")}</p>
          <Link href="/auth/login" className="btn-yellow px-8 py-3.5 rounded-xl inline-block">
            {t("account.loginBtn")}
          </Link>
        </div>
      </main>
    );
  }

  const displayName =
    user.user_metadata?.first_name
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name ?? ""}`.trim()
      : user.email?.split("@")[0] ?? "User";

  const memberSince = new Date(user.created_at ?? Date.now()).toLocaleDateString(
    lang === "ar" ? "ar-SA" : "en-US",
    { year: "numeric", month: "long" }
  );

  const navItems: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "profile", label: t("account.profile"), icon: User },
    { id: "orders", label: t("account.orders"), icon: ShoppingBag },
    { id: "wishlist", label: t("account.wishlist"), icon: Heart },
    { id: "addresses", label: t("account.addresses"), icon: MapPin },
    { id: "settings", label: t("account.settings"), icon: Settings },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-site py-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF9D0] flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-black text-[#D4A900]">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t("account.greeting")}
              </p>
              <h1 className="text-2xl font-black text-gray-900">{displayName}</h1>
              <p className="text-sm text-gray-400">
                {t("account.memberSince")} {memberSince}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="flex gap-8 items-start">
          {/* Sidebar nav */}
          <aside className="w-56 flex-shrink-0 hidden sm:block">
            <nav className="bg-white rounded-2xl shadow-card overflow-hidden">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors border-s-2 ${
                      activeTab === item.id
                        ? "border-[#F5C400] bg-[#FFF9D0] text-gray-900"
                        : "border-transparent text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {item.label}
                    {item.id === "wishlist" && wishlistIds.length > 0 && (
                      <span className="ms-auto text-xs font-bold bg-[#F5C400] text-gray-900 px-1.5 py-0.5 rounded-full">
                        {wishlistIds.length}
                      </span>
                    )}
                  </button>
                );
              })}
              <div className="border-t border-gray-100">
                <button
                  onClick={signOut}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  {t("account.signOut")}
                </button>
              </div>
            </nav>
          </aside>

          {/* Mobile nav pills */}
          <div className="sm:hidden w-full mb-4 flex gap-2 overflow-x-auto pb-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                    activeTab === item.id
                      ? "bg-[#F5C400] text-gray-900"
                      : "bg-white border border-gray-200 text-gray-600"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Profile */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-gray-900">{t("account.profile")}</h2>
                </div>

                {profileSaved && (
                  <div className="mb-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
                    ✓ {t("account.profileUpdated")}
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                        {t("account.firstName")}
                      </label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                        className="input-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                        {t("account.lastName")}
                      </label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                        className="input-base"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      {t("account.email")}
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="input-base bg-gray-50 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      {t("account.phone")}
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000"
                      className="input-base"
                    />
                  </div>
                  <button type="submit" className="btn-yellow px-6 py-3 rounded-xl text-sm">
                    {t("account.saveChanges")}
                  </button>
                </form>
              </div>
            )}

            {/* Orders */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
                <h2 className="text-xl font-black text-gray-900 mb-6">{t("account.orders")}</h2>
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-gray-300" aria-hidden="true" />
                  </div>
                  <p className="font-bold text-gray-900 mb-1">{t("account.noOrders")}</p>
                  <p className="text-gray-500 text-sm mb-5">{t("account.noOrdersSub")}</p>
                  <Link href="/products" className="btn-yellow px-6 py-3 rounded-xl text-sm inline-block">
                    {t("account.startShopping")}
                  </Link>
                </div>
              </div>
            )}

            {/* Wishlist */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
                <h2 className="text-xl font-black text-gray-900 mb-6">
                  {t("account.wishlist")}
                  {wishlistIds.length > 0 && (
                    <span className="ms-2 text-sm font-bold text-[#D4A900] bg-[#FFF9D0] px-2.5 py-0.5 rounded-full">
                      {wishlistIds.length}
                    </span>
                  )}
                </h2>
                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-gray-300" aria-hidden="true" />
                    </div>
                    <p className="font-bold text-gray-900 mb-1">{t("wishlist.empty")}</p>
                    <p className="text-gray-500 text-sm mb-5">{t("wishlist.emptySub")}</p>
                    <Link href="/products" className="btn-yellow px-6 py-3 rounded-xl text-sm inline-block">
                      {t("wishlist.explore")}
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {wishlistProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-gray-900">{t("account.addresses")}</h2>
                  <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-xl px-4 py-2 transition-colors">
                    <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
                    {t("account.addAddress")}
                  </button>
                </div>
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-300" aria-hidden="true" />
                  </div>
                  <p className="font-bold text-gray-900 mb-1">{t("account.noAddresses")}</p>
                  <p className="text-gray-500 text-sm">
                    {lang === "ar" ? "أضف عنوانك الأول لتسهيل الدفع" : "Add your first address for faster checkout"}
                  </p>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-black text-gray-900">{t("account.settings")}</h2>

                {/* Language */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t("account.language")}</p>
                    <p className="text-xs text-gray-400">
                      {lang === "en" ? "Currently: English" : "الحالية: العربية"}
                    </p>
                  </div>
                  <button
                    onClick={() => setLang(lang === "en" ? "ar" : "en")}
                    className="px-4 py-2 rounded-xl border border-gray-200 hover:border-gray-400 text-sm font-semibold text-gray-700 transition-colors"
                  >
                    {lang === "en" ? "العربية" : "English"}
                  </button>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t("account.notifications")}</p>
                    <p className="text-xs text-gray-400">
                      {lang === "ar" ? "تلقي تحديثات الطلبات والعروض" : "Receive order updates and offers"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#F5C400] transition-colors" />
                    <div className="absolute start-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5" />
                  </label>
                </div>

                {/* Change password */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">{t("account.passwordChange")}</h3>
                  <div className="space-y-3">
                    <input type="password" placeholder={t("account.currentPassword")} className="input-base" />
                    <input type="password" placeholder={t("account.newPassword")} className="input-base" />
                    <input type="password" placeholder={t("account.confirmPassword")} className="input-base" />
                    <button className="btn-yellow px-6 py-3 rounded-xl text-sm">
                      {t("account.updatePassword")}
                    </button>
                  </div>
                </div>

                {/* Sign out */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    {t("account.signOut")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
