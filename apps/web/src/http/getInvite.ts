import { Role } from "@saas/auth";

import { httpClient } from "./httpClient";

interface GetInviteResponse {
  invite: {
    id: string;
    role: Role;
    email: string;
    createdAt: string;
    organization: {
      name: string;
    };
    author: {
      id: string;
      name: string | null;
      avatarUrl: string | null;
    } | null;
  };
}

export async function getInvite(inviteId: string) {
  const result = await httpClient
    .get(`invites/${inviteId}`)
    .json<GetInviteResponse>();

  return result;
}
