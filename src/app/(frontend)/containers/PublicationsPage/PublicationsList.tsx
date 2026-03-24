'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import PublicationCard from './PublicationCard'

type Publication = {
  title: string
  authors: string
  journal?: string | null
  date?: string | null
  paperLink?: string | null
  scholarLink?: string | null
}

type Props = {
  publications: Publication[]
  perPage: number
  keywordFilterEnabled?: boolean
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'into', 'about', 'among', 'between', 'during', 'through', 'upon',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'it', 'its', 'this', 'that', 'these', 'those', 'their', 'what', 'which', 'who',
  'all', 'each', 'more', 'most', 'other', 'some', 'such', 'than', 'very', 'also',
  'new', 'not', 'only', 'both', 'using', 'used', 'use', 'journal', 'study', 'studies',
  'analysis', 'evidence', 'based', 'data', 'rate', 'rates',
])

const PublicationsList = ({ publications, perPage, keywordFilterEnabled = false }: Props) => {
  const [page, setPage] = useState(1)
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // Scroll to top of list on page change, but not on initial render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page])

  const keywords = useMemo(() => {
    const freq = new Map<string, number>()
    for (const pub of publications) {
      const text = `${pub.title ?? ''} ${pub.journal ?? ''}`.toLowerCase()
      const words = text.match(/\b[a-z]{4,}\b/g) ?? []
      for (const word of words) {
        if (!STOP_WORDS.has(word)) {
          freq.set(word, (freq.get(word) ?? 0) + 1)
        }
      }
    }
    return Array.from(freq.entries())
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1))
  }, [publications])

  const filtered = useMemo(() => {
    if (!activeKeyword) return publications
    const kw = activeKeyword.toLowerCase()
    return publications.filter(
      (p) => p.title?.toLowerCase().includes(kw) || p.journal?.toLowerCase().includes(kw),
    )
  }, [publications, activeKeyword])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const selectKeyword = (kw: string | null) => {
    setActiveKeyword(kw)
    setPage(1)
  }

  return (
    <>
      {/* Scroll anchor — sits above the filter pills so smooth-scroll lands cleanly */}
      <div ref={topRef} className="scroll-mt-24" />

      {/* Keyword pills — only rendered when enabled via site settings */}
      {keywordFilterEnabled && keywords.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            className={`filter-pill ${activeKeyword === null ? 'filter-pill-active' : ''}`}
            onClick={() => selectKeyword(null)}
          >
            All
          </button>
          {keywords.map((kw) => (
            <button
              key={kw}
              className={`filter-pill ${activeKeyword === kw ? 'filter-pill-active' : ''}`}
              onClick={() => selectKeyword(activeKeyword === kw ? null : kw)}
            >
              {kw}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      <p className="text-center text-sm text-muted-foreground mb-8">
        Showing {Math.min(page * perPage, filtered.length)} of {filtered.length} publication
        {filtered.length !== 1 ? 's' : ''}
        {activeKeyword && (
          <button onClick={() => selectKeyword(null)} className="ml-2 text-primary hover:underline">
            Clear
          </button>
        )}
      </p>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {paged.map((pub, i) => (
          <PublicationCard key={i} {...pub} />
        ))}
        {paged.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No publications match this keyword.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            suppressHydrationWarning
            className="filter-pill disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <span className="text-sm text-muted-foreground px-2">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            suppressHydrationWarning
            className="filter-pill disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </>
  )
}

export default PublicationsList
