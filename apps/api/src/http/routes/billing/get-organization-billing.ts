import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";

import { UnauthorizedError } from "../_errors/unauthorized-error";

const MEMBER_UNIT_PRICE = 20;
const PROJECT_UNIT_PRICE = 20;

export async function getOrganizationBilling(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      "/organizations/:slug/billing",
      {
        schema: {
          tags: ["billing"],
          summary: "Get billing information from organization",
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string()
          }),
          response: {
            200: z.object({
              billing: z.object({
                seats: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number()
                }),
                projects: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number()
                }),
                total: z.number()
              })
            })
          }
        }
      },
      async (request, reply) => {
        const { slug } = request.params;

        const userId = await request.getCurrentUserId();
        const { organization, membership } =
          await request.getUserMembership(slug);

        const { cannot } = getUserPermissions(userId, membership.role);

        if (cannot("get", "Billing")) {
          throw new UnauthorizedError(
            `You're not allowed to get billing details from this organization.`
          );
        }

        const [amountOfMembers, amountOfProjects] = await Promise.all([
          prisma.member.count({
            where: {
              organizationId: organization.id,
              role: {
                not: "BILLING"
              }
            }
          }),
          prisma.project.count({
            where: {
              organizationId: organization.id
            }
          })
        ]);

        const billing = {
          seats: {
            amount: amountOfMembers,
            unit: MEMBER_UNIT_PRICE,
            price: amountOfMembers * MEMBER_UNIT_PRICE
          },
          projects: {
            amount: amountOfProjects,
            unit: PROJECT_UNIT_PRICE,
            price: amountOfProjects * PROJECT_UNIT_PRICE
          },
          total:
            amountOfMembers * MEMBER_UNIT_PRICE +
            amountOfProjects * PROJECT_UNIT_PRICE
        };

        return reply.status(200).send({
          billing
        });
      }
    );
}
