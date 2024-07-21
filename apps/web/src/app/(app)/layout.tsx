import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { isAuthenticated } from "@/auth/auth";

export default function AuthLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  if (!isAuthenticated()) {
    redirect("/auth/sign-in");
  }

  return <>{children}</>;
}
