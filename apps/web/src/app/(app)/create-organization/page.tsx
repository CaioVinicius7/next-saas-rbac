import { OrganizationForm } from "../org/OrganizationForm";

export default function CreateOrganization() {
  return (
    <div className="space-y-4 p-8">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <OrganizationForm />
    </div>
  );
}
