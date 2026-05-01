import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { ROUTES } from "../../shared/constants/routes";
import { ProtectedRoute } from "./ProtectedRoute";

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

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.login} element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path={ROUTES.admin} element={<AdminLayout />}>
            <Route
              index
              element={
                <PlaceholderPage
                  title="Admin Dashboard"
                  description="Trang tổng quan admin."
                />
              }
            />
            <Route
              path="employees"
              element={
                <PlaceholderPage
                  title="Employees"
                  description="Map với GET/POST/PUT/DELETE /employees."
                />
              }
            />
            <Route
              path="managers"
              element={
                <PlaceholderPage
                  title="Managers"
                  description="Map với GET/POST/PUT/DELETE /managers."
                />
              }
            />
            <Route
              path="receptionists"
              element={
                <PlaceholderPage
                  title="Receptionists"
                  description="Map với GET/POST/PUT/DELETE /receptionists."
                />
              }
            />
            <Route
              path="service-staffs"
              element={
                <PlaceholderPage
                  title="Service Staffs"
                  description="Map với GET/POST/PUT/DELETE /service-staffs."
                />
              }
            />
            <Route
              path="branches"
              element={
                <PlaceholderPage
                  title="Branches"
                  description="Map với GET /branches."
                />
              }
            />
            <Route
              path="reports/branch-revenue"
              element={
                <PlaceholderPage
                  title="Reports"
                  description="Map với các report endpoints."
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
