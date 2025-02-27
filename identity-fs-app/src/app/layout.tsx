import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/app/providers/TRPCReactProvider";
import NavBar from "./components/navbar/NavBar";
import getCurrentUser from "~/actions/getCurrentUser";
import AuthProvider from "./providers/AuthProvider";
import DismissibleToast from "./components/dismissibleToast";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/authOptions";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  // console.log(currentUser, "current user");
  const session = await getServerSession(authOptions);
  // console.log(session, "session");
  return (
    <html lang="en">
      <TRPCReactProvider cookies={cookies().toString()}>
        <body className={`font-sans ${inter.variable}`}>
          <AuthProvider session={session}>
            <DismissibleToast />
            <div className="flex flex-col min-h-screen">
              <NavBar currentUser={currentUser} />
              <main className="flex-grow">{children}</main>
            </div>
          </AuthProvider>
        </body>
      </TRPCReactProvider>
    </html>
  );
}
