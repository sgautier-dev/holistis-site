import Image from 'next/image'
import NewsletterForm from './components/NewsletterForm'

export default function Home() {
  return (
    <main className='px-6 mx-auto'>
      <h1 className='mt-32 mb-12 text-5xl text-center text-orange font-bariol'><span className=' italic'>Holistis</span> est en cours de construction 🙏</h1>
      <NewsletterForm />
    </main>
  )
}
