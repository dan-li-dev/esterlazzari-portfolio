import ProjectCard from './ProjectCard'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const Projects = async () => {
  const payload = await getPayload({ config: configPromise })

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
    <section id="projects" className="scroll-mt-8 bg-background text-foreground pb-[1%]">
      <div className="container mx-auto px-6 py-1 lg:py-16 lg:px-24">
        <h2 className="text-4xl font-bold mb-12 text-foreground text-center">Current Projects</h2>
        <div className="flex flex-wrap justify-evenly gap-y-24">
          {projectsToShow.map((project, idx) => (
            <div key={idx} className="w-full md:w-[80%] max-w-3xl">
              <ProjectCard {...project} paperLink={project.paperLink || undefined} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
