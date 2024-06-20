import { httpClient } from "./httpClient";

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

type SignUpResponse = void;

export async function signUp({
  name,
  email,
  password
}: SignUpRequest): Promise<SignUpResponse> {
  await httpClient.post("users", {
    json: {
      name,
      email,
      password
    }
  });
}
