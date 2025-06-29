"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { deleteDeployment, destroyDeployment } from "@/actions/deployments";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function DangerCard({ className, deployment }) {
  console.log(deployment);
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription
            className="text-xs text-muted-foreground mt-1.5"
            suppressHydrationWarning
          >
            Warning, these actions are irreversable.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <div className="grid gap-4">
          <div className="flex flex-row gap-2">
            {deployment.status !== "destroyed" ? (
              <Tooltip delayDuration={25}>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant={"destructive"}
                    className={"opacity-50"}
                  >
                    Delete Deployment
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Please destroy the deployment first.
                </TooltipContent>
              </Tooltip>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant={"destructive"}>
                    Delete Deployment
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Deleting a deployment will permanently remove it and all
                      associated infrastructure from Forge.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  {/* TODO: Please type the name of the deployment to continue... */}
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button className="h-9" variant="outline">
                        Cancel
                      </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        onClick={() => deleteDeployment(deployment.id)}
                        className="h-9"
                      >
                        Delete
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {deployment.status !== "destroyed" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant={"secondary"}
                    disabled={deployment.status === "destroyed"}
                  >
                    Destroy Deployment
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Destroying a deployment will permanently delete it from
                      the associated cloud provider. Infrastructure can be
                      recreated.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  {/* TODO: Please type the name of the deployment to continue... */}
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button className="h-9" variant="outline">
                        Cancel
                      </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        onClick={() => destroyDeployment(deployment.id)}
                        className="h-9"
                      >
                        Destroy
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
