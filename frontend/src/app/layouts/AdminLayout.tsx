import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const linkStyle: React.CSSProperties = {
  color: "#e5e7eb",
  textDecoration: "none",
  padding: "0.75rem 1rem",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.06)",
};

export function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 260,
          background: "#111827",
          color: "#fff",
          padding: "1.5rem 1rem",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>Hotel Management</h2>
        <p style={{ color: "#9ca3af", marginBottom: "1.5rem" }}>
          {user?.fullName} · {user?.role}
        </p>

        <nav style={{ display: "grid", gap: "0.75rem" }}>
          <Link to="/admin" style={linkStyle}>
            Dashboard
          </Link>
          <Link to="/admin/employees" style={linkStyle}>
            Employees
          </Link>
          <Link to="/admin/managers" style={linkStyle}>
            Managers
          </Link>
          <Link to="/admin/receptionists" style={linkStyle}>
            Receptionists
          </Link>
          <Link to="/admin/service-staffs" style={linkStyle}>
            Service Staffs
          </Link>
          <Link to="/admin/branches" style={linkStyle}>
            Branches
          </Link>
          <Link to="/admin/reports/branch-revenue" style={linkStyle}>
            Reports
          </Link>
          <button
            onClick={logout}
            style={{
              ...linkStyle,
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "2rem", background: "#f9fafb" }}>
        <Outlet />
      </main>
    </div>
  );
}
