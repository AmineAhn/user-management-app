import { useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import { useAuth } from "../context/AuthContext";
import { CreateUserForm } from "../components/CreateUserForm";
import { EditUserForm } from "../components/EditUserForm";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
}

export const UsersPage = () => {
  const { logout } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof User>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userApi.getAll({
        search,
        sortBy: sortField,
        order: sortOrder,
        page,
        limit,
      });

      setUsers(res.data);
      setTotalPages(res.meta.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await userApi.delete(id);
      fetchUsers(); // refresh from backend
    } catch {
      alert("Failed to delete user");
    }
  };

  // fetch on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // refetch when search, sort, or pagination changes
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(delay);
  }, [search, sortField, sortOrder, page, limit]);

  if (loading) return <p>Charegement utilisateurs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Utilisateurs
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <Button variant="outlined" color="inherit" onClick={logout}>
          Se déconnecter
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateForm(true)}
        >
          Créer un utilisateur
        </Button>
      </Box>

      {showCreateForm && (
        <CreateUserForm
          onSuccess={() => {
            setShowCreateForm(false);
            fetchUsers();
          }}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onSuccess={() => {
            setEditingUser(null);
            fetchUsers();
          }}
          onCancel={() => setEditingUser(null)}
        />
      )}

      <TextField
        label="Recherche avec nom ou email"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        sx={{ width: 300, mr: 2 }}
      />

      <Button
        onClick={() => {
          setSearch("");
          setSortField("firstName");
          setSortOrder("asc");
          setPage(1);
        }}
      >
        Réinitialiser les filtres
      </Button>

      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {["Prénom", "lastName", "email", "birthDate"].map((key) => (
                    <TableCell
                      key={key}
                      onClick={() => {
                        if (sortField === key) {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortField(key as keyof User);
                          setSortOrder("asc");
                        }
                        setPage(1);
                      }}
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          sortField === key ? "action.hover" : "transparent",
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                      {sortField === key
                        ? sortOrder === "asc"
                          ? "↑"
                          : "↓"
                        : ""}
                    </TableCell>
                  ))}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.firstName}</TableCell>
                    <TableCell>{u.lastName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      {new Date(u.birthDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        size="small"
                        onClick={() => handleDelete(u.id)}
                        sx={{ mr: 1 }}
                      >
                        Supprimer
                      </Button>
                      <Button
                        color="primary"
                        size="small"
                        onClick={() => setEditingUser(u)}
                      >
                        Modifier
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" alignItems="center" mt={2} gap={2}>
            <Button
              variant="outlined"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              ← Précedent
            </Button>

            <Typography>
              Page {page} / {totalPages}
            </Typography>

            <Button
              variant="outlined"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Suivant →
            </Button>

            <Box ml="auto" display="flex" alignItems="center" gap={1}>
              <Typography>Lignes par page:</Typography>
              <Select
                size="small"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
              >
                {[5, 10, 20, 50].map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </div>
      )}
    </Box>
  );
};
