import { roleSchema } from "@sass/auth";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { auth } from "@/http/middlewares/auth";
import { UnauthorizedError } from "@/http/routes/_errors/unauthorized-error";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";

import { BadRequestError } from "../_errors/bad-request-error";

export async function updateMember(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      "/organizations/:slug/members/:memberId",
      {
        schema: {
          tags: ["members"],
          summary: "Update a member",
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            memberId: z.string().uuid()
          }),
          body: z.object({
            role: roleSchema
          }),
          response: {
            204: z.null()
          },
          400: z.object({
            message: z.string()
          })
        }
      },
      async (request, reply) => {
        const { slug, memberId } = request.params;
        const userId = await request.getCurrentUserId();
        const { organization, membership } =
          await request.getUserMembership(slug);

        const { cannot } = getUserPermissions(userId, membership.role);

        if (cannot("update", "User")) {
          throw new UnauthorizedError(
            "You're not allowed to update this member."
          );
        }

        const { role } = request.body;

        if (memberId === membership.id) {
          throw new BadRequestError(
            "You're not allowed to update your role, please use the organization transfer."
          );
        }

        await prisma.member.update({
          where: {
            id: memberId,
            organizationId: organization.id
          },
          data: {
            role
          }
        });

        return reply.status(204).send();
      }
    );
}
