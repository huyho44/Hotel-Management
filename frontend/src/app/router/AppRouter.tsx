import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { ROUTES } from "../../shared/constants/routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminDashboardPage } from "../../features/admin/page/AdminDashboardPage";
import { EmployeesPage } from "../../features/employees/page/EmployeesPage";

function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 style={{ marginBottom: "0.75rem" }}>{title}</h1>
      <p style={{ color: "#6b7280" }}>{description}</p>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.root}
          element={<Navigate to={ROUTES.login} replace />}
        />

        <Route>
          <Route path={ROUTES.login} element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path={ROUTES.admin} element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route
              path="managers"
              element={
                <PlaceholderPage
                  title="Managers"
                  description="Overall summary and quick links to manager management."
                />
              }
            />
            <Route
              path="receptionists"
              element={
                <PlaceholderPage
                  title="Receptionists"
                  description="Overall summary and quick links to receptionist management."
                />
              }
            />
            <Route
              path="service-staffs"
              element={
                <PlaceholderPage
                  title="Service Staffs"
                  description="Overall summary and quick links to service staff management."
                />
              }
            />
            <Route
              path="branches"
              element={
                <PlaceholderPage
                  title="Branches"
                  description="Overall summary and quick links to branch management."
                />
              }
            />
            <Route
              path="reports/branch-revenue"
              element={
                <PlaceholderPage
                  title="Reports"
                  description="Overall summary and quick links to branch revenue reports."
                />
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
