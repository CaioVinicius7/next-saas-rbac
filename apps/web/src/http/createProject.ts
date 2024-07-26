import { httpClient } from "./httpClient";

interface CreateProjectRequest {
  org: string;
  name: string;
  description: string;
}

type CreateProjectResponse = void;

export async function createProject({
  org,
  name,
  description
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  await httpClient.post(`organizations/${org}/projects`, {
    json: {
      name,
      description
    }
  });
}
