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
import { Input } from "../ui/input";
import { useState } from "react";

export function DangerCard({ className, deployment }) {
  const [destroyConfirm, setDestroyConfirm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
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
                      associated infrastructure from Forge. This action cannot
                      be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="grid gap-2">
                    <p className="text-sm">
                      Please type &quot;{deployment.name}&quot; to confirm.
                    </p>
                    <Input
                      id="name"
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                      placeholder={deployment.name}
                    />
                  </div>
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
                        disabled={deleteConfirm !== deployment.name}
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
                    disabled={[
                      "destroyed",
                      "preparing",
                      "deploying",
                      "configuring",
                    ].includes(deployment.status)}
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
                      the associated cloud provider and remove all
                      configurations. Infrastructure can be recreated, however,
                      configurations must be reapplied.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="grid gap-2">
                    <p className="text-sm">
                      Please type &quot;{deployment.name}&quot; to confirm.
                    </p>
                    <Input
                      id="name"
                      value={destroyConfirm}
                      onChange={(e) => setDestroyConfirm(e.target.value)}
                      placeholder={deployment.name}
                    />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button className="h-9" variant="outline">
                        Cancel
                      </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        disabled={destroyConfirm !== deployment.name}
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
