import Image from 'next/image'
import NewsletterForm from './components/NewsletterForm'

export default function Home() {
  return (
    <main className='px-6 lg:px-8 py-20 sm:py-24 mx-auto min-h-screen'>
      <h1 className='mb-12 text-5xl text-center text-orange font-bariol'>En cours de développement 🙏🏼</h1>
      <NewsletterForm />
    </main>
  )
}
