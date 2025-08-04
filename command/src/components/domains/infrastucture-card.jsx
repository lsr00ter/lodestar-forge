"use client";

import { cn } from "@/lib/utils";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "../ui/card";
import { Tag } from "../common/tag";
import { redirect } from "next/navigation";

const StatusTag = ({ status }) => {
    switch (status) {
        case "stopped":
            return (
                <Tag className="self-start" color={"red"}>
                    {status}
                </Tag>
            );
        case "building":
        case "configuring":
        case "stopping":
        case "default":
        case "destroyed":
            return (
                <Tag className="self-start" color={"gray"}>
                    {status}
                </Tag>
            );
        case "running":
            return (
                <Tag className="self-start" color={"green"}>
                    {status}
                </Tag>
            );
        case "pending":
            return (
                <Tag className="self-start" color={"blue"}>
                    {status}
                </Tag>
            );
    }
};

export function InfrastuctureCard({ className, domain, projectId }) {
    return (
        <Card className={cn(className, "flex flex-col")}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Infrastucture</CardTitle>
                    <CardDescription
                        className="text-xs text-muted-foreground mt-1.5"
                        suppressHydrationWarning
                    >
                        Updated:{" "}
                        {domain?.updated
                            ? new Date(domain.updated).toISOString()
                            : "Never"}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                {domain?.infrastructure.length > 0 ? (
                    <div className="w-full h-full flex items-start text-sm gap-2">
                        {domain.infrastructure.map((i) => {
                            return (
                                <div
                                    className="flex flex-row w-full justify-between rounded-md -ml-2 p-2 hover:bg-primary-foreground select-none cursor-pointer"
                                    key={i.id}
                                    onClick={() => {
                                        redirect(
                                            `/projects/${projectId}/deployments/${i.deploymentId}/infrastructure/${i.id}`,
                                        );
                                    }}
                                >
                                    <p>{i.name}</p>
                                    <StatusTag status={i.status} />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="w-full h-full border border-dashed rounded-md flex items-center justify-center text-muted-foreground text-sm">
                        No infrastucture assigned.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
