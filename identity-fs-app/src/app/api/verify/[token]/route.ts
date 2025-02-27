// import { prisma } from "~/libs/prismadb";
import { prisma } from "~/server/prismadb";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params
  const user = await prisma.user.findFirst({
    /** null is value, undefined is do nothing */
    where: {
      verifyToken: {
        some: {
          AND: [
            {
              verifyAt: undefined,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hrs ago
              }
            },
            {
              token,
            }
          ]
        }
      }
    }
  })

  if (!user) {
    redirect("/unverified")
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: true,
      verifyAt: new Date()
    }
  })

  /** mark token, cannot be used again */
  await prisma.verifyToken.update({
    where: {
      token,
    },
    data: {
      verifyAt: new Date()
    }
  })
  redirect("/login")
}


