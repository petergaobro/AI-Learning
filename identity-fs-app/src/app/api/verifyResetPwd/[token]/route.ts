import { prisma } from "~/server/prismadb";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { error } from "console";
import bcrypt from 'bcrypt'
import toast from "react-hot-toast";

export async function POST(request: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params
  const { password } = await request.json()

  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      resetAt: undefined,
      createdAt: { gt: new Date(Date.now() - 4 * 60 * 60 * 1000) }, // 4 hrs ago
      token,
    }
  })

  if (!passwordResetToken) {
    throw error("Invalid reset request, please try again")
  }


  const encrypted = await bcrypt.hash(password, 10)
  const updatedUser = prisma.user.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      password: encrypted,
    }
  })

  const updateToken = prisma.passwordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      resetAt: new Date()
    }
  })
  try {
    await prisma.$transaction([updatedUser, updateToken])
  } catch (err) {
    console.error(err);
    toast.error("An unexpected error occured. Please try again.")
  }
  redirect("/login")
}


