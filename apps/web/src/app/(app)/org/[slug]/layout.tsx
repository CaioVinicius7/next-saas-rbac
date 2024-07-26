import type { ReactNode } from "react";

import { Header } from "@/components/Header";
import { Tabs } from "@/components/Tabs";

export default function OrgLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <div className="pt-6">
        <Header />
        <Tabs />
      </div>

      <main className="mx-auto w-full max-w-[1200px] py-4">{children}</main>
    </div>
  );
}
