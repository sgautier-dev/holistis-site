import './globals.css'

export const metadata = {
  title: 'Holistis website',
  description: 'la plateforme web Holistis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
