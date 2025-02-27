import React from 'react'
import FormWrap from '../components/formWrap'
import PageWrapper from '../components/pageWrapper'
import ChatBot from './backup/chatBot'
import WatsonxChatWindow from './watsonxChatWindow'
// import Voice from './voice'
import getCurrentUser from '~/actions/getCurrentUser'
const Watsonx = async () => {
  const currentUser = await getCurrentUser()
  return (
    <PageWrapper title='Identity FS APP'>
      <FormWrap>
        {/* <Chat /> */}
        {/* <Voice currentUser={currentUser} /> */}
        <WatsonxChatWindow location='Australia' />
      </FormWrap>
    </PageWrapper>
  )
}

export default Watsonx