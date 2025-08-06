import { Separator } from "@/components/ui/separator";
import { AppearanceSettings } from "@/components/settings/appearance-settings";
import { apiFetch } from "@/lib/utils";

export default async function Appearance() {
  const settingsData = await apiFetch("/settings");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Update the appearance settings for Forge.
        </p>
      </div>
      <Separator />
      <AppearanceSettings settingsData={settingsData} />
    </div>
  );
}
