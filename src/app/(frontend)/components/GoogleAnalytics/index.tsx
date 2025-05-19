'use client'

import { useEffect } from 'react'

// Extend the Window interface to include the gtag function
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
import Script from 'next/script'
import { usePathname } from 'next/navigation'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const GA = () => {
  const pathname = usePathname()

  useEffect(() => {
    if (!GA_ID) return
    window.gtag('config', GA_ID, {
      page_path: pathname,
    })
  }, [pathname])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

export default GA
