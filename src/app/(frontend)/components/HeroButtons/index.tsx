'use client'

import { scrollToSection } from '@/app/(frontend)/utils/scroll'

const buttons = [
  { label: 'Know More', href: 'about' },
  { label: 'Media Mentions', href: 'media' },
]

export default function HeroButtons() {
  return (
    <div className="flex justify-center md:justify-start gap-4">
      {buttons.map(({ label, href }) => (
        <button
          key={href}
          onClick={() => scrollToSection(href)}
          className="relative inline-block font-bold text-primary border-2 border-current px-4 py-1.5 overflow-hidden group cursor-pointer bg-transparent"
        >
          <span className="relative z-10 text-[clamp(0.8rem,2vw,1.25rem)] transition-colors duration-300 group-hover:text-white">
            {label}
          </span>
          <span className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0" />
        </button>
      ))}
    </div>
  )
}
