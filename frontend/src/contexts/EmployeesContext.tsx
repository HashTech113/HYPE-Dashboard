import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  createEmployeeRemote,
  deleteEmployeeRemote,
  getEmployees,
  updateEmployeeRemote,
  type Employee,
} from "@/api/dashboardApi";
import { companyMatches, getCurrentCompany, getCurrentRole } from "@/lib/auth";

const STORAGE_KEY = "attendance-dashboard:employees:v1";

type EmployeesContextValue = {
  employees: Employee[];
  loading: boolean;
  /** Company the current user is scoped to, or null for admins (full access). */
  scopedCompany: string | null;
  /** Async; resolves with the saved record from the server (or rejects on
   * API failure). The optimistic UI update happens immediately; the
   * resolved value is the canonical post-save state and is also written
   * into local state, so callers don't need to do their own refetch. */
  updateEmployee: (id: string, patch: Partial<Employee>) => Promise<Employee>;
  addEmployee: (employee: Employee) => Promise<Employee>;
  deleteEmployee: (id: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
};

const EmployeesContext = createContext<EmployeesContextValue | null>(null);

function writeToStorage(employees: Employee[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  } catch {
    // ignore quota errors — context state still works in-memory
  }
}

export function EmployeesProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // Always fetch from the backend so the deployed frontend and any local
  // device see the same roster. localStorage is now a write-behind cache
  // used only if the fetch fails.
  useEffect(() => {
    let cancelled = false;
    getEmployees()
      .then((list) => {
        if (cancelled) return;
        setEmployees(list);
        writeToStorage(list);
      })
      .catch((error) => {
        console.error("Failed to load employees", error);
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as Employee[];
            if (Array.isArray(parsed)) setEmployees(parsed);
          }
        } catch {
          // ignore
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const updateEmployee = useCallback(async (id: string, patch: Partial<Employee>): Promise<Employee> => {
    // Optimistic UI update; rollback on failure. Returning a promise so
    // callers (the edit dialog) can await the canonical server response
    // before closing — that way a silent backend failure surfaces as a
    // visible error instead of looking like a successful save.
    let rollback: Employee[] | null = null;
    setEmployees((prev) => {
      rollback = prev;
      const next = prev.map((e) => (e.id === id ? { ...e, ...patch } : e));
      writeToStorage(next);
      return next;
    });
    try {
      const saved = await updateEmployeeRemote(id, patch);
      setEmployees((prev) => {
        // Replace local row with the canonical server record. Spreading
        // ``saved`` last guarantees salaryPackage / company / etc. always
        // reflect what's actually in PostgreSQL, not the in-flight patch.
        const next = prev.map((e) => (e.id === id ? { ...e, ...saved } : e));
        writeToStorage(next);
        return next;
      });
      return saved;
    } catch (error) {
      console.error("updateEmployee failed, rolling back", error);
      if (rollback) {
        setEmployees(rollback);
        writeToStorage(rollback);
      }
      throw error;
    }
  }, []);

  const addEmployee = useCallback(async (employee: Employee): Promise<Employee> => {
    let rollback: Employee[] | null = null;
    setEmployees((prev) => {
      rollback = prev;
      const next = [...prev, employee];
      writeToStorage(next);
      return next;
    });
    try {
      const saved = await createEmployeeRemote(employee);
      setEmployees((prev) => {
        // Backend may have assigned a new id — reconcile.
        const next = prev.map((e) => (e.id === employee.id ? saved : e));
        writeToStorage(next);
        return next;
      });
      return saved;
    } catch (error) {
      console.error("addEmployee failed, rolling back", error);
      if (rollback) {
        setEmployees(rollback);
        writeToStorage(rollback);
      }
      throw error;
    }
  }, []);

  const deleteEmployee = useCallback(async (id: string): Promise<void> => {
    let rollback: Employee[] | null = null;
    setEmployees((prev) => {
      rollback = prev;
      const next = prev.filter((e) => e.id !== id);
      writeToStorage(next);
      return next;
    });
    try {
      await deleteEmployeeRemote(id);
    } catch (error) {
      console.error("deleteEmployee failed, rolling back", error);
      if (rollback) {
        setEmployees(rollback);
        writeToStorage(rollback);
      }
      throw error;
    }
  }, []);

  const resetToDefaults = useCallback(async () => {
    const list = await getEmployees();
    setEmployees(list);
    writeToStorage(list);
  }, []);

  // HR users only see their own company's employees. Admins see everyone.
  // Read once at provider mount — the provider lifecycle is tied to the
  // dashboard, which itself only mounts after authentication.
  const scopedCompany = useMemo<string | null>(() => {
    return getCurrentRole() === "hr" ? getCurrentCompany() : null;
  }, []);

  const visibleEmployees = useMemo<Employee[]>(() => {
    if (!scopedCompany) return employees;
    return employees.filter((employee) => companyMatches(employee.company, scopedCompany));
  }, [employees, scopedCompany]);

  const value = useMemo(
    () => ({
      employees: visibleEmployees,
      loading,
      scopedCompany,
      updateEmployee,
      addEmployee,
      deleteEmployee,
      resetToDefaults,
    }),
    [visibleEmployees, loading, scopedCompany, updateEmployee, addEmployee, deleteEmployee, resetToDefaults]
  );

  return <EmployeesContext.Provider value={value}>{children}</EmployeesContext.Provider>;
}

export function useEmployees(): EmployeesContextValue {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeesProvider");
  }
  return context;
}
