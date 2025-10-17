import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  birthDate: z.string().transform((val) => new Date(val)),
});

export type UserInput = z.infer<typeof userSchema>;
