import Image from "next/image";

import logo from "@/assets/logo.svg";

import { ProfileButton } from "./ProfileButton";

export function Header() {
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="logo" className="size-6 dark:invert" />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  );
}
