const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-white text-slate-800 px-6 sm:px-8 lg:px-24"
    >
      <div className="w-full">
        <h1 className="lg:text-5xl sm:text-4xl xs:text-3xl font-bold mb-8 text-left lg:text-left sm:text-left ">
          <span className="text-primary">Ester Lazzari</span>
          <br />
          Demographer
        </h1>
        <p className="flex flex-row sm:justify-start space-x-4">
          <a
            rel="noreferrer"
            className="text-lg sm:text-base inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
            href="#about"
          >
            Know more
          </a>
          <button className="relative rounded px-6 py-3 border border-current text-primary overflow-hidden group">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Hover Me
            </span>
            <span className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></span>
          </button>

          {/* <a
            rel="noreferrer"
            className="text-lg sm:text-base inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
            href="#News"
          >
            News/Events
          </a> */}
        </p>
      </div>
    </section>
  )
}

export default Hero
