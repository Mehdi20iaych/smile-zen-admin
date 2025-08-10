const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="container mx-auto grid items-center gap-8 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Clinique dentaire moderne à Casablanca
          </h1>
          <p className="mt-4 text-muted-foreground">
            Des soins de qualité, un accueil chaleureux et une équipe à votre écoute. Prenez rendez-vous en ligne en quelques clics.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="#reserver" className="inline-block">
              <span className="sr-only">Aller à la réservation</span>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-hero text-primary-foreground shadow-elegant hover:opacity-95 h-11 px-8">
                Prendre RDV
              </button>
            </a>
            <a href="#services" className="inline-block">
              <span className="sr-only">Aller aux services</span>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
                Découvrir nos services
              </button>
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src="/images/hero-smile.jpg"
            alt="Clinique dentaire moderne à Casablanca, sourire éclatant"
            className="w-full rounded-lg shadow-elegant"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
