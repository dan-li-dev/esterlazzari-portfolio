'use client'

import { scrollToSection } from '@/app/(frontend)/utils/scroll'

const buttons = [
  { label: 'Publications', target: 'research' },
  { label: 'Research Projects', target: 'projects' },
  { label: 'Conferences', target: 'conferences' },
]

export default function AboutButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-1 mt-6 sm:mt-8 sm:gap-4">
      {buttons.map(({ label, target }) => (
        <button
          key={target}
          onClick={() => scrollToSection(target)}
          className="bg-white text-primary font-semibold px-6 py-3 rounded hover:bg-white/90 transition cursor-pointer"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
