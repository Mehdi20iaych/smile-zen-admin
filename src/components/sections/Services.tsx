const services = [
  { key: "detartrage", title: "Détartrage", img: "/images/service-detartrage.jpg", desc: "Nettoyage professionnel pour des dents saines." },
  { key: "plombage", title: "Plombage", img: "/images/service-plombage.jpg", desc: "Restauration durable des caries." },
  { key: "orthodontie", title: "Orthodontie", img: "/images/service-orthodontie.jpg", desc: "Aligneurs et bagues pour un sourire harmonieux." },
  { key: "blanchiment", title: "Blanchiment", img: "/images/service-blanchiment.jpg", desc: "Éclaircissement sécurisé et efficace." },
  { key: "esthetique", title: "Esthétique dentaire", img: "/images/service-esthetique.jpg", desc: "Facettes et solutions esthétiques personnalisées." },
  { key: "canalaire", title: "Traitement canalaire", img: "/images/service-canalaire.jpg", desc: "Sauvegarde de dents infectées avec précision." },
];

const Services = () => {
  return (
    <section id="services" className="scroll-mt-24">
      <div className="container mx-auto py-12 md:py-16">
        <h2 className="text-3xl font-semibold">Nos services</h2>
        <p className="mt-2 text-muted-foreground">Six soins essentiels pour votre santé bucco-dentaire.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.key} className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-elegant">
              <img src={s.img} alt={`${s.title} – SmileZen Casablanca`} className="h-44 w-full object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
