import React from 'react'
import PageWrapper from '../components/pageWrapper'
import PageSection from '../components/pageSection'
import ForgetForm from './forgetPwdForm'
const Register = async () => {
  return (
    <PageWrapper title="Identity FS">
      <PageSection wrapperClassName="bg-header-blue" className="my-0 py-14" />
      <PageSection wrapperClassName="bg-base-100" className="my-0 py-8">
        <ForgetForm />
      </PageSection>
    </PageWrapper>
  )
}

export default Register