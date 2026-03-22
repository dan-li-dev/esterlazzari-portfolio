import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'
import { createMockPayload } from '../mocks/payload'
import About from '@/app/(frontend)/containers/AboutPage'

vi.mock('@/app/(frontend)/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

// AboutButtons uses scroll utilities — stub the component
vi.mock('@/app/(frontend)/components/AboutButtons', () => ({
  default: () => <div data-testid="about-buttons" />,
}))

// RichText wraps the lexical component — render a simple stub
vi.mock('@/app/(frontend)/components/RichText', () => ({
  default: ({ data }: { data: unknown }) => (
    <div data-testid="rich-text">{data ? 'Bio content' : ''}</div>
  ),
}))

const mockBio = { root: { type: 'root', children: [], version: 1 } }

describe('About server component', () => {
  it('renders the "About Me" heading', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [] }),
        findGlobal: vi.fn().mockResolvedValue({ bio: mockBio, cv: null, twitterUrl: null }),
      }) as never,
    )
    const jsx = await About()
    render(jsx)
    expect(screen.getByRole('heading', { name: /About Me/i })).toBeInTheDocument()
  })

  it('renders bio content when about section has bio', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [] }),
        findGlobal: vi.fn().mockResolvedValue({ bio: mockBio, cv: null, twitterUrl: null }),
      }) as never,
    )
    const jsx = await About()
    render(jsx)
    expect(screen.getByTestId('rich-text')).toBeInTheDocument()
  })

  it('shows CV link when cv has a url', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [] }),
        findGlobal: vi.fn().mockResolvedValue({
          bio: mockBio,
          cv: { url: 'https://example.com/cv.pdf' },
          twitterUrl: null,
        }),
      }) as never,
    )
    const jsx = await About()
    render(jsx)
    const cvLink = screen.getByRole('link', { name: /CV/i })
    expect(cvLink).toBeInTheDocument()
    expect(cvLink).toHaveAttribute('href', 'https://example.com/cv.pdf')
  })

  it('hides CV link when cv is null', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [] }),
        findGlobal: vi.fn().mockResolvedValue({ bio: mockBio, cv: null, twitterUrl: null }),
      }) as never,
    )
    const jsx = await About()
    render(jsx)
    expect(screen.queryByRole('link', { name: /CV/i })).not.toBeInTheDocument()
  })

  it('shows X / Twitter link when twitterUrl is provided', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [] }),
        findGlobal: vi.fn().mockResolvedValue({
          bio: mockBio,
          cv: null,
          twitterUrl: 'https://x.com/ester',
        }),
      }) as never,
    )
    const jsx = await About()
    render(jsx)
    const xLink = screen.getByRole('link', { name: /X/i })
    expect(xLink).toHaveAttribute('href', 'https://x.com/ester')
  })

  it('hides X link when twitterUrl is absent', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [] }),
        findGlobal: vi.fn().mockResolvedValue({ bio: mockBio, cv: null, twitterUrl: null }),
      }) as never,
    )
    const jsx = await About()
    render(jsx)
    expect(screen.queryByRole('link', { name: /^X$/i })).not.toBeInTheDocument()
  })

  it('renders portfolio image when a media item with alt="about_picture" exists', async () => {
    const portfolioPic = { alt: 'about_picture', url: 'https://example.com/photo.jpg' }
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [] }),
        findGlobal: vi.fn().mockResolvedValue({
          bio: mockBio,
          cv: null,
          twitterUrl: null,
          profilePicture: portfolioPic,
        }),
      }) as never,
    )
    const jsx = await About()
    render(jsx)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', portfolioPic.url)
    expect(img).toHaveAttribute('alt', 'about_picture')
  })

  it('renders the placeholder SVG when no portfolio picture exists', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        find: vi.fn().mockResolvedValue({ docs: [] }),
        findGlobal: vi.fn().mockResolvedValue({ bio: mockBio, cv: null, twitterUrl: null }),
      }) as never,
    )
    const jsx = await About()
    const { container } = render(jsx)
    // Placeholder is an SVG — no <img> tag
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
