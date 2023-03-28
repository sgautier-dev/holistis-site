import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='px-6 mx-auto'>
      <h1 className='mt-12 mb-12 text-3xl text center dark:text-white'> Hello <span className='font-bold'>Holistis</span>  !</h1>
    </main>
  )
}
