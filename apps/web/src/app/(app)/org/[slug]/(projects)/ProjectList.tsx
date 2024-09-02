import { ArrowRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Project 01</CardTitle>

          <CardDescription className="line-clamp-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
            nostrum necessitatibus odit obcaecati sapiente nam culpa minus neque
            ipsum, sint magni dolore doloremque soluta, dolorem, veniam vero
            ullam inventore est!
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex items-center gap-1.5">
          <Avatar className="size-4">
            <AvatarImage src="https://github.com/caioVinicius7.png" />

            <AvatarFallback />
          </Avatar>

          <span className="text-xs text-muted-foreground">
            Created by{" "}
            <span className="font-medium text-foreground">Caio Vinícius</span> a
            day ago
          </span>

          <Button size="xs" variant="outline" className="ml-auto">
            View <ArrowRight className="ml-2 size-3" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
