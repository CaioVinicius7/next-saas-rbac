import { Role } from "@saas/auth";

import { httpClient } from "./httpClient";

interface GetMembersResponse {
  members: {
    id: string;
    userId: string;
    role: Role;
    name: string | null;
    email: string;
    avatarUrl: string | null;
  }[];
}

export async function getMembers(org: string) {
  const result = await httpClient
    .get(`organizations/${org}/members`)
    .json<GetMembersResponse>();

  return result;
}
