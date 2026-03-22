import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'
import { createMockPayload } from '../mocks/payload'
import Footer from '@/app/(frontend)/containers/Footer'

vi.mock('@/app/(frontend)/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

// ArrowToTop uses window.scrollTo — stub it
vi.mock('@/app/(frontend)/components/ArrowToTop', () => ({
  ArrowToTop: () => <button aria-label="Back to top" />,
}))

describe('Footer server component', () => {
  it('renders copyright text from settings', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        findGlobal: vi.fn().mockResolvedValue({
          socialLinks: [],
          copyrightText: '© Test Copyright 2024',
        }),
      }) as never,
    )
    const jsx = await Footer()
    render(jsx)
    expect(screen.getByText('© Test Copyright 2024')).toBeInTheDocument()
  })

  it('falls back to default copyright when settings returns null', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        findGlobal: vi.fn().mockResolvedValue(null),
      }) as never,
    )
    const jsx = await Footer()
    render(jsx)
    expect(screen.getByText(/© Ester Lazzari/)).toBeInTheDocument()
  })

  it('renders social links as anchor elements', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        findGlobal: vi.fn().mockResolvedValue({
          socialLinks: [
            { platform: 'twitter', url: 'https://twitter.com/test' },
            { platform: 'linkedin', url: 'https://linkedin.com/in/test' },
          ],
          copyrightText: '© Test',
        }),
      }) as never,
    )
    const jsx = await Footer()
    render(jsx)
    const links = screen.getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('https://twitter.com/test')
    expect(hrefs).toContain('https://linkedin.com/in/test')
  })

  it('renders no social links when the list is empty', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        findGlobal: vi.fn().mockResolvedValue({
          socialLinks: [],
          copyrightText: '© Test',
        }),
      }) as never,
    )
    const jsx = await Footer()
    const { container } = render(jsx)
    // Only the ArrowToTop button, no social anchor links
    expect(container.querySelectorAll('a').length).toBe(0)
  })

  it('uses mailto: target for email links', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        findGlobal: vi.fn().mockResolvedValue({
          socialLinks: [{ platform: 'email', url: 'mailto:test@example.com' }],
          copyrightText: '© Test',
        }),
      }) as never,
    )
    const jsx = await Footer()
    render(jsx)
    const emailLink = screen.getByRole('link')
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com')
    // mailto: links should NOT have target="_blank"
    expect(emailLink).not.toHaveAttribute('target', '_blank')
  })

  it('renders multi-line copyright when text contains newlines', async () => {
    vi.mocked(getPayloadClient).mockResolvedValue(
      createMockPayload({
        findGlobal: vi.fn().mockResolvedValue({
          socialLinks: [],
          copyrightText: 'Line one\nLine two',
        }),
      }) as never,
    )
    const jsx = await Footer()
    render(jsx)
    expect(screen.getByText('Line one')).toBeInTheDocument()
    expect(screen.getByText('Line two')).toBeInTheDocument()
  })
})
