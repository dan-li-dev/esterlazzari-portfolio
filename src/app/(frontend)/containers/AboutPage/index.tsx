import Image from 'next/image'
import AboutButtons from '@/app/(frontend)/components/AboutButtons'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'
const About = async () => {
  const payload = await getPayloadClient()
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
            {portfolioPicture?.url && (
              <div className="relative w-40 sm:w-48 md:w-56 lg:w-72 aspect-square">
              <Image
                src={portfolioPicture.url}
                alt={portfolioPicture?.alt ?? 'Portfolio picture'}
                fill
                className="rounded-full object-cover shadow-lg"
              />
              </div>
            )}
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
              {cv?.url && (
                <a
                  className="underline hover:text-white/80"
                  rel="noreferrer"
                  href={cv.url}
                  target="_blank"
                >
                  CV
                </a>
              )}{' '}
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
