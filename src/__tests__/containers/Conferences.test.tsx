import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'
import { createMockPayload } from '../mocks/payload'
import Conferences from '@/app/(frontend)/containers/ConferencesPage'

vi.mock('@/app/(frontend)/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

const mockConferences = [
  {
    id: 1,
    name: 'European Population Conference',
    attendance: [
      { id: 'att-1', date: '2024-06-12T00:00:00.000Z', location: 'Edinburgh, UK', planned: false },
      { id: 'att-2', date: '2026-09-01T00:00:00.000Z', location: 'Vienna, Austria', planned: true },
    ],
  },
  {
    id: 2,
    name: 'Population Association of America',
    attendance: [
      { id: 'att-3', date: '2023-04-17T00:00:00.000Z', location: 'New Orleans, USA', planned: false },
    ],
  },
]

describe('Conferences server component', () => {
  beforeEach(() => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: mockConferences }),
      }) as never,
    )
  })

  it('renders the "Conferences" section heading', async () => {
    const jsx = await Conferences()
    render(jsx)
    expect(screen.getByRole('heading', { name: /Conferences/i })).toBeInTheDocument()
  })

  it('renders each conference name', async () => {
    const jsx = await Conferences()
    render(jsx)
    expect(screen.getByText('European Population Conference')).toBeInTheDocument()
    expect(screen.getByText('Population Association of America')).toBeInTheDocument()
  })

  it('renders attendance year and location', async () => {
    const jsx = await Conferences()
    render(jsx)
    expect(screen.getByText(/2024 – Edinburgh, UK/)).toBeInTheDocument()
    expect(screen.getByText(/2023 – New Orleans, USA/)).toBeInTheDocument()
  })

  it('shows "(planned)" label for planned attendance', async () => {
    const jsx = await Conferences()
    render(jsx)
    const plannedSpan = screen.getByText(/2026 – Vienna, Austria/)
    expect(plannedSpan).toBeInTheDocument()
    // The planned span should contain the "(planned)" text
    expect(plannedSpan.textContent).toContain('planned')
  })

  it('does not show "(planned)" for past attendance', async () => {
    const jsx = await Conferences()
    render(jsx)
    const pastSpan = screen.getByText(/2024 – Edinburgh, UK/)
    expect(pastSpan.textContent).not.toContain('planned')
  })

  it('renders an empty section when there are no conferences', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [] }),
      }) as never,
    )
    const jsx = await Conferences()
    render(jsx)
    expect(screen.getByRole('heading', { name: /Conferences/i })).toBeInTheDocument()
  })
})
