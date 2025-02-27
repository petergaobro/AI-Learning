import React from 'react'
import FormWrap from '../components/formWrap'
import PageWrapper from '../components/pageWrapper'
import RegisterForm from './registerForm'
import getCurrentUser from '~/actions/getCurrentUser'
const Register = async () => {
  const currentUser = await getCurrentUser()
  return (
    <PageWrapper title='Identity FS APP'>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </PageWrapper>
  )
}

export default Register