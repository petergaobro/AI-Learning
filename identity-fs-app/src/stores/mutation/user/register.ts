import z from 'zod'

export const registerUserInputSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" })
      .max(12, {}),
    // roleId: z.string(),
  })
  .required();

export const registerUserOutputSchema = z
  .object({
    email: z.string().email(),
    emailVerified: z.boolean(),
    id: z.string(),
    roleId: z.string(),
  })
  .required();

export type RegisterUserInput = z.TypeOf<typeof registerUserInputSchema>





