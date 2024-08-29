import type { Role } from "@saas/auth";

import { httpClient } from "./httpClient";

interface GetInvitesResponse {
  invites: {
    id: string;
    role: Role;
    email: string;
    createdAt: string;
    author: {
      id: string;
      name: string | null;
    } | null;
  }[];
}

export async function getInvites(org: string) {
  const result = await httpClient
    .get(`organizations/${org}/invites`, {
      next: {
        tags: [`${org}/invites`]
      }
    })
    .json<GetInvitesResponse>();

  return result;
}
