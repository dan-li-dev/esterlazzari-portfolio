import React from 'react'
import './styles.css'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// import { Animations } from './scroll-effect'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
