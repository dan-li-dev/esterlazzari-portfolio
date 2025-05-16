'use client'

import { useEffect } from 'react'
// import ScrollReveal from 'scrollreveal'
// import initScrollReveal from '@/utilities/utils/scrollReveal'
// import initTiltEffect from '@/utilities/utils/tiltAnimation'
// import { defaultProps } from "@/utilities/utils/scrollRevealConfig";
// import { buildTargetElements, buildDefaultProps } from '@/utilities/utils/buildTargetElements'

const defaultProps = {
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  distance: '30px',
  duration: 1000,
  desktop: true,
  mobile: true,
}

const animation = {
  delay: 500,
  origin: `window.innerWidth > 768 ? 'left' : 'bottom'`,
}

import VanillaTilt from 'vanilla-tilt'
export const Animations = () => {
  useEffect(() => {
    import('scrollreveal').then((ScrollReveal) => {
      ScrollReveal.default().reveal('.container', { ...defaultProps, ...animation })
    })
    // const elements = document.querySelectorAll('#about')
    // VanillaTilt.init(Array.from(elements) as HTMLElement[], {
    //   max: 25,
    //   speed: 400,
    // })

    // import('vanilla-tilt').then((VanillaTilt) => {
    //   VanillaTilt.init(document.querySelector('#about'))
    // })
    // const targetElements = buildTargetElements()
    // const defaultProps = buildDefaultProps()
    // if (typeof window !== 'undefined') {
    //   window.addEventListener('load', () => {
    //     initScrollReveal(targetElements, defaultProps)
    //     initTiltEffect()
    //   })
    // }
  }, [])

  return null // no DOM output needed
}
