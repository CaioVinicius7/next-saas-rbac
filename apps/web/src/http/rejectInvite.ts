import { httpClient } from "./httpClient";

export async function rejectInvite(inviteId: string) {
  await httpClient.post(`invites/${inviteId}/reject`);
}
