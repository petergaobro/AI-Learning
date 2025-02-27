"use client"
// import useWhisper from "@chengsokdara/use-whisper";
import { useReactMediaRecorder } from "react-media-recorder-2";
// import { uuid } from "uuidv4";
import Image from 'next/image';
import MicIconWhite from '../../../public/img/svg/mic-icon-white.svg'
import MicCurrentColor from '../../../public/img/svg/mic-icon-currentColor.svg'
import { useState } from "react";
import crypto from "crypto"
import { env } from "~/env";

const chunks = []
const Webrtc = () => {

  /** get iam token */
  async function getIamToken() {
    /** get main token to configure A */
    const params = new URLSearchParams();
    params.append("grant_type", "urn:ibm:params:oauth:grant-type:apikey");
    params.append("apikey", `${env.NEXT_PUBLIC_IBM_COS_APIKEY}`);
    const response = await fetch(`${env.NEXT_PUBLIC_IBM_IAM_SERVER}/identity/token`, {
      method: "POST",
      body: params,
    })
    const data = await response.json()
    console.log(data, 'data res');
    return data.access_token
    // const iamServer = `${env.NEXT_PUBLIC_IBM_IAM_SERVER}`
    // console.log(iamServer, 'iam server');
  }

  const [file, setFile] = useState<File>()
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const { status,
    startRecording = () => {
      setIsRecording(true);
    },
    stopRecording = () => {
      setRecordingComplete(true);
    }, mediaBlobUrl } = useReactMediaRecorder({
      audio: true,
      video: false,
      // mediaRecorderOptions: { mimeType: 'audio/wav' }
      blobPropertyBag: {
        type: "audio/wav"
      },



      async onStop(blobUrl, blob) {
        /** convert blob to wav file */
        const rtcFile = new File([blob], `${crypto.randomBytes(8).toString("hex")}.wav`, { type: 'audio/wav', lastModified: Date.now() })
        try {
          const data = new FormData()
          data.set('file', rtcFile)

          // const res = await fetch('/api/audioUpload', {
          //   method: 'POST',
          //   body: data
          // })
          const IAMtoken = await getIamToken()
          await fetch('/api/audioUpload', {
            method: 'POST',
            // method: 'PUT',
            body: data,
            headers: {
              Authorization: `Bearer ${IAMtoken}`,
            }
          })
            .then((res) => res.json())
            .then((json) => console.log(json))
          // handle the error
          // if (!res.ok) throw new Error(await res.text())
        } catch (e: any) {
          // Handle errors here
          console.error(e)
        }
        /** get main token to configure A */
        // const iamServer = `${env.NEXT_PUBLIC_IBM_IAM_SERVER}`
        // console.log(iamServer, 'iam server');
      },
      // stopStreamsOnStop
    })



  /** get list of items in bucket */
  async function getItems(req: any, res: any) {
    const IAMToken = await getIamToken()
    /** get list of items */
    // const response = await fetch

  }

  const handleToggleRecording = async () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
      // await getIamToken()
      // console.log(IAMToken, 'hello iam token');

      // getIamToken;
    }
    // if (!isRecording) {
    //   setTimeout(() => stopRecording(), 5000)
    // }
    else {
      // stopRecording();
      setTimeout(() => stopRecording(), 5000)
    }
  };


  return (
    <div>
      <p>{status}</p>
      <div className="flex items-center w-full" id="recordVoice">
        {isRecording ? (
          // Button for stopping recording
          <button
            onClick={handleToggleRecording}
            className="mt-10 m-auto flex items-center justify-center bg-navy-1 hover:bg-navy-2 rounded-full w-20 h-20 focus:outline-none"
          >
            <Image src={MicIconWhite} alt='MicOn' />
          </button>
        ) : (
          // Button for starting recording
          <button
            onClick={handleToggleRecording}
            className="mt-10 p-2 m-auto flex items-center justify-center bg-grey-1 hover:bg-grey-2 rounded-full w-20 h-20 focus:outline-none"
          >
            <Image src={MicCurrentColor} alt='MicOff' />
          </button>
        )}
      </div>
      <p></p>
      <audio src={mediaBlobUrl} autoPlay controls></audio>
    </div>
  )
}

export default Webrtc