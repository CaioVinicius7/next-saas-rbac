import { Role } from "@saas/auth";

import { httpClient } from "./httpClient";

interface UpdateMemberRequest {
  org: string;
  memberId: string;
  role: Role;
}

export async function updateMember({
  org,
  memberId,
  role
}: UpdateMemberRequest) {
  await httpClient.patch(`organizations/${org}/members/${memberId}`, {
    json: { role }
  });
}
