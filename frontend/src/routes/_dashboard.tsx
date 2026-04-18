import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { EmployeesProvider } from "@/contexts/EmployeesContext";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayoutRoute,
});

function DashboardLayoutRoute() {
  return (
    <EmployeesProvider>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </EmployeesProvider>
  );
}
