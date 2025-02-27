'use client'
import React, { useEffect } from 'react'
import { type SafeUser } from '../../types/safeUser'
import { useRouter } from 'next/navigation'

interface ChatBotProps {
  currentUser: SafeUser | null;
}

//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;
let gumStream: any;

let rec: any;

let input: any;

let audioContext: any;

let recordVoice: any;
// let audioContext: AudioContext;

const AudioContext = window.AudioContext || window.webkitAudioContext;

// Click on mic
const clickMic = document.getElementById("recordVoice");
if (clickMic) {
  clickMic.addEventListener("click", processVoice);
}

let flag = false;
let flagTrigger = false;
function processVoice() {
  flag = !flag;
  const filterColor = flag ? "invert(1)" : "grayscale(100%)";
  const rv = document.getElementById("recordVoice");
  if (rv) {
    rv.style.filter = filterColor;
  }
  if (flag) {
    startRecording();
  } else {
    flagTrigger = true;
    stopRecording();
  }
}



function startRecording() {
  const constraints = {
    audio: true,
    video: false,
  };

  audioContext = new AudioContext();

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      console.log(
        "getUserMedia() success, stream created, initializing Recorder.js ..."
      );

      gumStream = stream;

      input = audioContext.createMediaStreamSource(stream);

      rec = new Recorder(input, {
        numChannels: 1,
      });

      rec.record();
      console.log("Recording started");
    })
    .catch(function (err) {
      console.log(err);
    });
}

function stopRecording() {
  console.log("stopButton clicked");
  rec.stop(); //stop microphone access
  gumStream.getAudioTracks()[0].stop();
  //create the wav blob and pass it on to createDownloadLink
  rec.exportWAV(invokeSTT);
}

/** whisper but using watson assistant stt to test*/
function invokeSTT(blob: any) {
  const file = new File([blob], new Date().toISOString() + ".wav");
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic YXBpa2V5OklqLU5CVmpfc3Q4QmVTaHpodG0zLXZZZURkUUdEYXMxQmo5N3dsRWthSHJH"
  );
  myHeaders.append("Content-Type", "audio/wav");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: file,
    redirect: "follow",
  };

  const baseUrl = new URL(
    "https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/0cfb5b5c-aad7-4de7-af40-39ba832dc3a4/v1/recognize?model=en-US_Multimedia&background_audio_suppression=0.3"
  );

  fetch(baseUrl.href, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const output = JSON.parse(result);

      recordVoice = output.results[0].alternatives[0].transcript;
      recordVoice = recordVoice.replace("%HESITATION", "");
    })
    .catch((error) => console.log("error", error));
}

async function preReceiveHandler(event: any) {
  if (event.data.output.generic != null) {
    for (const element of event.data.output.generic) {
      await playAudio(element.text);
    }
  }
}

/**
 * This creates a button that can be displayed in the custom element on the home screen.
 */
function createLink(icon: any, label: any, href: any) {
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank'
  link.classList.add('HSContainer__Link');
  // All IBM Carbon class names (https://v10.carbondesignsystem.com/) are automatically available for use inside of
  // web chat and will inherit theming values you have set on web chat.
  link.classList.add('bx--link');
  link.innerHTML = `<span class="HSContainer__LinkIcon">${icon}</span>${label}`;
  return link;
}


/** What it is. A standby list allows you to change to a different flight if a seat becomes available. It's an option if you're hoping for an earlier flight or if your flight has been canceled or delayed. Flying standby 
* with us is free and easy, but there's no guarantee that you will get a seat while on a standby list. 
*/
function createHomeScreenElement(instance: any) {
  const title = document.createElement('div');
  title.classList.add('HSTitle');
  title.innerHTML = 'Top articles';

  const articles = document.createElement('div');
  articles.classList.add('HSArticles');
  articles.appendChild(createLink('&#x1F6D2;', 'Interactive IBM watsonx Assistant demo', 'https://www.ibm.com/products/watson-assistant/demos/lendyr/demo.html'));
  articles.appendChild(createLink('&#x1F9FE;', 'IBM watsonx Assistant product page', 'https://www.ibm.com/products/watson-assistant'));
  articles.appendChild(createLink('&#x2754;', 'Documentation', 'https://cloud.ibm.com/docs/watson-assistant'));

  const container = document.createElement('div');
  container.classList.add('HSContainer');
  container.appendChild(title);
  container.appendChild(articles);

  // This is what adds this custom content to web chat. The "homeScreenAfterStartersElement" element is a writeable
  // area that appears at the bottom of the home screen below the starters.
  instance.writeableElements.homeScreenAfterStartersElement.appendChild(container);
}
/**
* This is the function that is called when the web chat code has been loaded and it is ready to be rendered.
*/
async function onLoad(instance: any) {
  /** old version */
  // await instance.render();
  // createHomeScreenElement(instance);

  /** new version */
  instance.on({ type: "receive", handler: preReceiveHandler });
  const rv = document.getElementById("recordVoice")
  if (rv) {
    rv.addEventListener("click", function () {
      if (flagTrigger) {
        flagTrigger = false;
        setTimeout(function () {
          const sendObject_input = {
            input: {
              message_type: "text",
              text: recordVoice,
            },
          };
          const sendOptions_input = {
            silent: false,
          };
          instance
            .send(sendObject_input, sendOptions_input)
            .catch(function () {
              console.error("This message did not send!");
              console.log("Speechsent!");
            });
        }, 5000);
      }
    });
    await instance.render();
    createHomeScreenElement(instance);
  }
}

// /** watsonx testing */
window.watsonAssistantChatOptions = {
  integrationID: "f521b63d-6e3f-4ebd-a016-7db91d0c6cfc", // The ID of this integration.
  region: "au-syd", // The region your integration is hosted in.
  serviceInstanceID: "23ba2bcd-537f-4395-94b0-6b15d127768a", // The ID of your service instance.
  // integrationID: `${process.env.WATSONX_INTEGRATIONID}`, // The ID of this integration.
  // region: `${process.env.WATSONX_REGION}`, // The region your integration is hosted in.
  // serviceInstanceID: `${process.env.WATSONX_SERVICEINSTANCEID}`, // The ID of your service instance.
  onLoad: onLoad,
  /** setting up a proxy */
  // servers: {
  //   assistantURLPrefix: 'https://proxy.privatecompany.com/assistant',
  //   webChatScriptPrefix: 'https://proxy.privatecompany.com/webchat',
  // },
};
// const cv = window.watsonAssistantChatOptions.clientVersion as any
setTimeout(function () {
  const t = document.createElement('script');
  // clientVersion
  // const c = clientVersion as any
  const cv = window.watsonAssistantChatOptions.clientVersion
  t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (cv || 'latest') + "/WatsonAssistantChatEntry.js";
  document.head.appendChild(t);
});

/** TTS */
async function playAudio(text2speechContent: any) {
  const myHeaders = new Headers();
  const host = window.location.protocol + "//" + window.location.host;
  myHeaders.append(
    "Authorization",
    "Basic YXBpa2V5OmJLb3hzb1Vhd05IZF9hUW1LdVV3RTdUNF9aZW5qZExGWWxWS21LenhKMFU1"
  );
  //myHeaders.append("Access-Control-Allow-Origin", host);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const baseUrl = new URL(
    "https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/bc169411-2396-4664-bc78-3368a70ca647/v1/synthesize"
  );
  baseUrl.searchParams.append("accept", "audio/mp3");
  baseUrl.searchParams.append("voice", "en-US_AllisonV3Voice");
  baseUrl.searchParams.append("text", text2speechContent);

  await fetch(baseUrl.href, requestOptions)
    .then((result) => {
      return playon(result);
    })

    .catch((error) => console.log("error", error));
}

function blobToFile(theBlob: any, fileName: any) {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

async function playon(result: any) {
  let file: any;
  await result.blob().then((data: any) => {
    file = blobToFile(data, "received.mp3");
  });
  return new Promise(function (resolve, reject) {
    const objectUrl = window.URL.createObjectURL(file);

    // document.getElementById("log").innerHTML = "";
    // document.getElementById("log").innerHTML +=

    const myMaybeNullElement = document.getElementById("log")
    if (myMaybeNullElement) {
      myMaybeNullElement.innerHTML = "";
      myMaybeNullElement.innerHTML +=
        '<audio id="audio" hidden crossOrigin="anonymous" controls src=' +
        objectUrl +
        ">";
    }

    // const audio: <HTMLVideoElement> = document.getElementById("audio")
    const audio = document.getElementById("audio") as any
    if (audio) {
      audio.load();
      audio.play();

      audio.onerror = reject;
      audio.onended = resolve;
    }
  });
}

const ChatBot: React.FC<ChatBotProps> = ({ currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      router.refresh();
    }
  }, []);

  if (!currentUser) {
    return <p className="text-center">Please login your account. Redirecting...</p>;
  }

  // return (
  //   <div>
  //     <p>hello watsonx page</p>
  //     <h1 className='text-red-300'>{currentUser.email}</h1>
  //   </div>
  // )
}

export default ChatBot