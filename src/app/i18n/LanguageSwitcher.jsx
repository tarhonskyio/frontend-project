"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";

const languages = {
  pl: "🇵🇱 PL",
  en: "🇬🇧 EN",
  fr: "🇫🇷 FR",
  ua: "🇺🇦 UA",
};

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          px-4 py-2 rounded-full
          bg-emerald-100 text-emerald-800
          border border-emerald-300
          shadow-sm
          hover:bg-emerald-200
          transition
        "
      >
        {languages[lang]}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
          {Object.entries(languages).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                changeLanguage(key);
                setOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2 text-sm
                hover:bg-emerald-100
                ${lang === key ? "bg-emerald-50 font-semibold" : ""}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
