'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Heading from '~/app/components/heading'
import { type SafeUser } from '~/app/types/safeUser'

interface VerifyProps {
  currentUser: SafeUser | null;
}
const Verify: React.FC<VerifyProps> = ({ currentUser }) => {
  const router = useRouter();


  // useEffect(() => {
  //   // if (currentUser) {
  //   //   router.push("/watsonx");
  //   //   router.refresh();
  //   // }
  //   // get from api/register -> update emailVerified:true


  //   axios.get('/api/register')
  //     .then(() => {
  //       toast.success('Account verified')
  //     })
  //     .catch(() => toast.error('Something went wrong in verify'))
  // }, []);



  // if (currentUser) {
  //   return <p className="text-center">Logged in. Redirecting...</p>;
  // }


  return (
    <>
      <Heading title='Identity FS APP' />
      <hr className='bg-slate-300 w-full h-px' />
      <h1>
        Hello {currentUser?.name}, Welcome to identity fs app, before you login the account, please check your email
        account and click the link to verify thank you.
      </h1>
      <Link className='underline' href='/login'>Login</Link>
    </>
  )
}

export default Verify