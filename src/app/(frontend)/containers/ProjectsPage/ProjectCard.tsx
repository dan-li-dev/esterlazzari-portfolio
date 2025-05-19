type ProjectCardProps = {
  title: string
  status: string
  description?: any
  paperLink?: string
}
import { RichText } from '@payloadcms/richtext-lexical/react'

const ProjectCard = ({ title, status, description, paperLink }: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{status}</p>
        <RichText data={description} />

        {paperLink && (
          <p className="text-sm">
            <a
              href={paperLink}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline hover:text-primary/80 transition"
            >
              More information
            </a>
            .
          </p>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
