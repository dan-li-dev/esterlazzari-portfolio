'use client'

import { useSyncExternalStore, useCallback } from 'react'

function getTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ?? 'light'
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => observer.disconnect()
}

const ThemeToggle = () => {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light' as const)

  const toggle = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }, [theme])

  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative w-9 h-9 flex items-center justify-center rounded-full
        text-muted-foreground hover:text-foreground
        hover:bg-muted transition-colors duration-200 cursor-pointer"
    >
      {/* Sun icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute w-5 h-5 transition-all duration-500 ease-in-out ${
          isDark
            ? 'opacity-0 rotate-90 scale-0'
            : 'opacity-100 rotate-0 scale-100'
        }`}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute w-5 h-5 transition-all duration-500 ease-in-out ${
          isDark
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 -rotate-90 scale-0'
        }`}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}

export default ThemeToggle
