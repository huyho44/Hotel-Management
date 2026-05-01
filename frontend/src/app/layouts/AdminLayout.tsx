import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";

/* ─── Navigation items ─── */
const NAV_ITEMS = [
  {
    group: "Overall",
    items: [{ label: "Dashboard", path: "/admin", icon: IconDashboard }],
  },
  {
    group: "Human Resources",
    items: [
      { label: "Employees", path: "/admin/employees", icon: IconUsers },
      { label: "Managers", path: "/admin/managers", icon: IconBriefcase },
      {
        label: "Receptionists",
        path: "/admin/receptionists",
        icon: IconHeadset,
      },
      {
        label: "Service Staffs",
        path: "/admin/service-staffs",
        icon: IconWrench,
      },
    ],
  },
  {
    group: "System",
    items: [{ label: "Branches", path: "/admin/branches", icon: IconBuilding }],
  },
  {
    group: "Reports",
    items: [
      {
        label: "Branch Revenue",
        path: "/admin/reports/branch-revenue",
        icon: IconChart,
      },
      {
        label: "Customer Spending",
        path: "/admin/reports/customer-spending",
        icon: IconCoin,
      },
      {
        label: "Staff Performance",
        path: "/admin/reports/staff-performance",
        icon: IconStar,
      },
    ],
  },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div style={shellStyle}>
      {/* ── Sidebar ── */}
      <aside style={{ ...sidebarStyle, width: collapsed ? 64 : 240 }}>
        {/* Logo */}
        <div style={logoRowStyle}>
          <div style={logoIconStyle}>
            <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
              <path
                d="M8 28V14l10-6 10 6v14"
                stroke="white"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <rect
                x="14"
                y="20"
                width="8"
                height="8"
                rx="1"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
          {!collapsed && <span style={logoTextStyle}>Hotel Admin</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={collapseButtonStyle}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {collapsed ? (
                <path d="M9 18l6-6-6-6" />
              ) : (
                <path d="M15 18l-6-6 6-6" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav groups */}
        <nav style={navStyle}>
          {NAV_ITEMS.map((group) => (
            <div key={group.group} style={navGroupStyle}>
              {!collapsed && (
                <span style={navGroupLabelStyle}>{group.group}</span>
              )}
              {group.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    style={{
                      ...navItemStyle,
                      background: active
                        ? "rgba(207, 176, 176, 0.12)"
                        : "transparent",
                      color: active ? "#fff" : "rgba(255,255,255,0.6)",
                      justifyContent: collapsed ? "center" : "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      if (!active)
                        e.currentTarget.style.background =
                          "rgba(22, 143, 236, 0.07)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = active
                        ? "#fff"
                        : "rgba(255,255,255,0.6)";
                    }}
                  >
                    <span style={navIconStyle}>
                      <item.icon />
                    </span>
                    {!collapsed && <span>{item.label}</span>}
                    {active && !collapsed && <span style={activeDotStyle} />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div
          style={{
            ...userFooterStyle,
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <div style={avatarStyle}>
            {user?.fullName?.[0]?.toUpperCase() ?? "A"}
          </div>
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={userNameStyle}>{user?.fullName}</p>
              <p style={userRoleStyle}>{user?.role}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              title="Log out"
              style={logoutButtonStyle}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          )}
        </div>
      </aside>

      {/* ── Main area ── */}
      <div style={mainWrapperStyle}>
        {/* Topbar */}
        <header style={topbarStyle}>
          <div style={breadcrumbStyle}>
            <span style={{ color: "black", fontSize: 14 }}>Admin</span>
            <span style={{ color: "var(--color-text-faint)", margin: "0 6px" }}>
              /
            </span>
            <span
              style={{
                color: "black",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {getPageTitle(location.pathname)}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={searchBoxStyle}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "var(--color-text-faint)", flexShrink: 0 }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                style={searchInputStyle}
              />
            </div>

            <div style={topbarAvatarStyle}>
              {user?.fullName?.[0]?.toUpperCase() ?? "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={contentStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */
function getPageTitle(pathname: string): string {
  const map: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/employees": "Employees",
    "/admin/managers": "Managers",
    "/admin/receptionists": "Receptionists",
    "/admin/service-staffs": "Service Staffs",
    "/admin/branches": "Branches",
    "/admin/reports/branch-revenue": "Branch Revenue",
    "/admin/reports/customer-spending": "Customer Spending",
    "/admin/reports/staff-performance": "Staff Performance",
  };
  return map[pathname] ?? "Admin";
}

/* ─── Icons ─── */
function IconDashboard() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg
      width="17"
      height="17"
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
function IconBriefcase() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" />
    </svg>
  );
}
function IconHeadset() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z" />
      <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </svg>
  );
}
function IconWrench() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z" />
      <path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2" />
      <path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2" />
      <line x1="10" y1="6" x2="10" y2="6" />
      <line x1="14" y1="6" x2="14" y2="6" />
      <line x1="10" y1="10" x2="10" y2="10" />
      <line x1="14" y1="10" x2="14" y2="14" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function IconCoin() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M14.8 9A2 2 0 0013 8h-2a2 2 0 000 4h2a2 2 0 010 4h-2a2 2 0 01-1.8-1" />
      <line x1="12" y1="6" x2="12" y2="8" />
      <line x1="12" y1="16" x2="12" y2="18" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ─── Styles ─── */
const shellStyle: CSSProperties = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
  background: "var(--color-bg, #f7f6f2)",
};

const sidebarStyle: CSSProperties = {
  background: "linear-gradient(180deg, #0d1117 0%, #161b22 100%)",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  transition: "width 200ms cubic-bezier(0.16,1,0.3,1)",
  overflow: "hidden",
  position: "sticky",
  top: 0,
  height: "100vh",
};

const logoRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "1.25rem 1rem",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const logoIconStyle: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 10,
  background: "linear-gradient(135deg, #0f766e, #14b8a6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const logoTextStyle: CSSProperties = {
  color: "#fff",
  fontWeight: 700,
  fontSize: 15,
  flex: 1,
  whiteSpace: "nowrap",
};

const collapseButtonStyle: CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "none",
  borderRadius: 6,
  color: "rgba(255,255,255,0.5)",
  cursor: "pointer",
  width: 28,
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: 0,
};

const navStyle: CSSProperties = {
  flex: 1,
  overflowY: "auto",
  padding: "0.75rem 0.625rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
};

const navGroupStyle: CSSProperties = {
  marginBottom: "0.75rem",
};

const navGroupLabelStyle: CSSProperties = {
  display: "block",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.3)",
  padding: "0 0.5rem",
  marginBottom: "0.35rem",
};

const navItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "0.55rem 0.625rem",
  borderRadius: 8,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  transition: "background 150ms, color 150ms",
  position: "relative",
  whiteSpace: "nowrap",
};

const navIconStyle: CSSProperties = {
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
};

const activeDotStyle: CSSProperties = {
  marginLeft: "auto",
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "#14b8a6",
};

const userFooterStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "0.875rem 0.875rem",
  borderTop: "1px solid rgba(246, 6, 6, 0.06)",
};

const avatarStyle: CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #0f766e, #14b8a6)",
  color: "#fff",
  fontSize: 13,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const userNameStyle: CSSProperties = {
  color: "#fff",
  fontSize: 13,
  fontWeight: 600,
  margin: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "100%",
};

const userRoleStyle: CSSProperties = {
  color: "rgba(255,255,255,0.4)",
  fontSize: 11,
  margin: 0,
  textTransform: "capitalize",
};

const logoutButtonStyle: CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "none",
  borderRadius: 7,
  color: "rgba(255,255,255,0.45)",
  cursor: "pointer",
  width: 30,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: 0,
  transition: "background 150ms, color 150ms",
};

const mainWrapperStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
};

const topbarStyle: CSSProperties = {
  height: 56,
  background: "#f7fcfb",
  borderBottom: "1px solid #f2c67b",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 1.5rem",
  position: "sticky",
  top: 0,
  zIndex: 10,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const breadcrumbStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const searchBoxStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "#f2ecd5",
  border: "1px solid #e0bd7f",
  borderRadius: 8,
  padding: "0.4rem 0.75rem",
};

const searchInputStyle: CSSProperties = {
  border: "none",
  background: "transparent",
  outline: "none",
  fontSize: 13,
  color: "#374151",
  width: 160,
};

const topbarAvatarStyle: CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #0f766e, #14b8a6)",
  color: "#fff",
  fontSize: 12,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const contentStyle: CSSProperties = {
  flex: 1,
  padding: "1.75rem 2rem",
  overflowY: "auto",
  backgroundImage: "url('/assets/bg.webp')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "local",
};
