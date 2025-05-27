import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be 3 characters long." }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Please type correct email." }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be 6 characters long." }),
    confirm_password: z
      .string()
      .nonempty({ message: "Confirm Password is required" })
      .min(6, { message: "Confirm password must be 6 characters long." }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Confirm password not matched",
    path: ["confirm_password"],
  });
