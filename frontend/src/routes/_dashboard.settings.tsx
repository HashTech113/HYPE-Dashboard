import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings as SettingsIcon, Users, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [employeeSettings, setEmployeeSettings] = useState({
    selfCheckIn: true,
    leaveRequest: true,
    attendanceView: true,
  });

  return (
    <div className="flex min-h-full flex-col">
      <SectionShell title="Settings" icon={<SettingsIcon className="h-5 w-5 text-primary" />}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                Employee Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "selfCheckIn",
                  label: "Self Check-In",
                  description: "Allow employees to mark their own attendance.",
                },
                {
                  key: "leaveRequest",
                  label: "Leave Requests",
                  description: "Allow employees to submit leave requests.",
                },
                {
                  key: "attendanceView",
                  label: "Attendance View",
                  description: "Allow employees to view their attendance history.",
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <Label className="text-sm">{item.label}</Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={employeeSettings[item.key as keyof typeof employeeSettings]}
                    onCheckedChange={(value) => setEmployeeSettings({ ...employeeSettings, [item.key]: value })}
                  />
                </div>
              ))}
              <Button className="mt-2 w-full">Save Employee Settings</Button>
            </CardContent>
          </Card>

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
        </div>
      </SectionShell>
    </div>
  );
}
