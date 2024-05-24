import type { FastifyInstance } from "fastify";

import { authenticateWithGithub } from "./auth/authenticate-with-github";
import { authenticateWithPassword } from "./auth/authenticate-with-password";
import { createAccount } from "./auth/create-account";
import { getProfile } from "./auth/get-profile";
import { requestPasswordRecover } from "./auth/request-password-recover";
import { resetPassword } from "./auth/reset-password";
import { createOrganization } from "./orgs/create-organization";
import { getMembership } from "./orgs/get-membership";
import { getOrganization } from "./orgs/get-organization";
import { getOrganizations } from "./orgs/get-organizations";
import { shutdownOrganization } from "./orgs/shutdown-organization";
import { transferOrganization } from "./orgs/transfer-organization";
import { updateOrganization } from "./orgs/update-organization";
import { createProject } from "./projects/create-project";
import { deleteProject } from "./projects/delete-project";

export async function routes(app: FastifyInstance) {
  app.register(createAccount);
  app.register(authenticateWithPassword);
  app.register(getProfile);
  app.register(requestPasswordRecover);
  app.register(resetPassword);
  app.register(authenticateWithGithub);

  app.register(createOrganization);
  app.register(getMembership);
  app.register(getOrganization);
  app.register(getOrganizations);
  app.register(updateOrganization);
  app.register(shutdownOrganization);
  app.register(transferOrganization);

  app.register(createProject);
  app.register(deleteProject);
}
