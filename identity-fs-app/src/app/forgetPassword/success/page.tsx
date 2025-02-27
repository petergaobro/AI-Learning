
import Link from 'next/link'
import React from 'react'
import Button from '~/app/components/button'
import PageSection from '~/app/components/pageSection'
import PageWrapper from '~/app/components/pageWrapper'

const SuccessPage = () => {
  return (
    <PageWrapper title="Identity FS">
      <PageSection wrapperClassName="bg-header-blue" className="my-0 py-14" />
      <PageSection wrapperClassName="bg-base-100" className="my-0 py-8">
        <div className=" w-auto items-center border-2 border-gray-100  bg-white px-10 py-20">
          <div className="mb-2">
            <h1 className="text-2xl font-semibold">Identity User Account</h1>
            <div className="my-3">
              A link to reset your password has been sent to the email
              provided. Follow the instructions there to continue.
            </div>
            <Link href="/login">
              <Button color="secondary">Back to Login</Button>
            </Link>
          </div>
        </div>
      </PageSection>
    </PageWrapper>

  )
}

export default SuccessPage