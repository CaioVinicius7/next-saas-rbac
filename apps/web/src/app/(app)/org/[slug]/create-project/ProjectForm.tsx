"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "@/hooks/useFormState";
import { queryClient } from "@/lib/reactQuery";

import { createProjectAction } from "./actions";

export function ProjectForm() {
  const { slug: orgSlug } = useParams<{
    slug: string;
  }>();

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createProjectAction,
    () => queryClient.invalidateQueries({ queryKey: [orgSlug, "projects"] })
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />

          <AlertTitle>Sign project failed!</AlertTitle>

          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />

          <AlertTitle>Success!</AlertTitle>

          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Project name</Label>
        <Input id="name" name="name" autoComplete="off" />

        {errors?.name && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" autoComplete="off" />

        {errors?.description && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Save project"
        )}
      </Button>
    </form>
  );
}
