type PublicationCardProps = {
  title: string;
  authors: string;
  journal: string;
  date: string;
  paperLink: string;
  scholarLink?: string;
};

const PublicationCard = ({
  title,
  authors,
  journal,
  date,
  paperLink,
  scholarLink,
}: PublicationCardProps) => {
  return (
    <div className="col-md-6 col-sm-12">
      <div className="research-wrapper__text load-hidden">
        <h3 className="research-wrapper__text-title">{title}</h3>
        <h4 className="research-wrapper__text-subtitle">
          {authors} - <b>{journal}</b>
        </h4>
        <h5>{date}</h5>
        <a
          rel="noreferrer"
          target="_blank"
          className="cta-btn cta-btn--hero stretched-link"
          href={paperLink}
        >
          See Paper
        </a>
        {scholarLink && (
          <a
            rel="noreferrer"
            target="_blank"
            className="cta-btn text-color-main"
            href={scholarLink}
          >
            View on Google Scholar
          </a>
        )}
      </div>
    </div>
  );
};

export default PublicationCard;
