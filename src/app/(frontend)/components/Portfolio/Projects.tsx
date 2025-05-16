import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Research Projects</h2>
        <div className="projects-wrapper">
          <ProjectCard
            title="POPULATION WELLBEING INITIATIVE: Fertility, parenting, and the future of population growth"
            status="In progress"
            description="More information is available"
            link="https://sites.utexas.edu/pwi/people/"
          />

          <ProjectCard
            title="BIOLOGICAL, INDIVIDUAL, AND CONTEXTUAL ASPECTS OF LATER REPRODUCTION"
            status="In progress"
            description="More information is available"
            link="http://www.wittgensteincentre.org/Jacomo/upload/about/erc-bic-late-eva-beaujouan-description.pdf"
          />

          <ProjectCard
            title="PHD THESIS: Childlessness, delayed childbearing and assisted reproduction"
            status="April 2022"
            description="The focus of my PhD thesis is to understand how assisted reproduction, conceptualised as a contextual 
            driver of fertility recuperation, affects fertility recovery in the context of delayed childbearing using Australia as a case-study."
            link="https://openresearch-repository.anu.edu.au/handle/1885/272511"
          />

          <ProjectCard
            title="IMPACT OF POLICIES ON FERTILITY RATES"
            status="March 2022"
            description="What is the impact of government policies on fertility decisions? The Centre for Population of Australia commissioned this report."
            link="https://www.elfac.org/impacts-of-policies-on-fertility-rates-in-australia/"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
