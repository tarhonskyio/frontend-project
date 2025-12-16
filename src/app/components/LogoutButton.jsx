"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useLang } from "../i18n/LanguageProvider";

export default function LogoutButton() {
  const router = useRouter();
  const { t } = useLang();

  const logout = async () => {
    await signOut(auth);
    document.cookie = "user=; Max-Age=0; path=/";
    router.push("/login");
  };

  return (
    <button
      onClick={logout}
      className="text-red-600 hover:underline text-sm"
    >
      {t("logout")}
    </button>
  );
}
