import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CreateUserForm } from "../components/CreateUserForm";
import { EditUserForm } from "../components/EditUserForm";
import { useUsers } from "../hooks/useUsers";
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
import { userApi } from "src/api/userApi";

export const UsersPage = () => {
  const { logout } = useAuth();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<
    "firstName" | "lastName" | "email" | "birthDate"
  >("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { users, loading, error, totalPages, refetch } = useUsers({
    search,
    sortBy: sortField,
    order: sortOrder,
    page,
    limit,
  });

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?"))
      return;
    try {
      await userApi.delete(id);
      refetch();
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Liste des utilisateurs
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
            refetch();
          }}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {editingUser && (
        <EditUserForm
          user={editingUser}
          onSuccess={() => {
            setEditingUser(null);
            refetch();
          }}
          onCancel={() => setEditingUser(null)}
        />
      )}

      <TextField
        label="Recherche par nom ou email"
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
        <Typography mt={3}>Aucun utilisateur trouvé.</Typography>
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    { key: "firstName", label: "Prénom" },
                    { key: "lastName", label: "Nom" },
                    { key: "email", label: "Adresse e-mail" },
                    { key: "birthDate", label: "Date de naissance" },
                  ].map(({ key, label }) => (
                    <TableCell
                      key={key}
                      onClick={() => {
                        if (sortField === key) {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortField(key as any);
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
                      {label}{" "}
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
                      {new Date(u.birthDate).toLocaleDateString("fr-FR")}
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
              ← Précédent
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
              <Typography>Lignes par page :</Typography>
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
