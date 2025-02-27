import languages from "@/utils/language";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const notify = () => {
  toast('Here is your toast')
}

const AudioTranslate = () => {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string>(languages[0].value)
  const [generatedTranslation, setGeneratedTranslation] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)

  const url = "https://api.openai.com/v1/audio/transcriptions";

  const transcribe = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    formData.append('model', 'whisper-1');
    formData.append('response_format', 'verbose_json');
    if (language) {
      formData.append("language", language)
    }

    const headers = new Headers();
    headers.append("Authorization", "Bearer" + process.env.OPENAI_API_KEY);

    return fetch(url, {
      method: "POST",
      body: formData,
      headers: headers,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
  }

  const translateAudio = async () => {
    setGeneratedTranslation('')
    setLoading(true)
    const transcribed = await transcribe()

    console.log(transcribed.text);
    setGeneratedTranslation(transcribed.text);
    setLoading(false);
  }

  const handlefileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedLabel = languages.find((language) => language.value === selectedValue)?.value

    if (selectedLabel) {
      setLanguage(selectedLabel)
    }
  }

  return (
    <div>
      <div className="max-w-xl w-full">
        <div className="flex flex-row mt-10 items-center space-x-3">
          <p className="text-left font-medium">Upload your audio file {" "}
            <span className="text-slate-500"></span>
          </p>
        </div>

        <label>Upload file</label>
        <input type="file" accept="audio/*" onChange={handlefileChange} />
        <p className="my-2 text-sm text-gray-500 dark:text-gray-300">The follow file formats are accepted: m4a, mp3,.....</p>

        <div className="flex mb-5 items-center space-x-3">
          <p className="text-left font-medium">Choose your language</p>
        </div>

        <select onChange={handleChange} value={language}>
          {languages.map((language) => (
            <option key={language.value} value={language.value} className="text-black">
              {language.label}
            </option>
          ))}
        </select>

        {!loading && (
          <button className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-sky-700"
            onClick={translateAudio}
          >
            Translate &rarr;
          </button>
        )}
        {
          loading && (
            <button className="text-white"
              disabled>
              Loading......
            </button>
          )
        }

        {generatedTranslation && (
          <>translatesa</>
        )}

        {/* {generatedTranslation && (
          <>
            <label className="block my-2 text-md text-left font-medium text-gray-900 dark: text-white">Translation: </label>
            <div className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-1" onClick={() => {
              navigator.clipboard.writeText(generatedTranslation);
              toast("Translation copied to clipboard")
            }}>
              <p>{generatedTranslation}</p>
            </div>
            <p className="my-1 text-sm text-gray-500 dark:text-gray-300">
              Click on translation to copy on clipboard
            </p>
          </>
        )} */}
      </div>
    </div>
  )


}

export default AudioTranslate;