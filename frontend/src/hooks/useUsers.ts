import { useEffect, useState } from "react";
import { userApi } from "../api/userApi";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
}

interface UseUsersParams {
  search?: string;
  sortBy?: keyof User;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  refetch: () => Promise<void>;
}

export function useUsers({
  search = "",
  sortBy = "firstName",
  order = "asc",
  page = 1,
  limit = 5,
}: UseUsersParams): UseUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userApi.getAll({ search, sortBy, order, page, limit });
      setUsers(res.data);
      setTotalPages(res.meta.totalPages);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(fetchUsers, 400);
    return () => clearTimeout(delay);
  }, [search, sortBy, order, page, limit]);

  return { users, loading, error, totalPages, refetch: fetchUsers };
}
