'use client'

import { useState } from 'react'
import { IoIosMenu } from 'react-icons/io'
import { CiSquareRemove } from 'react-icons/ci'
import { scrollToSection, scrollToTop } from '@/app/(frontend)/utils/scroll'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            onClick={scrollToTop}
            className="text-xl font-bold text-primary group cursor-pointer transition duration-100"
          >
            Ester Lazzari
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-primary"></span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            {[
              ['About', 'about'],
              ['Publications', 'research'],
              ['Media', 'media'],
              ['Projects', 'projects'],
              ['Conferences', 'conferences'],
              ['Contact', 'footer'],
            ].map(([label, href]) => (
              <a
                key={href}
                onClick={() => scrollToSection(href)}
                className="text-foreground hover:text-primary cursor-pointer transition"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <CiSquareRemove className="h-6 w-6" /> : <IoIosMenu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {[
              ['About', '#about'],
              ['Publications', '#research'],
              ['Media', '#media'],
              ['Projects', '#projects'],
              ['Conferences', '#conferences'],
              ['Contact', '#footer'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={toggleMenu}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
