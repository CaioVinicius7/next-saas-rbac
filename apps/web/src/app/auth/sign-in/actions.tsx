"use server";

import { signInWithEmailAndPassword as signInWithEmailAndPasswordFn } from "@/http/signInWithEmailAndPassword";

export async function signInWithEmailAndPassword(data: FormData) {
  const { email, password } = Object.fromEntries(data);

  const result = await signInWithEmailAndPasswordFn({
    email: String(email),
    password: String(password)
  });

  console.log(result);
}
