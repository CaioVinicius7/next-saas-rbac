import { organizationSchema } from "@saas/auth";
import { ArrowLeftRight, Crown, UserMinus } from "lucide-react";
import Image from "next/image";

import { ability, getCurrentOrg } from "@/auth/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getMembers } from "@/http/getMembers";
import { getMembership } from "@/http/getMembership";
import { getOrganization } from "@/http/getOrganization";

import { removeMemberAction } from "./actions";
import { UpdateMemberRoleSelect } from "./UpdateMemberRoleSelect";

export async function MembersList() {
  const currentOrg = getCurrentOrg();
  const permissions = await ability();

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership(currentOrg!),
    getMembers(currentOrg!),
    getOrganization(currentOrg!)
  ]);

  const authOrganization = organizationSchema.parse(organization);

  return (
    <div className="space-y-2">
      <h2 className="text-lg">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => {
              const memberIsOwnerOrMe =
                member.userId === membership.userId ||
                member.userId === organization.ownerId;

              return (
                <TableRow key={member.id}>
                  <TableCell
                    className="py-2.5"
                    style={{
                      width: 48
                    }}
                  >
                    <Avatar>
                      <AvatarFallback />

                      {!!member.avatarUrl && (
                        <Image
                          src={member.avatarUrl}
                          width={32}
                          height={32}
                          alt=""
                          className="aspect-square size-full"
                        />
                      )}
                    </Avatar>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-2 font-medium">
                        {member.name}
                        {member.userId === membership.userId && " (me)"}
                        {member.userId === organization.ownerId && (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Crown className="size-3" />
                            Owner
                          </span>
                        )}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {permissions?.can(
                        "transfer_ownership",
                        authOrganization
                      ) && (
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={memberIsOwnerOrMe}
                        >
                          <ArrowLeftRight className="mr-2 size-4" />
                          Transfer ownership
                        </Button>
                      )}

                      <UpdateMemberRoleSelect
                        memberId={member.id}
                        defaultValue={member.role}
                        disabled={
                          memberIsOwnerOrMe ||
                          permissions?.cannot("update", "User")
                        }
                      />

                      {permissions?.can("delete", "User") && (
                        <form action={removeMemberAction.bind(null, member.id)}>
                          <Button
                            disabled={memberIsOwnerOrMe}
                            type="submit"
                            variant="destructive"
                            size="sm"
                          >
                            <UserMinus className="mr-2 size-4" />
                            Remove
                          </Button>
                        </form>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
