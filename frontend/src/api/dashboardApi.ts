export type Employee = {
  id: string;
  name: string;
  employeeId: string;
  company: string;
  department: string;
  shift: string;
  role: "Admin" | "Employee";
  password: string;
  dob: string;
};

export type PresenceRecord = {
  id: string;
  employeeName: string;
  employeeId: string;
  entryTime: string;
  exitTime: string | null;
  totalHours: string;
  status: "Present" | "Late" | "Early Exit" | "Absent";
  date: string;
};

export type HolidayCalendarEntry = {
  id: string;
  date: string;
  day: string;
  name: string;
  type: "Public Holiday" | "Company Holiday" | "Weekly Off";
};

export type Request = {
  id: string;
  employeeName: string;
  employeeId: string;
  type: "Leave (Annual)" | "Leave (Sick)" | "Attendance Correction" | "Shift Change";
  message: string;
  date: string;
  status: "Pending" | "Approved" | "Denied";
};

export type Alert = {
  id: string;
  type: "warning" | "critical" | "info";
  title: string;
  description: string;
  timestamp: string;
  employee?: string;
};

export type AlertRules = {
  lateThreshold: number;
  earlyExitThreshold: number;
  multipleExitsThreshold: number;
  afterHoursStart: string;
  afterHoursEnd: string;
};

export type MovementDatum = {
  day: string;
  primary: number;
  secondary: number;
};

export type OverviewData = {
  summary: {
    totalEmployees: { value: number; change: string };
    presentToday: { value: number; change: string };
    leaveToday: { value: number; change: string };
    lateToday: { value: number; change: string };
  };
  attendanceSegments: Array<{ label: string; value: number; color: string }>;
  pendingRequests: Array<{ title: string; time: string }>;
  charts: {
    spentIn: MovementDatum[];
    spentOut: MovementDatum[];
    averagePresent: MovementDatum[];
    averageAbsent: MovementDatum[];
  };
};

export type DashboardApiResponse = {
  overview: OverviewData;
  employees: Employee[];
  presenceHistory: PresenceRecord[];
  holidayCalendar: HolidayCalendarEntry[];
  requests: Request[];
  alerts: Alert[];
  alertRules: AlertRules;
};

let dashboardDataPromise: Promise<DashboardApiResponse> | null = null;

async function loadDashboardData(): Promise<DashboardApiResponse> {
  if (!dashboardDataPromise) {
    dashboardDataPromise = fetch("/mock-api/dashboard.json").then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load mock dashboard data: ${response.status}`);
      }
      return response.json() as Promise<DashboardApiResponse>;
    });
  }

  return dashboardDataPromise;
}

export async function getOverviewData() {
  const data = await loadDashboardData();
  return data.overview;
}

export async function getEmployees() {
  const data = await loadDashboardData();
  return data.employees;
}

export async function getPresenceHistory() {
  const data = await loadDashboardData();
  return data.presenceHistory;
}

export async function getHolidayCalendar() {
  const data = await loadDashboardData();
  return data.holidayCalendar;
}

export async function getRequests() {
  const data = await loadDashboardData();
  return data.requests;
}

export async function getAlerts() {
  const data = await loadDashboardData();
  return data.alerts;
}

export async function getAlertRules() {
  const data = await loadDashboardData();
  return data.alertRules;
}
