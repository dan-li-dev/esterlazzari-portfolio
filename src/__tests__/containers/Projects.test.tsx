import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'
import { createMockPayload } from '../mocks/payload'
import Projects from '@/app/(frontend)/containers/ProjectsPage'

vi.mock('@/app/(frontend)/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

vi.mock('@payloadcms/richtext-lexical/react', () => ({
  RichText: ({ data }: { data: unknown }) => (
    <div data-testid="rich-text">{data ? 'Rich text' : ''}</div>
  ),
}))

const pinnedProject = {
  title: 'Pinned: ART Access Study',
  status: 'Ongoing',
  pin: true,
  description: undefined,
  paperLink: 'https://example.com/project',
}

const unpinnedProject = {
  title: 'Unpinned: Old Study',
  status: 'Completed',
  pin: false,
  description: undefined,
  paperLink: null,
}

describe('Projects server component', () => {
  beforeEach(() => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [pinnedProject, unpinnedProject] }),
      }) as never,
    )
  })

  it('renders the "Current Projects" heading when pinned projects exist', async () => {
    const jsx = await Projects()
    render(jsx as React.ReactElement)
    expect(screen.getByRole('heading', { name: /Current Projects/i })).toBeInTheDocument()
  })

  it('renders pinned project cards', async () => {
    const jsx = await Projects()
    render(jsx as React.ReactElement)
    expect(screen.getByText(pinnedProject.title)).toBeInTheDocument()
  })

  it('does not render unpinned projects', async () => {
    const jsx = await Projects()
    render(jsx as React.ReactElement)
    expect(screen.queryByText(unpinnedProject.title)).not.toBeInTheDocument()
  })

  it('returns falsy when there are no pinned projects', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [unpinnedProject] }),
      }) as never,
    )
    const result = await Projects()
    expect(result).toBeFalsy()
  })

  it('returns falsy when there are no projects at all', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [] }),
      }) as never,
    )
    const result = await Projects()
    expect(result).toBeFalsy()
  })
})
