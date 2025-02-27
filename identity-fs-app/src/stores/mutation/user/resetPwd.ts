import z from 'zod'

export const resetPwdUserInputSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" })
      .max(12, {}),
  })
  .required();

export const resetPwdUserOutputSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" })
      .max(12, {}),
  })
  .required();

export type ResetPwdUserInput = z.TypeOf<typeof resetPwdUserInputSchema>
export type ResetPwdUserOutput = z.TypeOf<typeof resetPwdUserOutputSchema>
