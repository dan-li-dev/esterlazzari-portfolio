import ProjectCard from './ProjectCard'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'

const Projects = async () => {
  const payload = await getPayloadClient()

  const projectsQuery = await payload.find({
    collection: 'projects',
    depth: 1,
    pagination: false,
    select: {
      title: true,
      status: true,
      description: true,
      date: true,
      paperLink: true,
      pin: true,
    },
  })

  const projects = projectsQuery.docs
  const projectsToShow = projects.filter((project) => project.pin)
  return (
    projectsToShow.length > 0 && (
      <section id="projects" className="scroll-mt-16 bg-background text-foreground py-12 lg:py-20">
        <div className="container mx-auto px-6 lg:px-24">
          <h2 className="text-4xl font-bold text-center mb-12">Current Projects</h2>

          <div className="flex flex-col items-center gap-12">
            {projectsToShow.map((project, idx) => (
              <div key={idx} className="w-full max-w-3xl">
                <ProjectCard {...project} paperLink={project.paperLink || undefined} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  )
}

export default Projects
