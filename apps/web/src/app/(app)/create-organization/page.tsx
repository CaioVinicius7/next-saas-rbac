import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateOrganization() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <div className="space-y-4">
        <form className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Organization name</Label>
            <Input id="name" name="name" autoComplete="off" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="domain">E-mail domain</Label>
            <Input
              id="domain"
              name="domain"
              type="text"
              inputMode="url"
              placeholder="example.com"
              autoComplete="off"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <div className="translate-y-0.5">
                <Checkbox
                  name="shouldAttachUsersByDomain"
                  id="shouldAttachUsersByDomain"
                />
              </div>

              <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
                <span className="text-sm font-medium leading-none">
                  Auto-join new members
                </span>

                <p className="text-sm text-muted-foreground">
                  this will automatically invite all members with same e-mail
                  domain to this organization.
                </p>
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save organization
          </Button>
        </form>
      </div>
    </div>
  );
}
