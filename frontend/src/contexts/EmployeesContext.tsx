import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  createEmployeeRemote,
  deleteEmployeeRemote,
  getEmployees,
  updateEmployeeRemote,
  type Employee,
} from "@/api/dashboardApi";

const STORAGE_KEY = "attendance-dashboard:employees:v1";

type EmployeesContextValue = {
  employees: Employee[];
  loading: boolean;
  updateEmployee: (id: string, patch: Partial<Employee>) => void;
  addEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
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

  const updateEmployee = useCallback((id: string, patch: Partial<Employee>) => {
    // Optimistic UI update; rollback on failure.
    let rollback: Employee[] | null = null;
    setEmployees((prev) => {
      rollback = prev;
      const next = prev.map((e) => (e.id === id ? { ...e, ...patch } : e));
      writeToStorage(next);
      return next;
    });
    updateEmployeeRemote(id, patch)
      .then((saved) => {
        setEmployees((prev) => {
          const next = prev.map((e) => (e.id === id ? { ...e, ...saved } : e));
          writeToStorage(next);
          return next;
        });
      })
      .catch((error) => {
        console.error("updateEmployee failed, rolling back", error);
        if (rollback) {
          setEmployees(rollback);
          writeToStorage(rollback);
        }
      });
  }, []);

  const addEmployee = useCallback((employee: Employee) => {
    let rollback: Employee[] | null = null;
    setEmployees((prev) => {
      rollback = prev;
      const next = [...prev, employee];
      writeToStorage(next);
      return next;
    });
    createEmployeeRemote(employee)
      .then((saved) => {
        // Backend may have assigned a new id — reconcile.
        setEmployees((prev) => {
          const next = prev.map((e) => (e.id === employee.id ? saved : e));
          writeToStorage(next);
          return next;
        });
      })
      .catch((error) => {
        console.error("addEmployee failed, rolling back", error);
        if (rollback) {
          setEmployees(rollback);
          writeToStorage(rollback);
        }
      });
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    let rollback: Employee[] | null = null;
    setEmployees((prev) => {
      rollback = prev;
      const next = prev.filter((e) => e.id !== id);
      writeToStorage(next);
      return next;
    });
    deleteEmployeeRemote(id).catch((error) => {
      console.error("deleteEmployee failed, rolling back", error);
      if (rollback) {
        setEmployees(rollback);
        writeToStorage(rollback);
      }
    });
  }, []);

  const resetToDefaults = useCallback(async () => {
    const list = await getEmployees();
    setEmployees(list);
    writeToStorage(list);
  }, []);

  const value = useMemo(
    () => ({ employees, loading, updateEmployee, addEmployee, deleteEmployee, resetToDefaults }),
    [employees, loading, updateEmployee, addEmployee, deleteEmployee, resetToDefaults]
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
