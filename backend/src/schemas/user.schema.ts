import { z } from "zod";

const baseUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  birthDate: z.coerce.date(),
});


export const createUserSchema = baseUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export const updateUserSchema = baseUserSchema.extend({
  password: z.string().min(6).optional(),
  birthDate: z.coerce.date().optional(), 
}).partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
