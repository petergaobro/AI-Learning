// 'use client'

// import { SessionProvider } from 'next-auth/react'

// type Props = {
//   children?: React.ReactNode
// }

// export const AuthProvider = ({ children }: Props) => {
//   return <SessionProvider>{children}</SessionProvider>
// }

"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
