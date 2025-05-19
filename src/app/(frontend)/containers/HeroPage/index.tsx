const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-6 sm:px-8 lg:px-24 bg-background text-foreground"
    >
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="mb-8 text-3xl sm:text-4xl lg:text-6xl font-bold text-center md:text-left">
          <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
            Ester Lazzari
          </span>
          <br />
          Demographer
        </h1>

        <div className="flex justify-center md:justify-start gap-4">
          {[
            { label: 'Know More', href: '#about' },
            { label: 'Media Mentions', href: '#media' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="relative inline-block font-bold text-primary border-2 border-current px-4 py-1.5 overflow-hidden group"
            >
              <span className="relative z-10 text-[clamp(0.8rem,2vw,1.25rem)] transition-colors duration-300 group-hover:text-white">
                {label}
              </span>
              <span className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
