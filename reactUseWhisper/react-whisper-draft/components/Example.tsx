import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const api_key = process.env.OPENAI_API_KEY

const model = "whisper-1"

const Example = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [response, setResponse] = useState(null);

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const f = event.target.files && event.target.files[0]
    if (f) {
      setFile(f)
    }
  }

  useEffect(() => {
    const fetchAudioFile = async () => {
      if (!file) {
        return;
      }
      let formData = new FormData();
      formData.append("model", model);
      formData.append("file", file);

      axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${api_key}`
        }
      })
        .then((res) => {
          console.log(res.data);
          setResponse(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
      console.log(api_key, 'api keyyyy');

    }
    fetchAudioFile();
  }, [file])


  return (
    <div style={{
      // background: "#f2f2f2",
      padding: "20px",
      borderRadius: "8px"
    }}>
      Whisper
      <input
        type="file"
        ref={inputRef}
        accept=".mp3"
        onChange={onChangeFile}
        style={{ display: "block", marginTop: "20px" }} />

      {response && <>{JSON.stringify(response, null, 4)}</>}
      line
    </div>
  )
}

export default Example;