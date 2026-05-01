export type UserRole = "admin" | "manager" | "receptionist" | "service-staff";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}
