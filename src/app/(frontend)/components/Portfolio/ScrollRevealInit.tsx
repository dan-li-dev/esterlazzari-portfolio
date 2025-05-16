'use client'

import { useEffect } from 'react'
import initScrollReveal from '@/scripts/scrollReveal' // adjust path if needed
import { defaultProps, targetElements } from '@/scripts/scrollRevealConfig' // adjust path if needed

const ScrollRevealInit = () => {
  useEffect(() => {
    initScrollReveal(targetElements, defaultProps)
  }, [])

  return null // no visible UI
}

export default ScrollRevealInit
