import Image from 'next/image'
import AboutButtons from '@/app/(frontend)/components/AboutButtons'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'
import RichText from '@/app/(frontend)/components/RichText'

const About = async () => {
  const payload = await getPayloadClient()

  const aboutSection = await payload.findGlobal({ slug: 'about-section', depth: 1 })

  const portfolioPicture =
    typeof aboutSection?.profilePicture === 'object' ? aboutSection.profilePicture : null
  const cv = typeof aboutSection?.cv === 'object' ? aboutSection.cv : null
  const twitterUrl = aboutSection?.twitterUrl

  return (
    <section
      id="about"
      className="scroll-mt-16 bg-gradient-to-br from-primary to-secondary text-primary-foreground pb-[10%]
  clip-path-about min-h-[100vh] sm:min-h-[110vh] md:min-h-[90vh]"
    >
      <div className="container mx-auto px-6 py-16 lg:px-24">
        <h2 className="text-4xl text-center mb-6">About Me</h2>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex justify-center items-center w-full lg:w-1/2">
            <div className="relative w-40 sm:w-48 md:w-56 lg:w-72 aspect-square">
              {portfolioPicture?.url ? (
                <Image
                  src={portfolioPicture.url}
                  alt={portfolioPicture?.alt ?? 'Portfolio picture'}
                  fill
                  className="rounded-full object-cover shadow-lg"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-1/2 h-1/2 text-white/50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-3">
            {aboutSection?.bio && (
              <RichText
                data={aboutSection.bio}
                className="text-md leading-relaxed text-left sm:text-center lg:text-left [&_a]:underline [&_a]:hover:text-white/80"
              />
            )}

            {cv?.url && (
              <p className="text-md text-left sm:text-center lg:text-left">
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
            )}

            {twitterUrl && (
              <p className="text-md text-left sm:text-center lg:text-left">
                Follow me on{' '}
                <a
                  className="underline hover:text-white/80"
                  rel="noreferrer"
                  href={twitterUrl}
                  target="_blank"
                >
                  X
                </a>{' '}
                for updates on my latest research.
              </p>
            )}

            <AboutButtons />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
