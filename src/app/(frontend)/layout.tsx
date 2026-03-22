import React from 'react'
import './styles.css'

import { Montserrat } from 'next/font/google'
import NavWrapper from '@/app/(frontend)/containers/Nav/NavWrapper'
import Footer from '@/app/(frontend)/containers/Footer'
import type { Metadata } from 'next'
import CookieBanner from '@/app/(frontend)/components/CookieBanner'
import { Analytics } from '@vercel/analytics/next'

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <body>
        <NavWrapper />
        <main>{children}</main>
        <CookieBanner />
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
export const metadata: Metadata = {
  metadataBase: new URL('https://esterlazzari.com'),
  description: 'Ester Lazzari | Demographer',
  title: 'Ester Lazzari | Demographer',
  keywords:
    'Ester Lazzari, demographer, fertility research, assisted reproduction, social demography, Austria, ANU',
  alternates: {
    canonical: 'https://esterlazzari.com',
  },
  openGraph: {
    title: 'Ester Lazzari | Demographer',
    description:
      'Researcher exploring fertility, reproductive technologies, and social demography.',
    url: 'https://esterlazzari.com',
    siteName: 'Ester Lazzari',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ester Lazzari - Demographer',
    description:
      'Researcher in demography focused on fertility, reproductive technologies, and social trends.',
  },
}
