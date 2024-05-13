import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";

import { routes } from "./routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);

app.register(routes);

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log("🚀 HTTP server running! 🚀");
  });
