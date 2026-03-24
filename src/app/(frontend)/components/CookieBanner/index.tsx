'use client'

import CookieConsent from 'react-cookie-consent'

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="site-consent"
      style={{
        background: 'hsl(0 0% 100%)',
        color: 'hsl(70 4% 10%)',
        borderTop: '1px solid hsl(50 8% 90%)',
        padding: '1rem 1.5rem',
        fontSize: '0.875rem',
        fontFamily: 'var(--font-sans, sans-serif)',
        alignItems: 'center',
      }}
      buttonStyle={{
        background: 'hsl(160 38% 27%)',
        color: 'hsl(0 0% 100%)',
        borderRadius: '9999px',
        padding: '0.4rem 1.1rem',
        fontSize: '0.8rem',
        fontWeight: '500',
        fontFamily: 'var(--font-sans, sans-serif)',
        margin: '0 0 0 0.75rem',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: 'hsl(60 3% 34%)',
        border: '1px solid hsl(50 8% 90%)',
        borderRadius: '9999px',
        padding: '0.4rem 1.1rem',
        fontSize: '0.8rem',
        fontWeight: '500',
        fontFamily: 'var(--font-sans, sans-serif)',
        margin: '0 0 0 0.75rem',
      }}
      expires={180}
    >
      This website uses cookies to enhance the user experience. Read our{' '}
      <a href="/privacy" style={{ color: 'hsl(160 38% 27%)', textDecoration: 'underline' }}>
        privacy policy
      </a>
      .
    </CookieConsent>
  )
}

export default CookieBanner
