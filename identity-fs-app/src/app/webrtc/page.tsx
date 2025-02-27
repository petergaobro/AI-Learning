import React from 'react'
import FormWrap from '../components/formWrap'
import PageWrapper from '../components/pageWrapper'
import Webrtc from './webrtc'

const Login = async () => {
  return (
    <PageWrapper title='Identity FS APP'>
      <FormWrap>
        <Webrtc />
      </FormWrap>
    </PageWrapper>
  )
}

export default Login