'use client'

import { useEffect } from 'react'

const defaultProps = {
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  distance: '30px',
  duration: 1000,
  delay: 300,
  desktop: true,
  mobile: true,
}

export const Animations = () => {
  useEffect(() => {
    import('scrollreveal').then((ScrollReveal) => {
      const sr = ScrollReveal.default()
      const isDesktop = window.innerWidth > 768

      // All sections animate in from the left on desktop, bottom on mobile
      sr.reveal('.container', {
        ...defaultProps,
        origin: isDesktop ? 'left' : 'bottom',
      })

      // Media coverage section animates in from the right
      sr.reveal('#media .container', {
        ...defaultProps,
        origin: 'right',
      })
    })
  }, [])

  return null
}
