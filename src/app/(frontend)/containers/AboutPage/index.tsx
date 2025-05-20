import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import AboutButtons from '@/app/(frontend)/components/AboutButtons'
const About = async () => {
  const payload = await getPayload({ config: configPromise })
  const mediaQuery = await payload.find({
    collection: 'media',
    depth: 1,
    pagination: false,
  })
  const medias = mediaQuery.docs

  const cv = medias.find((media) => media.alt === 'my_CV')
  const portfolioPicture = medias.find((m) => m.alt === 'about_picture')

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
              src={portfolioPicture.url}
              className="rounded-full aspect-square object-cover shadow-lg"
              width={288}
              height={288}
              alt="Profile Image"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="text-md leading-relaxed text-left sm:text-center lg:text-left">
              I am a postdoctoral research fellow and lecturer at the University of Vienna, with a
              PhD in demography from the Australian National University. My research focuses on the
              causes and consequences of late fertility, with a particular attention to how assisted
              reproduction shapes fertility trends. My work has been published in leading
              demographic and medical journals, including Demography, Population and Development
              Review, and Human Reproduction.{' '}
            </p>
            <p>
              View my{' '}
              <a
                className="underline hover:text-white/80"
                rel="noreferrer"
                href={cv.url}
                target="_blank"
              >
                CV
              </a>{' '}
              for a full overview of my academic background and publications.
            </p>

            <div className="mt-6 sm:mt-8 text-left sm:text-center lg:text-left space-y-2">
              <p>
                Follow me on{' '}
                <a
                  className="underline hover:text-white/80"
                  rel="noreferrer"
                  href="https://x.com/LazzariEster"
                  target="_blank"
                >
                  X
                </a>{' '}
                for updates on my latest research.
              </p>
            </div>
            <AboutButtons />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
