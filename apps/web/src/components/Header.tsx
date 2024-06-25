import { Slash } from "lucide-react";
import Image from "next/image";

import logo from "@/assets/logo.svg";

import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { ProfileButton } from "./ProfileButton";

export function Header() {
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="logo" className="size-6 dark:invert" />

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  );
}
