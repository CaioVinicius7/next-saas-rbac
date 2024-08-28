import { ability } from "@/auth/auth";

import { Invites } from "./Invites";
import { MembersList } from "./MembersList";

export default async function Members() {
  const permissions = await ability();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Members</h2>

      <div className="space-y-4">
        {permissions?.can("get", "Invite") && <Invites />}
        {permissions?.can("get", "User") && <MembersList />}
      </div>
    </div>
  );
}
