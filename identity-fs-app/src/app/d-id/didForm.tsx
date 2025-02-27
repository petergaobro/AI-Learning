"use client"
// import sdk from 'api'
import { env } from '~/env';
import base64 from "base-64"
import { useEffect } from 'react';
// const didStore = sdk('@d-id/v4.2.0#ml5d1rlrrtkydo')
// const sdk = require('api')('@d-id/v4.2.0#x66u2iltlywhwo');

const didForm = async () => {
  /** d-id talk made */
  // didStore.createTalk({
  //   script: {
  //     type: 'text',
  //     // subtitles: 'false',
  //     subtitles: 'true',
  //     provider: {
  //       type: 'elevenlabs',
  //       voice_id: '21m00Tcm4TlvDq8ikWAM'
  //     }
  //   },
  //   config: { fluent: 'false', pad_audio: '0.0' }
  // })
  //   .then(({ data }: any) => console.log(data))
  //   .catch((err: any) => console.error(err));



  /** create a new stream endpoint */
  // const RTCPeerConnection = (
  //   window.RTCPeerConnection ||
  //   window.webkitRTCPeerConnection ||
  //   window.mozRTCPeerConnection
  // ).bind(window);

  async function createPeerConnection(offer: any, iceServers: any) {
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection({ iceServers });
      // peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
      peerConnection.addEventListener('icecandidate', onIceCandidate, true);
      // peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
      // peerConnection.addEventListener('connectionstatechange', onConnectionStateChange, true);
      // peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
      // peerConnection.addEventListener('track', onTrack, true);
    }

    await peerConnection.setRemoteDescription(offer);
    console.log('set remote sdp OK');

    const sessionClientAnswer = await peerConnection.createAnswer();
    console.log('create local sdp OK');

    await peerConnection.setLocalDescription(sessionClientAnswer);
    console.log('set local sdp OK');

    return sessionClientAnswer;
  }


  let peerConnection: any;
  let streamId: any;
  let sessionId: any;
  let sessionClientAnswer: any;

  const connectButton = async () => {
    const sessionResponse = await fetch(`${env.NEXT_PUBLIC_D_ID_URL}/clips/streams`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${env.NEXT_PUBLIC_D_ID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        presenter_id: "amy-Aq6OmGZnMt",
        driver_id: "Vcq0R4a8F0",
        source_url: "https://raw.githubusercontent.com/jjmlovesgit/D-id_Streaming_Chatgpt/main/oracle_pic.jpg",
      }),
    });
    console.log(sessionResponse, 'session response');


    const { id: newStreamId, offer, ice_servers: iceServers, session_id: newSessionId } = await sessionResponse.json()
    const streamId = newStreamId;
    const sessionId = newSessionId;

    try {
      const sessionClientAnswer = await createPeerConnection(offer, iceServers);
    } catch (e) {
      console.log('error during streaming setup', e);
      // stopAllStreams();
      // closePC();
      return;
    }

    const sdpResponse = await fetch(`${env.NEXT_PUBLIC_D_ID_URL}/talks/streams/${streamId}/sdp`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${env.NEXT_PUBLIC_D_ID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer: sessionClientAnswer, session_id: sessionId })
      });
  }

  /** Submit network information */
  function onIceCandidate(event: any) {
    if (event.candidate) {
      const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

      fetch(`${env.NEXT_PUBLIC_D_ID_URL}/clips/streams/${streamId}/ice`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${env.NEXT_PUBLIC_D_ID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidate,
          sdpMid,
          sdpMLineIndex,
          session_id: sessionId,
        }),
      })
        .catch((err) => {
          console.log("Fetch error", err);
          // return Promise.reject(err);
        });
    }
  }

  /** get d_id credits */
  async function getDidCredits() {
    const didCreditUrl = `${env.NEXT_PUBLIC_D_ID_URL}/credits`
    const didApiKey = `${env.NEXT_PUBLIC_D_ID_API_KEY}`

    const authString = didApiKey + ":"
    const base64AuthString = base64.encode(authString);

    const headers = {
      "accept": "application/json",
      "Authorization": `Basic ${base64AuthString}`
    };
    const response = await fetch(didCreditUrl, { headers });
    const data = await response.json();
    return data;
  }

  const talkButton = async () => {
    try {
      const didCredits = await getDidCredits()
      console.log("Response:", didCredits);
    }
    catch (error) {
      console.error("Error:", error);
    }
  }

  // useEffect(() => {
  //  await getDidCredits
  // },[]);


  // async function createPeerConnection(offer, iceServers) {
  //   if (!peerConnection) {
  //     peerConnection = new RTCPeerConnection({ iceServers });
  //     // Here we add event listeners for any events we want to handle
  //     peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
  //     peerConnection.addEventListener('icecandidate', onIceCandidate, true);
  //     peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
  //     peerConnection.addEventListener('connectionstatechange', onConnectionStateChange, true);
  //     peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
  //     peerConnection.addEventListener('track', onTrack, true);
  //   }

  //   await peerConnection.setRemoteDescription(offer);
  //   const sessionClientAnswer = await peerConnection.createAnswer();
  //   await peerConnection.setLocalDescription(sessionClientAnswer);

  //   return sessionClientAnswer;
  // }


  return (
    <div>
      d-id page hello
      <button
        onClick={connectButton}
        className="mt-10 m-auto flex items-center justify-center bg-navy-1 hover:bg-navy-2 rounded-full w-20 h-20 focus:outline-none"
      >
        {/* <Image src={MicIconWhite} alt='MicOn' /> */}
        connect DID for testing
      </button>
      <button
        onClick={talkButton}
        className="mt-10 m-auto flex items-center justify-center bg-navy-1 hover:bg-navy-2 rounded-full w-20 h-20 focus:outline-none"
      >
        {/* <Image src={MicIconWhite} alt='MicOn' /> */}
        click for testing
      </button>
      {/* border-radius:50% */}

      <video
        autoPlay
        loop
        playsInline
        preload='yes'
        style={{ borderRadius: "50%", width: "300px" }}
        src="https://d-id-animations-prod.s3.us-west-2.amazonaws.com/auth0%7C650103e9acb4aba7be69d764/anm_GY03PCCh47IDDNbtuJl2s/1710994762370.mp4?AWSAccessKeyId=AKIA5CUMPJBIKVXURAND&Expires=1711081166&Signature=xYX%2B0W31oXhNIYj3ec873lylwXA%3D" typeof="mp4">
      </video>

    </div>
  )
}

export default didForm