import { cookies } from "next/headers";

export function isAuthenticated() {
  return !!cookies().get("@saas-next:auth-token")?.value;
}
