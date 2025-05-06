"use client";

import { Logs, Copy, RefreshCw } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { copyToClipboard } from "@/lib/utils";
import { refreshData } from "@/actions/util";
import { useEffect } from "react";

export function LogDialog({ log }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                    <Logs />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl flex flex-col">
                <DialogHeader>
                    <DialogTitle>Deployment Log</DialogTitle>
                    <DialogDescription>
                        Preperation, build, and configuration logs for this
                        deployment. Useful for troubleshooting.
                    </DialogDescription>
                </DialogHeader>
                <div className="relative">
                    <pre className="relative h-[450px] overflow-auto border rounded-lg p-4 text-sm text-mono bg-muted/50">
                        <code className="rounded font-mono text-sm w-full relative">
                            {log}
                        </code>
                    </pre>
                    <div className="absolute right-4 top-4 flex flex-row gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => refreshData()}
                        >
                            <RefreshCw />
                        </Button>
                        {/* Only show the copy button if page is secure (otherwise it will not work) */}
                        {location.protocol === "https:" && (
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() => copyToClipboard(log)}
                            >
                                <Copy />
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
