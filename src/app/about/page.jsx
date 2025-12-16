"use client";

import { useLang } from "../i18n/LanguageProvider";

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-lg p-8 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-emerald-200 flex items-center justify-center text-3xl font-bold text-emerald-700">
          OT
        </div>

        <h1 className="text-3xl font-bold text-emerald-700 mb-2">
          {t("aboutTitle")}
        </h1>

        <p className="text-gray-600 mb-6">
          {t("aboutSubtitle")}
        </p>

        <p className="text-gray-700 leading-relaxed mb-8">
          {t("aboutDescription")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Tech name="Next.js" />
          <Tech name="Firebase" />
          <Tech name="Firestore" />
          <Tech name="Tailwind" />
        </div>

        <a
          href="/"
          className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition"
        >
          {t("backToApp")}
        </a>
      </div>
    </div>
  );
}

function Tech({ name }) {
  return (
    <div className="border rounded-lg p-3 text-sm text-gray-600">
      {name}
    </div>
  );
}
