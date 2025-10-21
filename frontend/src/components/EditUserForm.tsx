import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userApi } from "../api/userApi";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().optional(), // optional on edit
  birthDate: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  user: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export const EditUserForm = ({ user, onSuccess, onCancel }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate.split("T")[0],
    },
  });

  const onSubmit = async (data: FormData) => {
    // Delete password from payload if left blank
    const payload = { ...data };
    if (!payload.password) {
      delete payload.password;
    }

    await userApi.update(user.id, payload);
    onSuccess();
  };

  return (
    <Dialog open onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Edit User</DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Prénom"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            fullWidth
          />

          <TextField
            label="Nom"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Mot de passe (laisser vide si pas de modification)"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <TextField
            label="Date de naissance"
            type="date"
            {...register("birthDate")}
            InputLabelProps={{ shrink: true }}
            error={!!errors.birthDate}
            helperText={errors.birthDate?.message}
            fullWidth
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onCancel} color="inherit">
            Annuler
          </Button>
          <Button type="submit" variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
