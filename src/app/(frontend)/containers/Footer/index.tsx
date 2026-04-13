import { FaTwitter, FaLinkedin, FaUniversity, FaEnvelope, FaGithub, FaInstagram } from 'react-icons/fa'
import { HiAcademicCap } from 'react-icons/hi'
import { SiBluesky, SiResearchgate, SiOrcid } from 'react-icons/si'
import type { IconType } from 'react-icons'
import { ArrowToTop } from '@/app/(frontend)/components/ArrowToTop'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'

const ICON_MAP: Record<string, IconType> = {
  twitter: FaTwitter,
  bluesky: SiBluesky,
  linkedin: FaLinkedin,
  university: FaUniversity,
  googleScholar: HiAcademicCap,
  researchgate: SiResearchgate,
  orcid: SiOrcid,
  github: FaGithub,
  instagram: FaInstagram,
  email: FaEnvelope,
}

const Footer = async () => {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'footer-settings' })

  const links = settings?.socialLinks ?? []
  const copyright = settings?.copyrightText ?? '© Ester Lazzari. All rights reserved.'

  return (
    <footer id="footer" className="bg-[hsl(220,15%,8%)] text-white py-12 text-center">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-8">
        <ArrowToTop />

        {links.length > 0 && (
          <div className="flex justify-center gap-6 text-2xl">
            {links.map(({ platform, url }, idx) => {
              const Icon = ICON_MAP[platform]
              if (!Icon) return null
              return (
                <a
                  key={idx}
                  href={url}
                  target={url.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="text-white hover:text-primary transition-colors hover:-translate-y-1 transform duration-200"
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        )}

        <hr className="w-1/3 border-white/20" />

        <div className="space-y-1 text-sm text-white/50">
          {copyright.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
