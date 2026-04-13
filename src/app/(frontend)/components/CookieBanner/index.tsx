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
        background: 'hsl(var(--card))',
        color: 'hsl(var(--card-foreground))',
        borderTop: '1px solid hsl(var(--border))',
        padding: '1rem 1.5rem',
        fontSize: '0.875rem',
        fontFamily: 'var(--font-sans, sans-serif)',
        alignItems: 'center',
      }}
      buttonStyle={{
        background: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
        borderRadius: '9999px',
        padding: '0.4rem 1.1rem',
        fontSize: '0.8rem',
        fontWeight: '500',
        fontFamily: 'var(--font-sans, sans-serif)',
        margin: '0 0 0 0.75rem',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: 'hsl(var(--muted-foreground))',
        border: '1px solid hsl(var(--border))',
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
      <a href="/privacy" style={{ color: 'hsl(var(--primary))', textDecoration: 'underline' }}>
        privacy policy
      </a>
      .
    </CookieConsent>
  )
}

export default CookieBanner
