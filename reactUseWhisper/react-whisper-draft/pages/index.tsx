import Image from 'next/image'
import { Inter } from 'next/font/google'
import AudioTranslate from '@/components/AudioTranslate'
import Example from '../components/Example'
import CreatePage from './createPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      {/* <AudioTranslate /> */}
      <Example />
      {/* <CreatePage /> */}
    </div>
  )
}
