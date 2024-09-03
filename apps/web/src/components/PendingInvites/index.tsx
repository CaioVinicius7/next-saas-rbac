"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Check, RefreshCcw, UserPlus2, X } from "lucide-react";
import { useState } from "react";

import { getPendingInvites } from "@/http/getPendingInvites";
import { queryClient } from "@/lib/reactQuery";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { acceptInviteAction, rejectInviteAction } from "./actions";

dayjs.extend(relativeTime);

export function PendingInvites() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["pending-invites"],
    queryFn: getPendingInvites,
    enabled: isOpen
  });

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId);

    queryClient.invalidateQueries({ queryKey: ["pending-invites"] });
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId);

    queryClient.invalidateQueries({ queryKey: ["pending-invites"] });
  }

  const withoutInvites = data?.invites.length === 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 space-y-2">
        <div className="flex items-center justify-between">
          <span className="block text-sm">
            Pending invites ({data?.invites.length ?? 0})
          </span>

          <Button variant="ghost" onClick={() => refetch()}>
            <RefreshCcw className="size-4" />
          </Button>
        </div>

        <Separator orientation="horizontal" />

        {withoutInvites && (
          <p className="text-sm text-muted-foreground">No invites found.</p>
        )}

        {!withoutInvites &&
          data?.invites.map((invite) => (
            <div key={invite.id} className="space-y-2">
              <div className="space-y-2">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {invite.author?.name ?? "Someone"}
                  </span>{" "}
                  invited you to join{" "}
                  <span className="font-medium text-foreground">
                    {invite.organization.name}
                  </span>{" "}
                  <span>{dayjs(invite.createdAt).fromNow()}</span>
                </p>

                <div className="flex gap-1">
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => handleAcceptInvite(invite.id)}
                  >
                    <Check className="mr-1.5 size-3" />
                    Accept
                  </Button>

                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => handleRejectInvite(invite.id)}
                    className="text-muted-foreground"
                  >
                    <X className="mr-1.5 size-3" />
                    Revoke
                  </Button>
                </div>
              </div>

              <Separator orientation="horizontal" className="last:hidden" />
            </div>
          ))}
      </PopoverContent>
    </Popover>
  );
}
