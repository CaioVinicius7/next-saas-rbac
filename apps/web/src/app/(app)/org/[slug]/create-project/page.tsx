import { Header } from "@/components/Header";

import { ProjectForm } from "./ProjectForm";

export default function CreateProject() {
  return (
    <div className="space-y-4 py-2">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Create project</h1>

        <ProjectForm />
      </main>
    </div>
  );
}
