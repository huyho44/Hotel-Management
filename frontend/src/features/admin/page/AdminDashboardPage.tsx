import type { CSSProperties } from "react";

/* ─── Mock data ─── */
const KPI_CARDS = [
  {
    label: "Monthly Revenue",
    value: "₫ 482.500.000",
    change: "+12.4%",
    positive: true,
    icon: IconRevenue,
    color: "#0f766e",
    bg: "#f0fdf9",
  },
  {
    label: "New Customers",
    value: "1.284",
    change: "+8.1%",
    positive: true,
    icon: IconCustomer,
    color: "#6366f1",
    bg: "#f5f3ff",
  },
  {
    label: "Total Employees",
    value: "96",
    change: "+3",
    positive: true,
    icon: IconStaff,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    label: "Active Branches",
    value: "5",
    change: "0%",
    positive: true,
    icon: IconBranch,
    color: "#3b82f6",
    bg: "#eff6ff",
  },
];

const MONTHLY_REVENUE = [
  { month: "T1", value: 320 },
  { month: "T2", value: 285 },
  { month: "T3", value: 410 },
  { month: "T4", value: 390 },
  { month: "T5", value: 482 },
  { month: "T6", value: 350 },
  { month: "T7", value: 420 },
  { month: "T8", value: 510 },
  { month: "T9", value: 465 },
  { month: "T10", value: 530 },
  { month: "T11", value: 490 },
  { month: "T12", value: 610 },
];

const BRANCH_DATA = [
  { name: "Q1 - HCM", revenue: 182, color: "#0f766e" },
  { name: "Q3 - HCM", revenue: 143, color: "#14b8a6" },
  { name: "Hà Nội", revenue: 97, color: "#6366f1" },
  { name: "Đà Nẵng", revenue: 76, color: "#f59e0b" },
  { name: "Nha Trang", revenue: 54, color: "#3b82f6" },
];

const RECENT_EMPLOYEES = [
  {
    name: "Nguyễn Văn An",
    role: "Receptionist",
    branch: "Q1 - HCM",
    salary: "12.000.000",
  },
  {
    name: "Trần Thị Bình",
    role: "Service Staff",
    branch: "Q3 - HCM",
    salary: "10.500.000",
  },
  {
    name: "Lê Hoàng Cường",
    role: "Manager",
    branch: "Hà Nội",
    salary: "22.000.000",
  },
  {
    name: "Phạm Thị Dung",
    role: "Receptionist",
    branch: "Đà Nẵng",
    salary: "11.500.000",
  },
  {
    name: "Hoàng Minh Em",
    role: "Service Staff",
    branch: "Nha Trang",
    salary: "10.000.000",
  },
];

const MAX_REVENUE = Math.max(...MONTHLY_REVENUE.map((d) => d.value));
const MAX_BRANCH = Math.max(...BRANCH_DATA.map((d) => d.revenue));

/* ─── Component ─── */
export function AdminDashboardPage() {
  return (
    <div style={pageStyle}>
      {/* Page title */}
      <div style={pageTitleRowStyle}>
        <div>
          <h1 style={pageTitleStyle}>Dashboard</h1>
          <p style={pageSubtitleStyle}>Tổng quan hệ thống — tháng 5, 2026</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={kpiGridStyle}>
        {KPI_CARDS.map((card) => (
          <div key={card.label} style={kpiCardStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  ...kpiIconWrapStyle,
                  background: card.bg,
                  color: card.color,
                }}
              >
                <card.icon />
              </div>
              <span
                style={{
                  ...changeBadgeStyle,
                  background: card.positive ? "#f0fdf4" : "#fef2f2",
                  color: card.positive ? "#16a34a" : "#dc2626",
                }}
              >
                {card.positive ? "↑" : "↓"} {card.change}
              </span>
            </div>
            <p style={kpiLabelStyle}>{card.label}</p>
            <p style={{ ...kpiValueStyle, color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={chartsRowStyle}>
        {/* Monthly revenue bar chart */}
        <div style={{ ...chartCardStyle, flex: 2 }}>
          <div style={chartHeaderStyle}>
            <div>
              <h2 style={chartTitleStyle}>Monthly Revenue</h2>
              <p style={chartSubtitleStyle}>Unit: Million VND</p>
            </div>
          </div>
          <div style={barChartWrapStyle}>
            {MONTHLY_REVENUE.map((d) => {
              const pct = (d.value / MAX_REVENUE) * 100;
              return (
                <div key={d.month} style={barColStyle}>
                  <span style={barValueStyle}>{d.value}</span>
                  <div style={barTrackStyle}>
                    <div
                      style={{
                        ...barFillStyle,
                        height: `${pct}%`,
                        background:
                          d.month === "T5"
                            ? "linear-gradient(180deg,#0f766e,#14b8a6)"
                            : "linear-gradient(180deg,#93c5c0,#b2d8d5)",
                      }}
                    />
                  </div>
                  <span style={barLabelStyle}>{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Branch revenue horizontal bar */}
        <div style={{ ...chartCardStyle, flex: 1 }}>
          <div style={chartHeaderStyle}>
            <div>
              <h2 style={chartTitleStyle}>Branch Revenue</h2>
              <p style={chartSubtitleStyle}>This Month · Million VND</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginTop: 8,
            }}
          >
            {BRANCH_DATA.map((d) => (
              <div key={d.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span
                    style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}
                  >
                    {d.name}
                  </span>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>
                    {d.revenue}M
                  </span>
                </div>
                <div style={hBarTrackStyle}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 999,
                      background: d.color,
                      width: `${(d.revenue / MAX_BRANCH) * 100}%`,
                      transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent employees table */}
      <div style={tableCardStyle}>
        <div style={chartHeaderStyle}>
          <h2 style={chartTitleStyle}>Recent Employees</h2>
          <a href="/admin/employees" style={viewAllStyle}>
            View All →
          </a>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Name", "Role", "Branch", "Salary (VND)"].map((h) => (
                  <th key={h} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_EMPLOYEES.map((emp, i) => (
                <tr
                  key={emp.name}
                  style={{ background: i % 2 === 0 ? "#fff" : "#fafaf9" }}
                >
                  <td style={tdStyle}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div style={tableAvatarStyle}>
                        {emp.name.split(" ").pop()?.[0]}
                      </div>
                      <span style={{ fontWeight: 500, color: "#111827" }}>
                        {emp.name}
                      </span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        ...rolePillStyle,
                        ...getRoleStyle(emp.role),
                      }}
                    >
                      {emp.role}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: "#6b7280" }}>{emp.branch}</td>
                  <td
                    style={{
                      ...tdStyle,
                      fontFamily: "monospace",
                      color: "#374151",
                    }}
                  >
                    {emp.salary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Role badge colors ─── */
function getRoleStyle(role: string): CSSProperties {
  const map: Record<string, CSSProperties> = {
    Manager: { background: "#eff6ff", color: "#2563eb" },
    Receptionist: { background: "#f0fdf4", color: "#16a34a" },
    "Service Staff": { background: "#fff7ed", color: "#ea580c" },
  };
  return map[role] ?? { background: "#f3f4f6", color: "#374151" };
}

/* ─── Icons ─── */
function IconRevenue() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}
function IconCustomer() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function IconStaff() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  );
}
function IconBranch() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z" />
      <path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2" />
      <path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2" />
    </svg>
  );
}

/* ─── Styles ─── */
const pageStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const pageTitleRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const pageTitleStyle: CSSProperties = {
  fontSize: "clamp(1.25rem, 1.5vw, 1.5rem)",
  fontWeight: 700,
  color: "#111827",
  margin: 0,
  letterSpacing: "-0.02em",
};

const pageSubtitleStyle: CSSProperties = {
  fontSize: 13,
  color: "#9ca3af",
  margin: "4px 0 0",
};

const kpiGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "1rem",
};

const kpiCardStyle: CSSProperties = {
  background: "rgba(252, 252, 252, 0.82)",
  backdropFilter: "blur(16px)",
  borderRadius: 16,
  padding: "1.25rem",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
};

const kpiIconWrapStyle: CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const changeBadgeStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  padding: "3px 8px",
  borderRadius: 999,
};

const kpiLabelStyle: CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
  margin: "0 0 4px",
  fontWeight: 500,
};

const kpiValueStyle: CSSProperties = {
  fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
  fontWeight: 700,
  margin: 0,
  letterSpacing: "-0.02em",
};

const chartsRowStyle: CSSProperties = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
};

const chartCardStyle: CSSProperties = {
  background: "rgba(255,255,255,0.82)",
  backdropFilter: "blur(16px)",
  borderRadius: 16,
  padding: "1.25rem 1.5rem",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
  minWidth: 260,
};

const chartHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: "1.25rem",
};

const chartTitleStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: "#111827",
  margin: 0,
};

const chartSubtitleStyle: CSSProperties = {
  fontSize: 12,
  color: "#9ca3af",
  margin: "3px 0 0",
};

const barChartWrapStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  gap: 6,
  height: 160,
};

const barColStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  height: "100%",
};

const barValueStyle: CSSProperties = {
  fontSize: 9,
  color: "#9ca3af",
  height: 14,
};

const barTrackStyle: CSSProperties = {
  flex: 1,
  width: "100%",
  display: "flex",
  alignItems: "flex-end",
};

const barFillStyle: CSSProperties = {
  width: "100%",
  borderRadius: "4px 4px 0 0",
  transition: "height 0.6s cubic-bezier(0.16,1,0.3,1)",
};

const barLabelStyle: CSSProperties = {
  fontSize: 10,
  color: "#9ca3af",
  fontWeight: 500,
};

const hBarTrackStyle: CSSProperties = {
  height: 7,
  borderRadius: 999,
  background: "#e1b401",
  overflow: "hidden",
};

const tableCardStyle: CSSProperties = {
  background: "rgba(252, 252, 252, 0.82)",
  backdropFilter: "blur(16px)",
  borderRadius: 16,
  padding: "1.25rem 1.5rem",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
};

const thStyle: CSSProperties = {
  textAlign: "left",
  fontSize: 12,
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  padding: "0.625rem 1rem 0.625rem 0",
  borderBottom: "1px solid #e1b36f",
};

const tdStyle: CSSProperties = {
  fontSize: 14,
  padding: "0.75rem 1rem 0.75rem 0",
  borderBottom: "1px solid #e1b36f",
  verticalAlign: "middle",
};

const tableAvatarStyle: CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#0f766e,#14b8a6)",
  color: "#fff",
  fontSize: 12,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const rolePillStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  padding: "3px 10px",
  borderRadius: 999,
};

const viewAllStyle: CSSProperties = {
  fontSize: 13,
  color: "#0f766e",
  textDecoration: "none",
  fontWeight: 600,
};
