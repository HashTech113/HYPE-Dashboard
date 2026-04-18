import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings as SettingsIcon, Shield, Users, UserCog, FilePenLine } from "lucide-react";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  const [adminSettings, setAdminSettings] = useState({
    approveRequests: true,
    manageRoles: true,
    exportReports: true,
  });
  const [profileSettings, setProfileSettings] = useState({
    displayName: "Aswin",
    email: "admin@grow.local",
    password: "admin5678",
  });
  const [employeeEditSettings, setEmployeeEditSettings] = useState({
    editBasicInfo: true,
    editShiftTiming: true,
    resetPassword: false,
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
              <Shield className="h-4 w-4 text-primary" />
              Admin Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                key: "approveRequests",
                label: "Approve Requests",
                description: "Allow admins to approve and deny requests.",
              },
              {
                key: "manageRoles",
                label: "Manage Roles",
                description: "Allow admins to assign and update user roles.",
              },
              {
                key: "exportReports",
                label: "Export Reports",
                description: "Allow admins to export employee attendance reports.",
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <Label className="text-sm">{item.label}</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Switch
                  checked={adminSettings[item.key as keyof typeof adminSettings]}
                  onCheckedChange={(value) => setAdminSettings({ ...adminSettings, [item.key]: value })}
                />
              </div>
            ))}
            <Button className="mt-2 w-full">Save Admin Settings</Button>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserCog className="h-4 w-4 text-primary" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input
                value={profileSettings.displayName}
                onChange={(e) => setProfileSettings({ ...profileSettings, displayName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                value={profileSettings.email}
                onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={profileSettings.password}
                onChange={(e) => setProfileSettings({ ...profileSettings, password: e.target.value })}
              />
            </div>
            <Button className="mt-2 w-full">Update Profile</Button>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FilePenLine className="h-4 w-4 text-primary" />
              Employee Edit Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                key: "editBasicInfo",
                label: "Edit Basic Info",
                description: "Allow editing name, company, and employee ID.",
              },
              {
                key: "editShiftTiming",
                label: "Edit Shift Timing",
                description: "Allow editing employee shift schedule.",
              },
              {
                key: "resetPassword",
                label: "Reset Password",
                description: "Allow admins to reset employee passwords.",
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <Label className="text-sm">{item.label}</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Switch
                  checked={employeeEditSettings[item.key as keyof typeof employeeEditSettings]}
                  onCheckedChange={(value) => setEmployeeEditSettings({ ...employeeEditSettings, [item.key]: value })}
                />
              </div>
            ))}
            <Button className="mt-2 w-full">Save Edit Options</Button>
          </CardContent>
        </Card>
      </div>
      </SectionShell>
    </div>
  );
}
