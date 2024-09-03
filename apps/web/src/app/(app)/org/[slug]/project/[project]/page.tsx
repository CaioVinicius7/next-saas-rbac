import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProject } from "@/http/getProject";
import { getInitials } from "@/utils/getInitials";

dayjs.extend(relativeTime);
interface ProjectParams {
  params: {
    slug: string;
    project: string;
  };
}

export default async function Project({ params }: ProjectParams) {
  const { slug: orgSlug, project: projectSlug } = params;

  const { project } = await getProject({
    orgSlug,
    projectSlug
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          {!!project.avatarUrl && <AvatarImage src={project.avatarUrl} />}

          <AvatarFallback>{getInitials(project.name)}</AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold">{project.name}</h1>
      </div>

      <p className="text-sm text-muted-foreground">
        Created by{" "}
        <span className="font-medium text-foreground">
          {project.owner.name ?? "Someone"}
        </span>{" "}
        {dayjs(project.createdAt).fromNow()}
      </p>

      <p className="leading-relaxed">{project.description}</p>
    </div>
  );
}
