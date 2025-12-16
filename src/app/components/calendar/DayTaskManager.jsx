"use client";

import { useState } from "react";
import { useTasks } from "../useTasks";
import { useLang } from "../../i18n/LanguageProvider";

export default function DayTaskManager({ year, month, day }) {
  const { tasks, addTask, removeTask, editTask } = useTasks();
  const [text, setText] = useState("");
  const { t } = useLang();

  if (!day) {
    return (
      <p className="text-emerald-600 text-center mt-4 font-medium">
        {t("selectDay")}
      </p>
    );
  }

  const dateKey = `${year}-${month + 1}-${day}`;
  const dayTasks = tasks[dateKey] || [];

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-md p-6 border border-emerald-200">
      <h3 className="text-lg font-bold text-emerald-700 mb-4">
        {t("tasksFor")} {day}.{month + 1}.{year}
      </h3>

      {/* LISTA ZADAŃ */}
      <ul className="space-y-2 mb-4">
        {dayTasks.map((task, i) => (
          <li
            key={i}
            className="flex items-center gap-2 bg-emerald-50 rounded-xl px-3 py-2"
          >
            <input
              className="
                flex-1 bg-transparent
                border-b border-emerald-300
                focus:outline-none focus:border-emerald-600
                transition
              "
              defaultValue={task}
              onBlur={(e) =>
                editTask(dateKey, i, e.target.value)
              }
            />

            <button
              title="Usuń zadanie"
              className="
                text-red-500 font-bold
                hover:text-red-700
                transition
              "
              onClick={() => removeTask(dateKey, i)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* DODAWANIE ZADANIA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="
            flex-1 px-4 py-2
            rounded-full
            bg-emerald-50
            border border-emerald-300
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-400
            transition
          "
          placeholder={t("newTask")}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="
            px-6 py-2
            rounded-full
            bg-gradient-to-r from-emerald-500 to-teal-500
            text-white font-semibold
            shadow-md
            hover:from-emerald-600 hover:to-teal-600
            active:scale-95
            transition
            w-full sm:w-auto
        "
          onClick={() => {
            if (text.trim()) {
              addTask(dateKey, text);
              setText("");
            }
          }}
        >
          {t("add")}
        </button>
      </div>
    </div>
  );
}
