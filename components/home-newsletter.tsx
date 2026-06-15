"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useI18n } from "@/context/i18n-context";

export function HomeNewsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section className="section-padding" style={{ background: "#FFFBEB" }}>
      <div className="container-site">
        <div className="max-w-2xl mx-auto text-center">
          {submitted ? (
            <div className="py-8">
              <div className="w-16 h-16 bg-[#F5C400] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl" aria-hidden="true">✓</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                {t("newsletter.success")}
              </h2>
              <p className="text-gray-500">{t("newsletter.successSub")}</p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 bg-[#F5C400] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Send className="w-6 h-6 text-gray-900" aria-hidden="true" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
                {t("newsletter.title")}
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {t("newsletter.subtitle")}
              </p>

              <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletter.placeholder")}
                  className="flex-1 input-base"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-yellow px-6 py-3 rounded-xl flex-shrink-0 disabled:opacity-70"
                >
                  {loading ? "..." : t("newsletter.subscribe")}
                </button>
              </form>

              <p className="text-xs text-gray-400 mt-4">{t("newsletter.disclaimer")}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
