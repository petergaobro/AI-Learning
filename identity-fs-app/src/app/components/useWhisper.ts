// require('dotenv').config();
import 'dotenv/config'
// const axios = require('axios')
import axios from 'axios';

async function transcribe(formData: any) {
  const api_key = process.env.OPENAI_API_KEY;
  const response = await axios.post(
    // Transcribes audio into the input language.
    'https://api.openai.com/v1/audio/transcriptions',
    // Translates audio into English.
    // 'https://api.openai.com/v1/audio/translations',
    {
      // file and model is required
      formData,
      model: 'whisper-1',
      // prompt // string Optional
      response_format: 'json' // string Optional Defaults to json
      // language: 'es',//language string Optional
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${api_key}`
      }
    }
  )
  console.log(api_key, "api keyyyy");
  return response.data.text;
}

export default transcribe;

// async function whisper(audioFile: any) {
//   const file = fs.createReadStream(audioFile);
//   const transcript = await transcribe(file);
//   console.log(transcript);
// }
// export default whisper;

