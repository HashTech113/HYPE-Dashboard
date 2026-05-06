import { useState } from "react";

import {
  ChangePasswordDialog,
  EditProfileDialog,
  ProfileCard,
  useProfile,
} from "@/components/dashboard/profile/ProfileEditor";
import { getCurrentRole } from "@/lib/auth";

export function EditProfilePanel() {
  const profile = useProfile();
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const role = getCurrentRole();
  const subtitle = role === "admin" ? "Administrator" : role === "hr" ? "HR" : null;

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6">
      <ProfileCard
        profile={profile}
        subtitle={subtitle}
        onEdit={() => setEditOpen(true)}
        onChangePassword={() => setPasswordOpen(true)}
      />
      <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} profile={profile} />
      <ChangePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} />
    </div>
  );
}
