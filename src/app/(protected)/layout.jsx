import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }) {
  const cookieStore = await cookies();   // ⬅️ ВАЖЛИВО
  const user = cookieStore.get("user");

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
