"use server";

import { revalidateTag } from "next/cache";

import { acceptInvite } from "@/http/acceptInvite";
import { rejectInvite } from "@/http/rejectInvite";

export async function acceptInviteAction(inviteId: string) {
  await acceptInvite(inviteId);

  revalidateTag("organizations");
}

export async function rejectInviteAction(inviteId: string) {
  await rejectInvite(inviteId);
}
