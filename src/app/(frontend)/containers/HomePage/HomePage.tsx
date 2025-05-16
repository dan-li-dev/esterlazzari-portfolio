import Hero from '@/components/Portfolio/Hero'
import About from '@/components/Portfolio/About'
import Research from '@/components/Portfolio/Research'
import Projects from '@/components/Portfolio/Projects'
// import Contact from "@/components/Contact";
// import News from "@/components/News";
// import Footer from "@/components/Footer";
import '@/styles.scss'
import { useEffect } from 'react'
import initScrollReveal from '@/scripts/scrollReveal'
import initTiltEffect from '@/scripts/tiltAnimation'
import { targetElements, defaultProps } from '@/scripts/scrollRevealConfig'
import ScrollRevealInit from '@/components/Portfolio/ScrollRevealInit' // 👈 Import it

const HomePage = () => {
  return (
    <>
      <ScrollRevealInit />
      <div id="top"></div>
      <Hero />
      <About />
      <Research />
      <Projects />
      {/* <Contact />
      <News />
      <Footer /> */}
    </>
  )
}

export default HomePage
