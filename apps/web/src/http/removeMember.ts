import { httpClient } from "./httpClient";

interface RemoveMemberRequest {
  org: string;
  memberId: string;
}

type RemoveMemberResponse = void;

export async function removeMember({
  org,
  memberId
}: RemoveMemberRequest): Promise<RemoveMemberResponse> {
  await httpClient.delete(`organizations/${org}/members/${memberId}`);
}
