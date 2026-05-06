import { useState, type CSSProperties, type FormEvent } from "react";
import { useEmployees } from "../hooks/useEmployees";
import type {
  CreateEmployeePayload,
  Employee,
  UpdateEmployeePayload,
} from "../api/employeesApi";

/* ─── EmployeesPage ─── */
export function EmployeesPage() {
  const { data, loading, error, create, update, remove } = useEmployees();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const filtered = data.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.First_Name.toLowerCase().includes(q) ||
      e.Last_Name.toLowerCase().includes(q) ||
      e.Email.toLowerCase().includes(q) ||
      String(e.Citizen_ID).includes(q)
    );
  });

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (payload: CreateEmployeePayload) => {
    setSubmitting(true);
    try {
      await create(payload);
      setShowModal(false);
      showToast("Add employee successful!", "success");
    } catch (e: any) {
      showToast(
        e?.response?.data?.error || "Failed to create employee.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (payload: UpdateEmployeePayload) => {
    if (!editTarget) return;
    setSubmitting(true);
    try {
      await update(editTarget.Citizen_ID, payload);
      setEditTarget(null);
      showToast("Update employee successful!", "success");
    } catch (e: any) {
      showToast(
        e?.response?.data?.error || "Failed to update employee.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSubmitting(true);
    try {
      await remove(deleteTarget.Citizen_ID);
      setDeleteTarget(null);
      showToast("Delete employee successful!", "success");
    } catch (e: any) {
      showToast(
        e?.response?.data?.error || "Failed to delete employee.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={pageStyle}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            ...toastStyle,
            background: toast.type === "success" ? "#f0fdf4" : "#fef2f2",
            borderColor: toast.type === "success" ? "#86efac" : "#fca5a5",
            color: toast.type === "success" ? "#16a34a" : "#dc2626",
          }}
        >
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={headerRowStyle}>
        <div>
          <h1 style={pageTitleStyle}>Employees</h1>
          <p style={pageSubStyle}>{data.length} employees in the system</p>
        </div>
        <button style={btnPrimaryStyle} onClick={() => setShowModal(true)}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>＋</span> Add Employee
        </button>
      </div>

      {/* Search */}
      <div style={searchWrapStyle}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          style={{ flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          style={searchInputStyle}
          placeholder="Search by name, email, ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button style={clearBtnStyle} onClick={() => setSearch("")}>
            ✕
          </button>
        )}
      </div>

      {/* Table */}
      <div style={tableCardStyle}>
        {loading ? (
          <div style={centerStyle}>
            <div style={spinnerStyle} />
            <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 12 }}>
              Loading employees data...
            </p>
          </div>
        ) : error ? (
          <div style={centerStyle}>
            <p style={{ color: "#dc2626", fontSize: 14 }}>⚠ {error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={centerStyle}>
            <p style={{ color: "#9ca3af", fontSize: 14 }}>
              No employees found matching "{search}"
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f0ede8" }}>
                  {[
                    "ID",
                    "Full Name",
                    "Email",
                    "Gender",
                    "Date of Birth",
                    "Salary (VND)",
                    "Branch",
                    "",
                  ].map((h) => (
                    <th key={h} style={thStyle}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp, i) => (
                  <tr
                    key={emp.Citizen_ID}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#fafaf9",
                      transition: "background 120ms",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f0fdf9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        i % 2 === 0 ? "#fff" : "#fafaf9")
                    }
                  >
                    <td
                      style={{
                        ...tdStyle,
                        color: "#9ca3af",
                        fontFamily: "monospace",
                        fontSize: 12,
                      }}
                    >
                      #{emp.Citizen_ID}
                    </td>
                    <td style={tdStyle}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div style={avatarStyle}>
                          {emp.First_Name[0]}
                          {emp.Last_Name[0]}
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontWeight: 600,
                              color: "#111827",
                              fontSize: 14,
                            }}
                          >
                            {emp.First_Name} {emp.Last_Name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, color: "#6b7280", fontSize: 13 }}>
                      {emp.Email}
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          ...genderBadgeStyle,
                          ...(emp.Gender === "M" ? genderMStyle : genderFStyle),
                        }}
                      >
                        {emp.Gender === "M" ? "Male" : "Female"}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: "#6b7280", fontSize: 13 }}>
                      {emp.Birth_Date
                        ? new Date(emp.Birth_Date).toLocaleDateString("vi-VN")
                        : "—"}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        fontFamily: "monospace",
                        fontSize: 13,
                        color: "#374151",
                      }}
                    >
                      {Number(emp.Salary).toLocaleString("vi-VN")}
                    </td>
                    <td style={tdStyle}>
                      <span style={branchBadgeStyle}>
                        Branch #{emp.Branch_ID}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          justifyContent: "flex-end",
                        }}
                      >
                        <button
                          style={btnEditStyle}
                          onClick={() => setEditTarget(emp)}
                          title="Edit"
                        >
                          <IconEdit />
                        </button>
                        <button
                          style={btnDeleteStyle}
                          onClick={() => setDeleteTarget(emp)}
                          title="Delete"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <Modal title="Create Employee" onClose={() => setShowModal(false)}>
          <EmployeeForm
            submitting={submitting}
            onSubmit={handleCreate}
            onCancel={() => setShowModal(false)}
            submitLabel="Create Employee"
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editTarget && (
        <Modal title="Edit Employee" onClose={() => setEditTarget(null)}>
          <EmployeeForm
            initial={editTarget}
            submitting={submitting}
            onSubmit={handleUpdate}
            onCancel={() => setEditTarget(null)}
            submitLabel="Save Changes"
          />
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <Modal title="Confirm Deletion" onClose={() => setDeleteTarget(null)}>
          <p style={{ color: "#374151", fontSize: 15, marginBottom: "1.5rem" }}>
            Are you sure you want to delete employee{" "}
            <strong>
              {deleteTarget.First_Name} {deleteTarget.Last_Name}
            </strong>
            ?<br />
            <span style={{ color: "#9ca3af", fontSize: 13 }}>
              This action cannot be undone.
            </span>
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button
              style={btnSecondaryStyle}
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </button>
            <button
              style={btnDangerStyle}
              onClick={handleDelete}
              disabled={submitting}
            >
              {submitting ? "Deleting..." : "Delete Employee"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ─── Modal wrapper ─── */
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>{title}</h2>
          <button style={closeBtnStyle} onClick={onClose}>
            ✕
          </button>
        </div>
        <div style={{ padding: "1.25rem 1.5rem" }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Employee Form ─── */
type FormProps = {
  initial?: Employee;
  submitting: boolean;
  onSubmit: (payload: any) => void;
  onCancel: () => void;
  submitLabel: string;
};

function EmployeeForm({
  initial,
  submitting,
  onSubmit,
  onCancel,
  submitLabel,
}: FormProps) {
  const [form, setForm] = useState({
    Citizen_ID: initial?.Citizen_ID ?? "",
    FirstName: initial?.First_Name ?? "",
    LastName: initial?.Last_Name ?? "",
    DateOfBirth: initial?.Birth_Date ? initial.Birth_Date.split("T")[0] : "",
    Email: initial?.Email ?? "",
    Gender: initial?.Gender ?? "M",
    Salary: initial?.Salary ?? "",
    Supervisor_ID: initial?.Supervisor_ID ?? "",
    Branch_ID: initial?.Branch_ID ?? "",
  });

  const set = (key: string, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: any = {
      FirstName: form.FirstName,
      LastName: form.LastName,
      DateOfBirth: form.DateOfBirth,
      Email: form.Email,
      Gender: form.Gender,
      Salary: Number(form.Salary),
      Supervisor_ID: form.Supervisor_ID ? Number(form.Supervisor_ID) : null,
      Branch_ID: Number(form.Branch_ID),
    };
    if (!initial) payload.Citizen_ID = Number(form.Citizen_ID);
    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {/* Citizen ID */}
      {!initial && (
        <Field label="Citizen ID *">
          <input
            style={inputStyle}
            type="number"
            required
            value={form.Citizen_ID}
            onChange={(e) => set("Citizen_ID", e.target.value)}
            placeholder="VD: 123456789"
          />
        </Field>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <Field label="Last Name *">
          <input
            style={inputStyle}
            required
            value={form.LastName}
            onChange={(e) => set("LastName", e.target.value)}
            placeholder="Ho"
          />
        </Field>
        <Field label="First Name *">
          <input
            style={inputStyle}
            required
            value={form.FirstName}
            onChange={(e) => set("FirstName", e.target.value)}
            placeholder="Quoc Huy"
          />
        </Field>
      </div>

      <Field label="Email *">
        <input
          style={inputStyle}
          type="email"
          required
          value={form.Email}
          onChange={(e) => set("Email", e.target.value)}
          placeholder="employee@hotel.com"
        />
      </Field>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <Field label="Date of Birth *">
          <input
            style={inputStyle}
            type="date"
            required
            value={form.DateOfBirth}
            onChange={(e) => set("DateOfBirth", e.target.value)}
          />
        </Field>
        <Field label="Gender *">
          <select
            style={inputStyle}
            value={form.Gender}
            onChange={(e) => set("Gender", e.target.value)}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </Field>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <Field label="Salary (VND) *">
          <input
            style={inputStyle}
            type="number"
            required
            value={form.Salary}
            onChange={(e) => set("Salary", e.target.value)}
            placeholder="12000000"
          />
        </Field>
        <Field label="Branch ID *">
          <input
            style={inputStyle}
            type="number"
            required
            value={form.Branch_ID}
            onChange={(e) => set("Branch_ID", e.target.value)}
            placeholder="1"
          />
        </Field>
      </div>

      <Field label="Supervisor ID (leave blank if none)">
        <input
          style={inputStyle}
          type="number"
          value={form.Supervisor_ID}
          onChange={(e) => set("Supervisor_ID", e.target.value)}
          placeholder="Optional"
        />
      </Field>

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "flex-end",
          paddingTop: 4,
        }}
      >
        <button type="button" style={btnSecondaryStyle} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" style={btnPrimaryStyle} disabled={submitting}>
          {submitting ? "Processing..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

/* ─── Icons ─── */
function IconEdit() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}

/* ─── Styles ─── */
const pageStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  position: "relative",
};

const toastStyle: CSSProperties = {
  position: "fixed",
  top: 20,
  right: 24,
  zIndex: 9999,
  padding: "0.75rem 1.25rem",
  borderRadius: 10,
  border: "1px solid",
  fontSize: 14,
  fontWeight: 600,
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const headerRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 12,
};
const pageTitleStyle: CSSProperties = {
  fontSize: "clamp(1.25rem,1.5vw,1.5rem)",
  fontWeight: 700,
  color: "#111827",
  margin: 0,
  letterSpacing: "-0.02em",
};
const pageSubStyle: CSSProperties = {
  fontSize: 13,
  color: "#0e0e0f",
  margin: "4px 0 0",
};

const searchWrapStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(12px)",
  border: "1px solid #e8e5e0",
  borderRadius: 10,
  padding: "0.55rem 1rem",
  maxWidth: 360,
};
const searchInputStyle: CSSProperties = {
  border: "none",
  background: "transparent",
  outline: "none",
  fontSize: 14,
  color: "#374151",
  flex: 1,
};
const clearBtnStyle: CSSProperties = {
  background: "none",
  border: "none",
  color: "#9ca3af",
  cursor: "pointer",
  fontSize: 12,
  padding: 0,
};

const tableCardStyle: CSSProperties = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(16px)",
  borderRadius: 16,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
  overflow: "hidden",
  minHeight: 200,
};

const centerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem 1rem",
};
const spinnerStyle: CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  border: "3px solid #e5e7eb",
  borderTopColor: "#0f766e",
  animation: "spin 0.7s linear infinite",
};

const thStyle: CSSProperties = {
  textAlign: "left",
  fontSize: 11,
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  padding: "0.875rem 1rem",
};
const tdStyle: CSSProperties = {
  fontSize: 14,
  padding: "0.875rem 1rem",
  borderBottom: "1px solid #f9f7f4",
  verticalAlign: "middle",
};

const avatarStyle: CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#0f766e,#14b8a6)",
  color: "#fff",
  fontSize: 11,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const genderBadgeStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  padding: "2px 10px",
  borderRadius: 999,
};
const genderMStyle: CSSProperties = { background: "#eff6ff", color: "#2563eb" };
const genderFStyle: CSSProperties = { background: "#fdf2f8", color: "#db2777" };
const branchBadgeStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  padding: "2px 10px",
  borderRadius: 999,
  background: "#f3f4f6",
  color: "#6b7280",
};

const btnPrimaryStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "0.6rem 1.1rem",
  borderRadius: 9,
  border: "none",
  background: "linear-gradient(135deg,#0f766e,#14b8a6)",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(15,118,110,0.3)",
};
const btnSecondaryStyle: CSSProperties = {
  padding: "0.6rem 1.1rem",
  borderRadius: 9,
  border: "1.5px solid #e5e7eb",
  background: "#fff",
  color: "#374151",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};
const btnDangerStyle: CSSProperties = {
  padding: "0.6rem 1.1rem",
  borderRadius: 9,
  border: "none",
  background: "#dc2626",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};
const btnEditStyle: CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 7,
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#374151",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const btnDeleteStyle: CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 7,
  border: "1px solid #fecaca",
  background: "#fff5f5",
  color: "#dc2626",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  backdropFilter: "blur(4px)",
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
};
const modalStyle: CSSProperties = {
  background: "#fff",
  borderRadius: 18,
  width: "100%",
  maxWidth: 520,
  boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
  overflow: "hidden",
};
const modalHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1.25rem 1.5rem",
  borderBottom: "1px solid #f0ede8",
};
const modalTitleStyle: CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: "#111827",
  margin: 0,
};
const closeBtnStyle: CSSProperties = {
  background: "none",
  border: "none",
  color: "#9ca3af",
  fontSize: 16,
  cursor: "pointer",
  lineHeight: 1,
  padding: 4,
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "0.65rem 0.875rem",
  borderRadius: 9,
  border: "1.5px solid #e5e7eb",
  fontSize: 14,
  color: "#111827",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
};
const labelStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#374151",
};
