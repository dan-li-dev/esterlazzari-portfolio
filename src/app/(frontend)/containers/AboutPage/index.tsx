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
              Hi there! I am postdoctoral research fellow at the University of Vienna. Prior to
              moving to Austria, I completed my PhD in demography at the Australian National
              University in Canberra. My research focuses on the causes and consequences of late
              fertility and on the ways in which medically assisted reproduction affects fertility
              trends. My work has examined the impact of assisted reproduction on family size, with
              a particular focus on its contribution to the recovery of births at older ages. Other
              of my research interests include fertility preferences, social age norms for
              childbearing, and the association between education and fertility. My research has
              been published in demographic and medical journals such as Population and Development
              Review, Human Reproduction, and Population Studies. You can follow me on{' '}
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

            <div className="flex flex-wrap justify-center gap-1 mt-1 sm:mt-8 sm:gap-4">
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
