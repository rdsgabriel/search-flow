import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SearchFlow',
  description: 'created by rdsgabriel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
