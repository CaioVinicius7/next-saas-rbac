"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import gitHubIcon from "@/assets/github.svg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useFormState } from "@/hooks/useFormState";

import { signInWithEmailAndPassword } from "./actions";

export function SignInForm() {
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />

          <AlertTitle>Sign in failed!</AlertTitle>

          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" autoComplete="off" />

        {errors?.email && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />

        {errors?.password && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}

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
