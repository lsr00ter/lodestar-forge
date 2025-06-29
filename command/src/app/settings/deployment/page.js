import { DeploymentSettings } from "@/components/settings/deployment/deployment-settings";
import { Separator } from "@/components/ui/separator";
import { apiFetch } from "@/lib/utils";

export default async function Deployment() {
  const settingsData = await apiFetch("/settings");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Deployment</h3>
        <p className="text-sm text-muted-foreground">
          Update the infrastructure and configuration settings for Forge.
        </p>
      </div>
      <Separator />
      <DeploymentSettings settingsData={settingsData} />
    </div>
  );
}
