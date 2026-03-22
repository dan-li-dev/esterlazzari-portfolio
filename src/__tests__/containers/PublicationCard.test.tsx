import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PublicationCard, {
  formatDateToMonthYear,
} from '@/app/(frontend)/containers/PublicationsPage/PublicationCard'

describe('formatDateToMonthYear', () => {
  it('formats an ISO date string to month and year', () => {
    expect(formatDateToMonthYear('2023-06-01T00:00:00.000Z')).toMatch(/June 2023/)
  })

  it('handles January correctly', () => {
    expect(formatDateToMonthYear('2022-01-15T00:00:00.000Z')).toMatch(/January 2022/)
  })

  it('handles December correctly', () => {
    expect(formatDateToMonthYear('2021-12-01T00:00:00.000Z')).toMatch(/December 2021/)
  })
})

describe('PublicationCard', () => {
  const base = {
    title: 'Fertility Trends in Europe',
    authors: 'Lazzari, E. & Rossi, M.',
    journal: 'European Journal of Population',
    date: '2023-06-01T00:00:00.000Z',
    paperLink: 'https://example.com/paper',
    scholarLink: 'https://scholar.example.com/paper',
  }

  it('renders title, authors, and journal', () => {
    render(<PublicationCard {...base} />)
    expect(screen.getByText(base.title)).toBeInTheDocument()
    expect(screen.getByText(base.authors)).toBeInTheDocument()
    expect(screen.getByText(base.journal)).toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(<PublicationCard {...base} />)
    expect(screen.getByText(/June 2023/)).toBeInTheDocument()
  })

  it('renders "Unknown Date" when date is null', () => {
    render(<PublicationCard {...base} date={null} />)
    expect(screen.getByText('Unknown Date')).toBeInTheDocument()
  })

  it('"See Paper" links to paperLink when provided', () => {
    render(<PublicationCard {...base} />)
    const link = screen.getByRole('link', { name: /See Paper/i })
    expect(link).toHaveAttribute('href', base.paperLink)
  })

  it('"See Paper" links to "#" when paperLink is absent', () => {
    render(<PublicationCard {...base} paperLink={null} />)
    const link = screen.getByRole('link', { name: /See Paper/i })
    expect(link).toHaveAttribute('href', '#')
  })

  it('shows Google Scholar link when scholarLink is provided', () => {
    render(<PublicationCard {...base} />)
    const link = screen.getByRole('link', { name: /Google Scholar/i })
    expect(link).toHaveAttribute('href', base.scholarLink)
  })

  it('hides Google Scholar link when scholarLink is absent', () => {
    render(<PublicationCard {...base} scholarLink={null} />)
    expect(screen.queryByRole('link', { name: /Google Scholar/i })).not.toBeInTheDocument()
  })
})
