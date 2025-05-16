'use client'

import { useState } from 'react'
import Link from 'next/link'
// import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { IoIosMenu } from 'react-icons/io'
import { CiSquareRemove } from 'react-icons/ci'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link className="text-xl font-bold text-primary" href="/">
            Ester Lazzari
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="#about" className="text-gray-700 hover:text-primary transition">
              About
            </Link>
            {/* <Link href="#projects">
              <a className="text-gray-700 hover:text-primary transition">Projects</a>
            </Link>
            <Link href="#conferences">
              <a className="text-gray-700 hover:text-primary transition">Conferences</a>
            </Link>
            <Link href="#contact">
              <a className="text-gray-700 hover:text-primary transition">Contact</a>
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <CiSquareRemove className="h-6 w-6" /> : <IoIosMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="#about"
              className="block px-3 py-2 text-gray-700 hover:text-primary transition"
            >
              About
            </Link>
            {/* <Link href="#projects">
              <a className="block px-3 py-2 text-gray-700 hover:text-primary transition">
                Projects
              </a>
            </Link>
            <Link href="#conferences">
              <a className="block px-3 py-2 text-gray-700 hover:text-primary transition">
                Conferences
              </a>
            </Link>
            <Link href="#contact">
              <a className="block px-3 py-2 text-gray-700 hover:text-primary transition">Contact</a>
            </Link> */}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
