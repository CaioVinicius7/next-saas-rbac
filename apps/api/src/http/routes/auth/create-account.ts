import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6)
        })
      }
    },
    (request, reply) => {
      const { name, email, password } = request.body;

      return reply.status(201).send({
        message: "User created!",
        data: {
          name,
          email,
          password
        }
      });
    }
  );
}
