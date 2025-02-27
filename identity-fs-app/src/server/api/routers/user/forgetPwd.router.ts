import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { forgetPwdUserInputSchema } from "~/stores/mutation/user/forgetPwd";
import crypto from "crypto"
import { sendResetPasswordMail } from "~/server/services/awsses";
import * as trpc from '@trpc/server'

export const forgetPwdRouter = createTRPCRouter({
  forgetPwd: publicProcedure
    .input(forgetPwdUserInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { email } = input
      const existedUser = await ctx.prisma.user.findUnique({
        where: {
          email,
          emailVerified: true
        }
      })
      if (existedUser) {
        const token = await ctx.prisma.passwordResetToken.create({
          data: {
            token: `${crypto.randomBytes(32).toString("hex")}`,
            userId: existedUser.id
          }
        })
        sendResetPasswordMail(existedUser, token)
          .catch((error: any) => {
            console.log(error);
          })
        return existedUser
      }
      if (!existedUser) {
        throw new trpc.TRPCError({
          code: 'CONFLICT',
          message: 'This email is not registered or not verified, please check it again.',
        })
      }
    })
})