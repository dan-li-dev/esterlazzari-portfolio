type ProjectCardProps = {
  title: string
  status: string
  description?: any
  paperLink?: string
}
import { RichText } from '@payloadcms/richtext-lexical/react'

const ProjectCard = ({ title, status, description, paperLink }: ProjectCardProps) => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <h4 className="text-md text-gray-500">{status}</h4>
          <RichText data={description} />
          <p className="text-base text-gray-700">
            {paperLink && (
              <>
                {' '}
                <a
                  className="text-blue-600 underline hover:text-blue-800"
                  href={paperLink || '&'}
                  target="_blank"
                  rel="noreferrer"
                >
                  More information
                </a>
                .
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
