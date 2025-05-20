'use client'

import CookieConsent from 'react-cookie-consent'
import Link from 'next/link'

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept all"
      declineButtonText="Decline"
      enableDeclineButton
      //   debug={true}
      cookieName="site-consent"
      //   onDecline={() => {
      //     alert('nay!')
      //   }}
      style={{
        background: 'hsl(210 25% 92%)', // --card
        color: 'hsl(240 15% 15%)', // --card-foreground
        textAlign: 'left',
        padding: '1rem',
        fontSize: '1rem',
      }}
      buttonStyle={{
        background: 'hsl(182.7 97.8% 34.9%)', // --primary
        color: 'hsl(0 0% 100%)', // --primary-foreground
        borderRadius: '0.375rem',
        padding: '0.5rem 1rem',
        marginLeft: '1rem',
        fontWeight: '500',
      }}
      declineButtonStyle={{
        background: 'hsl(210 15% 85%)', // --muted
        color: 'hsl(215.4 12% 30%)', // --muted-foreground
        borderRadius: '0.375rem',
        padding: '0.5rem 1rem',
        marginLeft: '1rem',
        fontWeight: '500',
      }}
      expires={180}
    >
      This website uses cookies to enhance the user experience. Read our{' '}
      <a
        href="/privacy"
        style={{
          color: 'hsl(182.7 97.8% 34.9%)', // --primary
          textDecoration: 'underline',
        }}
      >
        privacy policy
      </a>
      .
    </CookieConsent>
  )
}

export default CookieBanner
