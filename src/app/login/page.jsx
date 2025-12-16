"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";
import { useLang } from "../i18n/LanguageProvider";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const { t } = useLang();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!loading && user) {
    router.push("/");
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch {
      setError("Nieprawidłowy email lub hasło");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold text-emerald-700 mb-4 text-center">
          {t("login")}
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
          {t("signIn")}
        </button>

        <p className="text-sm text-center mt-4">
          {t("noAccount")}{" "}
          <a href="/register" className="text-emerald-700 hover:underline">
            {t("register")}
          </a>
        </p>
      </form>
    </div>
  );
}
