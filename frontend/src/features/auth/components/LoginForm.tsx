import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getDefaultRouteByRole } from "../../../app/router/getDefaultRouteByRole";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const user = await login({ email, password });
      navigate(getDefaultRouteByRole(user.role), { replace: true });
    } catch {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
      <div>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: 8, fontWeight: 600 }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@hotel.com"
          required
          style={inputStyle}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: 8, fontWeight: 600 }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          style={inputStyle}
        />
      </div>

      {error ? <p style={{ color: "#dc2626", margin: 0 }}>{error}</p> : null}

      <button type="submit" disabled={isSubmitting} style={buttonStyle}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
        TESTING CREDENTIALS:
      </p>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem 1rem",
  borderRadius: 10,
  border: "1px solid #0e795c",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.95rem 1rem",
  borderRadius: 10,
  border: "none",
  background: "#0f766e",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};
