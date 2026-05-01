import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          background: "#fff",
          borderRadius: 18,
          padding: "2rem",
          boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: "0.75rem" }}>Sign in</h1>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
          Welcome to the Hotel Management System. Please sign in to continue.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
