const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-background text-foreground px-6 sm:px-8 lg:px-24"
    >
      <div className="max-w-7xl w-full mx-auto">
        <h1 className="text-center md:text-left text-3xl sm:text-4xl lg:text-6xl font-bold mb-8">
          <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
            Ester Lazzari
          </span>
          <br />
          Demographer
        </h1>
        <p className="flex flex-row md:justify-start space-x-4 justify-center">
          <a
            href="#about"
            className="relative inline-block px-4 py-1.5 border-current text-primary overflow-hidden group font-bold border-2 "
          >
            <span className=" text-[clamp(0.8rem,2vw,1.75rem)] relative z-10 transition-colors duration-300 group-hover:text-white">
              Know More
            </span>
            <span className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></span>
          </a>
          <a
            href="#media"
            className="relative inline-block px-4 py-1.5 border-current text-primary overflow-hidden group font-bold border-2"
          >
            <span className=" text-[clamp(0.8rem,2vw,1.75rem)] relative z-10 transition-colors duration-300 group-hover:text-white">
              Media Mentions
            </span>
            <span className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></span>
          </a>
        </p>
      </div>
    </section>
  )
}

export default Hero
