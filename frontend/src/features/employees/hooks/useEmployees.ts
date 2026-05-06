import { useCallback, useEffect, useState } from "react";
import {
  employeesApi,
  type Employee,
  type CreateEmployeePayload,
  type UpdateEmployeePayload,
} from "../api/employeesApi";

export function useEmployees() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await employeesApi.getAll();
      setData(result);
    } catch {
      setError("Cannot load employees data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const create = async (payload: CreateEmployeePayload) => {
    await employeesApi.create(payload);
    await fetchAll();
  };

  const update = async (id: number, payload: UpdateEmployeePayload) => {
    await employeesApi.update(id, payload);
    await fetchAll();
  };

  const remove = async (id: number) => {
    await employeesApi.remove(id);
    await fetchAll();
  };

  return { data, loading, error, create, update, remove, refresh: fetchAll };
}
