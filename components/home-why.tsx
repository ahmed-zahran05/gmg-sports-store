"use client";

import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useI18n } from "@/context/i18n-context";

export function HomeWhy() {
  const { t } = useI18n();

  const perks = [
    {
      icon: Truck,
      title: t("why.delivery"),
      description: t("why.deliverySub"),
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: RotateCcw,
      title: t("why.returns"),
      description: t("why.returnsSub"),
      color: "bg-green-50 text-green-600",
    },
    {
      icon: ShieldCheck,
      title: t("why.authentic"),
      description: t("why.authenticSub"),
      color: "bg-[#FFF9D0] text-[#D4A900]",
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            {t("why.title")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t("why.subtitle")}</p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center sm:text-start"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto sm:mx-0 ${perk.color}`}
                >
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{perk.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
