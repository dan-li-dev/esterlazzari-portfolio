// import esterImage from '@/assets/ester1.png'
import Image from 'next/image'
const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-16 bg-gradient-to-br from-primary to-secondary text-white pb-[10%] clip-path-about"
    >
      <div className="container mx-auto px-6 py-16 lg:px-24">
        <h2 className="text-4xl font-bold text-center mb-12">About me</h2>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex justify-center items-center w-full lg:w-1/2">
            {/* Uncomment and use image below if needed */}
            <Image
              src="/assets/ester1.png"
              className="rounded-full aspect-square object-cover shadow-lg"
              width={288}
              height={288}
              alt="Profile Image"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-left sm:text-center lg:text-left">
              Hi there! I am a postdoctoral research fellow at the University of Vienna. Prior to
              moving to Austria, I completed my PhD in demography at the Australian National
              University in Canberra.
              <br />
              <br />
              My research focuses on the causes and consequences of late fertility and on the ways
              in which medically assisted reproduction affects fertility trends. [...]
              <br />
              You can follow me on{' '}
              <a
                className="underline text-white hover:text-white/80"
                rel="noreferrer"
                href="https://twitter.com/LazzariEster"
                target="_blank"
              >
                Twitter
              </a>{' '}
              to keep up to date with my most recent research.
              <br />
              Here is my{' '}
              <a
                className="underline text-white hover:text-white/80"
                rel="noreferrer"
                href="assets/MyCV_web.pdf"
                target="_blank"
              >
                CV
              </a>
              .
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                rel="noreferrer"
                className="bg-white text-primary font-semibold px-6 py-3 rounded hover:bg-white/90 transition"
                href="#research"
              >
                Publications
              </a>
              <a
                rel="noreferrer"
                className="bg-white text-primary font-semibold px-6 py-3 rounded hover:bg-white/90 transition"
                href="#projects"
              >
                Research Projects
              </a>
              <a
                rel="noreferrer"
                className="bg-white text-primary font-semibold px-6 py-3 rounded hover:bg-white/90 transition"
                href="#contact"
              >
                Conferences
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
