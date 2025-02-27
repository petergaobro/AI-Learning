'use server'

import { prisma } from "~/server/prismadb";
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";
import { sendResetPasswordSuccessfullyMail } from "~/server/services/awsses";

export async function ResetPassword(token: string, data: FormData) {
  const password = data.get('password') as string
  const confirmPassword = data.get('confirm') as string

  if (!password
    || typeof password !== 'string'
    || password !== confirmPassword) {
    // toast.error("The passwords did not match. Please try again.")
    return {
      error:
        'The passwords did not match. Please try retyping them and submitting again.',
    }
  }

  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      createdAt: { gt: new Date(Date.now() - 4 * 60 * 60 * 1000) }, // 4 hrs ago
      resetAt: undefined,
    }
  })

  if (!passwordResetToken) {
    // toast.error("Invalid reset request, please try again")
    return {
      error:
        'Invalid token reset request. Please try resetting your password again.',
    }
  }

  const encrypted = await bcrypt.hash(password, 10)
  const tempUserId = passwordResetToken.userId!
  const updatedUser = prisma.user.update({
    where: {
      id: tempUserId,
    },
    data: {
      password: encrypted,
    }
  })

  const updateToken = prisma.passwordResetToken.update({
    where: {
      id: passwordResetToken?.id,
    },
    data: {
      resetAt: new Date()
    }
  })

  try {
    await prisma.$transaction([updatedUser, updateToken])
  } catch (err) {
    console.error(err);
    // toast.error("An unexpected error occured. Please try again.")
    return {
      error: `An unexpected error occured. Please try again and if the problem persists, contact support.`,
    }
  }
  sendResetPasswordSuccessfullyMail(updateToken)
    .catch((error: any) => {
      console.log(error);
    })
  redirect("/resetPassword/success")
}