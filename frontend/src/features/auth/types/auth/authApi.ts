import type { LoginPayload, LoginResponse } from "../auth.types";
import type { UserRole } from "../../../../shared/types/role.types";

function inferRoleFromEmail(email: string): UserRole {
  const normalized = email.toLowerCase();

  if (normalized.includes("admin")) return "admin";
  if (normalized.includes("manager")) return "manager";
  if (normalized.includes("receptionist")) return "receptionist";
  return "service-staff";
}

export const authApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const role = inferRoleFromEmail(payload.email);

    return {
      accessToken: "mock-access-token",
      user: {
        id: crypto.randomUUID(),
        email: payload.email,
        fullName: payload.email.split("@")[0] || "User",
        role,
      },
    };
  },
};
