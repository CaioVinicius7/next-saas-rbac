"use server";

import { HTTPError } from "ky";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z.string().min(4, "Please, include at least 4 characters."),
  description: z.string()
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
    console.log({
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
