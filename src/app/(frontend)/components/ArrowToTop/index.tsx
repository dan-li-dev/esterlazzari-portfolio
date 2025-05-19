import { scrollToTop } from '@/app/(frontend)/utils/scroll'
import { FaAngleUp } from 'react-icons/fa'
export const ArrowToTop = () => (
  <a
    onClick={scrollToTop}
    aria-label="Back to top"
    className="text-4xl text-white cursor-pointer hover:text-primary transition-colors hover:-translate-y-1 transform duration-200"
  >
    <FaAngleUp />
  </a>
)
