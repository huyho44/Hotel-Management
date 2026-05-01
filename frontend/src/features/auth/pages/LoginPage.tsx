import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getDefaultRouteByRole } from "../../../app/router/getDefaultRouteByRole";
import { useAuth } from "../hooks/useAuth";
import React from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const user = await login({ email, password });
      navigate(getDefaultRouteByRole(user.role), { replace: true });
    } catch {
      setError("Sai thông tin đăng nhập. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Left panel — branding */}
      <div style={leftPanelStyle}>
        <div style={leftContentStyle}>
          <div style={logoStyle}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect
                width="36"
                height="36"
                rx="10"
                fill="white"
                fillOpacity="0.15"
              />
              <path
                d="M8 28V14l10-6 10 6v14"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <rect
                x="14"
                y="20"
                width="8"
                height="8"
                rx="1"
                stroke="white"
                strokeWidth="2"
              />
              <rect
                x="15"
                y="12"
                width="6"
                height="5"
                rx="1"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            <span style={logoTextStyle}>Hotel Management</span>
          </div>

          <div style={heroCopyStyle}>
            <h1 style={heroTitleStyle}>Hotel Management System</h1>
            <p style={heroSubtitleStyle}>
              Monitoring and managing your hotel operations efficiently
            </p>
          </div>

          <div style={featureListStyle}>
            {[
              { icon: "👥", text: "Role-based employee management" },
              { icon: "🏨", text: "Branch monitoring and revenue tracking" },
              { icon: "📊", text: "Real-time performance reporting" },
            ].map((item) => (
              <div key={item.text} style={featureItemStyle}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={featureTextStyle}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={leftPatternStyle} />
      </div>

      {/* Right panel — login form */}
      <div style={rightPanelStyle}>
        <div style={formWrapperStyle}>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={formTitleStyle}>Login</h2>
            <p style={formSubtitleStyle}>
              Enter your account information to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={fieldGroupStyle}>
              <label htmlFor="email" style={labelStyle}>
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
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#0f766e";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(15,118,110,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={fieldGroupStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <label htmlFor="password" style={labelStyle}>
                  Password
                </label>
                <a href="#" style={forgotLinkStyle}>
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#0f766e";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(15,118,110,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {error && (
              <div style={errorBoxStyle}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...submitButtonStyle,
                opacity: isSubmitting ? 0.75 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <span style={spinnerStyle} /> Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div style={roleHintStyle}>
            <p style={roleHintTitleStyle}>Demo Accounts</p>
            <div style={{ display: "grid", gap: 6 }}>
              {[
                { role: "Admin", email: "admin@hotel.com" },
                { role: "Manager", email: "manager@hotel.com" },
                { role: "Receptionist", email: "receptionist@hotel.com" },
                { role: "Service Staff", email: "staff@hotel.com" },
              ].map((item) => (
                <div key={item.role} style={roleHintRowStyle}>
                  <span style={roleBadgeStyle}>{item.role}</span>
                  <span
                    style={{
                      color: "#6b7280",
                      fontFamily: "monospace",
                      fontSize: 13,
                    }}
                  >
                    {item.email}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Styles ─── */

const containerStyle: React.CSSProperties = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
};

const leftPanelStyle: React.CSSProperties = {
  flex: "0 0 480px",
  background: "linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)",
  padding: "3rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
};

const leftPatternStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(255,255,255,0.06) 0%, transparent 50%)`,
  pointerEvents: "none",
};

const leftContentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2.5rem",
};

const logoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const logoTextStyle: React.CSSProperties = {
  color: "#fff",
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: "-0.01em",
};

const heroCopyStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const heroTitleStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
  fontWeight: 700,
  lineHeight: 1.25,
  letterSpacing: "-0.02em",
  margin: 0,
};

const heroSubtitleStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.75)",
  fontSize: 16,
  lineHeight: 1.6,
  margin: 0,
};

const featureListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const featureItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  background: "rgba(255,255,255,0.1)",
  borderRadius: 12,
  backdropFilter: "blur(10px)",
};

const featureTextStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.9)",
  fontSize: 14,
  fontWeight: 500,
};

const rightPanelStyle: React.CSSProperties = {
  flex: 1,
  background: "#f9fafb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem 2rem",
  backgroundImage: "url('/assets/bg.webp')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const formWrapperStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 420,
  background: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(12px)",
  borderRadius: 20,
  padding: "2rem",
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
};

const formTitleStyle: React.CSSProperties = {
  fontSize: "clamp(1.5rem, 2vw, 1.875rem)",
  fontWeight: 700,
  color: "#111827",
  letterSpacing: "-0.02em",
  margin: "0 0 6px",
};

const formSubtitleStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#6b7280",
  margin: 0,
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  marginBottom: "1.5rem",
};

const fieldGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 8,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: 10,
  border: "1.5px solid #e5e7eb",
  background: "#fff",
  fontSize: 15,
  color: "#111827",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  boxSizing: "border-box",
};

const forgotLinkStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#0f766e",
  textDecoration: "none",
  fontWeight: 500,
};

const errorBoxStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "0.75rem 1rem",
  background: "#fef2f2",
  border: "1px solid #fecaca",
  borderRadius: 10,
  color: "#dc2626",
  fontSize: 14,
};

const submitButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.875rem 1rem",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(135deg, #0f766e, #14b8a6)",
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: "0.01em",
  boxShadow: "0 4px 14px rgba(15,118,110,0.35)",
  transition: "opacity 0.15s, transform 0.15s",
};

const spinnerStyle: React.CSSProperties = {
  width: 16,
  height: 16,
  borderRadius: "50%",
  border: "2px solid rgba(255,255,255,0.3)",
  borderTopColor: "#fff",
  display: "inline-block",
  animation: "spin 0.7s linear infinite",
};

const roleHintStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "1rem",
};

const roleHintTitleStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  margin: "0 0 10px",
};

const roleHintRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const roleBadgeStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  padding: "2px 8px",
  borderRadius: 999,
  background: "#f0fdf4",
  color: "#16a34a",
  border: "1px solid #bbf7d0",
  minWidth: 80,
  textAlign: "center",
};
