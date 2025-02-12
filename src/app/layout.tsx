import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Book-Shelf',
  description: 'Book-for-everyone',
  generator: 'Armanya-blazedigital',
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