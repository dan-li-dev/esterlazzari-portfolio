'use client'

import { useState } from 'react'
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
}

const PublicationsList = ({ publications, perPage }: Props) => {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(publications.length / perPage)

  return (
    <>
      <p className="text-center text-sm text-muted-foreground font-medium mb-10">
        Showing {Math.min(page * perPage, publications.length)} of {publications.length} publication
        {publications.length !== 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {publications.map((pub, i) => (
          <div key={i} className={i >= (page - 1) * perPage && i < page * perPage ? '' : 'hidden'}>
            <PublicationCard {...pub} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            suppressHydrationWarning
            className="px-4 py-2 text-sm font-semibold border-2 border-current text-primary disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="relative z-10 transition-colors duration-200 group-hover:text-white group-disabled:group-hover:text-primary">
              ← Previous
            </span>
            <span className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 group-disabled:translate-x-full transition-transform duration-300 ease-in-out z-0" />
          </button>

          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            suppressHydrationWarning
            className="px-4 py-2 text-sm font-semibold border-2 border-current text-primary disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="relative z-10 transition-colors duration-200 group-hover:text-white group-disabled:group-hover:text-primary">
              Next →
            </span>
            <span className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 group-disabled:translate-x-full transition-transform duration-300 ease-in-out z-0" />
          </button>
        </div>
      )}
    </>
  )
}

export default PublicationsList
