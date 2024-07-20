import { Slash } from "lucide-react";
import Image from "next/image";

import logo from "@/assets/logo.svg";
import { ability } from "@/auth/auth";

import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { ProfileButton } from "./ProfileButton";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Separator } from "./ui/separator";

export async function Header() {
  const permissions = await ability();

  console.log(permissions?.can("get", "Project"));

  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="logo" className="size-6 dark:invert" />

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />

        {permissions?.can("get", "Project") && <p>Projects</p>}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </header>
  );
}
