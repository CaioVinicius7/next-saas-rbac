import { httpClient } from "./httpClient";

interface SignInWithGithubRequest {
  code: string;
}

interface SignInWithGithubResponse {
  token: string;
}

export async function signInWithGithub({ code }: SignInWithGithubRequest) {
  const result = await httpClient
    .post("sessions/github", {
      body: JSON.stringify({
        code
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .json<SignInWithGithubResponse>();

  return result;
}
