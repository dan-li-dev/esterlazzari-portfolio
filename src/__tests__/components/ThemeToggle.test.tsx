import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from '@/app/(frontend)/components/ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.clear()
  })

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme')
    localStorage.clear()
  })

  it('renders a button with an accessible label', () => {
    render(<ThemeToggle />)
    const btn = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(btn).toBeInTheDocument()
  })

  it('toggles to dark mode on click', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const btn = screen.getByRole('button', { name: /switch to dark mode/i })
    await user.click(btn)

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('toggles back to light mode on second click', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const btn = screen.getByRole('button', { name: /switch to dark mode/i })
    await user.click(btn)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    const btnAfter = screen.getByRole('button', { name: /switch to light mode/i })
    await user.click(btnAfter)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('persists theme choice to localStorage', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button', { name: /switch to dark mode/i }))

    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('reads initial theme from data-theme attribute', () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    render(<ThemeToggle />)

    // When dark, the label should say "switch to light"
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })

  it('renders both sun and moon SVG icons', () => {
    const { container } = render(<ThemeToggle />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(2)
  })

  it('shows sun icon visible in light mode and moon icon hidden', () => {
    document.documentElement.setAttribute('data-theme', 'light')
    const { container } = render(<ThemeToggle />)
    const svgs = container.querySelectorAll('svg')

    // First SVG is sun — should be visible (opacity-100)
    expect(svgs[0].className).toContain('opacity-100')
    // Second SVG is moon — should be hidden (opacity-0)
    expect(svgs[1].className).toContain('opacity-0')
  })

  it('shows moon icon visible in dark mode and sun icon hidden', () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    const { container } = render(<ThemeToggle />)
    const svgs = container.querySelectorAll('svg')

    // First SVG is sun — should be hidden (opacity-0)
    expect(svgs[0].className).toContain('opacity-0')
    // Second SVG is moon — should be visible (opacity-100)
    expect(svgs[1].className).toContain('opacity-100')
  })
})
