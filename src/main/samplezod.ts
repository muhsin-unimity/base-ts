import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .min(3, "minimum 3 letters needed")
    .regex(/^[A-Za-z\s.'-]+$/, "Pleaseenter a valid name"),
  lastName: z.string().min(2, "Minimum 2 letter needed"),
  email: z.string().email("Please enter a vali mail ID"),
});
