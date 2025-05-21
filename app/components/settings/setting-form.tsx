import { cn } from "~/lib/utils";
import { ProfileSection } from "./profile-section";
import { SecuritySection } from "./security-section";
import { AppearanceSection } from "./appearance-section";
import { AvatarUpload } from "./avatar-upload";
export function SettingsForm({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <AvatarUpload />
      <ProfileSection />
      <SecuritySection />
      <AppearanceSection />
    </div>
  );
}
