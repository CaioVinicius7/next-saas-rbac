"use server";

import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { z } from "zod";

import { cookiesKeys } from "@/config/cookiesKeys";
import { acceptInvite } from "@/http/acceptInvite";
import { signInWithEmailAndPassword } from "@/http/signInWithEmailAndPassword";

const signInSchema = z.object({
  email: z.string().email("Please, provide a valid e-mail address."),
  password: z.string().min(1, "Please, provide your password.")
});

export async function signInWithEmailAndPasswordAction(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      success: false,
      message: null,
      errors
    };
  }

  const { email, password } = result.data;

  try {
    const { token } = await signInWithEmailAndPassword({
      email,
      password
    });

    cookies().set(cookiesKeys.ACCESS_TOKEN, token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    const inviteId = cookies().get("inviteId")?.value;

    if (inviteId) {
      try {
        await acceptInvite(inviteId);

        cookies().delete("inviteId");
      } catch {}
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json();

      return {
        success: false,
        message,
        errors: null
      };
    }

    console.error(error);

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null
    };
  }

  return {
    success: true,
    message: null,
    errors: null
  };
}
