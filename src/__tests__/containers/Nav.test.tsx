import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/app/(frontend)/containers/Nav'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}))

// Mock scroll utilities
vi.mock('@/app/(frontend)/utils/scroll', () => ({
  scrollToSection: vi.fn(),
  scrollToTop: vi.fn(),
}))

// Mock ThemeToggle to avoid DOM complexity
vi.mock('@/app/(frontend)/components/ThemeToggle', () => ({
  default: () => <button data-testid="theme-toggle">Toggle theme</button>,
}))

describe('Navbar', () => {
  beforeEach(() => {
    // Provide sections for scroll listener to find
    const sectionIds = ['hero', 'about', 'research', 'media', 'projects', 'conferences', 'footer']
    sectionIds.forEach((id) => {
      const el = document.createElement('div')
      el.id = id
      document.body.appendChild(el)
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders all default menu items', () => {
    render(<Navbar />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Publications')).toBeInTheDocument()
    expect(screen.getByText('Media')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Conferences')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders the site name / logo', () => {
    render(<Navbar />)
    expect(screen.getByText('Ester Lazzari')).toBeInTheDocument()
  })

  it('hides sections specified in hiddenSections', () => {
    render(<Navbar hiddenSections={['publications', 'media']} />)
    expect(screen.queryByText('Publications')).not.toBeInTheDocument()
    expect(screen.queryByText('Media')).not.toBeInTheDocument()
    // Others should still appear
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  describe('theme toggle placement', () => {
    it('renders theme toggle in the desktop menu area', () => {
      const { container } = render(<Navbar />)
      // Desktop menu: hidden md:flex
      const desktopMenu = container.querySelector('.hidden.md\\:flex.items-center')
      expect(desktopMenu).toBeInTheDocument()
      const toggle = desktopMenu?.querySelector('[data-testid="theme-toggle"]')
      expect(toggle).toBeInTheDocument()
    })

    it('renders theme toggle in the mobile area next to hamburger', () => {
      const { container } = render(<Navbar />)
      // Mobile area: flex md:hidden
      const mobileArea = container.querySelector('.flex.md\\:hidden.items-center')
      expect(mobileArea).toBeInTheDocument()
      const toggle = mobileArea?.querySelector('[data-testid="theme-toggle"]')
      expect(toggle).toBeInTheDocument()
    })
  })

  describe('mobile menu', () => {
    it('is hidden by default', () => {
      const { container } = render(<Navbar />)
      // Mobile dropdown should not be in the DOM initially
      const dropdown = container.querySelector('.absolute.left-0')
      expect(dropdown).not.toBeInTheDocument()
    })

    it('opens when hamburger button is clicked', async () => {
      const user = userEvent.setup()
      const { container } = render(<Navbar />)

      const hamburger = screen.getByRole('button', { name: /toggle menu/i })
      await user.click(hamburger)

      const dropdown = container.querySelector('.absolute')
      expect(dropdown).toBeInTheDocument()
    })

    it('uses absolute positioning to overlay content (not push it down)', async () => {
      const user = userEvent.setup()
      const { container } = render(<Navbar />)

      await user.click(screen.getByRole('button', { name: /toggle menu/i }))

      const dropdown = container.querySelector('.absolute.left-0.right-0.top-full')
      expect(dropdown).toBeInTheDocument()
    })

    it('closes when a menu item is clicked', async () => {
      const user = userEvent.setup()
      const { container } = render(<Navbar />)

      await user.click(screen.getByRole('button', { name: /toggle menu/i }))
      expect(container.querySelector('.absolute')).toBeInTheDocument()

      // Click a menu item in the mobile dropdown — there are two "About" (desktop + mobile),
      // so get all and click the last one (mobile)
      const aboutLinks = screen.getAllByText('About')
      await user.click(aboutLinks[aboutLinks.length - 1])

      expect(container.querySelector('.absolute')).not.toBeInTheDocument()
    })
  })

  describe('scroll-based active section', () => {
    it('sets no active section when hero is at the top', () => {
      render(<Navbar />)

      // Simulate hero being at the top (within the scroll threshold)
      vi.spyOn(document.getElementById('hero')!, 'getBoundingClientRect').mockReturnValue({
        top: 0, bottom: 600, left: 0, right: 0, width: 0, height: 600, x: 0, y: 0, toJSON: () => {},
      })
      vi.spyOn(document.getElementById('about')!, 'getBoundingClientRect').mockReturnValue({
        top: 600, bottom: 1200, left: 0, right: 0, width: 0, height: 600, x: 0, y: 0, toJSON: () => {},
      })

      fireEvent.scroll(window)

      // No nav item should have the active class
      const navLinks = screen.getAllByText('About')
      // Desktop link (first one) should not have active styling
      expect(navLinks[0].className).not.toContain('nav-link-active')
    })

    it('highlights "Contact" when scrolled to the bottom of the page', () => {
      // Mock being at the bottom of the page
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true })
      Object.defineProperty(window, 'scrollY', { value: 5000, writable: true })
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        value: 5800,
        writable: true,
        configurable: true,
      })

      render(<Navbar />)

      // Simulate all sections above the viewport
      const sections = ['hero', 'about', 'research', 'media', 'projects', 'conferences', 'footer']
      sections.forEach((id) => {
        vi.spyOn(document.getElementById(id)!, 'getBoundingClientRect').mockReturnValue({
          top: -1000, bottom: -500, left: 0, right: 0, width: 0, height: 500, x: 0, y: 0, toJSON: () => {},
        })
      })

      fireEvent.scroll(window)

      // Contact link should be active
      const contactLinks = screen.getAllByText('Contact')
      expect(contactLinks[0].className).toContain('nav-link-active')
    })
  })
})
