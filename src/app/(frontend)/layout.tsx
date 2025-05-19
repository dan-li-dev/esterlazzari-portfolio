import React from 'react'
import './styles.css'

import { Montserrat } from 'next/font/google'
import Navbar from '@/app/(frontend)/containers/Nav'
import Footer from '@/app/(frontend)/containers/Footer'
import { Metadata } from 'next'
import Head from 'next/head'

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <Head>
        <title>Ester Lazzari - Demographer</title>
        <meta
          name="description"
          content="Learn about Ester Lazzari's research in demography, fertility trends, and reproductive health."
        />
        <meta
          name="keywords"
          content="Ester Lazzari, demographer, fertility research, assisted reproduction, social demography, Austria, ANU"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://esterlazzari.com" />

        {/* Open Graph */}
        <meta property="og:title" content="Ester Lazzari – About" />
        <meta
          property="og:description"
          content="Discover Ester Lazzari's academic background, recent publications, and current projects in the field of demography."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://esterlazzari.com" />
        {/* <meta property="og:image" content="https://esterlazzari.com/og-image.jpg" /> */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ester Lazzari - Demographer" />
        <meta
          name="twitter:description"
          content="Researcher in demography focused on fertility, reproductive technologies, and social trends."
        />
        {/* <meta name="twitter:image" content="https://esterlazzari.com/og-image.jpg" /> */}
      </Head>

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
  },
}
