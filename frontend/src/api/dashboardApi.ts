export type Employee = {
  id: string;
  name: string;
  employeeId: string;
  imageUrl?: string;
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

export async function getEmployees(): Promise<Employee[]> {
  try {
    const resp = await fetch(buildUrl("/api/employees", {}));
    if (resp.ok) {
      const payload = (await resp.json()) as { items: Employee[] };
      if (Array.isArray(payload.items) && payload.items.length > 0) {
        return payload.items;
      }
    }
  } catch {
    // fall through to mock
  }
  const data = await loadDashboardData();
  return data.employees;
}

export async function createEmployeeRemote(employee: Employee): Promise<Employee> {
  const resp = await fetch(buildUrl("/api/employees", {}), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!resp.ok) throw new Error(`createEmployee ${resp.status}`);
  return (await resp.json()) as Employee;
}

export async function updateEmployeeRemote(id: string, patch: Partial<Employee>): Promise<Employee> {
  const resp = await fetch(buildUrl(`/api/employees/${encodeURIComponent(id)}`, {}), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!resp.ok) throw new Error(`updateEmployee ${resp.status}`);
  return (await resp.json()) as Employee;
}

export async function deleteEmployeeRemote(id: string): Promise<void> {
  const resp = await fetch(buildUrl(`/api/employees/${encodeURIComponent(id)}`, {}), {
    method: "DELETE",
  });
  if (!resp.ok && resp.status !== 404) throw new Error(`deleteEmployee ${resp.status}`);
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

export type FaceHistoryItem = {
  id: string;
  name: string;
  entry: string;
  exit: string;
  image_url: string;
};

export type FaceHistoryResponse = {
  count: number;
  total: number;
  limit: number;
  offset: number;
  items: FaceHistoryItem[];
};

export type AttendanceStatus = "Present" | "Late" | "Early Exit" | "Absent";

export type AttendanceShiftConfig = {
  start: string;
  end: string;
  late_grace_min: number;
  early_exit_grace_min: number;
  timezone_offset_minutes: number;
};

export type AttendanceDayItem = {
  name: string;
  date: string;
  entry: string | null;
  exit: string | null;
  entry_iso: string | null;
  exit_iso: string | null;
  total_hours: string;
  total_minutes: number;
  status: AttendanceStatus;
  late_minutes: number;
  early_exit_minutes: number;
  capture_count: number;
  entry_image_url: string | null;
  exit_image_url: string | null;
};

export type AttendanceDayResponse = {
  date: string;
  shift: AttendanceShiftConfig;
  count: number;
  items: AttendanceDayItem[];
};

const FACE_API_BASE =
  (import.meta as unknown as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL ??
  "http://localhost:8000";

export async function getFaceHistory(params: {
  start?: string;
  end?: string;
  limit?: number;
  offset?: number;
  latest?: number;
} = {}): Promise<FaceHistoryResponse> {
  const search = new URLSearchParams();
  if (params.start) search.set("start", params.start);
  if (params.end) search.set("end", params.end);
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  if (params.offset !== undefined) search.set("offset", String(params.offset));
  if (params.latest !== undefined) search.set("latest", String(params.latest));

  const qs = search.toString();
  const url = `${FACE_API_BASE}/api/faces/history${qs ? `?${qs}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load face history: ${response.status}`);
  }
  return response.json() as Promise<FaceHistoryResponse>;
}

export async function getDailyAttendance(params: {
  date?: string;
  names?: string;
} = {}): Promise<AttendanceDayResponse> {
  const search = new URLSearchParams();
  if (params.date) search.set("date", params.date);
  if (params.names) search.set("names", params.names);

  const qs = search.toString();
  const url = `${FACE_API_BASE}/api/attendance/daily${qs ? `?${qs}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load attendance: ${response.status}`);
  }
  return response.json() as Promise<AttendanceDayResponse>;
}

export type SnapshotLogItem = {
  id: number;
  name: string;
  company: string | null;
  timestamp: string;
  image_url: string;
};

export type SnapshotLogResponse = {
  items: SnapshotLogItem[];
};

export type AttendanceSummaryItem = {
  id: string;
  name: string;
  company: string | null;
  date: string;
  entry_time: string | null;
  exit_time: string | null;
  late_entry_minutes: number;
  late_entry_seconds: number;
  early_exit_minutes: number;
  early_exit_seconds: number;
  status: "Present" | "Late" | "Early Exit" | "Absent";
  total_hours: string;
  entry_image_url: string | null;
  exit_image_url: string | null;
};

export type AttendanceSummaryResponse = {
  items: AttendanceSummaryItem[];
};

export type SnapshotQueryParams = {
  limit?: number;
  offset?: number;
  name?: string;
};

export type AttendanceQueryParams = SnapshotQueryParams & {
  start?: string;
  end?: string;
};

function buildUrl(path: string, params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return `${FACE_API_BASE}${path}${qs ? `?${qs}` : ""}`;
}

export async function getAttendanceLogs(params: AttendanceQueryParams = {}): Promise<AttendanceSummaryResponse> {
  const url = buildUrl("/api/attendance", {
    start: params.start,
    end: params.end,
    name: params.name,
    limit: params.limit,
    offset: params.offset,
  });
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load attendance: ${response.status}`);
  }
  return response.json() as Promise<AttendanceSummaryResponse>;
}

export async function getSnapshotLogs(params: SnapshotQueryParams = {}): Promise<SnapshotLogResponse> {
  const url = buildUrl("/api/snapshots", {
    name: params.name,
    limit: params.limit,
    offset: params.offset,
  });
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load snapshots: ${response.status}`);
  }
  return response.json() as Promise<SnapshotLogResponse>;
}
