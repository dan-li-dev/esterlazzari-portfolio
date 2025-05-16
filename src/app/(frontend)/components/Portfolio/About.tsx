// import esterImage from '@/assets/ester1.png'

const About = () => {
  return (
    <section id="about">
      <div className="container-fluid">
        <h2 className="section-title load-hidden">About me</h2>
        <div className="row about-wrapper">
          <div className="col-md-6 col-sm-12">
            <div className="about-wrapper__image load-hidden">
              <img
                alt="Profile Image"
                className="img-fluid rounded shadow-lg"
                // src={esterImage}
                height="auto"
                width="300px"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="about-wrapper__info load-hidden">
              <p className="about-wrapper__info-text">
                Hi there! I am a postdoctoral research fellow at the University of Vienna. Prior to
                moving to Austria, I completed my PhD in demography at the Australian National
                University in Canberra.
                <br />
                <br />
                My research focuses on the causes and consequences of late fertility and on the ways
                in which medically assisted reproduction affects fertility trends. [...]
                <br />
                You can follow me on{' '}
                <a
                  className="inlinelink"
                  rel="noreferrer"
                  href="https://twitter.com/LazzariEster"
                  target="_blank"
                >
                  Twitter
                </a>{' '}
                to keep up to date with my most recent research.
                <br />
                Here is my{' '}
                <a
                  className="inlinelink"
                  rel="noreferrer"
                  href="assets/MyCV_web.pdf"
                  target="_blank"
                >
                  CV
                </a>
                .
              </p>
              <div className="container mt-3">
                <div className="column">
                  <div className="row">
                    <div className="col-sm">
                      <a rel="noreferrer" className="cta-btn cta-btn--resume" href="#research">
                        Publications
                      </a>
                    </div>
                    <div className="col-sm">
                      <a rel="noreferrer" className="cta-btn cta-btn--resume" href="#projects">
                        Research Projects
                      </a>
                    </div>
                    <div className="col-sm">
                      <a rel="noreferrer" className="cta-btn cta-btn--resume" href="#contact">
                        Conferences
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
