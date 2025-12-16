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

  const prevMonth = () => {
    if (month === 0) {
      onMonthChange(11);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      onMonthChange(0);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {/* LEFT ARROW */}
      <button
        onClick={prevMonth}
        className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200
                   text-emerald-700 font-bold transition"
        aria-label="Previous month"
      >
        ‹
      </button>

      {/* MONTH SELECT */}
      <select
        value={month}
        onChange={(e) => onMonthChange(Number(e.target.value))}
        className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800
                   border border-emerald-300 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {months.map((m, i) => (
          <option key={i} value={i}>
            {m}
          </option>
        ))}
      </select>

      {/* YEAR SELECT */}
      <select
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800
                   border border-emerald-300 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {Array.from({ length: 11 }, (_, i) => year - 5 + i).map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* RIGHT ARROW */}
      <button
        onClick={nextMonth}
        className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200
                   text-emerald-700 font-bold transition"
        aria-label="Next month"
      >
        ›
      </button>
    </div>
  );
}
