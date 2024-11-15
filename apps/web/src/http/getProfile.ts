import { httpClient } from "./httpClient";

interface GetProfileResponse {
  user: {
    id: string;
    name: string | null;
    email: string;
    avatarUrl: string | null;
  };
}

export async function getProfile() {
  const result = await httpClient.get("profile").json<GetProfileResponse>();

  return result;
}
