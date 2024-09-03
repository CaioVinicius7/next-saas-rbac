import { httpClient } from "./httpClient";

interface GetProjectRequest {
  orgSlug: string;
  projectSlug: string;
}

interface GetProjectResponse {
  project: {
    id: string;
    name: string;
    slug: string;
    avatarUrl: string | null;
    organizationId: string;
    description: string;
    ownerId: string;
    createdAt: string;
    owner: {
      name: string | null;
      id: string;
      avatarUrl: string | null;
      email: string;
    };
  };
}

export async function getProject({ orgSlug, projectSlug }: GetProjectRequest) {
  const result = await httpClient
    .get(`organizations/${orgSlug}/projects/${projectSlug}`)
    .json<GetProjectResponse>();

  return result;
}
