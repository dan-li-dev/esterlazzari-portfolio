import React from 'react'
import './styles.css'

import { Montserrat } from 'next/font/google'
import Navbar from '@/app/(frontend)/containers/Nav'
import Footer from '@/app/(frontend)/containers/Footer'
import { Metadata } from 'next'

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
export const metadata: Metadata = {
  metadataBase: new URL('https://esterlazzari.com'),
  description: 'Ester Lazzari | Demographer',
  title: 'Ester Lazzari | Demographer',
  openGraph: {
    title: 'Ester Lazzari | Demographer',
    description:
      'Researcher exploring fertility, reproductive technologies, and social demography.',
    url: 'https://esterlazzari.com',
    siteName: 'Ester Lazzari',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ester Lazzari banner with photo and title',
      },
    ],
  },
}
