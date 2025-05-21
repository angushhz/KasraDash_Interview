import { Toggle } from "~/components/ui/toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "~/components/themes/theme-provider"

export function AppearanceSection() {
  const { theme, setTheme } = useTheme()


  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the appearance of the application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark mode.
              </p>
            </div>
            <Toggle
              aria-label="Toggle dark mode"
              pressed={theme === "dark"}
              onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Toggle>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 