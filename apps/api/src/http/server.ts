import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
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
        apiKey: {
          type: "apiKey",
          name: "Authorization",
          in: "header"
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
  secret: "my-jwt-secret"
});

app.register(fastifyCors);

app.register(routes);

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log("🚀 HTTP server running! 🚀");
  });
