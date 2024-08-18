import { httpClient } from "./httpClient";

interface GetOrganizationsResponse {
  organizations: {
    id: string;
    name: string;
    slug: string;
    avatarUrl: string | null;
  }[];
}

export async function getOrganizations() {
  const result = await httpClient
    .get("organizations", {
      next: {
        tags: ["organizations"]
      }
    })
    .json<GetOrganizationsResponse>();

  return result;
}
