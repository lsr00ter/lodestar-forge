"use client";

import { updateSetting } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const DeploymentSettings = ({ settingsData }) => {
  const [userData, setUserData] = useState(
    settingsData.find((s) => s.name === "userData")?.value || "",
  );

  const [initialUserData, setInitialUserData] = useState(
    settingsData.find((s) => s.name === "userData")?.value || "",
  );

  const [tailscaleTag, setTailscaleTag] = useState(
    settingsData.find((s) => s.name === "tailscaleTag")?.value || "",
  );

  const [initialTailscaleTag, setInitialTailscaleTag] = useState(
    settingsData.find((s) => s.name === "tailscaleTag")?.value || "",
  );

  const [ansibleOutput, setAnsibleOutput] = useState(
    settingsData.find((s) => s.name === "ansibleOutput")?.value || "normal",
  );

  const [initialAnsibleOutput, setInitialAnsibleOutput] = useState(
    settingsData.find((s) => s.name === "ansibleOutput")?.value || "normal",
  );

  const buttonDisabled =
    userData === initialUserData &&
    tailscaleTag === initialTailscaleTag &&
    ansibleOutput === initialAnsibleOutput;

  const saveHandler = async () => {
    await updateSetting("userData", userData);
    setInitialUserData(userData);

    await updateSetting("tailscaleTag", tailscaleTag);
    setInitialTailscaleTag(tailscaleTag);

    await updateSetting("ansibleOutput", ansibleOutput);
    setInitialAnsibleOutput(ansibleOutput);
  };

  return (
    <>
      <ScrollArea>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label>Ansible Output</Label>
              <p className="text-xs text-muted-foreground">
                The default user-data script will install Tailscale. However,
                you can add extra code here.
              </p>
            </div>
            <Select value={ansibleOutput} onValueChange={setAnsibleOutput}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="verbose">Verbose</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label>Extra User-Data</Label>
              <p className="text-xs text-muted-foreground">
                The default user-data script will install Tailscale. However,
                you can add extra code here.
              </p>
            </div>
            <Textarea
              value={userData}
              onChange={(e) => {
                setUserData(e.target.value);
              }}
            />
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label>Tailscale Tag</Label>
              <p className="text-xs text-muted-foreground">
                Tailscale tag applied to both Forge Nucleus and default
                infrastructure. Must be defined within Tailscale ACLs
              </p>
            </div>
            <Input
              placeholder="lodestar-forge"
              value={tailscaleTag}
              onChange={(e) => {
                setTailscaleTag(e.target.value);
              }}
            />
          </div>
        </div>
      </ScrollArea>
      <div className="w-full flex justify-end">
        <Button onClick={saveHandler} disabled={buttonDisabled}>
          Save
        </Button>
      </div>
    </>
  );
};
