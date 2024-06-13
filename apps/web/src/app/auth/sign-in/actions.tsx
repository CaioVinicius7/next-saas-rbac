"use server";

import { signInWithEmailAndPassword as signInWithEmailAndPasswordFn } from "@/http/signInWithEmailAndPassword";

export async function signInWithEmailAndPassword(
  previousState: unknown,
  data: FormData
) {
  console.log(previousState);

  const { email, password } = Object.fromEntries(data);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const result = await signInWithEmailAndPasswordFn({
    email: String(email),
    password: String(password)
  });

  console.log(result);

  return "Success!";
}
