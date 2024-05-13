import { defineAbilityFor, projectSchema } from "@sass/auth";

const ability = defineAbilityFor({
  id: "user-id",
  role: "MEMBER"
});

const project = projectSchema.parse({
  id: "project-id",
  ownerId: "user-id"
});

console.log(ability.can("get", "Billing"));
console.log(ability.can("create", "Invite"));
console.log(ability.can("delete", project));
