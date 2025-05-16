import PublicationCard from "./PublicationCard";

const Research = () => {
  return (
    <section id="research">
      <div className="container">
        <div className="research-wrapper">
          <h2 className="section-title dark-blue-text">Publications</h2>

          {/* 1st row */}
          <div className="row">
            <PublicationCard
              title="Change in the perceived reproductive age window and delayed fertility in Europe"
              authors="E Lazzari, M-C Compans, E Beaujouan"
              journal="Population Studies"
              date="March 2024"
              paperLink="https://www.tandfonline.com/doi/metrics/10.1080/00324728.2023.2298678?scroll=top"
              scholarLink=""
            />
            <PublicationCard
              title="Impacts of COVID-19 on Medically Assisted Live Birth Rates in the United States in 2020 and 2021"
              authors="K Tierney, E Lazzari"
              journal="Population Research and Policy Review"
              date="January 2024"
              paperLink="https://link.springer.com/article/10.1007/s11113-023-09849-0"
              scholarLink="https://scholar.google.es/citations?view_op=view_citation&hl=en&user=67ezXusAAAAJ&sortby=pubdate&citation_for_view=67ezXusAAAAJ:M3ejUd6NZC8C"
            />
          </div>

          {/* You would continue adding more <div className="row"><PublicationCard />...</div> blocks below */}
        </div>
      </div>
    </section>
  );
};

export default Research;
