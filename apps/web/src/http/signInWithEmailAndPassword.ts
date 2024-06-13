import { httpClient } from "./httpClient";

interface SignInWithEmailAndPasswordRequest {
  email: string;
  password: string;
}

interface SignInWithEmailAndPasswordResponse {
  token: string;
}

export async function signInWithEmailAndPassword({
  email,
  password
}: SignInWithEmailAndPasswordRequest) {
  const result = await httpClient
    .post("sessions/password", {
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .json<SignInWithEmailAndPasswordResponse>();

  return result;
}
