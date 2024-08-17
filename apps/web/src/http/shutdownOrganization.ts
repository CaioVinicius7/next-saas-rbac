import { httpClient } from "./httpClient";

interface ShutdownOrganizationRequest {
  org: string;
}

type ShutdownOrganizationResponse = void;

export async function shutdownOrganization({
  org
}: ShutdownOrganizationRequest): Promise<ShutdownOrganizationResponse> {
  await httpClient.delete(`organizations/${org}`);
}
