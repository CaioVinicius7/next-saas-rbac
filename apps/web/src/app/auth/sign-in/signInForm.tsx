"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

import gitHubIcon from "@/assets/github.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { signInWithEmailAndPassword } from "./actions";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithEmailAndPassword,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <h1>{state}</h1>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" autoComplete="off" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />

        <Link
          href="/auth/forgot-password"
          className="text-sm font-medium text-foreground"
        >
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" className="w-full">
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Sign in with e-mail"
        )}
      </Button>

      <Button
        type="submit"
        variant="link"
        size="sm"
        disabled={isPending}
        className="w-full"
        asChild
      >
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />

      <Button type="submit" variant="outline" className="w-full">
        <Image src={gitHubIcon} alt="" className="mr-2 size-4 dark:invert" />
        Sign in with GitHub
      </Button>
    </form>
  );
}
