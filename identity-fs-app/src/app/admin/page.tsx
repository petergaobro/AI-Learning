import React from 'react'
import { type SafeUser } from '../types/safeUser';
import getCurrentUser from '~/actions/getCurrentUser';
import PageWrapper from '../components/pageWrapper';
import Users from './users';
import Link from 'next/link';
import Button from '../components/button';



const Admin = async () => {
  const currentUser = await getCurrentUser()

  return (
    <PageWrapper title='dashboard'>
      {currentUser?.roleId === 'ADMIN' ?
        <Users currentUser={currentUser} />
        :
        <div>
          <p>Sorry, you are not admin</p>
          <Link href="/login">
            <Button color="secondary">Quit</Button>
          </Link>
        </div>
      }
    </PageWrapper>
  )
}

export default Admin;