import { getCurrentOrg } from "@/auth/auth";

import { NavLink } from "./NavLink";
import { Button } from "./ui/button";

export function Tabs() {
  const currentOrg = getCurrentOrg();

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
        >
          <NavLink href={`/org/${currentOrg}`}>Projects</NavLink>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
        >
          <NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
        >
          <NavLink href={`/org/${currentOrg}/settings`}>
            Settings & Billing
          </NavLink>
        </Button>
      </nav>
    </div>
  );
}
