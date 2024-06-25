import type { Role } from "@saas/auth";

import { httpClient } from "./httpClient";

interface GetMembershipResponse {
  membership: {
    id: string;
    role: Role;
    userId: string;
    organizationId: string;
  };
}

export async function getMembership(org: string) {
  const result = await httpClient
    .get(`organizations/${org}/membership`)
    .json<GetMembershipResponse>();

  return result;
}
