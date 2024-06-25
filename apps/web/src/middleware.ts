import { type NextRequest, NextResponse } from "next/server";

import { cookiesKeys } from "./config/cookiesKeys";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();

  if (pathname.startsWith("/org")) {
    const [, , slug] = pathname.split("/");

    response.cookies.set(cookiesKeys.CURRENT_ORGANIZATION, slug);
  } else {
    response.cookies.delete(cookiesKeys.CURRENT_ORGANIZATION);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
