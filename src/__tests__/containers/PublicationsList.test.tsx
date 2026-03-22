import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PublicationsList from '@/app/(frontend)/containers/PublicationsPage/PublicationsList'

const makePublication = (n: number) => ({
  title: `Publication ${n}`,
  authors: `Author ${n}`,
  journal: `Journal ${n}`,
  date: '2023-01-01T00:00:00.000Z',
  paperLink: null,
  scholarLink: null,
})

describe('PublicationsList', () => {
  describe('count display', () => {
    it('shows correct count for a single page of results', () => {
      const pubs = Array.from({ length: 3 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      expect(screen.getByText(/Showing 3 of 3 publications/i)).toBeInTheDocument()
    })

    it('shows per-page count when results span multiple pages', () => {
      const pubs = Array.from({ length: 15 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      expect(screen.getByText(/Showing 10 of 15 publications/i)).toBeInTheDocument()
    })

    it('uses singular "publication" for a single item', () => {
      render(<PublicationsList publications={[makePublication(1)]} perPage={10} />)
      expect(screen.getByText(/Showing 1 of 1 publication$/i)).toBeInTheDocument()
    })
  })

  describe('pagination controls', () => {
    it('does not render pagination when all results fit on one page', () => {
      const pubs = Array.from({ length: 3 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      expect(screen.queryByRole('button', { name: /Previous/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Next/i })).not.toBeInTheDocument()
    })

    it('renders pagination controls when results span multiple pages', () => {
      const pubs = Array.from({ length: 15 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      expect(screen.getByRole('button', { name: /← Previous/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Next →/i })).toBeInTheDocument()
    })

    it('disables Previous on the first page', () => {
      const pubs = Array.from({ length: 15 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      expect(screen.getByRole('button', { name: /← Previous/i })).toBeDisabled()
    })

    it('disables Next on the last page', async () => {
      const user = userEvent.setup()
      const pubs = Array.from({ length: 15 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      await user.click(screen.getByRole('button', { name: /Next →/i }))
      expect(screen.getByRole('button', { name: /Next →/i })).toBeDisabled()
    })

    it('shows correct page indicator', () => {
      const pubs = Array.from({ length: 25 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      expect(screen.getByText('Page 1 of 3')).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('advances to page 2 when Next is clicked', async () => {
      const user = userEvent.setup()
      const pubs = Array.from({ length: 15 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      await user.click(screen.getByRole('button', { name: /Next →/i }))
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument()
      expect(screen.getByText(/Showing 15 of 15 publications/i)).toBeInTheDocument()
    })

    it('returns to page 1 when Previous is clicked after advancing', async () => {
      const user = userEvent.setup()
      const pubs = Array.from({ length: 15 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      await user.click(screen.getByRole('button', { name: /Next →/i }))
      await user.click(screen.getByRole('button', { name: /← Previous/i }))
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    })

    it('hides off-page cards and shows on-page cards', async () => {
      const user = userEvent.setup()
      const pubs = Array.from({ length: 15 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)

      // The wrapper div structure is: h3 → div.space-y-2 → div.bg-card → div(wrapper)
      const getWrapper = (title: string) =>
        screen.getByText(title).parentElement?.parentElement?.parentElement

      const firstWrapper = getWrapper('Publication 1')
      const eleventhWrapper = getWrapper('Publication 11')

      // Page 1: first card wrapper has no 'hidden' class, 11th does
      expect(firstWrapper).not.toHaveClass('hidden')
      expect(eleventhWrapper).toHaveClass('hidden')

      // After going to page 2: first card hidden, 11th visible
      await user.click(screen.getByRole('button', { name: /Next →/i }))
      expect(firstWrapper).toHaveClass('hidden')
      expect(eleventhWrapper).not.toHaveClass('hidden')
    })
  })
})
