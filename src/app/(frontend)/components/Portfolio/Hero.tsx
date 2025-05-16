const Hero = () => {
  return (
    <section id="hero" className="jumbotron">
      <div className="container">
        <h1 className="hero-title load-hidden">
          <span className="text-color-main">Ester Lazzari</span>
          <br />
          Demographer
        </h1>
        <p className="hero-cta load-hidden">
          <a
            rel="noreferrer"
            className="cta-btn cta-btn--hero"
            href="#about"
            style={{ marginRight: "20px" }}
          >
            Know more
          </a>
          <a rel="noreferrer" className="cta-btn cta-btn--hero" href="#News">
            News/Events
          </a>
        </p>
      </div>
    </section>
  );
};

export default Hero;
