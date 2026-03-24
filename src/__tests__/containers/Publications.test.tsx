import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'
import { createMockPayload } from '../mocks/payload'
import Publications from '@/app/(frontend)/containers/PublicationsPage'

vi.mock('@/app/(frontend)/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

const mockPublications = [
  {
    title: 'Fertility Trends in Europe',
    authors: 'Lazzari, E.',
    journal: 'EJP',
    date: '2023-06-01T00:00:00.000Z',
    paperLink: null,
    scholarLink: null,
  },
  {
    title: 'ART Access Inequalities',
    authors: 'Lazzari, E. & Müller, K.',
    journal: 'Demographic Research',
    date: '2022-11-01T00:00:00.000Z',
    paperLink: 'https://example.com',
    scholarLink: null,
  },
]

describe('Publications server component', () => {
  beforeEach(() => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: mockPublications }),
        findGlobal: vi.fn().mockResolvedValue({ publicationsPerPage: 10 }),
      }) as never,
    )
  })

  it('renders the "Publications" section heading', async () => {
    const jsx = await Publications()
    render(jsx)
    expect(screen.getByRole('heading', { name: /Publications/i })).toBeInTheDocument()
  })

  it('renders all fetched publications', async () => {
    const jsx = await Publications()
    render(jsx)
    expect(screen.getByText('Fertility Trends in Europe')).toBeInTheDocument()
    expect(screen.getByText('ART Access Inequalities')).toBeInTheDocument()
  })

  it('shows the correct publication count', async () => {
    const jsx = await Publications()
    render(jsx)
    expect(screen.getByText(/Showing 2 of 2 publications/i)).toBeInTheDocument()
  })

  it('uses publicationsPerPage from site settings', async () => {
    // Set perPage=1 so pagination kicks in for 2 publications
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: mockPublications }),
        findGlobal: vi.fn().mockResolvedValue({ publicationsPerPage: 1 }),
      }) as never,
    )
    const jsx = await Publications()
    render(jsx)
    // With perPage=1 and 2 docs, page indicator should show
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
  })

  it('falls back to perPage=10 when site settings returns null', async () => {
    const manyPubs = Array.from({ length: 5 }, (_, i) => ({
      title: `Pub ${i + 1}`,
      authors: `Author ${i + 1}`,
      journal: null,
      date: null,
      paperLink: null,
      scholarLink: null,
    }))
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: manyPubs }),
        findGlobal: vi.fn().mockResolvedValue(null),
      }) as never,
    )
    const jsx = await Publications()
    render(jsx)
    // 5 pubs with default perPage=10 → no pagination controls
    expect(screen.queryByText(/Page 1 of/)).not.toBeInTheDocument()
  })
})
