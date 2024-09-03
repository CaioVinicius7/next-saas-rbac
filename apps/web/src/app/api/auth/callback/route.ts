import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { cookiesKeys } from "@/config/cookiesKeys";
import { acceptInvite } from "@/http/acceptInvite";
import { signInWithGithub } from "@/http/signInWithGithub";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      {
        message: "Github OAuth code was not found."
      },
      {
        status: 400
      }
    );
  }

  const { token } = await signInWithGithub({
    code
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

  const redirectUrl = request.nextUrl.clone();

  redirectUrl.pathname = "/";
  redirectUrl.search = "";

  return NextResponse.redirect(redirectUrl);
}
