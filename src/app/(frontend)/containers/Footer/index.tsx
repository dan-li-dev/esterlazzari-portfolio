import { FaAngleUp, FaTwitter, FaLinkedin, FaUniversity, FaEnvelope } from 'react-icons/fa';

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
    href: 'mailto:ester.lazzari@univie.ac.at',
    icon: <FaEnvelope />,
  },
];

const Footer = () => (
  <footer className="bg-gray-800 text-white py-16 text-center">
    <div className="container mx-auto px-4">
      <a href="#top" className="inline-block mb-8 text-4xl hover:-translate-y-1 transition-transform">
        <FaAngleUp />
      </a>

      <div className="flex justify-center space-x-8 text-3xl mb-8">
        {socialLinks.map(({ href, icon }, idx) => (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-1 transition-transform"
          >
            {icon}
          </a>
        ))}
      </div>

      <hr className="w-1/2 mx-auto border-gray-600 mb-8" />

      <p className="text-sm text-gray-400">© 2023 - Ester Lazzari</p>
    </div>
  </footer>
);

export default Footer;
