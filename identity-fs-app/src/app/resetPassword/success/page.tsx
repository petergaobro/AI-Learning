
import React from 'react'
import Button from '~/app/components/button'
import PageSection from '~/app/components/pageSection'
import PageWrapper from '~/app/components/pageWrapper'

const SuccessPage = () => {
  return (
    <PageWrapper title="Identity FS">
      <PageSection wrapperClassName="bg-base-100" className="my-0 py-8">
        <h3>Your password has been updated.</h3>
        <Button href='/login'>
          Return back to login
        </Button>
      </PageSection>
    </PageWrapper>

  )
}

export default SuccessPage