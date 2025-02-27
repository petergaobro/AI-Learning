import React from 'react'
import FormWrap from '../components/formWrap'
import PageWrapper from '../components/pageWrapper'
import LoginForm from './loginForm'
import getCurrentUser from '~/actions/getCurrentUser'

const Login = async () => {
  const currentUser = await getCurrentUser()
  return (
    <PageWrapper title='Identity FS APP'>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </PageWrapper>
  )
}

export default Login