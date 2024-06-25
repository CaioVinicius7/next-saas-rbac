import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { cookiesKeys } from "@/config/cookiesKeys";
import { getProfile } from "@/http/getProfile";

export function isAuthenticated() {
  return !!cookies().get(cookiesKeys.ACCESS_TOKEN)?.value;
}

export async function auth() {
  const token = cookies().get(cookiesKeys.ACCESS_TOKEN)?.value;

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
