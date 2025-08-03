"use client";

import { cn } from "@/lib/utils";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "../ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";

export function ResourcesCard({ className, infrastructure }) {
    const resources = infrastructure.resources;

    return (
        <Card className={cn(className)}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Resources</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground mt-1.5">
                        View the resources associated with this infrastructure.
                    </CardDescription>
                </div>
                <div
                    className="flex items-center"
                    style={{ marginTop: 0 }}
                ></div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Resource Name</TableHead>
                                <TableHead>Resource Type</TableHead>
                                <TableHead>Domain</TableHead>
                                <TableHead>Public IP</TableHead>
                                <TableHead>Private IP</TableHead>
                                <TableHead>Tailscale IP</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resources.map((resource) => {
                                const resourceName = resource?.resourceName
                                    ? resource.resourceName.replace(
                                          `_${resource.id}`,
                                          "",
                                      )
                                    : "unknown";

                                return (
                                    <TableRow key={resource.id}>
                                        <TableCell>{resourceName}</TableCell>
                                        <TableCell>
                                            {resource?.resourceType
                                                ? `${resource.resourceType}`
                                                : "Pending"}
                                        </TableCell>
                                        <TableCell>
                                            {resource?.domain
                                                ? resource.domain
                                                : "-"}
                                        </TableCell>
                                        <TableCell>
                                            {resource?.publicIp
                                                ? resource.publicIp
                                                : "-"}
                                        </TableCell>
                                        <TableCell>
                                            {resource?.privateIp
                                                ? resource.privateIp
                                                : "-"}
                                        </TableCell>
                                        <TableCell>
                                            {resource?.tailscaleIp
                                                ? resource.tailscaleIp
                                                : "-"}
                                        </TableCell>{" "}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
