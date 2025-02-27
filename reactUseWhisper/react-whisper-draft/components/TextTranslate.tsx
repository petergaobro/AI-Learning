import languages from "@/utils/language";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const TextTranslate = () => {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string>(languages[0].value);
  const [generatedTranslation, setGeneratedTranslation] = useState<string>('')
  const [text, setText] = useState<string>("");
  const currentModel = "text-davinci-003"

  const prompt = `Please transalte the following text into ${language}, the text is ${text}`;

  return (
    <p className="text-left font-medium">
      Enter the text your want to translate.
    </p>
  )
}

export default TextTranslate;