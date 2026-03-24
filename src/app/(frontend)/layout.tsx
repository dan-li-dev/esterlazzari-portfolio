import React from 'react'
import './styles.css'

import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import NavWrapper from '@/app/(frontend)/containers/Nav/NavWrapper'
import Footer from '@/app/(frontend)/containers/Footer'
import type { Metadata } from 'next'
import CookieBanner from '@/app/(frontend)/components/CookieBanner'
import { Analytics } from '@vercel/analytics/next'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  const cookieBannerEnabled = siteSettings?.cookieBannerEnabled ?? false

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerifDisplay.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NavWrapper />
        <main>{children}</main>
        {cookieBannerEnabled && <CookieBanner />}
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
