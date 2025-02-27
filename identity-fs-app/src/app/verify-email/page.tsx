import React from 'react'
import getCurrentUser from '~/actions/getCurrentUser'
import Verify from './verifyForm'
import FormWrap from '~/app/components/formWrap'
import PageWrapper from '~/app/components/pageWrapper'
const VerifyPage = async () => {
  const currentUser = await getCurrentUser()
  return (
    <PageWrapper title='Identity FS APP'>
      <FormWrap>
        <Verify currentUser={currentUser} />
      </FormWrap>
    </PageWrapper>
  )
}

export default VerifyPage