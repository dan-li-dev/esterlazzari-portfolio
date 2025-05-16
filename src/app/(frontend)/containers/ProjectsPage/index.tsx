import ProjectCard from './ProjectCard'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const Projects = async () => {
  const payload = await getPayload({ config: configPromise })

  const projectsQuery = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      status: true,
      description: true,
      date: true,
      paperLink: true,
    },
  })

  const projects = projectsQuery.docs
  return (
    <section id="projects" className="bg-white text-slate-900 ">
      <div className="pb-[15rem] md:pb-0 lg:px-24">
        <h2 className="text-4xl font-bold mb-12 text-primary text-center">Research Projects</h2>
        <div className="flex flex-wrap justify-evenly gap-y-24">
          {projects.map((project, idx) => (
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
