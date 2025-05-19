// import esterImage from '@/assets/ester1.png'
import Image from 'next/image'
const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-16 bg-gradient-to-br from-primary to-secondary text-primary-foreground pb-[10%] 
  clip-path-about min-h-[100vh] sm:min-h-[110vh] md:min-h-[90vh]"
    >
      <div className="container mx-auto px-6 py-16 lg:px-24">
        <h2 className="text-4xl font-bold text-center mb-6">About Me</h2>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex justify-center items-center w-full lg:w-1/2">
            <Image
              src="https://7agjoirtfflkfyf4.public.blob.vercel-storage.com/Profile-image.png"
              className="rounded-full aspect-square object-cover shadow-lg"
              width={288}
              height={288}
              alt="Profile Image"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="text-md leading-relaxed text-left sm:text-center lg:text-left">
              I am a postdoctoral research fellow at the University of Vienna, with a PhD in
              demography from the Australian National University. My research examines the causes
              and consequences of delayed fertility, with a particular focus on medically assisted
              reproduction (MAR) and its impact on fertility trends and family size at older ages.
              <br />
              <br />I also explore fertility preferences, social norms around childbearing, and the
              intersection of education and reproductive outcomes. My work has been published in
              leading demographic and medical journals, including{' '}
              <em>Population and Development Review</em>, <em>Human Reproduction</em>, and{' '}
              <em>Population Studies</em>.
            </p>

            <div className="mt-6 sm:mt-8 text-left sm:text-center lg:text-left space-y-2">
              <p>
                Follow me on{' '}
                <a
                  className="underline hover:text-white/80"
                  rel="noreferrer"
                  href="https://twitter.com/LazzariEster"
                  target="_blank"
                >
                  Twitter
                </a>{' '}
                for updates on my latest research.
              </p>
              <p>
                View my{' '}
                <a
                  className="underline hover:text-white/80"
                  rel="noreferrer"
                  href="assets/MyCV_web.pdf"
                  target="_blank"
                >
                  CV
                </a>{' '}
                for a full overview of my academic background and publications.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-1 mt-6 sm:mt-8 sm:gap-4">
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
                href="#conferences"
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
