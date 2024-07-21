import { httpClient } from "./httpClient";

interface CreateOrganizationRequest {
  name: string;
  domain: string | null;
  shouldAttachUsersByDomain: boolean;
}

type CreateOrganizationResponse = void;

export async function createOrganization({
  name,
  domain,
  shouldAttachUsersByDomain
}: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
  await httpClient.post("organizations", {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain
    }
  });
}
