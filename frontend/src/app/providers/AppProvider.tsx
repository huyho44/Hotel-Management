import type { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

export function AppProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
