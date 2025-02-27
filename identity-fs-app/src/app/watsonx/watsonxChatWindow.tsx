'use client'
import React, { useState } from 'react';
import { WebChatContainer, setEnableDebug } from '@ibm-watson/assistant-web-chat-react';
import { useReactMediaRecorder } from "react-media-recorder-2";
// import { uuid } from "uuidv4";
import fs from 'fs';
import Button from "../components/button";
import Image from 'next/image';
import MicIconWhite from '../../../public/img/svg/mic-icon-white.svg'
import MicCurrentColor from '../../../public/img/svg/mic-icon-currentColor.svg'
// import { useConfig } from '~/utils/config';

import Webrtc from '../webrtc/webrtc';
import { env } from '~/env';


const WatsonxChatWindow = ({ location, createWebChatInstance }: any) => {
  // const config = useConfig();

  const webChatOptions = {
    integrationID: `${env.NEXT_PUBLIC_WATSONX_INTEGRATIONID}`, // The ID of this integration.
    region: "au-syd" as const, // The region your integration is hosted in.
    serviceInstanceID: `${env.NEXT_PUBLIC_WATSONX_SERVICEINSTANCEID}`, // The ID of your service instance.
    openChatByDefault: true,
    onLoad: function (instance: any) {
      instance.on({ type: "receive", handler: preReceiveHandler });

      // document
      //   .getElementById("recordVoice")
      //   .addEventListener("click", function () {
      //     if (flagTrigger) {
      //       flagTrigger = false;
      //       setTimeout(function () {
      //         const sendObject_input = {
      //           input: {
      //             message_type: "text",
      //             text: recordVoice,
      //           },
      //         };
      //         const sendOptions_input = {
      //           silent: false,
      //         };
      //         instance
      //           .send(sendObject_input, sendOptions_input)
      //           .catch(function () {
      //             console.error("This message did not send!");
      //             console.log("Speechsent!");
      //           });
      //       }, 5000);
      //     }
      //   });

      instance.render();
    },
    // subscriptionID: 'only on enterprise plans',
    // Note that there is no onLoad property here. The WebChatContainer component will override it.
    // Use the onBeforeRender or onAfterRender prop instead.
  };

  async function preReceiveHandler(event: any) {
    if (event.data.output.generic != null) {
      for (const element of event.data.output.generic) {
        await playAudio(element.text);
      }
    }
  }

  /** debugging */
  setEnableDebug(true)

  function renderCustomResponse(event: any) {
    // The event here will contain details for each custom response that needs to be rendered.
    // The "user_defined_type" property is just an example; it is not required. You can use any other property or
    // condition you want here. This makes it easier to handle different response types if you have more than
    // one custom response type.
    if (event.data.message.user_defined && event.data.message.user_defined.user_defined_type === 'my-custom-type') {
      return <div>My custom content</div>
    }
  }

  function invokeSTT(blobURL: any) {
    /** get the wav file from IBM COS */

    /** via whisper */
  }

  async function playAudio(ttsContent: any) {
    /** eleven lab */
  }

  return (
    <>
      <Webrtc />
      <WebChatContainer config={webChatOptions} renderCustomResponse={renderCustomResponse} />
    </>
  );
};

// Wrap the component with the method returned by `withWebChat`.
export default WatsonxChatWindow;