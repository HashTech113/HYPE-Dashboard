import { useCallback, useEffect, useRef, useState } from "react";
import { Building2, CheckCircle2, Pencil, Trash2 } from "lucide-react";

import {
  type Company,
  deleteCompany,
  getCompanies,
  renameCompany,
} from "@/api/dashboardApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function EditCompaniesPanel() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Company | null>(null);
  const [editName, setEditName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [deleting, setDeleting] = useState<Company | null>(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    successTimerRef.current = setTimeout(() => setSuccessMessage(null), 3000);
  };
  useEffect(
    () => () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    },
    [],
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const list = await getCompanies();
      setCompanies(list);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Failed to load companies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const openEdit = (company: Company) => {
    setEditing(company);
    setEditName(company.name);
  };

  const closeEdit = () => {
    if (savingEdit) return;
    setEditing(null);
    setEditName("");
  };

  const handleSaveRename = async () => {
    if (!editing) return;
    const trimmed = editName.trim();
    if (!trimmed) {
      window.alert("Company name cannot be empty.");
      return;
    }
    if (trimmed === editing.name) {
      closeEdit();
      return;
    }
    setSavingEdit(true);
    try {
      const updated = await renameCompany(editing.id, trimmed);
      setCompanies((prev) =>
        prev
          .map((c) => (c.id === updated.id ? updated : c))
          .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" })),
      );
      showSuccess(
        `Renamed to ${updated.name}. ${updated.employeeCount} employee${
          updated.employeeCount === 1 ? "" : "s"
        } updated.`,
      );
      setEditing(null);
      setEditName("");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Rename failed");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleting) return;
    setDeletingBusy(true);
    try {
      await deleteCompany(deleting.id);
      const removed = deleting;
      setCompanies((prev) => prev.filter((c) => c.id !== removed.id));
      showSuccess(`Deleted ${removed.name}.`);
      setDeleting(null);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setDeletingBusy(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {successMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-700"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Building2 className="h-5 w-5 text-primary" />
          Edit Companies
        </h2>
        <span className="text-sm text-muted-foreground">
          {loading
            ? "Loading…"
            : `${companies.length} compan${companies.length === 1 ? "y" : "ies"}`}
        </span>
      </div>

      {loadError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
          {loadError}
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-auto">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow className="bg-slate-50/60">
              <TableHead className="w-14">S/N</TableHead>
              <TableHead className="text-indigo-700">Company</TableHead>
              <TableHead className="w-[140px] text-emerald-700">Employees</TableHead>
              <TableHead className="w-[120px]">HR Account</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company, index) => (
              <TableRow key={company.id} className="hover:bg-slate-50/60">
                <TableCell className="text-slate-500">{index + 1}</TableCell>
                <TableCell className="font-medium text-indigo-700">{company.name}</TableCell>
                <TableCell className="font-medium text-emerald-700">
                  {company.employeeCount}
                </TableCell>
                <TableCell className="text-slate-600">
                  {company.hasUsers ? "Yes" : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-sky-700 hover:bg-sky-50 hover:text-sky-800"
                      onClick={() => openEdit(company)}
                      title="Rename company"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-rose-50 hover:text-destructive"
                      onClick={() => setDeleting(company)}
                      title="Delete company"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!loading && companies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  No companies yet.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>

      <Dialog open={editing !== null} onOpenChange={(open) => !open && closeEdit()}>
        <DialogContent
          className="max-w-sm"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Rename Company</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="company-name">New name</Label>
            <Input
              id="company-name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void handleSaveRename();
                }
              }}
            />
            {editing && editing.employeeCount > 0 ? (
              <p className="text-xs text-muted-foreground">
                The new name will also be applied to {editing.employeeCount} existing
                employee record{editing.employeeCount === 1 ? "" : "s"}
                {editing.hasUsers ? " and the HR account scope" : ""}.
              </p>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeEdit} disabled={savingEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveRename} disabled={savingEdit}>
              {savingEdit ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open && !deletingBusy) setDeleting(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete company?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting
                ? deleting.employeeCount > 0
                  ? `${deleting.name} still has ${deleting.employeeCount} employee${
                      deleting.employeeCount === 1 ? "" : "s"
                    }. Reassign or delete them first — the server will block this.`
                  : `Permanently delete ${deleting.name}? ${
                      deleting.hasUsers
                        ? "Any HR account linked to it will lose its company scope."
                        : ""
                    }`
                : "Delete this company?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingBusy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deletingBusy}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingBusy ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
