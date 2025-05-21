import { SettingsForm } from "~/components/settings/setting-form";
import { SiteHeader } from "~/components/sidebar/site-header";
import { ScrollArea } from "~/components/ui/scroll-area";

const Setting = () => {
  return (
    <>
      <SiteHeader title="Setting" />
      <ScrollArea className="h-[calc(100vh-var(--header-height)-8px)]">
        <div className="pt-4 pb-10">
          <SettingsForm className="max-w-3xl mx-auto px-4" />
        </div>
      </ScrollArea>
    </>
  );
};

export default Setting;
