import { Role } from "@saas/auth";

import { httpClient } from "./httpClient";

interface CreateInviteRequest {
  org: string;
  email: string;
  role: Role;
}

type CreateInviteResponse = void;

export async function createInvite({
  org,
  email,
  role
}: CreateInviteRequest): Promise<CreateInviteResponse> {
  await httpClient.post(`organizations/${org}/invites`, {
    json: {
      email,
      role
    }
  });
}
