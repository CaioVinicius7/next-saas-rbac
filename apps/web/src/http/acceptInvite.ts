import { httpClient } from "./httpClient";

export async function acceptInvite(inviteId: string) {
  await httpClient.post(`invites/${inviteId}/accept`);
}
