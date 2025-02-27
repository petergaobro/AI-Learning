'use client'

import { useSession } from 'next-auth/react'

export const User = () => {
  const { data: session, status } = useSession()
  console.log('Client Session', session)
  return (
    <div>
      {status === 'authenticated' && session !== null && (
        <pre>{JSON.stringify(session)}</pre>
      )}
    </div>
  )
}
