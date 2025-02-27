// export { };

// import { type WebChatConfig } from "./WebChatConfig";
// import { type WebChatInstance } from "./WebChatInstance";

// declare global {
//   interface Window {
//     watsonAssistantChatOptions: object; // 👈️ turn off type checking
//     webkitRTCPeerConnection: object; // 👈️ turn off type checking
//     mozRTCPeerConnection: object; // 👈️ turn off type checking
//     webkitAudioContext: object; // 👈️ turn off type checking

//     /**
//  * This is the initialization function that the web chat script adds to the window object that can be used to
//  * load web chat.
//  */
//     loadWatsonAssistantChat?: (config: WebChatConfig) => Promise<WebChatInstance>;
//   }
// }


import { type WebChatConfig } from './backup/WebChatConfig';
import { type WebChatInstance } from './backup/WebChatInstance';

declare global {
  interface Window {
    /**
     * This is the initialization function that the web chat script adds to the window object that can be used to
     * load web chat.
     */
    loadWatsonAssistantChat?: (config: WebChatConfig) => Promise<WebChatInstance>;
    webkitSpeechRecognition: any;
    watsonAssistantChatOptions: any;
    clientVersion: any
  }
}