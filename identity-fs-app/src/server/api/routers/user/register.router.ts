import * as trpc from '@trpc/server'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import bcrypt from 'bcrypt'
import crypto from "crypto"
import { registerUserInputSchema } from "~/stores/mutation/user/register";
import { prisma } from '~/server/prismadb';
// import { sendRegisterVerificationMail } from '~/server/services/sendgrid';
import { sendRegisterVerificationMail } from '~/server/services/awsses';
import fs from 'fs';
import path from 'path';

export const registerRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerUserInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { username, name, email, password } = input

      const hashedPwd = await bcrypt.hash(password, 10)
      const dbUser = await ctx.prisma.user.findUnique({
        where: {
          email,
          // emailVerified: true
        }
      })
      if (!dbUser) {
        const user = await ctx.prisma.user.create({
          data: {
            username,
            name,
            email,
            password: `${hashedPwd}`,
            access_token: `${crypto.randomBytes(32).toString("hex")}`,
            refresh_token: `${crypto.randomBytes(32).toString("hex")}`,
          }
        })

        /** user create */
        // const VERIFY_TOKEN = fs.readFileSync(path.join(__dirname, '../../../../keys/verifyToken.key')).toString();
        // console.log(VERIFY_TOKEN, "verify token is");

        const token = await prisma.verifyToken.create({
          data: {
            token: `${crypto.randomBytes(32).toString("hex")}`,
            // token: `${fs.readFileSync(path.join(__dirname, '../../../../keys/verifyToken.key')).toString()}`,
            userId: user.id
          }
        })

        /** account create */
        // const ACCESS_TOKEN = fs.readFileSync(path.join(__dirname, '../../../../keys/accessToken.key')).toString();
        // const REFRESH_TOKEN = fs.readFileSync(path.join(__dirname, '../../../../keys/refreshToken.key')).toString();

        // await prisma.account.create({
        //   data: {
        //     // token: `${crypto.randomBytes(32).toString("hex")}`,
        //     access_token: `${crypto.randomBytes(32).toString("hex")}`,
        //     refresh_token: `${crypto.randomBytes(32).toString("hex")}`,
        //     userId: user.id,
        //     type
        //   }
        // })

        /** send register verify email */
        sendRegisterVerificationMail(user, token)
          .catch((error: any) => {
            console.log(error);
          })
        return user
      }
      if (dbUser) {
        throw new trpc.TRPCError({
          code: 'CONFLICT',
          message: 'Emails was been used, please change another one.',
        })
      }

      // try {
      //   const hashedPwd = await bcrypt.hash(password, 10)
      //   const dbUser = await ctx.prisma.user.findUnique({
      //     where: {
      //       email
      //     }
      //   })
      //   if (!dbUser) {
      //     const user = await ctx.prisma.user.create({
      //       data: {
      //         userName,
      //         email,
      //         password: `${hashedPwd}`,
      //       }
      //     })

      //     const token = await prisma.verifyToken.create({
      //       data: {
      //         token: `${crypto.randomBytes(32).toString("hex")}`,
      //         userId: user.id
      //       }
      //     })
      //     sendRegisterVerificationMail(user, token)
      //       .catch((error: any) => {
      //         console.log(error);
      //       })
      //     return user
      //   }
      // } catch (error: any) {
      //   if (error instanceof PrismaClientKnownRequestError) {
      //     if (error.code === 'P2002') {
      //       throw new trpc.TRPCError({
      //         code: 'CONFLICT',
      //         message: 'User already exists',
      //       })
      //     }
      //   }
      // }
    }),
  // login: protectedProcedure
  //   .input(loginUserInputSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     const { email, password } = input

  //   })
})