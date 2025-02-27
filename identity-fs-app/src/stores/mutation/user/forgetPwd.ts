import z from 'zod'

export const forgetPwdUserInputSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
  })
  .required();

export const forgetPwdUserOutputSchema = z
  .object({
    email: z.string().email(),
  })
  .required();

export type ForgetPwdUserInput = z.TypeOf<typeof forgetPwdUserInputSchema>
export type ForgetPwdUserOutput = z.TypeOf<typeof forgetPwdUserOutputSchema>
