import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings as SettingsIcon, Users, UserCog, ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SectionShell title="Settings" icon={<SettingsIcon className="h-5 w-5 text-primary" />}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                Manage Employees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                View and edit all employees in the system, manage their information, shift timings, and more.
              </p>
              <Link to="/employees" className="w-full">
                <Button className="mt-2 w-full" variant="default">
                  <Users className="mr-2 h-4 w-4" />
                  View All Employees
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <UserCog className="h-4 w-4 text-primary" />
                Manage Admins
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Review users with admin access, update their permissions, and manage admin-level account details.
              </p>
              <Link to="/employees" search={{ role: "Admin" }} className="w-full">
                <Button className="mt-2 w-full" variant="default">
                  <UserCog className="mr-2 h-4 w-4" />
                  View All Admins
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </SectionShell>
    </div>
  );
}
