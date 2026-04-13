import { describe, it, expect, vi, beforeEach } from 'vitest'
import { scrollToSection, scrollToTop } from '@/app/(frontend)/utils/scroll'

describe('scrollToSection', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    vi.spyOn(window.history, 'replaceState').mockImplementation(() => {})
  })

  it('does nothing when element does not exist', () => {
    scrollToSection('nonexistent')
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('scrolls to the element offset by the navbar height', () => {
    // Create a mock section element
    const section = document.createElement('div')
    section.id = 'test-section'
    document.body.appendChild(section)

    // Mock getBoundingClientRect to simulate element at y=500
    vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
      top: 500,
      bottom: 600,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 500,
      toJSON: () => {},
    })

    // No sticky header present — should fall back to 64px
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })

    scrollToSection('test-section')

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 500 + 100 - 64, // element top + scrollY - fallback navbar height
      behavior: 'smooth',
    })

    document.body.removeChild(section)
  })

  it('uses actual navbar height when sticky header exists', () => {
    const section = document.createElement('div')
    section.id = 'test-section-2'
    document.body.appendChild(section)

    // Create a sticky header
    const header = document.createElement('header')
    header.classList.add('sticky')
    document.body.appendChild(header)

    vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
      top: 300,
      bottom: 400,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 300,
      toJSON: () => {},
    })

    vi.spyOn(header, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 80,
      left: 0,
      right: 100,
      width: 100,
      height: 80,
      x: 0,
      y: 0,
      toJSON: () => {},
    })

    Object.defineProperty(window, 'scrollY', { value: 200, writable: true })

    scrollToSection('test-section-2')

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 300 + 200 - 80, // element top + scrollY - actual navbar height
      behavior: 'smooth',
    })

    document.body.removeChild(section)
    document.body.removeChild(header)
  })

  it('clears the URL hash after scrolling', () => {
    const section = document.createElement('div')
    section.id = 'test-hash'
    document.body.appendChild(section)

    vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
      top: 0, bottom: 100, left: 0, right: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => {},
    })

    scrollToSection('test-hash')

    expect(window.history.replaceState).toHaveBeenCalledWith(null, '', ' ')

    document.body.removeChild(section)
  })
})

describe('scrollToTop', () => {
  it('scrolls to the top of the page smoothly', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    scrollToTop()
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
