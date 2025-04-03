import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SearchFlow',
  description: 'Motor de busca inteligente com autocomplete',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        href: '/icon.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
