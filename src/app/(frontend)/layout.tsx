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
  description: 'Ester Lazzari | Demographer',
  title: 'Ester Lazzari | Demographer',
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
