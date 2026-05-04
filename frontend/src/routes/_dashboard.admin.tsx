import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  Camera,
  Eye,
  EyeOff,
  KeyRound,
  Pencil,
  Trash2,
  UserCog,
} from "lucide-react";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  changePassword,
  getAdminProfile,
  subscribeToAdminProfile,
  updateAdminProfile,
  type AdminProfile,
} from "@/lib/auth";

export const Route = createFileRoute("/_dashboard/admin")({
  component: AdminManagementPage,
});

const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2 MB — keeps localStorage happy.

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "A";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function useAdminProfile(): AdminProfile {
  const [profile, setProfile] = useState<AdminProfile>(() => getAdminProfile());
  useEffect(() => {
    return subscribeToAdminProfile(() => setProfile(getAdminProfile()));
  }, []);
  return profile;
}

function AdminManagementPage() {
  const profile = useAdminProfile();
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Admin Management"
        icon={<UserCog className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
      >
        <div className="flex min-h-0 flex-1 items-start justify-center overflow-y-auto py-6">
          <div className="relative w-full max-w-xl">
            {/* Subtle gradient accent at the top of the card. */}
            <div
              aria-hidden="true"
              className="absolute -top-px left-12 right-12 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#4aa590] to-transparent"
            />
            <div className="neu-surface flex flex-col items-center gap-5 rounded-3xl px-8 py-10 sm:px-10">
              <AdminAvatar
                name={profile.displayName}
                avatarUrl={profile.avatarUrl}
                className="h-32 w-32 text-3xl"
              />

              <div className="text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {profile.displayName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">@{profile.username}</p>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5">
                <Button
                  type="button"
                  onClick={() => setEditOpen(true)}
                  className="h-10 gap-2 rounded-xl bg-gradient-to-r from-[#4aa590] to-[#2f8f7b] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(47,143,123,0.28)] transition-all hover:from-[#3f9382] hover:to-[#256f60] hover:shadow-[0_14px_30px_rgba(47,143,123,0.38)]"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPasswordOpen(true)}
                  className="h-10 gap-2 rounded-xl border-slate-200 bg-white px-5 text-sm font-semibold text-[#3f9382] hover:bg-[#eef7f4] hover:text-[#2f8f7b]"
                >
                  <KeyRound className="h-4 w-4" />
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <EditProfileDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        profile={profile}
      />
      <ChangePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} />
    </div>
  );
}

type AdminAvatarProps = {
  name: string;
  avatarUrl: string;
  className?: string;
};

function AdminAvatar({ name, avatarUrl, className }: AdminAvatarProps) {
  const initials = useMemo(() => getInitials(name), [name]);
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#69baa7] via-[#4aa590] to-[#2f8f7b] font-semibold text-white shadow-[0_18px_32px_rgba(12,70,56,0.22)] ring-4 ring-white",
        className,
      )}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="tracking-wide">{initials}</span>
      )}
    </div>
  );
}

type EditProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: AdminProfile;
};

function EditProfileDialog({ open, onOpenChange, profile }: EditProfileDialogProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Reset form fields whenever the dialog opens with the current profile.
  useEffect(() => {
    if (open) {
      setDisplayName(profile.displayName);
      setUsername(profile.username);
      setAvatarUrl(profile.avatarUrl);
      setError(null);
    }
  }, [open, profile]);

  const handleAvatarSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setError("Image is too large. Choose a file under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarUrl(reader.result);
        setError(null);
      }
    };
    reader.onerror = () => setError("Could not read the selected image.");
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedName = displayName.trim();
    const trimmedUsername = username.trim();
    if (!trimmedName) {
      setError("Display name is required.");
      return;
    }
    if (!trimmedUsername) {
      setError("Username is required.");
      return;
    }

    setSubmitting(true);
    updateAdminProfile({
      displayName: trimmedName,
      username: trimmedUsername,
      avatarUrl,
    });
    setSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <AdminAvatar
                name={displayName || profile.displayName}
                avatarUrl={avatarUrl}
                className="h-24 w-24 text-2xl"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-full bg-white text-[#3f9382] shadow-md ring-1 ring-slate-200 transition-colors hover:bg-[#eef7f4]"
                aria-label="Upload logo"
                title="Upload logo"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarSelected}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="h-8 gap-1.5 rounded-lg border-slate-200 px-3 text-xs"
              >
                <Camera className="h-3.5 w-3.5" />
                Upload logo
              </Button>
              {avatarUrl ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setAvatarUrl("")}
                  className="h-8 gap-1.5 rounded-lg px-3 text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </Button>
              ) : null}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="admin-display-name" className="text-slate-700">
              Display name
            </Label>
            <Input
              id="admin-display-name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Admin"
              className="h-10 rounded-xl border-slate-200 bg-white focus-visible:ring-[#3f9382]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="admin-username" className="text-slate-700">
              Username
            </Label>
            <Input
              id="admin-username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              autoComplete="off"
              className="h-10 rounded-xl border-slate-200 bg-white focus-visible:ring-[#3f9382]"
            />
            <p className="text-xs text-slate-500">
              Used to sign in. Updating it will rename the active session.
            </p>
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700"
            >
              {error}
            </div>
          ) : null}

          <DialogFooter className="gap-2 pt-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="h-10 rounded-xl bg-gradient-to-r from-[#4aa590] to-[#2f8f7b] px-5 font-semibold text-white shadow-[0_8px_20px_rgba(47,143,123,0.28)] hover:from-[#3f9382] hover:to-[#256f60]"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type ChangePasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrent(false);
      setShowNew(false);
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    const result = changePassword(currentPassword, newPassword, confirmPassword);
    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      // Brief confirmation flash before closing the dialog.
      setTimeout(() => onOpenChange(false), 900);
      return;
    }

    if (result.reason === "incorrect-current") {
      setError("The current password is incorrect.");
    } else if (result.reason === "too-short") {
      setError("New password must be at least 6 characters.");
    } else {
      setError("New password and confirmation do not match.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordField
            id="current-password"
            label="Current password"
            value={currentPassword}
            onChange={setCurrentPassword}
            visible={showCurrent}
            onToggleVisible={() => setShowCurrent((prev) => !prev)}
            autoComplete="current-password"
          />
          <PasswordField
            id="new-password"
            label="New password"
            value={newPassword}
            onChange={setNewPassword}
            visible={showNew}
            onToggleVisible={() => setShowNew((prev) => !prev)}
            autoComplete="new-password"
            hint="At least 6 characters."
          />
          <PasswordField
            id="confirm-password"
            label="Confirm new password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            visible={showNew}
            onToggleVisible={() => setShowNew((prev) => !prev)}
            autoComplete="new-password"
          />

          {error ? (
            <div
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700"
            >
              {error}
            </div>
          ) : null}
          {success ? (
            <div
              role="status"
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700"
            >
              Password updated successfully.
            </div>
          ) : null}

          <DialogFooter className="gap-2 pt-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting || success}
              className="h-10 rounded-xl bg-gradient-to-r from-[#4aa590] to-[#2f8f7b] px-5 font-semibold text-white shadow-[0_8px_20px_rgba(47,143,123,0.28)] hover:from-[#3f9382] hover:to-[#256f60]"
            >
              Update password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggleVisible: () => void;
  autoComplete?: string;
  hint?: string;
};

function PasswordField({
  id,
  label,
  value,
  onChange,
  visible,
  onToggleVisible,
  autoComplete,
  hint,
}: PasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-slate-700">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          className="h-10 rounded-xl border-slate-200 bg-white pr-10 focus-visible:ring-[#3f9382]"
        />
        <button
          type="button"
          onClick={onToggleVisible}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition-colors hover:text-slate-600"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
