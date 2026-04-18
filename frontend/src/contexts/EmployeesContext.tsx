import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getEmployees, type Employee } from "@/api/dashboardApi";

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

function readFromStorage(): Employee[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Employee[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

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

  useEffect(() => {
    const fromStorage = readFromStorage();
    if (fromStorage && fromStorage.length > 0) {
      setEmployees(fromStorage);
      setLoading(false);
      return;
    }

    let cancelled = false;
    getEmployees()
      .then((list) => {
        if (cancelled) return;
        setEmployees(list);
        writeToStorage(list);
      })
      .catch((error) => {
        console.error("Failed to load employees", error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateEmployee = useCallback((id: string, patch: Partial<Employee>) => {
    setEmployees((prev) => {
      const next = prev.map((employee) => (employee.id === id ? { ...employee, ...patch } : employee));
      writeToStorage(next);
      return next;
    });
  }, []);

  const addEmployee = useCallback((employee: Employee) => {
    setEmployees((prev) => {
      const next = [...prev, employee];
      writeToStorage(next);
      return next;
    });
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees((prev) => {
      const next = prev.filter((employee) => employee.id !== id);
      writeToStorage(next);
      return next;
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
