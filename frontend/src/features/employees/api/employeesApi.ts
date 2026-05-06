import { apiClient } from "../../../shared/api/apiClient";

/* ─── Types ─── */

// GET /employees
export interface Employee {
  Citizen_ID: number;
  First_Name: string;
  Last_Name: string;
  Birth_Date: string;
  Email: string;
  Gender: "M" | "F";
  Branch_ID: number;
  Salary: number;
  Supervisor_ID: number | null;
}

// POST /employees
export interface CreateEmployeePayload {
  Citizen_ID: number;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Email: string;
  Gender: "M" | "F";
  Salary: number;
  Supervisor_ID?: number | null;
  Branch_ID: number;
}

// PUT /employees/:id
export type UpdateEmployeePayload = Partial<
  Omit<CreateEmployeePayload, "Citizen_ID">
>;

/* ─── API functions ─── */
export const employeesApi = {
  // GET /employees
  getAll: () => apiClient.get<Employee[]>("/employees").then((r) => r.data),

  // GET /employees/:id
  getById: (id: number) =>
    apiClient.get<Employee>(`/employees/${id}`).then((r) => r.data),

  // POST /employees
  create: (payload: CreateEmployeePayload) =>
    apiClient
      .post<{ message: string }>("/employees", payload)
      .then((r) => r.data),

  // PUT /employees/:id
  update: (id: number, payload: UpdateEmployeePayload) =>
    apiClient
      .put<{ message: string }>(`/employees/${id}`, payload)
      .then((r) => r.data),

  // DELETE /employees/:id
  remove: (id: number) =>
    apiClient
      .delete<{ message: string }>(`/employees/${id}`)
      .then((r) => r.data),
};
