import { defineAbilityFor } from "@saas/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { cookiesKeys } from "@/config/cookiesKeys";
import { getMembership } from "@/http/getMembership";
import { getProfile } from "@/http/getProfile";

export function isAuthenticated() {
  return !!cookies().get(cookiesKeys.ACCESS_TOKEN)?.value;
}

export function getCurrentOrg() {
  return cookies().get(cookiesKeys.CURRENT_ORGANIZATION)?.value ?? null;
}

export async function getCurrentMembership() {
  const org = getCurrentOrg();

  if (!org) {
    return null;
  }

  const { membership } = await getMembership(org);

  return membership;
}

export async function ability() {
  const membership = await getCurrentMembership();

  if (!membership) {
    return null;
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role
  });

  return ability;
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
