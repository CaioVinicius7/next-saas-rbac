import { httpClient } from "./httpClient";

interface UpdateOrganizationRequest {
  org: string;
  name: string;
  domain: string | null;
  shouldAttachUsersByDomain: boolean;
}

type UpdateOrganizationResponse = void;

export async function updateOrganization({
  org,
  name,
  domain,
  shouldAttachUsersByDomain
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
  await httpClient.put(`organizations/${org}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain
    }
  });
}
