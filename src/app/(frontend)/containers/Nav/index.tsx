'use client'

import { useState, useEffect } from 'react'
import { IoIosMenu } from 'react-icons/io'
import { CiSquareRemove } from 'react-icons/ci'
import { scrollToSection, scrollToTop } from '@/app/(frontend)/utils/scroll'
import { usePathname, useRouter } from 'next/navigation'

const ALL_MENU_ITEMS: [string, string, string?][] = [
  ['About', 'about'],
  ['Publications', 'research', 'publications'],
  ['Media', 'media', 'media'],
  ['Projects', 'projects', 'projects'],
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
    const sectionIds = ALL_MENU_ITEMS.map(([, href]) => href)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
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
          <div className="hidden md:flex gap-7">
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <CiSquareRemove className="h-6 w-6" /> : <IoIosMenu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border">
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
