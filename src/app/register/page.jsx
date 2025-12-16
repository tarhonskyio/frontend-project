"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useLang } from "../i18n/LanguageProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch {
      setError("Błąd rejestracji (hasło min. 6 znaków)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold text-emerald-700 mb-4 text-center">
          {t("register")}
        </h1>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder={t("email")}
          className="border rounded w-full p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder={t("password")}
          className="border rounded w-full p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded font-semibold hover:bg-emerald-700 transition"
        >
          {t("createAccount")}
        </button>

        <p className="text-sm text-center mt-4">
          {t("haveAccount")}{" "}
          <a href="/login" className="text-emerald-700 hover:underline">
            {t("signIn")}
          </a>
        </p>
      </form>
    </div>
  );
}
