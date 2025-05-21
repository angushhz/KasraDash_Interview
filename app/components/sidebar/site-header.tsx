import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { useTheme } from "../themes/theme-provider";
import { Toggle } from "../ui/toggle";
import { Moon, Sun } from "lucide-react";

export function SiteHeader({ title }: { title: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
      <Toggle
        aria-label="Toggle dark mode"
        className="mr-4"
        pressed={theme === "dark"}
        onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Toggle>
    </header>
  );
}
