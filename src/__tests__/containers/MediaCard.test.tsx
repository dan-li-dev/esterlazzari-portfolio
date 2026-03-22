import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import MediaCard from '@/app/(frontend)/containers/MediaPage/MediaCard'

// Mock next/image as a plain <img> tag
vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

describe('MediaCard', () => {
  const base = {
    title: 'Research Featured in Science Today',
    publisher: 'Science Today',
    link: 'https://example.com/article',
    image: null as null,
  }

  it('renders the title as a link', () => {
    render(<MediaCard {...base} />)
    const link = screen.getByRole('link', { name: base.title })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', base.link)
  })

  it('title link opens in a new tab', () => {
    render(<MediaCard {...base} />)
    expect(screen.getByRole('link', { name: base.title })).toHaveAttribute('target', '_blank')
  })

  it('renders the publisher name', () => {
    render(<MediaCard {...base} />)
    expect(screen.getByText(base.publisher)).toBeInTheDocument()
  })

  it('shows an image when the image object has a url', () => {
    const image = { url: 'https://example.com/image.jpg', alt: base.title }
    render(<MediaCard {...base} image={image as never} />)
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', image.url)
  })

  it('does not render an image when image is null', () => {
    render(<MediaCard {...base} image={null} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('does not render an image when image is a string id (not populated)', () => {
    render(<MediaCard {...base} image="some-id-string" />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('falls back to "#" when link is empty', () => {
    render(<MediaCard {...base} link="" />)
    expect(screen.getByRole('link', { name: base.title })).toHaveAttribute('href', '#')
  })
})
