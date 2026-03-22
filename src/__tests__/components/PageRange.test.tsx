import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageRange } from '@/app/(frontend)/components/PageRange'

describe('PageRange', () => {
  it('shows "no results" message when totalDocs is 0', () => {
    render(<PageRange totalDocs={0} currentPage={1} limit={10} />)
    expect(screen.getByText(/Search produced no results/i)).toBeInTheDocument()
  })

  it('shows "no results" message when totalDocs is undefined', () => {
    render(<PageRange currentPage={1} limit={10} />)
    expect(screen.getByText(/Search produced no results/i)).toBeInTheDocument()
  })

  it('shows plural label for multiple docs', () => {
    render(<PageRange totalDocs={5} currentPage={1} limit={10} collection="publications" />)
    expect(screen.getByText(/5/)).toBeInTheDocument()
    expect(screen.getByText(/Publications/i)).toBeInTheDocument()
  })

  it('shows singular label for exactly 1 doc', () => {
    render(<PageRange totalDocs={1} currentPage={1} limit={10} collection="publications" />)
    expect(screen.getByText(/1/)).toBeInTheDocument()
    expect(screen.getByText(/Publication/i)).toBeInTheDocument()
  })

  it('uses custom collectionLabels when provided', () => {
    render(
      <PageRange
        totalDocs={3}
        currentPage={1}
        limit={10}
        collectionLabels={{ plural: 'Articles', singular: 'Article' }}
      />,
    )
    expect(screen.getByText(/Articles/i)).toBeInTheDocument()
  })

  it('falls back to default "Docs" label when no collection or labels given', () => {
    render(<PageRange totalDocs={7} currentPage={1} limit={10} />)
    expect(screen.getByText(/Docs/i)).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <PageRange totalDocs={5} currentPage={1} limit={10} className="my-custom-class" />,
    )
    expect(container.firstChild).toHaveClass('my-custom-class')
  })
})
