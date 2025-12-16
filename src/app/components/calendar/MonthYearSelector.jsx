"use client";

import { useLang } from "../../i18n/LanguageProvider";

export default function MonthYearSelector({
  month,
  year,
  onMonthChange,
  onYearChange,
}) {
  const { t } = useLang();
  const months = t("months");

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {/* MIESIĄC */}
      <select
        value={month}
        onChange={(e) => onMonthChange(Number(e.target.value))}
        className="
          px-4 py-2 rounded-full
          bg-emerald-100 text-emerald-800
          border border-emerald-300
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-emerald-400
          transition
        "
      >
        {months.map((m, i) => (
          <option key={i} value={i}>
            {m}
          </option>
        ))}
      </select>

      {/* ROK */}
      <select
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="
          px-4 py-2 rounded-full
          bg-emerald-100 text-emerald-800
          border border-emerald-300
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-emerald-400
          transition
        "
      >
        {Array.from({ length: 101 }).map((_, i) => {
          const y = 2000 + i;
          return (
            <option key={y} value={y}>
              {y}
            </option>
          );
        })}
      </select>
    </div>
  );
}
