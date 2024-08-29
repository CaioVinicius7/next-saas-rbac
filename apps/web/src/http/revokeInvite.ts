import { httpClient } from "./httpClient";

interface RevokeInviteRequest {
  org: string;
  inviteId: string;
}

export async function revokeInvite({ org, inviteId }: RevokeInviteRequest) {
  await httpClient.delete(`organizations/${org}/invites/${inviteId}`);
}
