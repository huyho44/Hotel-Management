import { ROUTES } from "../../shared/constants/routes";
import type { UserRole } from "../../shared/types/role.types";

export function getDefaultRouteByRole(role: UserRole) {
  switch (role) {
    case "admin":
      return ROUTES.admin;
    case "manager":
      return ROUTES.manager;
    case "receptionist":
      return ROUTES.receptionist;
    case "service-staff":
      return ROUTES.serviceStaff;
    default:
      return ROUTES.login;
  }
}
