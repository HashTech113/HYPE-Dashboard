import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings as SettingsIcon, Users, UserCog, ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentRole } from "@/lib/auth";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const role = getCurrentRole();
  const isAdmin = role === "admin";

  return (
    <div className="flex min-h-full flex-col">
      <SectionShell title="Settings" icon={<SettingsIcon className="h-5 w-5 text-primary" />}>
        <div
          className={
            isAdmin
              ? "grid grid-cols-1 gap-6 lg:grid-cols-2"
              : "grid grid-cols-1 gap-6 lg:max-w-xl"
          }
        >
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                Employee Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {isAdmin
                  ? "View and edit all employees in the system, manage their information, shift timings, and more."
                  : "View and edit your company's employees, manage their information, shift timings, and more."}
              </p>
              <Link to="/employees" className="w-full">
                <Button className="mt-2 w-full" variant="default">
                  <Users className="mr-2 h-4 w-4" />
                  Open Employee Management
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {isAdmin ? (
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <UserCog className="h-4 w-4 text-primary" />
                  Admin Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Review the admin profile, update display name and logo, and manage admin
                  account credentials.
                </p>
                <Link to="/admin" className="w-full">
                  <Button className="mt-2 w-full" variant="default">
                    <UserCog className="mr-2 h-4 w-4" />
                    Open Admin Management
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </SectionShell>
    </div>
  );
}
