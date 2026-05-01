import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
      <Outlet />
    </div>
  );
}
