"use client";

import { DataTableColumnHeader } from "../common/data-table/column-header";
import { MoreHorizontal } from "lucide-react";
import { destroyDeployment } from "@/actions/deployments";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tag } from "../common/tag";
import { useState } from "react";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "platform",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Platform" />
    ),
    cell: ({ row }) => {
      return (
        <Tag
          color={
            row.original.platform === "aws"
              ? "amber"
              : row.original.platform === "digitalocean"
                ? "blue"
                : "gray"
          }
        >
          {row.original.platform}
        </Tag>
      );
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");

      switch (status) {
        case "ready-to-prepare":
        case "ready-to-deploy":
        case "ready-to-configure":
          return (
            <Tag className="self-start" color={"blue"}>
              {status}
            </Tag>
          );
        case "preparing":
        case "deploying":
        case "configuring":
        case "destroying":
        case "destroyed":
          return (
            <Tag className="self-start" color={"gray"}>
              {status}
            </Tag>
          );
        case "live":
          return (
            <Tag className="self-start" color={"green"}>
              {status}
            </Tag>
          );
        case "failed":
          return (
            <Tag className="self-start" color={"red"}>
              {status}
            </Tag>
          );
      }
    },
    filterFn: (row, id, value) => {
      const state = row.getValue("state");
      return value ? row : state !== "archived";
    },
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const [destroyDialogOpen, setDestroyDialogOpen] = useState(false);

      return (
        <>
          <AlertDialog
            open={destroyDialogOpen}
            onOpenChange={setDestroyDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Deleting a deployment will permanently remove it and all
                  associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button className="h-9" variant="outline">
                    Cancel
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    onClick={() => {
                      destroyDeployment(row.original.id);
                      setDestroyDialogOpen(false);
                    }}
                    className="h-9"
                  >
                    Delete
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                className="text-red-500"
                onClick={() => setDestroyDialogOpen(true)}
              >
                Destroy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
