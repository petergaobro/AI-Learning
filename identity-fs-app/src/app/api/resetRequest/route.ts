import { prisma } from '~/server/prismadb'
import { NextResponse } from 'next/server'
import crypto from "crypto"
import { sendResetPasswordMail } from "../../../server/services/awsses/email.service"
import toast from 'react-hot-toast'
import { redirect } from "next/navigation";


export async function POST(req: Request) {
  const body = await req.json()
  const { email } = body

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    toast.error("This email is not registered, please check it again")
    redirect("/forgetPassword")
  }

  const token = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: `${crypto.randomBytes(32).toString("hex")}`
    }
  })

  sendResetPasswordMail(user, token)
    // .then(() => {
    //   redirect("/resetPassword/success")
    // })
    .catch((error: any) => {
      console.log(error);
    })

  return NextResponse.json(user)
}