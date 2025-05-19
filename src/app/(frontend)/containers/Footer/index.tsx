import { FaAngleUp, FaTwitter, FaLinkedin, FaUniversity, FaEnvelope } from 'react-icons/fa'
import { HiAcademicCap } from 'react-icons/hi'

const socialLinks = [
  {
    href: 'https://twitter.com/LazzariEster',
    icon: <FaTwitter />,
  },
  {
    href: 'https://www.linkedin.com/in/ester-lazzari-310550148/',
    icon: <FaLinkedin />,
  },
  {
    href: 'https://www.wittgensteincentre.org/en/staff/member/lazzari.htm',
    icon: <FaUniversity />,
  },
  {
    href: 'https://scholar.google.es/citations?user=67ezXusAAAAJ&hl=en',
    icon: <HiAcademicCap />,
  },
  {
    href: 'mailto:ester.lazzari@univie.ac.at',
    icon: <FaEnvelope />,
  },
]

const Footer = () => (
  <footer id="footer" className="bg-gray-900 text-white py-12 text-center">
    <div className="container mx-auto px-4 flex flex-col items-center space-y-8">
      {/* Back to Top */}

      {/* Social Links */}
      <div className="flex justify-center gap-6 text-2xl">
        {socialLinks.map(({ href, icon }, idx) => (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-primary transition-colors hover:-translate-y-1 transform duration-200"
          >
            {icon}
          </a>
        ))}
      </div>

      {/* Divider */}
      <hr className="w-1/3 border-gray-700" />

      {/* Copyright */}
      <div className="space-y-1 text-sm text-neutral-400">
        <p>&copy; 2012 – 2025 Ester Lazzari</p>
        <p>All rights reserved</p>
      </div>
    </div>
  </footer>
)

export default Footer
