import { prisma } from "./prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { type User } from "@prisma/client";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    /** draft */
    // async session({ session, token }) {
    //   console.log('Session Callback', { session, token })
    //   return session
    // },

    // async jwt({ token, user, session }) {
    //   console.log('Jwt Callback', { session, user, token })
    //   return token
    // }


    jwt: ({ token, account, user }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.username = (user as User).username
        // console.log({ user, token });
        console.log({ user });
      }
      return token
    },
    // session: ({ session, token }) => {
    //   console.log("session callback", { session, token });
    //   return session
    // },


    /** latest version */
    // session: ({ session, token, user }) => {
    //   // console.log('Session Callback', { token })
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: token.id,
    //       // randomKey: token.randomKey
    //     }
    //   }
    //   // Send properties to the client, like an access_token and user id from a provider.
    //   // session.accessToken = token.accessToken
    //   // session.user.id = token.id
    //   // return session
    // },
    /**This callback is called whenever a JSON Web Token is created (i.e. at sign in) 
     * or updated (i.e whenever a session is accessed in the client). 
     * The returned value will be encrypted, and it is stored in a cookie. */
    // jwt: ({ token }) => {
    //   // console.log('JWT Callback', {  })
    //   // if (user) {
    //   //   const u = user as unknown as any
    //   //   return {
    //   //     ...token,
    //   //     id: u.id,
    //   //     // randomKey: u.randomKey
    //   //   }
    //   // }
    //   return token
    // }

  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: 'Please enter your email'
        },
        password: {
          label: "password",
          type: "password",
          placeholder: 'Please enter your password'
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user?.email) {
          throw new Error("No existed user")
        }

        if (!user.emailVerified) {
          throw new Error("User is not verified, please verify your account");
        }

        if (user.emailVerified) {
          await prisma.user.update({
            where: {
              email: credentials.email,
            },
            data: {
              emailVerified: true
            }
          })
        }

        if (!user?.password) {
          throw new Error("Invalid email or password");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout"
  },
  // debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// export const getServerAuthSession = () => getServerSession(authOptions);