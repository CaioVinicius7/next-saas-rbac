import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getProfile } from "@/http/getProfile";

export function isAuthenticated() {
  return !!cookies().get("@saas-next:auth-token")?.value;
}

export async function auth() {
  const token = cookies().get("@saas-next:auth-token")?.value;

  if (!token) {
    redirect("/auth/sign-in");
  }

  try {
    const { user } = await getProfile();

    return {
      user
    };
  } catch {}

  redirect("/api/auth/sign-out");
}
