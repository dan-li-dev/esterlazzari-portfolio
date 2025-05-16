type ProjectCardProps = {
  title: string;
  status: string;
  description: string;
  link?: string;
};

const ProjectCard = ({
  title,
  status,
  description,
  link,
}: ProjectCardProps) => {
  return (
    <div className="row">
      <div className="card project-cards">
        <div className="card-body">
          <h3 className="card-title card-projects-title">{title}</h3>
          <h4 className="card-subtitle mb-2 text-muted">{status}</h4>
          <p className="card-text">
            {description}
            {link && (
              <>
                {" "}
                <a
                  className="inlinelink"
                  href={link}
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
  );
};

export default ProjectCard;
