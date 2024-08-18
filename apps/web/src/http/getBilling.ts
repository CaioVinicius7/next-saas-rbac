import { httpClient } from "./httpClient";

interface GetBillingResponse {
  billing: {
    seats: {
      amount: number;
      unit: number;
      price: number;
    };
    projects: {
      amount: number;
      unit: number;
      price: number;
    };
    total: number;
  };
}

export async function getBilling(org: string) {
  const result = await httpClient
    .get(`organizations/${org}/billing`)
    .json<GetBillingResponse>();

  return result;
}
