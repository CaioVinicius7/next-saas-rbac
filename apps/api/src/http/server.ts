import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { env } from "@saas/env";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";

import { errorHandler } from "./error-handler";
import { routes } from "./routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Next.js SaaS",
      description: "Full-stack SaaS app with multi-tenant & RBAC.",
      version: "1.0.0"
    },
    servers: [],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "JWT obtained from authentication route."
        }
      }
    }
  },
  transform: jsonSchemaTransform
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
});

app.register(fastifyCors);

app.register(routes);

app
  .listen({
    port: env.SERVER_PORT
  })
  .then(() => {
    console.log("🚀 HTTP server running! 🚀");
  });
