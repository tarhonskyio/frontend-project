"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MonthYearSelector from "./components/calendar/MonthYearSelector";
import DayTaskManager from "./components/calendar/DayTaskManager";
import { useTasks } from "./components/useTasks";
import { useLang } from "./i18n/LanguageProvider";
import { useAuth } from "./components/AuthProvider";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(null);

  const { tasks } = useTasks();
  const { t } = useLang();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (!user) return null;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
        📅 {t("calendarTitle")}
      </h1>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <MonthYearSelector
          year={year}
          month={month}
          onYearChange={setYear}
          onMonthChange={(m) => {
            setMonth(m);
            setDay(null);
          }}
        />

        <div className="grid grid-cols-7 gap-2 mt-4">
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const dateKey = `${year}-${month + 1}-${d}`;
            const count = tasks[dateKey]?.length || 0;

            return (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={`relative border rounded-lg p-2 text-sm font-medium transition
                  ${
                    day === d
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-100 hover:bg-emerald-200"
                  }`}
              >
                {d}
                {count > 0 && (
                  <span className="absolute top-1 right-1 text-xs bg-emerald-700 text-white rounded-full px-1.5">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <DayTaskManager year={year} month={month} day={day} />
      </div>
    </div>
  );
}
