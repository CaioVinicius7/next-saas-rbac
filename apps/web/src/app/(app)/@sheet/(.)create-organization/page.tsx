import { InterceptedSheetContent } from "@/components/InterceptedSheetContent";
import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { OrganizationForm } from "../../org/OrganizationForm";

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  );
}
