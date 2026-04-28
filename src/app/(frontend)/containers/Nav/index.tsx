'use client'

import { useState, useEffect } from 'react'
import { IoIosMenu } from 'react-icons/io'
import { CiSquareRemove } from 'react-icons/ci'
import { scrollToSection, scrollToTop } from '@/app/(frontend)/utils/scroll'
import { usePathname, useRouter } from 'next/navigation'
import ThemeToggle from '@/app/(frontend)/components/ThemeToggle'

const ALL_MENU_ITEMS: [string, string, string?][] = [
  ['About', 'about'],
  ['Publications', 'research', 'publications'],
  ['Media', 'media', 'media'],
  ['Projects', 'projects', 'projects'],
  ['Teaching', 'teaching', 'teaching'],
  ['Conferences', 'conferences'],
  ['Contact', 'footer'],
]

type NavbarProps = {
  hiddenSections?: string[]
}

const Navbar = ({ hiddenSections = [] }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const sectionIds = ['hero', ...ALL_MENU_ITEMS.map(([, href]) => href)]

    const handleScroll = () => {
      const navbarHeight =
        document.querySelector('header.sticky')?.getBoundingClientRect().height ?? 64
      // Offset just below the navbar
      const scrollThreshold = navbarHeight + 20

      // At the bottom of the page, always highlight Contact
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
      if (atBottom) {
        setActiveSection('footer')
        return
      }

      // Find the last section whose top has scrolled past the navbar
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= scrollThreshold) {
          current = id
        } else {
          break
        }
      }

      // Hero means we're at the top — no menu item active
      setActiveSection(current === 'hero' ? '' : current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount to set initial state
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = () => {
    if (pathname === '/') {
      scrollToTop()
    } else {
      router.push('/')
    }
  }

  const menuItems = ALL_MENU_ITEMS.filter(
    ([, , sectionKey]) => !sectionKey || !hiddenSections.includes(sectionKey),
  )

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            onClick={handleLogoClick}
            className="font-serif text-xl text-foreground cursor-pointer"
          >
            Ester Lazzari
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">
            {menuItems.map(([label, href]) => {
              const isActive = activeSection === href
              return (
                <a
                  key={href}
                  onClick={() => scrollToSection(href)}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  {label}
                </a>
              )
            })}
            <ThemeToggle />
            {process.env.NODE_ENV === 'development' && (
              <a
                href="/api/dev-login"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium px-2.5 py-1 rounded-md border border-amber-500/60 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors"
              >
                Admin
              </a>
            )}
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <CiSquareRemove className="h-6 w-6" /> : <IoIosMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-card border-b border-border shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {menuItems.map(([label, href]) => {
              const isActive = activeSection === href
              return (
                <a
                  key={href}
                  onClick={() => {
                    scrollToSection(href)
                    setIsOpen(false)
                  }}
                  className={`block px-3 py-2 text-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
