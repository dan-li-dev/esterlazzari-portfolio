import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PublicationsList from '@/app/(frontend)/containers/PublicationsPage/PublicationsList'

// scrollIntoView is not implemented in happy-dom
beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

const makePublication = (n: number) => ({
  title: `Publication ${n}`,
  authors: `Author ${n}`,
  journal: `Journal ${n}`,
  date: '2023-01-01T00:00:00.000Z',
  paperLink: null,
  scholarLink: null,
})

// Publications that share repeated keywords so filter pills are generated.
// "fertility" appears in the first two titles (count >= 2 → keyword).
// "population" appears in the first two journals (count >= 2 → keyword).
const makeFilterPubs = () => [
  { title: 'Fertility Postponement', authors: 'A', journal: 'Population Demographics', date: '2023-01-01T00:00:00.000Z', paperLink: null, scholarLink: null },
  { title: 'Fertility Treatment Outcomes', authors: 'B', journal: 'Population Demographics', date: '2023-01-01T00:00:00.000Z', paperLink: null, scholarLink: null },
  { title: 'Reproductive Health Systems', authors: 'C', journal: 'Health Review', date: '2023-01-01T00:00:00.000Z', paperLink: null, scholarLink: null },
]

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
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('advances to page 2 when Next is clicked', async () => {
      const user = userEvent.setup()
      const pubs = Array.from({ length: 15 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      await user.click(screen.getByRole('button', { name: /Next →/i }))
      expect(screen.getByText('2 / 2')).toBeInTheDocument()
      expect(screen.getByText(/Showing 15 of 15 publications/i)).toBeInTheDocument()
    })

    it('returns to page 1 when Previous is clicked after advancing', async () => {
      const user = userEvent.setup()
      const pubs = Array.from({ length: 15 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)
      await user.click(screen.getByRole('button', { name: /Next →/i }))
      await user.click(screen.getByRole('button', { name: /← Previous/i }))
      expect(screen.getByText('1 / 2')).toBeInTheDocument()
    })

    it('shows only page-1 cards on load and only page-2 cards after advancing', async () => {
      const user = userEvent.setup()
      const pubs = Array.from({ length: 15 }, (_, i) => makePublication(i + 1))
      render(<PublicationsList publications={pubs} perPage={10} />)

      // Page 1: first item in DOM, eleventh not
      expect(screen.getByText('Publication 1')).toBeInTheDocument()
      expect(screen.queryByText('Publication 11')).not.toBeInTheDocument()

      // Page 2: first item gone, eleventh appears
      await user.click(screen.getByRole('button', { name: /Next →/i }))
      expect(screen.queryByText('Publication 1')).not.toBeInTheDocument()
      expect(screen.getByText('Publication 11')).toBeInTheDocument()
    })
  })

  describe('keyword filter pills', () => {
    it('does not show pills when keywordFilterEnabled is false (default)', () => {
      render(<PublicationsList publications={makeFilterPubs()} perPage={10} />)
      expect(screen.queryByRole('button', { name: 'All' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Fertility/i })).not.toBeInTheDocument()
    })

    it('shows keyword pills when keywordFilterEnabled is true and publications share repeated words', () => {
      render(<PublicationsList publications={makeFilterPubs()} perPage={10} keywordFilterEnabled />)
      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Fertility/i })).toBeInTheDocument()
    })

    it('does not show pills when flag is enabled but no keyword appears in 2 or more publications', () => {
      const unique = [
        { title: 'Longevity Analysis', authors: 'A', journal: 'Aging Research', date: null, paperLink: null, scholarLink: null },
        { title: 'Urbanisation Trends', authors: 'B', journal: 'Migration Quarterly', date: null, paperLink: null, scholarLink: null },
      ]
      render(<PublicationsList publications={unique} perPage={10} keywordFilterEnabled />)
      expect(screen.queryByRole('button', { name: 'All' })).not.toBeInTheDocument()
    })

    it('"All" pill is active by default', () => {
      render(<PublicationsList publications={makeFilterPubs()} perPage={10} keywordFilterEnabled />)
      expect(screen.getByRole('button', { name: 'All' })).toHaveClass('filter-pill-active')
    })

    it('filters publications when a keyword pill is clicked', async () => {
      const user = userEvent.setup()
      render(<PublicationsList publications={makeFilterPubs()} perPage={10} keywordFilterEnabled />)

      await user.click(screen.getByRole('button', { name: /Fertility/i }))

      expect(screen.getByText('Fertility Postponement')).toBeInTheDocument()
      expect(screen.getByText('Fertility Treatment Outcomes')).toBeInTheDocument()
      expect(screen.queryByText('Reproductive Health Systems')).not.toBeInTheDocument()
    })

    it('updates the count to reflect the filtered results', async () => {
      const user = userEvent.setup()
      render(<PublicationsList publications={makeFilterPubs()} perPage={10} keywordFilterEnabled />)
      await user.click(screen.getByRole('button', { name: /Fertility/i }))
      expect(screen.getByText(/Showing 2 of 2 publications/i)).toBeInTheDocument()
    })

    it('clicking the active keyword pill deselects it and restores all results', async () => {
      const user = userEvent.setup()
      render(<PublicationsList publications={makeFilterPubs()} perPage={10} keywordFilterEnabled />)

      await user.click(screen.getByRole('button', { name: /Fertility/i }))
      await user.click(screen.getByRole('button', { name: /Fertility/i }))

      expect(screen.getByText('Reproductive Health Systems')).toBeInTheDocument()
      expect(screen.getByText(/Showing 3 of 3 publications/i)).toBeInTheDocument()
    })

    it('clicking "All" pill restores all results', async () => {
      const user = userEvent.setup()
      render(<PublicationsList publications={makeFilterPubs()} perPage={10} keywordFilterEnabled />)

      await user.click(screen.getByRole('button', { name: /Fertility/i }))
      await user.click(screen.getByRole('button', { name: 'All' }))

      expect(screen.getByText('Reproductive Health Systems')).toBeInTheDocument()
      expect(screen.getByText(/Showing 3 of 3 publications/i)).toBeInTheDocument()
    })

    it('shows a "Clear" button when a filter is active', async () => {
      const user = userEvent.setup()
      render(<PublicationsList publications={makeFilterPubs()} perPage={10} keywordFilterEnabled />)

      expect(screen.queryByRole('button', { name: /Clear/i })).not.toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: /Fertility/i }))
      expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument()
    })

    it('"Clear" button resets the filter', async () => {
      const user = userEvent.setup()
      render(<PublicationsList publications={makeFilterPubs()} perPage={10} keywordFilterEnabled />)

      await user.click(screen.getByRole('button', { name: /Fertility/i }))
      await user.click(screen.getByRole('button', { name: /Clear/i }))

      expect(screen.queryByRole('button', { name: /Clear/i })).not.toBeInTheDocument()
      expect(screen.getByText(/Showing 3 of 3 publications/i)).toBeInTheDocument()
    })

    it('filters to a minority subset when a minority keyword is clicked', async () => {
      const user = userEvent.setup()
      render(<PublicationsList publications={makeFilterPubs()} perPage={10} keywordFilterEnabled />)

      await user.click(screen.getByRole('button', { name: /Health/i }))

      expect(screen.queryByText('Fertility Postponement')).not.toBeInTheDocument()
      expect(screen.queryByText('Fertility Treatment Outcomes')).not.toBeInTheDocument()
      expect(screen.getByText('Reproductive Health Systems')).toBeInTheDocument()
      expect(screen.getByText(/Showing 1 of 1 publication$/i)).toBeInTheDocument()
    })

    it('resets to page 1 when a keyword filter is applied', async () => {
      const user = userEvent.setup()
      const pubs = [
        ...Array.from({ length: 11 }, (_, i) => ({
          title: `Fertility Study ${i + 1}`,
          authors: `Author ${i + 1}`,
          journal: 'Population Demographics',
          date: '2023-01-01T00:00:00.000Z',
          paperLink: null,
          scholarLink: null,
        })),
        { title: 'Reproductive Health Systems', authors: 'Z', journal: 'Health Review', date: null, paperLink: null, scholarLink: null },
      ]
      render(<PublicationsList publications={pubs} perPage={10} keywordFilterEnabled />)

      await user.click(screen.getByRole('button', { name: /Next →/i }))
      expect(screen.getByText('2 / 2')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /Fertility/i }))
      expect(screen.getByText('1 / 2')).toBeInTheDocument()
    })
  })
})
