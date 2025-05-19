import HeroButtons from '@/app/(frontend)/components/HeroButtons'

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
        <HeroButtons />
      </div>
    </section>
  )
}

export default Hero
