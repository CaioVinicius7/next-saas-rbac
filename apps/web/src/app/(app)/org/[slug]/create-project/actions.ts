"use server";

import { HTTPError } from "ky";
import { z } from "zod";

import { getCurrentOrg } from "@/auth/auth";
import { createProject } from "@/http/createProject";

const createProjectSchema = z.object({
  name: z.string().min(4, "Please, include at least 4 characters."),
  description: z.string().min(1, "Please, include a description.")
});

export async function createProjectAction(data: FormData) {
  const result = createProjectSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      success: false,
      message: null,
      errors
    };
  }

  const { name, description } = result.data;

  try {
    await createProject({
      org: getCurrentOrg()!,
      name,
      description
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json();

      return {
        success: false,
        message,
        errors: null
      };
    }

    console.error(error);

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null
    };
  }

  return {
    success: true,
    message: "Successfully saved the project.",
    errors: null
  };
}
