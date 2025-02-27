'use client'
import React, { useEffect } from 'react'
import { type SafeUser } from '../types/safeUser'
import { useRouter } from 'next/navigation'

interface usersProps {
  currentUser: SafeUser | null;
}
const Users: React.FC<usersProps> = ({ currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      router.refresh();
    }
  }, []);

  if (!currentUser) {
    return <p className="text-center">Please login your account. Redirecting...</p>;
  }
  return (
    <div>
      <p>hello users</p>
    </div>
  )
}

export default Users