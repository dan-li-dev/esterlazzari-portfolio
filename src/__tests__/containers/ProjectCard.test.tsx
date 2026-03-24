import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCard from '@/app/(frontend)/containers/ProjectsPage/ProjectCard'

// Mock Payload's Lexical RichText — it has complex browser dependencies
vi.mock('@payloadcms/richtext-lexical/react', () => ({
  RichText: ({ data }: { data: unknown }) => (
    <div data-testid="rich-text">{data ? 'Rich text content' : ''}</div>
  ),
}))

describe('ProjectCard', () => {
  const base = {
    title: 'Reproductive Intentions Study',
    status: 'Ongoing',
    description: undefined,
    paperLink: undefined,
  }

  it('renders the project title', () => {
    render(<ProjectCard {...base} />)
    expect(screen.getByText(base.title)).toBeInTheDocument()
  })

  it('renders the status', () => {
    render(<ProjectCard {...base} />)
    expect(screen.getByText(base.status)).toBeInTheDocument()
  })

  it('renders the RichText component when description is provided', () => {
    const description = { root: { type: 'root', children: [], version: 1 } } as never
    render(<ProjectCard {...base} description={description} />)
    expect(screen.getByTestId('rich-text')).toBeInTheDocument()
  })

  it('shows "More information" link when paperLink is provided', () => {
    render(<ProjectCard {...base} paperLink="https://example.com/project" />)
    const link = screen.getByRole('link', { name: /More information/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com/project')
  })

  it('does not show "More information" link when paperLink is absent', () => {
    render(<ProjectCard {...base} />)
    expect(screen.queryByRole('link', { name: /More information/i })).not.toBeInTheDocument()
  })

  it('opens paper link in a new tab', () => {
    render(<ProjectCard {...base} paperLink="https://example.com/project" />)
    const link = screen.getByRole('link', { name: /More information/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('does not render RichText when description is absent', () => {
    render(<ProjectCard {...base} description={undefined} />)
    expect(screen.queryByTestId('rich-text')).not.toBeInTheDocument()
  })

  it('renders the status as a badge element', () => {
    render(<ProjectCard {...base} />)
    const badge = screen.getByText(base.status)
    expect(badge.tagName).toBe('SPAN')
  })
})
