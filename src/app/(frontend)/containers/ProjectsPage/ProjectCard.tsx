import type { SerializedEditorState } from 'lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

type ProjectCardProps = {
  title: string
  status: string
  description?: SerializedEditorState | null
  paperLink?: string
}

const ProjectCard = ({ title, status, description, paperLink }: ProjectCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-7">
      <div className="space-y-3">
        {/* Status badge */}
        <span className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
          {status}
        </span>

        {/* Title */}
        <h3 className="text-xl leading-snug">{title}</h3>

        {/* Description */}
        {description && (
          <div className="text-sm text-muted-foreground font-light leading-relaxed">
            <RichText data={description} />
          </div>
        )}

        {/* Paper link */}
        {paperLink && (
          <a
            href={paperLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            More information
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-3.5 h-3.5"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
