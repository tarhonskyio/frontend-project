"use client";

import "./globals.css";
import Link from "next/link";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import LogoutButton from "./components/LogoutButton";
import { useLang } from "./i18n/LanguageProvider";
import { LanguageProvider } from "./i18n/LanguageProvider";
import LanguageSwitcher from "./i18n/LanguageSwitcher";

function Header() {
  const { user, loading } = useAuth();
  const { t } = useLang();

  if (loading) return null;

  return (
    <header className="border-b p-4 flex justify-between items-center bg-white">
      <nav className="flex gap-4 font-medium">
        {user ? (
          <>
            <Link href="/">{t("home")}</Link>
            <Link href="/about">{t("about")}</Link>
          </>
        ) : (
          <>
            <Link href="/login">{t("login")}</Link>
            <Link href="/register">{t("register")}</Link>
          </>
        )}
      </nav>

      <div className="flex gap-4 items-center">
        <LanguageSwitcher />
        {user && <LogoutButton />}
      </div>
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <AuthProvider>
          <LanguageProvider>
            <Header />
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
