// console.log("create");
require('dotenv').config();

const fs = require('fs');
const axios = require('axios');

async function transcribe(file: any) {
  const response = await axios.post(
    // Transcribes audio into the input language.
    'https://api.openai.com/v1/audio/transcriptions',
    // Translates audio into English.
    // 'https://api.openai.com/v1/audio/translations',
    {
      // file and model is required
      file,
      model: 'whisper-1',
      // prompt // string Optional
      // response_format // string Optional Defaults to json
      // language: 'es',//language string Optional
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  )
  return response.data.text;
}

async function main() {
  const file = fs.createReadStream('Your_First_Lesson.mp3');
  const transcript = await transcribe(file);

  console.log(transcript);
}
main();