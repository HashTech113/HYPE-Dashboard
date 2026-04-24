import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { EmployeesProvider } from "@/contexts/EmployeesContext";
import { DashboardDataProvider } from "@/contexts/DashboardDataContext";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayoutRoute,
});

function DashboardLayoutRoute() {
  return (
    <EmployeesProvider>
      <DashboardDataProvider>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </DashboardDataProvider>
    </EmployeesProvider>
  );
}
