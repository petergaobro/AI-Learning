import React from 'react'
import FormWrap from '../components/formWrap'
import PageWrapper from '../components/pageWrapper'
import DidForm from './didForm'
import getCurrentUser from '~/actions/getCurrentUser'
const DidContainer = async () => {
  const currentUser = await getCurrentUser()
  return (
    <PageWrapper title='Identity FS APP'>
      <FormWrap>
        <DidForm />
      </FormWrap>
    </PageWrapper>
  )
}

export default DidContainer